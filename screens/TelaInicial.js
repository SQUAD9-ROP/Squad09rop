import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const BrasaoImage = require("../assets/Brasao_PM.png");

export default function TelaInicial({ navigation }) {
  const handleAvancar = () => {
    navigation.navigate("Logindireto");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={BrasaoImage} style={styles.brasao} />

        <Text style={styles.appName}>ROP</Text>
        <Text style={styles.appSubtitle}>Registro de Ocorrência Policial</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAvancar}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  brasao: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#002366",
    marginBottom: 5,
    textAlign: "center",
  },
  appSubtitle: {
    fontSize: 18,
    color: "#777",
    marginBottom: 50,
    textAlign: "center",
  },
  actionButton: {
    width: "90%",
    maxWidth: 350,
    backgroundColor: "#002366",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
