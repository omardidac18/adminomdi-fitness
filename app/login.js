import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableOpacity, ImageBackground } from "react-native";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from './firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Tots els camps són obligatoris.");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if (user.uid === "cwnUq8ygT4ZBsE7nimzIPcFEJcf2") {
            Alert.alert("Login Correcte", "Benvingut/da!");
            navigation.navigate("HomeTabs");
          } else {
            Alert.alert("Accés Denegat", "No tens permís per accedir a aquesta aplicació.");
          }
        })
        .catch((error) => {
          Alert.alert("Login Fallit", "Email o contrasenya incorrectes.");
        });
    }
  };

  return (
    <ImageBackground source={require("../assets/images/gym.jpg")} style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sessió</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasenya"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sessió</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    opacity: 0.8,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F65171",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
