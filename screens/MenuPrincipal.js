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
export default function MenuPrincipal({ navigation }) {
  const iniciarNovoROP = () => {
    navigation.navigate("DadosDoFato");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={BrasaoImage} style={styles.brasao} />

        <Text style={styles.welcomeText}>Bem-vindo(a) ao ROP</Text>
        <Text style={styles.subtitle}>
          Seu cadastro foi concluído com sucesso.
        </Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={iniciarNovoROP}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Fazer Cadastro de Ocorrência</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Logindireto")}>
          <Text style={styles.logoutText}>Sair/Trocar Usuário</Text>
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
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 50,
    textAlign: "center",
  },
  actionButton: {
    width: "90%",
    maxWidth: 350,
    backgroundColor: "#002366",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
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
  logoutText: {
    color: "#777",
    fontSize: 14,
    marginTop: 20,
  },
});
