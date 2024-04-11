import React, {useCallback, useEffect, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
    Alert,
} from "react-native";
import { styles } from "../styles/AppStyles";
import {Entypo} from "@expo/vector-icons";
import {Label} from "flowbite-react";


export default function Createacc({ navigation }) {
    const TOTAL_STEPS = 2;
    const [currentStep, setCurrentStep] = useState(1);
    const [focusedField, setFocusedField] = useState(null);
    const [nom, setNom] = useState(""); // État pour le nom
    const [adresse, setAdresse] = useState(""); // État pour l'adresse
    const [cp, setCp] = useState(""); // État pour le code postal
    const [ville, setVille] = useState(""); // État pour la ville
    const [telephone, setTelephone] = useState(""); // État pour le téléphone
    const [email, setEmail] = useState(""); // État pour l'email
    const [motdepasse, setPassword] = useState(""); // État pour le mot de passe
    const [modalVisible, setModalVisible] = useState(false); // État pour la visibilité de la modale
    const [passwordVisible, setPasswordVisible] = useState(false);
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    const cpRegex = /^\d{5}$/;


    // const validateNom = (nom) => {
    //     const isValid = nom.trim() !== "" && nameRegex.test(nom);
    //     setFieldValidity(prev => ({...prev, nom: isValid}));
    //     return isValid;
    // };


    const [fieldValidity, setFieldValidity] = useState({
        nom: false,
        adresse: false,
        cp: false,
        ville: false,
    });

    // const calculateProgress = () => {
    //     let progressPerStep = 100 / TOTAL_STEPS; // La progression totale divisée par le nombre d'étapes
    //     let progressWithinStep = 0;
    //
    //     if(currentStep === 1) {
    //         let filledFields = 0;
    //         if(nom.trim() !== "" && nameRegex.test(nom)) filledFields++;
    //         if(adresse.trim() !== "") filledFields++;
    //         if(cp.trim() !== "" && cpRegex.test(cp)) filledFields++;
    //         if(ville.trim() !== "") filledFields++;
    //
    //         // Calculez la progression dans l'étape actuelle
    //         let fieldsPerStep = 4; // Nombre de champs dans l'étape 1
    //         progressWithinStep = (filledFields / fieldsPerStep) * progressPerStep;
    //     }
    //
    //     if(currentStep === 2) {
    //         let filledFields = 0;
    //         if(telephone.trim() !== "") filledFields++;
    //         // if(email.trim() !== "" && emailRegex.test(nom)) filledFields++;
    //         if(email.trim() !== "" ) filledFields++;
    //         if(emailRegex.test(email)) filledFields++;
    //         if(motdepasse.trim() !== "") filledFields++;
    //
    //         if(telephone.trim() !== "" && (email.trim() !== "" ) && (emailRegex.test(email)) && (motdepasse.trim() !== ""){
    //
    //         }
    //
    //
    //         // Calculez la progression dans l'étape actuelle
    //         let fieldsPerStep = 4; // Nombre de champs dans l'étape 1
    //         progressWithinStep = (filledFields / fieldsPerStep) * progressPerStep;
    //     }
    //
    //     // Calculez la progression totale
    //     return ((currentStep - 1) * progressPerStep) + progressWithinStep;
    // };

    const calculateProgress = () => {
        let progressPerStep = 100 / TOTAL_STEPS; // La progression totale divisée par le nombre d'étapes
        let progressWithinStep = 0;

        if (currentStep === 1) {
            let filledFields = 0;
            if (nom.trim() !== "" && nameRegex.test(nom)) filledFields++;
            if (adresse.trim() !== "") filledFields++;
            if (cp.trim() !== "" && cpRegex.test(cp)) filledFields++;
            if (ville.trim() !== "") filledFields++;

            // Calculez la progression dans l'étape actuelle
            let fieldsPerStep = 4; // Nombre de champs dans l'étape 1
            progressWithinStep = (filledFields / fieldsPerStep) * progressPerStep;
        }

        if (currentStep === 2) {
            let filledFields = 0;
            if (telephone.trim() !== "") filledFields++;
            if (email.trim() !== "" && emailRegex.test(email)) filledFields++;
            if (motdepasse.trim() !== "") filledFields++;

            // Si tous les champs sont remplis, la progression est de 100%
            if (filledFields === 3) {
                progressWithinStep = progressPerStep;
            } else {
                // Calculez la progression dans l'étape actuelle
                let fieldsPerStep = 3; // Nombre de champs dans l'étape 2
                progressWithinStep = (filledFields / fieldsPerStep) * progressPerStep;
            }
        }

        // Calculez la progression totale
        return ((currentStep - 1) * progressPerStep) + progressWithinStep;
    };
    const ProgressBar = ({progress}) => {
        return (
            <View style={localStyles.progressBarContainer}>
                <View style={[localStyles.progressBar, {width: `${progress}%`}]} />
            </View>
        );
    };

    function validateStepOne() {
        let isValid = true; // Partons du principe que tout est valide initialement

        if (!nom.trim() || !nameRegex.test(nom)) isValid = false;
        if (!adresse.trim()) isValid = false;
        if (!cp.trim() || !cpRegex.test(cp)) {
            isValid = false;
            Alert.alert("Erreur", "Format de code postal invalide.");
        }


        if (!ville.trim()) isValid = false;

        // Retourne vrai si tous les champs sont valides, sinon faux
        return isValid;
    }

    function validateStepTwo() {
        let isValid = true; // Partons du principe que tout est valide initialement

        if (!telephone.trim()) isValid = false;
        if (!email.trim()) isValid = false;
        if (!cp.trim() || !cpRegex.test(cp)) {
            isValid = false;
            Alert.alert("Erreur", "Format de code postal invalide.");
        }

        if (!email.trim() || !emailRegex.test(email)) {
            isValid = false;
            Alert.alert("Erreur", "Format d'adresse mail invalide.");
        }


        if (!ville.trim()) isValid = false;

        // Retourne vrai si tous les champs sont valides, sinon faux
        return isValid;
    }



    useEffect(() => {
        const validFieldsCount = Object.values(fieldValidity).filter(isValid => isValid).length;
        const totalFields = Object.keys(fieldValidity).length;
        const progress = (validFieldsCount / totalFields) * 100;

        // Mettez à jour la progression de la barre ici
        // Note : Vous devrez ajuster cette partie en fonction de la façon dont vous avez implémenté la barre de progression.
        // Par exemple, si vous utilisez un état pour la progression, vous pouvez le mettre à jour ici.
        ProgressBar(progress);
    }, [fieldValidity]);



    const goToNextStep = () => {
        let validationPassed = false;

        switch (currentStep) {
            case 1:
                validationPassed = validateStepOne();
                break;
            // Ajoutez des cas pour d'autres étapes avec leurs fonctions de validation respectives
            default:
                validationPassed = true; // Considérez la validation comme réussie par défaut
                break;
        }

        if (validationPassed) {
            setFocusedField(null); // Réinitialise l'état de focus
            setCurrentStep(current => current + 1); // Passez à l'étape suivante
        }

    };


    const goToPreviousStep = () => {
        setFocusedField(null); // Réinitialise l'état de focus
        setCurrentStep(current => current - 1);
    };


    // const validateEmail = useCallback((email) => {
    //     if (!emailRegex.test(email)) {
    //         Alert.alert("Erreur", "Format d'email invalide.");
    //     }
    // }, []);

    const createAccount = async () => {
        let validationPassed = false;

        if (currentStep === 1) {
            validationPassed = validateStepOne();
            if (!validationPassed) {
                Alert.alert("Validation", "Veuillez compléter correctement tous les champs de l'étape 1.");
                return false; // Empêche de continuer si la validation échoue
            }
        } else if (currentStep === 2) {
            validationPassed = validateStepTwo();
            if (!validationPassed) {
                return false; // Empêche de continuer si la validation échoue
            }

            // Si nous sommes ici, cela signifie que la validation a réussi pour l'étape 2
            try {
                const response = await fetch(
                    "https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/register", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            nom,
                            adresse,
                            cp,
                            ville,
                            telephone,
                            email,
                            motdepasse,
                        }),
                    }
                );

                if (response.status === 201) {

                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                        navigation.navigate('Se connecter');
                    }, 2000);
                } else {
                    Alert.alert("Erreur", "Échec de la création de compte.");
                }
            } catch (error) {
                Alert.alert("Erreur", "Une erreur est survenue lors de la création du compte.");
            }
        }
    };

    const progress = calculateProgress();

    return (


        <SafeAreaView style={styles.container}>

            <View>
                <ProgressBar progress={progress} />
            </View>

            <Image source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }} style={[styles.logo]} />


            {currentStep===1 && (
                <>
                    <Text style={[styles.label, { color: "black"  }]}>Nom:</Text>
                <TextInput style={[styles.input, focusedField === 'nom' ? localStyles.focusedInput : {}]}
                           onFocus={() => setFocusedField('nom')}
                           onBlur={() => setFocusedField(null)}
            value={nom}
                           onChangeText={(text) => {
                               setNom(text);
                           }}
            placeholder="Entrez votre nom complet"
            placeholderTextColor="grey" />

    <Text style={[styles.label, { color: "black" }]}>Adresse:</Text>
    <TextInput  style={[styles.input, focusedField === 'adresse' ? localStyles.focusedInput : {}]}
                onFocus={() => setFocusedField('adresse')}
                onBlur={() => setFocusedField(null)}
               value={adresse}
               onChangeText={setAdresse}
               placeholder="Entrez votre adresse"
               placeholderTextColor="grey" />

    <Text style={[styles.label, { color: "black" }]}>Code Postal:</Text>
    <TextInput
        style={[styles.input, focusedField === 'cp' ? localStyles.focusedInput : {}]}
        onFocus={() => setFocusedField('cp')}
        onBlur={() => setFocusedField(null)}
        keyboardType={"number-pad"}
        value={cp}
        onChangeText={setCp}
        placeholder="Entrez votre code postal"
        placeholderTextColor="grey" />

    <Text style={[styles.label, { color: "black" }]}>Ville:</Text>
    <TextInput
        style={[styles.input, focusedField === 'ville' ? localStyles.focusedInput : {}]}
        onFocus={() => setFocusedField('ville')}
        onBlur={() => setFocusedField(null)}
        value={ville}
        onChangeText={setVille}
        placeholder="Entrez votre ville"
        placeholderTextColor="grey" />
                <Button title="Suivant" onPress={goToNextStep} color="#7B3F00" />
                    <TouchableOpacity onPress={() => navigation.navigate('Se connecter')}>
                        <Text style={{ color: '#007AFF', textDecorationLine: 'underline', marginTop: 10, marginBottom: 20 }}>
                            Vous avez déjà un compte ?
                        </Text>
                    </TouchableOpacity>
                </>

            )}


            {currentStep === 2 && (
                <>
            <Text style={[styles.label, { color: "black" }]}>Téléphone:</Text>
            <TextInput
                style={[styles.input, focusedField === 'telephone' ? localStyles.focusedInput : {}]}
                onFocus={() => setFocusedField('telephone')}
                onBlur={() => setFocusedField(null)}
                keyboardType={"phone-pad"}
                value={telephone}
                onChangeText={setTelephone}
                placeholder="Entrez votre n° de téléphone"
                placeholderTextColor="grey" />

            <Text style={[styles.label, { color: "black" }]}>Email:</Text>
            <TextInput
                style={[styles.input, focusedField === 'email' ? localStyles.focusedInput : {}]}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                keyboardType={"email-address"}
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                }}
                placeholder="Entrez votre email"
                placeholderTextColor="grey" />

            <Text style={[styles.label, { color: "black", textAlign: 'left' }]}>Mot de passe:</Text>

            <View style={localStyles.passwordContainer}>
                <TextInput
                    style={[styles.input, focusedField === 'motdepasse' ? localStyles.focusedInput : {}]}
                    onFocus={() => setFocusedField('motdepasse')}
                    onBlur={() => setFocusedField(null)}
                    value={motdepasse}
                    onChangeText={setPassword}
                    placeholder="Entrez votre mot de passe"
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor="grey"
                />

            <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={localStyles.visibilityToggle}
                >
                    <Entypo styles name={passwordVisible ? "eye" : "eye-with-line"} size={24} color="grey" />
                </TouchableOpacity>
            </View>

                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Se connecter')}>
                            <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>
                                Vous avez déjà un compte ?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Button title="Précédent" onPress={goToPreviousStep} color="#7B3F00" />
                    </View>
                    <View style={{ marginVertical: 2 }}>
                        <Button title="Créer compte" onPress={createAccount} color="#7B3F00"/>
                    </View>
                </>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={localStyles.centeredView}>
                    <View style={localStyles.modalView}>
                        <Text style={localStyles.modalText}>Compte créé avec succès !</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// Styles pour la modale, intégrés directement pour éviter les crsmts°
const localStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginVertical: 10,
        position: 'relative', // Ajoutez ceci pour permettre le positionnement absolu de l'icône
        // paddingRight: 40, // Assurez-vous d'avoir suffisamment d'espace pour l'icône
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        // Vous pourriez ne pas avoir besoin de paddingRight ici si vous utilisez paddingRight dans le conteneur
    },

    visibilityToggle: {
        position: 'absolute', // Cela permet de placer l'icône au-dessus du conteneur
        right: -40, // Ajustez cela selon la marge que vous voulez avoir entre l'icône et le bord droit du conteneur
        height: '100%', // Assure que le TouchableOpacity remplit le conteneur pour un toucher facile
        padding: 9, // Ajustez le touchable area autour de l'icône

    },
    focusedInput: {
        borderColor: '#4C4CFF',
        borderBottomWidth:2.7,
        borderWidth:1.9,    },
    progressBarContainer: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignSelf: 'flex-start',

    },
});
