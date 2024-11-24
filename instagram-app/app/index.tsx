import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
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

      <Button title="Login" onPress={handleLogin} color="#ab47bc" />

      {showWrongPassword && (
        <Text style={styles.errorMessage}>Wrong email and/or password</Text>
      )}

      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.registerText}>Create account here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "linear-gradient(to right, #8e44ad, #29b6f6)", // Usar un color similar
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  registerText: {
    color: "#29b6f6",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default Login;
