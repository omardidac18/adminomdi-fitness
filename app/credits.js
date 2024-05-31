import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../components/Header";

export default function CreditsScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Crédits</Text>
      <View style={styles.creditsContainer}>
        <Text style={styles.descriptionText}>
        La idea d'aquesta aplicació de gestió de reserves per a gimnasos va sorgir entre companys de classe. Observem que molts gimnasos encara utilitzen mètodes tradicionals per a gestionar les seves reserves, causant ineficiències i frustracions. Inspirats pel nostre amor per l'exercici i la tecnologia, decidim crear una solució moderna i accessible.    </Text>
        <Text style={styles.descriptionText}>     
        El nostre objectiu va ser simplificar el procés de reserva, permetent als usuaris gestionar les seves sessions d'entrenament de manera ràpida i senzilla. Al llarg del desenvolupament, vam aprendre a treballar en equip, a superar desafiaments tècnics i a incorporar funcionalitats útils.     </Text>
        <Text style={styles.descriptionText}>
        Estem orgullosos del resultat i esperem que la nostra aplicació faciliti la vida de molts usuaris i contribueixi a una experiència de gimnàs més organitzada i agradable. Agraïm als nostres mentors i companys pel seu suport i esperem continuar innovant.</Text>
        <Text style={styles.creditsText}>Didac i Omar</Text>
      </View>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>© 2024 - OmDi Fitness</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5aa",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  creditsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  creditsText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  copyrightContainer: {
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 14,
    color: "#111",
  },
});
