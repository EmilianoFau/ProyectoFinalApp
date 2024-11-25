import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, Stack } from "expo-router";
import { postDataApplicationJson } from "../app/shared/server";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please, fill in all the fields.');
            return;
        }

        const newUser = {
            username,
            email,
            password
        };

        try {
            const { response, result } = await postDataApplicationJson(
                'http://localhost:3001/api/auth/register',
                newUser
            );

            if (response?.ok) {
                Alert.alert('Success', 'User successfully registered.');
                setTimeout(() => {
                    router.push('/'); 
                }, 1000);
            } else {
                const errorMessage = result?.message || 'Error in user registration.';
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            Alert.alert('Error', 'Registration unsuccessful. Try again.');
            console.error("Registration error:", error);
        }
    };

    const handleCancel = () => {
        router.push("/"); 
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
        <Stack.Screen
            options={{
            headerShown: false,
            }}
        />
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>User Registration</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#1c1c1c",
      },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: "center",
    },
    logo: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#2c2c2c",
        borderRadius: 8,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#444",
    },
    button: {
        backgroundColor: "#ab47bc",
        padding: 15,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: "#960019",
        padding: 15,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Register;