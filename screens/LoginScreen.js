import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://asalomon.v70208.campus-centre.fr/api/login', {
                email,
                password,
            });

            if (response.data && response.data.success) {
                // La connexion a réussi, imprimez "Bien joué"
                console.log('Bien joué');
            } else {
                // Gérez l'échec de la connexion, par exemple, affichez un message d'erreur.
                console.error('Échec de la connexion');
            }
        } catch (error) {
            // Gérez les erreurs réseau ou autres erreurs
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
                value={password}
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
