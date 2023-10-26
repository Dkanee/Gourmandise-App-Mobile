import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [motdepasse, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://asalomon.v70208.campus-centre.fr/api/login', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'moussagb43@gmail.com',
                    motdepasse: 'Kirua112.',
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data && data.success) {
                    // La connexion a réussi
                    console.log('Bien joué');
                } else {
                    // Gérez l'échec de la connexion, par exemple, affichez un message d'erreur.
                    console.error('Échec de la connexion');
                }
            } else {
                // Gérez les erreurs HTTP (par exemple, 401 Unauthorized, 500 Internal Server Error, etc.).
                console.error('Erreur HTTP lors de la connexion:', response.status);
            }
        } catch (error) {
            // Gérez les autres erreurs
            console.error('Erreur lors de la connexion :', error);
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre email"
            />
            <Text style={styles.label}>Mot de passe:</Text>
            <TextInput
                style={styles.input}
                value={motdepasse}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
            />
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
