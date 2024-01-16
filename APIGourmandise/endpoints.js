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
        const {codec} = req.body;
        const values = [codec];
        try {
            const [rows] = await pool.execute("SELECT COUNT(numero_ligne) as nbproduits, total_tva, commande.numero, com_payee, com_prete FROM client, commande, ligne_commande WHERE client.codec = commande.codec AND commande.numero = ligne_commande.numero AND client.codec = ? GROUP BY total_tva, commande.numero", values);
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

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

    app.post("/passcommand", auth, async (req, res) => {
        const {
            codev,
            codec,
            date_livraison,
            date_commande,
            commande_total_ht,
            total_tva,
            etat,
            com_payee,
            com_prete,
            lignecommande
        } = req.body;
        const valuescommande = [codev, codec, date_livraison, date_commande, commande_total_ht, total_tva, etat, com_payee, com_prete];
        try {
            const commande = await pool.execute("INSERT INTO commande (codev, codec, date_livraison, date_commande, total_ht, total_tva, etat, com_payee, com_prete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", valuescommande);

            let numeroLigneDur = 1;

            for (const element of lignecommande) {

                const dernierecommande = commande[0].insertId;
                const {reference, quantite, lignecommande_total_ht} = element;
                const valuesligne_commande = [dernierecommande, numeroLigneDur, reference, quantite, lignecommande_total_ht];

                pool.execute("INSERT INTO ligne_commande (numero, numero_ligne, reference, quantite_demandee, total_ht) VALUES (?, ?, ?, ?, ?)", valuesligne_commande);

                numeroLigneDur++;
            }
            res.sendStatus(201);
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: err,
            });
        }
    });


    app.post("/login", async (req, res) => {
        const {email, motdepasse} = req.body;
        try {
            // Rechercher l'utilisateur en fonction de l'adresse e-mail
            const [utilisateur] = await pool.execute(
                "SELECT * FROM client WHERE email = ?",
                [email]
            );

            if (utilisateur.length == 0) {
                // Aucun utilisateur avec cette adresse e-mail
                res.status(401).json({
                    success: false,
                    message: "Adresse e-mail ou mot de passe incorrect."
                });
            } else {
                // Vérifier le mot de passe
                const passwordMatch = await bcrypt.compare(motdepasse, utilisateur[0].motdepasse);
                console.log(motdepasse);
                console.log(utilisateur[0].motdepasse);

                if (passwordMatch) {
                    // Générer un jeton JWT pour l'authentification
                    const token = jwt.sign({userId: utilisateur[0].id}, process.env.JWT_SECRET);

                    // Envoyer le jeton en réponse
                    res.status(200).json({
                        success: true,
                        message: "Connexion réussie.",
                        token: token
                    });
                } else {
                    // Mot de passe incorrect
                    res.status(401).json({
                        success: false,
                        message: "Adresse e-mail ou mot de passe incorrect."
                    });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Une erreur est survenue lors de la connexion."
            });
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
            await pool.execute(
                "SELECT * FROM produit ORDER BY date_ajout DESC LIMIT 10"
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