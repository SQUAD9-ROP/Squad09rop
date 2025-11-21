import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";

export default function Endereco({ navigation, route }) {
  const dadosAnteriores = route.params || {};
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const handleNext = () => {
    if (
      !contato ||
      !cep ||
      !logradouro ||
      !numero ||
      !complemento ||
      !bairro ||
      !cidade
    ) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos obrigatórios (*): Contato, CEP, Logradouro, Número, Complemento, Bairro e Cidade."
      );
      console.log("ERRO: Validação falhou, mostrando alerta.");
      return;
    }

    const dadosDestaTela = {
      contato,
      email,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
    };

    const todosOsDadosAcumulados = {
      ...dadosAnteriores,
      endereco: dadosDestaTela,
    };

    navigation.navigate("Caracteristicas", todosOsDadosAcumulados);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>1. Informações de Endereço</Text>
          <Text style={styles.label}>Contato *</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone ou celular"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={contato}
            onChangeText={setContato}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>CEP *</Text>
          <TextInput
            style={styles.input}
            placeholder="00000000"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={setCep}
          />
          <Text style={styles.label}>Logradouro *</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, Avenida..."
            placeholderTextColor="#999"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <Text style={styles.label}>Número *</Text>
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
          />
          <Text style={styles.label}>Complemento *</Text>
          <TextInput
            style={styles.input}
            placeholder="Apartamento, bloco..."
            placeholderTextColor="#999"
            value={complemento}
            onChangeText={setComplemento}
          />
          <Text style={styles.label}>Bairro *</Text>
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#999"
            value={bairro}
            onChangeText={setBairro}
          />
          <Text style={styles.label}>Cidade *</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#999"
            value={cidade}
            onChangeText={setCidade}
          />
          <TouchableOpacity style={styles.buttonRolavel} onPress={handleNext}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fullScreen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#000000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F0F0F0",
    color: "#000000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  buttonRolavel: {
    backgroundColor: "#002366",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
