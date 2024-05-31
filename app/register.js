import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableOpacity, ImageBackground, Platform, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth } from './firebase';
import { getFirestore, setDoc, doc } from '@firebase/firestore';
import { createUserWithEmailAndPassword } from '@firebase/auth';

const firestore = getFirestore();

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = () => {
    if (username === "" || password === "" || email === "") {
      Alert.alert("Error", "Tots els camps són obligatoris.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            username,
            birthdate: birthdate.toISOString().split('T')[0],
          };
          setDoc(doc(firestore, "users", user.uid), userData)
            .then(() => {
              Alert.alert("Registre Exitos", "T'has registrat!");
              navigation.navigate("HomeTabs");
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
            });
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <ImageBackground source={require("../assets/images/gym.jpg")} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Inici")}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Registrar-se</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom i Cognoms"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>{birthdate.toDateString()}</Text>
          <Button onPress={showDatepicker} title="Selecciona la teva data de naixement" />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar-se</Text>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 30,
    color: "#fff",
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
  datePickerContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
});
