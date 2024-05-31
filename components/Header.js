import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeTabs")}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 15,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#5aa",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
