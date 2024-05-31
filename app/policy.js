import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
export default function CreditsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Política de Privacitat</Text>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.text}>
  Aquesta declaració té com a finalitat informar els usuaris de la Política general de Privacitat i Protecció de Dades Personals seguida per OmDi Fitness SL. Aquesta Política de Privacitat podria variar segons les exigències legislatives o de autorregulació, per la qual cosa s'aconsella als usuaris que la visitin periòdicament. Serà aplicable en cas que els usuaris decideixin completar el formulari de registre com a clients o el formulari de contacte.{"\n\n"}
  En la nostra aplicació de gimnàs, recopilem i tractem dades personals amb l'objectiu de brindar un servei òptim i personalitzat. A continuació, es detalla la informació que incloem en la nostra política de privacitat:{"\n\n"}
  Finalitat de la recollida de les dades personals: Les dades personals que recopilem s'utilitzen per a gestionar l'accés a l'aplicació, oferir serveis específics (com a programes d'entrenament personalitzats) i millorar l'experiència de l'usuari.{"\n\n"}
  Legitimació per al tractament d'aquestes dades: La base legal per al tractament de dades és el consentiment de l'usuari en registrar-se en l'aplicació.{"\n\n"}
  Destinataris de les dades: Les dades personals s'utilitzen exclusivament dins de l'aplicació i no es comparteixen amb tercers sense el consentiment exprés de l'usuari.{"\n\n"}
  Període de conservació d'aquestes dades: Conservem les dades mentre l'usuari mantingui el seu compte actiu en l'aplicació. L'usuari pot sol·licitar l'eliminació de les seves dades en qualsevol moment.{"\n\n"}
  Drets dels interessats: Els usuaris tenen dret a accedir, rectificar, suprimir, limitar el tractament, sol·licitar la portabilitat i oposar-se al tractament de les seves dades personals. Poden exercir aquests drets a través dels mitjans de contacte proporcionats en l'aplicació.{"\n\n"}
  Consentiment específic: Sol·licitem el consentiment específic per a cada tipus de dada personal al qual l'aplicació accedeix (per exemple, dades de salut, preferències d'entrenament, etc.).{"\n\n"}
  Dades de menors i serveis de geolocalització: Si l'aplicació recopila dades de menors o utilitza serveis de geolocalització, s'informarà de manera clara i específica a l'usuari.{"\n\n"}
</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5aa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  }
});
