import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postDataApplicationJson } from "../app/shared/server";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showWrongPassword, setShowWrongPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    const loginData = { email, password };

    try {
      const { response, result } = await postDataApplicationJson("http://localhost:3001/api/auth/login", loginData);

      if (response && response.ok) {
        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("profileId", result._id);
        setShowWrongPassword(false);
        router.push("/feed");
      } else if (response && response.status === 401) {
        setShowWrongPassword(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegistration = () => {
    router.push("/register");
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
        <Text style={styles.logo}>fakestagram</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {showWrongPassword && (
        <Text style={styles.errorMessage}>Wrong email and/or password</Text>
      )}

      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.registerText}>Create account here</Text>
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#ff6b6b",
    marginTop: 10,
    fontSize: 14,
  },
  registerText: {
    color: "#29b6f6",
    textDecorationLine: "underline",
    marginTop: 20,
    fontSize: 14,
  },
});

export default Login;
