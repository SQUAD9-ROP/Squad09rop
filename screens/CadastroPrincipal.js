import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CadastroPrincipal({ navigation }) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cargo, setCargo] = useState("");
  const [unidade, setUnidade] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = () => {
    if (!nome || !matricula || !cargo || !unidade || !email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Cadastro realizado! Redirecionando...");
    navigation.navigate("MenuPrincipal");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>CADASTRO</Text>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo:"
              placeholderTextColor="#888888" 
              onChangeText={setNome}
              value={nome}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Matrícula/ID Funcional:"
              placeholderTextColor="#888888"
              onChangeText={setMatricula}
              value={matricula}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Cargo/Função:"
              placeholderTextColor="#888888"
              onChangeText={setCargo}
              value={cargo}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Unidade/Delegacia:"
              placeholderTextColor="#888888"
              onChangeText={setUnidade}
              value={unidade}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="E-mail Institucional:"
              placeholderTextColor="#888888"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Senha:"
              placeholderTextColor="#888888"
              onChangeText={setSenha}
              value={senha}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Próximo Passo</Text>
          </TouchableOpacity>

          <View style={styles.link}>
            <Text style={styles.linkText}>
              Já Tenho Conta /{" "}
              <Text
                style={styles.linkAnchor}
                onPress={() => navigation.navigate("Logindireto")}
              >
                Fazer Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  container: {
    maxWidth: 380,
    width: width * 0.95,
    backgroundColor: "#F8F8F8", 
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000000",
    textTransform: "uppercase",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#EFEFEF", 
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    color: "#000000",
    fontSize: 15,
  },
  btn: {
    width: "100%",
    backgroundColor: "#002366",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#555555", 
  },
  linkAnchor: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
