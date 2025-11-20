import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
const BrasaoImage = require("../assets/Brasao_PM.png");

export default function Logindireto({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (email && senha) {
      Alert.alert("Sucesso", "Login efetuado! Redirecionando para o Menu.");
      navigation.navigate("MenuPrincipal");
    } else {
      Alert.alert("Erro", "Preencha todos os campos para fazer login.");
    }
  };
  const handleGoToCadastro = () => {
    navigation.navigate("CadastroPrincipal");
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <Image source={BrasaoImage} style={styles.brasaoIcon} />
          <Text style={styles.pageTitle}>Acessar Sua Conta</Text>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail cadastrado"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToCadastro}>
            <Text style={styles.linkText}>
              Não tem conta?{" "}
              <Text style={styles.linkHighlight}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  brasaoIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
  },
  pageTitle: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    color: "#000000",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#F0F0F0",
    color: "#000000",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#002366",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#777",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
  },
  linkHighlight: {
    color: "#002366",
    fontWeight: "bold",
  },
});
