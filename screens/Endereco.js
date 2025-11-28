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
import { Picker } from "@react-native-picker/picker";

const cidades = ["Aracaju", "São Cristóvão", "Nossa Senhora do Socorro"];
const bairrosPorCidade = {
  Aracaju: [
    "Centro",
    "Jardins",
    "Atalaia",
    "13 de Julho",
    "Aeroporto",
    "América",
    "Aruana",
    "Bugio",
    "Capucho",
    "Castelo Branco",
    "Cidade Nova",
    "Cirurgia",
    "Coroa do Meio",
    "Dezoito do Forte",
    "Farolândia",
    "Getúlio Vargas",
    "Grageru",
    "Industrial",
    "Jabotiana",
    "Japãozinho",
    "Jardim Centenário",
    "José Conrado de Araújo",
    "Lamarão",
    "Luzia",
    "Novo Paraíso",
    "Olaria",
    "Palestina",
    "Pereira Lobo",
    "Ponto Novo",
    "Porto Dantas",
    "Salgado Filho",
    "Santa Maria",
    "Santo Antônio",
    "Santos Dumont",
    "São Conrado",
    "São Josê",
    "Siqueira Campos",
    "Soledade",
    "Suíssa",
    "Zona de Expansão",
  ],
  "São Cristóvão": [
    "Centro (SC)",
    "Rosa Elze",
    "Jardim Rosa Elze",
    "Conjunto Brigadeiro Eduardo Gomes",
    "Conjunto Luiz Alves",
    "Loteamento Tijuquinha",
    "Jardim Universitário",
    "Madalena de Góis",
    "Marcelo Déda",
    "São Gonçalo",
    "Lauro Rocha",
    "José Batalha de Góis",
  ],
  "Nossa Senhora do Socorro": [
    "Conj. João Alves",
    "Taiçoca",
    "Centro Histórico",
    "Conjunto Marcos Freire I, II e III",
    "Conjunto Jardim",
    "Conjunto Augusto Franco",
    "São Brás",
    "Distrito Industrial de Socorro",
  ],
};

const COLORS = {
  BACKGROUND: "#FFFFFF",
  TEXT: "#000000",
  SUB_TEXT: "#777777",
  CARD: "#F0F0F0",
  PRIMARY: "#002366",
  BUTTON_TEXT: "#FFFFFF",
};

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

  const handleCidadeChange = (itemValue) => {
    setCidade(itemValue);
    setBairro("");
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

          {/* Contato e Email */}
          <Text style={styles.label}>Contato *</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone ou celular"
            placeholderTextColor={COLORS.SUB_TEXT}
            keyboardType="phone-pad"
            value={contato}
            onChangeText={setContato}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            placeholderTextColor={COLORS.SUB_TEXT}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* CEP */}
          <Text style={styles.label}>CEP *</Text>
          <TextInput
            style={styles.input}
            placeholder="00000000"
            placeholderTextColor={COLORS.SUB_TEXT}
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={setCep}
          />

          {/* Logradouro e Número */}
          <Text style={styles.label}>Logradouro *</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, Avenida..."
            placeholderTextColor={COLORS.SUB_TEXT}
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <Text style={styles.label}>Número *</Text>
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor={COLORS.SUB_TEXT}
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
          />
          <Text style={styles.label}>Complemento *</Text>
          <TextInput
            style={styles.input}
            placeholder="Apartamento, bloco..."
            placeholderTextColor={COLORS.SUB_TEXT}
            value={complemento}
            onChangeText={setComplemento}
          />

          {/* CIDADE (Lista Suspensa) */}
          <Text style={styles.label}>Cidade *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={cidade}
              onValueChange={handleCidadeChange}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                { color: cidade ? COLORS.TEXT : COLORS.SUB_TEXT },
              ]}
            >
              <Picker.Item
                label="Selecione a Cidade..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              {cidades.map((cidade, index) => (
                <Picker.Item
                  key={index}
                  label={cidade}
                  value={cidade}
                  color={COLORS.TEXT}
                />
              ))}
            </Picker>
          </View>

          {/* BAIRRO (Lista Suspensa Dependente) */}
          <Text style={styles.label}>Bairro *</Text>
          <View
            style={[styles.pickerContainer, !cidade && styles.pickerDisabled]}
          >
            <Picker
              selectedValue={bairro}
              onValueChange={(itemValue) => setBairro(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                { color: bairro ? COLORS.TEXT : COLORS.SUB_TEXT },
              ]}
              enabled={!!cidade}
            >
              <Picker.Item
                label={
                  cidade
                    ? "Selecione o Bairro..."
                    : "Selecione a Cidade primeiro"
                }
                value=""
                color={COLORS.SUB_TEXT}
              />
              {cidade &&
                bairrosPorCidade[cidade]?.map((bairro, index) => (
                  <Picker.Item
                    key={index}
                    label={bairro}
                    value={bairro}
                    color={COLORS.TEXT}
                  />
                ))}
            </Picker>
          </View>

          {/* Botão de Navegação */}
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
    backgroundColor: COLORS.BACKGROUND,
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
    color: COLORS.TEXT,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SUB_TEXT,
    paddingBottom: 10,
  },
  label: {
    color: COLORS.TEXT,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: COLORS.CARD,
    color: COLORS.TEXT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: COLORS.CARD,
    borderRadius: 10,
    marginBottom: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#CCC",
    overflow: "hidden",
  },
  picker: {
    color: COLORS.TEXT,
    backgroundColor: "transparent",
    fontSize: 16,
    height: 55,
    width: "100%",
  },
  pickerDisabled: {
    backgroundColor: "#EBEBEB",
    borderColor: COLORS.SUB_TEXT,
  },
  buttonRolavel: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});

