import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { ref, get, set, remove } from "firebase/database";
import { db } from "./firebase"; 
import { Ionicons } from '@expo/vector-icons'; 

export default function GestionClasesScreen() {
  const [clases, setClases] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [classData, setClassData] = useState({
    NomClase: '',
    Sala: '',
    Data: '',
    Hora: '',
    Entrenador: ''
  });

  const fetchData = async () => {
    const dbRef = ref(db, 'classes'); 
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedClasses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setClases(formattedClasses);
      } else {
        console.log("No hi han dades");
      }
    } catch (error) {
      console.error("Error intentant agafar les dades:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (classe) => {
    setEditingClass(classe.id);
    setClassData({
      NomClase: classe.NomClase,
      Sala: classe.Sala,
      Data: classe.Data,
      Hora: classe.Hora,
      Entrenador: classe.Entrenador
    });
  };

  const handleSave = async () => {
    const dbRef = ref(db, `classes/${editingClass}`);
    try {
      await set(dbRef, classData);
      setClases((prevClasses) =>
        prevClasses.map((classe) =>
          classe.id === editingClass ? { id: editingClass, ...classData } : classe
        )
      );
      setEditingClass(null);
      setClassData({ NomClase: '', Sala: '', Data: '', Hora: '', Entrenador: '' });
    } catch (error) {
      console.error("Error actualitzant les dades:", error);
    }
  };

  const handleCancel = () => {
    setEditingClass(null);
    setClassData({ NomClase: '', Sala: '', Data: '', Hora: '', Entrenador: '' });
  };

  const handleDelete = async (id) => {
    const dbRef = ref(db, `classes/${id}`);
    try {
      await remove(dbRef);
      setClases((prevClasses) => prevClasses.filter((classe) => classe.id !== id));
    } catch (error) {
      console.error("Error eliminant les dades:", error);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <ImageBackground source={require("../assets/images/gym2.jpg")} style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.refreshContainer}>
          <TouchableOpacity onPress={handleRefresh}>
            <Ionicons name="refresh" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.classesContainer}>
          {clases.map((classe) => (
            <View key={classe.id} style={styles.classItem}>
              <Image source={require("../assets/images/classesfoto.png")} style={styles.smallImage} />
              <View style={styles.textContainer}>
                {editingClass === classe.id ? (
                  <>
                    <View style={styles.inputRow}>
                      <Text style={styles.label}>Nom Clase:</Text>
                      <TextInput
                        style={styles.input}
                        value={classData.NomClase}
                        onChangeText={(text) => setClassData({ ...classData, NomClase: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.label}>Sala:</Text>
                      <TextInput
                        style={styles.input}
                        value={classData.Sala}
                        onChangeText={(text) => setClassData({ ...classData, Sala: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.label}>Data:</Text>
                      <TextInput
                        style={styles.input}
                        value={classData.Data}
                        onChangeText={(text) => setClassData({ ...classData, Data: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.label}>Hora:</Text>
                      <TextInput
                        style={styles.input}
                        value={classData.Hora}
                        onChangeText={(text) => setClassData({ ...classData, Hora: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.label}>Entrenador:</Text>
                      <TextInput
                        style={styles.input}
                        value={classData.Entrenador}
                        onChangeText={(text) => setClassData({ ...classData, Entrenador: text })}
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <View style={styles.button}>
                        <Button title="Guardar" onPress={handleSave} color="#4CAF50" />
                      </View>
                      <View style={styles.button}>
                        <Button title="Cancelar" onPress={handleCancel} color="#f44336" />
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.classInfo}>
                      Clase: {classe.NomClase} | Sala: {classe.Sala} | Data: {classe.Data} | Hora: {classe.Hora} | Entrenador: {classe.Entrenador}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <View style={styles.button}>
                        <Button title="Modificar" onPress={() => handleEdit(classe)} color="#2196F3" />
                      </View>
                      <View style={styles.button}>
                        <Button title="Eliminar" onPress={() => handleDelete(classe.id)} color="#f44336" />
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  refreshContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  classesContainer: {
    flex: 1,
    alignItems: "center", 
  },
  classItem: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    width: 100, 
    textAlign: 'right', 
    marginRight: 10,
  },
  input: {
    flex: 1, 
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", 
    width: "100%",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5, 
  },
  classInfo: {
    fontSize: 18, 
    textAlign: "center", 
    marginVertical: 10,
  },
});
