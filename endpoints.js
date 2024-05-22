bcrypt = require('bcrypt');
const auth = require('./auth/middleware')
// console.log(swaggerDocs)

module.exports = function (app, pool, bcrypt, jwt) {
	

    app.get("/products", async (req, res) => {
        try {
            const [rows] = await pool.execute("SELECT * FROM produit");
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })
	
	app.get("/search/products", async (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery) {
        return res.status(400).json({ message: "Aucune requête de recherche fournie." });
    }

    try {
        const sqlQuery = `
            SELECT * FROM produit
            WHERE designation LIKE ? OR description LIKE ?
        `;
        const sqlParams = [`%${searchQuery}%`, `%${searchQuery}%`];
        const [rows] = await pool.execute(sqlQuery, sqlParams);

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des produits." });
    }
});



	

	
	app.get("/products/paginated", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchQuery = req.query.query ? req.query.query : "";

        let sqlQuery = "SELECT * FROM produit";
        let sqlParams = [limit, offset];

        if (searchQuery) {
            sqlQuery += " WHERE nom LIKE ? OR description LIKE ?";
            sqlParams.unshift('%' + searchQuery + '%', '%' + searchQuery + '%');
        }

        sqlQuery += " LIMIT ? OFFSET ?";

        const [rows] = await pool.execute(sqlQuery, sqlParams);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



    app.get("/product/:ref", async (req, res) => {
        try {
            const ref = req.params.ref;
            const [rows] = await pool.execute("SELECT * FROM produit WHERE reference = ('" + ref + "');");
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    app.post("/client", auth, async (req, res) => {
        const {codec} = req.body;
        const values = [codec];
        try {
            const [rows] = await pool.execute("SELECT * FROM client WHERE codec =?", values);
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

 app.post("/dernierescommandes", auth, async (req, res) => {
    const { codec } = req.body;
    try {
        const query = `
            SELECT 
                c.numero, 
                c.date_commande, 
                c.total_ht, 
                c.total_tva, 
                c.etat,
                GROUP_CONCAT(
                    CONCAT(p.designation, '^^^', lc.quantite_demandee, '^^^', p.prix_unitaire_HT, '^^^', p.url_image) 
                    SEPARATOR ';;;'
                ) AS details
            FROM commande c
            JOIN ligne_commande lc ON c.numero = lc.numero
            JOIN produit p ON lc.reference = p.reference
            WHERE c.codec = ?
            GROUP BY c.numero
            ORDER BY c.date_commande DESC
            LIMIT 1000;
        `;

        const [rows] = await pool.execute(query, [codec]);
        
        const commandes = rows.map(row => {
            const produits = row.details.split(';;;').map(detail => {
                const [designation, quantite, prixHT, urlImage] = detail.split('^^^');
                return { 
                    designation, 
                    quantite: parseInt(quantite, 10), 
                    prixHT: parseFloat(prixHT), 
                    urlImage 
                };
            });

            return {
                numero: row.numero,
                dateCommande: row.date_commande,
                totalHT: row.total_ht,
                totalTVA: row.total_tva,
                etat: row.etat,
                produits: produits
            };
        });

        res.status(200).json(commandes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des dernières commandes" });
    }
});


    //Register
    app.post("/register", async (req, res) => {
        const {nom, adresse, cp, ville, telephone, email, motdepasse} = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(motdepasse, 10);
        const values = [nom, adresse, cp, ville, telephone, email, hashedPassword];
        console.log(values);
        try {
            await pool.execute("INSERT INTO client (nom, adresse, cp, ville, telephone, email, motdepasse) VALUES (?, ?, ?, ?, ?, ?, ?)", values);
            res.sendStatus(201);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: err,
            });
        }
    })
	
	//affichage et limitation produits avec count
	app.get("/products/count", async (req, res) => {
    try {
        // Requête SQL pour compter le nombre total de produits
        const [rows] = await pool.execute("SELECT COUNT(*) AS total FROM produit");
        const total = rows[0].total;
        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
	
	app.get('/vendeurs', async (req, res) => {
    try {
        const [vendeurs] = await pool.execute("SELECT codev, nom FROM vendeur");
        res.json(vendeurs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des vendeurs');
    }
});



   app.post("/passcommand", auth, async (req, res) => {
    const {
        email,
        codev,
        date_livraison,
        date_commande,
        total_ht,
        total_tva,
        etat,
        com_payee,
        com_prete,
        lignecommande
    } = req.body;

    try {
        // Récupérer le codec à partir de l'email
        const [user] = await pool.execute("SELECT codec FROM client WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        const codec = user[0].codec;

        // Insérer la commande
        const [commande] = await pool.execute(
            "INSERT INTO commande (codev, codec, date_livraison, date_commande, total_ht, total_tva, etat, com_payee, com_prete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [codev, codec, date_livraison, date_commande, total_ht, total_tva, etat, com_payee, com_prete]
        );
        const numeroCommande = commande.insertId;

        // Parcourir chaque ligne de commande
        for (const ligne of lignecommande) {
            const { reference, quantite_demandee, total_ht } = ligne;

            // Vérifier le stock actuel
            const [produit] = await pool.execute("SELECT stock FROM produit WHERE reference = ?", [reference]);
            if (produit[0].stock < quantite_demandee) {
                // Si le stock est insuffisant, annuler la commande (vous pourriez également choisir de ne pas insérer cette ligne spécifique)
                return res.status(400).json({ message: `Stock insuffisant pour le produit ${reference}.` });
            }

            // Mettre à jour le stock du produit
            await pool.execute("UPDATE produit SET stock = stock - ? WHERE reference = ?", [quantite_demandee, reference]);

            // Insérer la ligne de commande
            await pool.execute(
                "INSERT INTO ligne_commande (numero, numero_ligne, reference, quantite_demandee, total_ht) VALUES (?, ?, ?, ?, ?)", 
                [numeroCommande, ligne.numero_ligne, reference, quantite_demandee, total_ht]
            );
        }

        res.status(201).json({ message: "Commande passée avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});



  app.post("/login", async (req, res) => {
    const { email, motdepasse } = req.body;
    try {
        const [utilisateur] = await pool.execute("SELECT * FROM client WHERE email = ?", [email]);
        if (utilisateur.length === 0) {
            res.status(401).json({ success: false, message: "Adresse e-mail ou mot de passe incorrect." });
        } else {
            const passwordMatch = await bcrypt.compare(motdepasse, utilisateur[0].motdepasse);
            if (passwordMatch) {
                const token = jwt.sign({ userId: utilisateur[0].id }, process.env.JWT_SECRET);
                res.status(200).json({
                    success: true,
                    message: "Connexion réussie.",
                    token,
                    user: {
                        nom: utilisateur[0].nom,
                        email: utilisateur[0].email,
                        telephone: utilisateur[0].telephone,
						codec: utilisateur[0].codec,
                        // Autres infos si nécessaire
                    },
                });
            } else {
                res.status(401).json({ success: false, message: "Adresse e-mail ou mot de passe incorrect." });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Une erreur est survenue lors de la connexion." });
    }
});


    app.post("/updateclient", auth, async (req, res) => {
        const {nom, adresse, cp, ville, telephone, email, codec} = req.body;
        const values = [nom, adresse, cp, ville, telephone, email, codec];
        try {
            await pool.execute(
                "UPDATE client SET nom = ?, adresse = ?, cp = ?, ville = ?, telephone = ?, email = ? WHERE codec = ?", values
            );
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

    app.post("/updatepassword", auth, async (req, res) => {
        const {motdepasse, codec} = req.body;
        const hashedPassword = await bcrypt.hash(motdepasse, 10);
        const values = [hashedPassword, codec];
        try {
            await pool.execute(
                "UPDATE client SET motdepasse=? WHERE codec=?", values
            );
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

    app.post("/deleteclient", auth, async (req, res) => {
        const {codec} = req.body;
        const values = [codec];
        try {
            await pool.execute(
                "DELETE FROM client WHERE codec = ?", values
            );
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

    app.get("/lastpromo", async (req, res) => {
        try {
            await pool.execute(
                "SELECT * FROM produit WHERE active_promo=1 ORDER BY date_ajout DESC LIMIT 3"
            )
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

	
	app.get("/lastproducts", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM produit ORDER BY date_ajout DESC LIMIT 10"
        );
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Une erreur est survenue",
        });
    }
});

	
	app.get("/lastproducts2", async (req, res) => {
		try {
			const [rows] = await pool.execute(
				"SELECT * FROM produit ORDER BY date_ajout DESC LIMIT 4"
			);
			res.json(rows); // Envoie les données sous forme de JSON
		} catch (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				message: "Une erreur est survenue",
			});
		}
	});

    app.post("/checkpromo", async (req, res) => {
        const {codepromo} = req.body;
        try {
            const [promo] = await pool.execute(
                "SELECT montantpromo FROM promotion WHERE codepromo=? AND active=1", [codepromo]
            );

            if (promo.length == 0) {
                res.status(401).json({
                    success: false,
                    message: "Le code de promotion saisi est invalide."
                });
            } else {
                res.status(200).json(promo);
            }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

    app.post("/commandpaymenton", auth, async (req, res) => {
        const {numero} = req.body;
        const values = [numero];
        try {
            await pool.execute(
                "UPDATE commande SET com_payee = 1 WHERE numero = ?", values
            );
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

    app.post("/commandready", auth, async (req, res) => {
        const {numero} = req.body;
        const values = [numero];
        try {
            await pool.execute(
                "UPDATE commande SET com_prete = 1 WHERE numero = ?", values
            );
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Une erreur est survenue",
            });
        }
    });

}