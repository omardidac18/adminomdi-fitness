import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ref, push } from 'firebase/database';
import { Picker } from '@react-native-picker/picker';

import { db } from './firebase'; 

export default function AdminHomeScreen() {
  const [nom, setNom] = useState("");
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState("");
  const [monitor, setMonitor] = useState("");
  const [sala, setSala] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hours, setHours] = useState(Array.from({length: 13}, (_, i) => `${i + 8}:00`));

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(false);
    setData(currentDate);
  };

  const handleRegister = async () => {
    if (nom === "" || !data || hora === "" || monitor === "" || sala === "") {
      Alert.alert("Error", "Tots els camps són obligatoris.");
    } else {
      try {
        const dbRef = ref(db, 'classes');
        push(dbRef, {
          NomClase: nom,
          Sala: sala,
          Data: data.toLocaleDateString('en-GB'),
          Hora: hora,
          Entrenador: monitor,
        });
        Alert.alert("Classe creada", "La classe ha estat creada amb èxit!");
        setNom("");
        setData(new Date());
        setHora("");
        setMonitor("");
        setSala("");
      } catch (e) {
        Alert.alert("Error", "Hi ha hagut un error creant la classe.");
      }
    }
  };

  return (
    <ImageBackground source={require("../assets/images/gym2.jpg")} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Crear una classe</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom Classe"
        placeholderTextColor="#aaa"
        value={nom}
        onChangeText={setNom}
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{data.toLocaleDateString('en-GB')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={data}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.input}>
        <Picker
          selectedValue={hora}
          onValueChange={(itemValue) => setHora(itemValue)}
        >
          {hours.map((hour, index) => (
            <Picker.Item key={index} label={hour} value={hour} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Monitor"
        placeholderTextColor="#aaa"
        value={monitor}
        onChangeText={setMonitor}
      />
      <TextInput
        style={styles.input}
        placeholder="Sala"
        placeholderTextColor="#aaa"
        value={sala}
        onChangeText={setSala}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "80%",
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    opacity: 0.8,
  },
  button: {
    width: "80%",
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