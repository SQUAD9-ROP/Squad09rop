import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Picker } from "@react-native-picker/picker";

const COLORS = {
  BACKGROUND: "#FFFFFF",
  CARD: "#F0F0F0",
  TEXT: "#000000",
  SUB_TEXT: "#777777",
  PRIMARY: "#002366",
  BUTTON_TEXT: "#FFFFFF",
};

export default function DadosPessoais({ navigation, route }) {
  const dadosAnteriores = route.params || {};
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoEnvolvido, setTipoEnvolvido] = useState("");
  const [sexo, setSexo] = useState("");
  const [condicaoFisica, setCondicaoFisica] = useState("");
  const [usoAlgema, setUsoAlgema] = useState("");
  const [nacionalidade, setNacionalidade] = useState("BRASILEIRO");

  const handleNext = () => {
    if (!nome.trim() || !cpf.trim() || !dataNascimento.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha Nome, CPF e Data de Nascimento antes de continuar."
      );
      return;
    }

    const dadosDestaTela = {
      tipoEnvolvido,
      cpf,
      nomeCompleto: nome,
      dataNascimento,
      sexo,
      condicaoFisica,
      usoAlgema,
      nacionalidade,
      rg: "RG_AQUI",
      mae: "NOME_MAE_AQUI",
      pai: "NOME_PAI_AQUI",
      apelido: "APELIDO_AQUI",
    };

    const todosOsDadosAcumulados = {
      ...dadosAnteriores,
      dadosPessoais: dadosDestaTela,
    };

    navigation.navigate("Endereco", todosOsDadosAcumulados);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: COLORS.BACKGROUND }]}
    >
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.sectionTitle, { color: COLORS.TEXT }]}>
            Dados Pessoais
          </Text>
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Tipo de Envolvido*
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: COLORS.CARD, borderColor: COLORS.SUB_TEXT },
            ]}
          >
            <Picker
              selectedValue={tipoEnvolvido}
              onValueChange={(itemValue) => setTipoEnvolvido(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                {
                  color: tipoEnvolvido ? COLORS.TEXT : COLORS.SUB_TEXT,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item
                label="Selecione..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              <Picker.Item label="Autor" value="autor" color={COLORS.TEXT} />
              <Picker.Item label="Vítima" value="vitima" color={COLORS.TEXT} />
              <Picker.Item
                label="Testemunha"
                value="testemunha"
                color={COLORS.TEXT}
              />
              <Picker.Item
                label="Abordado"
                value="abordado"
                color={COLORS.TEXT}
              />
              <Picker.Item label="Outro" value="outro" color={COLORS.TEXT} />
            </Picker>
          </View>
          <Text style={[styles.label, { color: COLORS.TEXT }]}>CPF*</Text>
          <MaskedTextInput
            mask="999.999.999-99"
            onChangeText={(text) => setCpf(text)}
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            keyboardType="numeric"
            placeholder="000.000.000-00"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={cpf}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Nome Completo*
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            placeholder="Digite o nome completo"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={nome}
            onChangeText={setNome}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>RG</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            placeholder="RG"
            placeholderTextColor={COLORS.SUB_TEXT}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Data de Nascimento*
          </Text>
          <MaskedTextInput
            mask="99/99/9999"
            onChangeText={(text) => setDataNascimento(text)}
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={dataNascimento}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>Mãe</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            placeholder="Nome da Mãe"
            placeholderTextColor={COLORS.SUB_TEXT}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>Pai</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            placeholder="Nome do Pai"
            placeholderTextColor={COLORS.SUB_TEXT}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>Sexo*</Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: COLORS.CARD, borderColor: COLORS.SUB_TEXT },
            ]}
          >
            <Picker
              selectedValue={sexo}
              onValueChange={(itemValue) => setSexo(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                {
                  color: sexo ? COLORS.TEXT : COLORS.SUB_TEXT,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item
                label="Selecione..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              <Picker.Item
                label="Masculino"
                value="masculino"
                color={COLORS.TEXT}
              />
              <Picker.Item
                label="Feminino"
                value="feminino"
                color={COLORS.TEXT}
              />
              <Picker.Item label="Outro" value="outro" color={COLORS.TEXT} />
            </Picker>
          </View>
          <Text style={[styles.label, { color: COLORS.TEXT }]}>Apelido</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: COLORS.CARD,
                color: COLORS.TEXT,
                borderColor: COLORS.SUB_TEXT,
              },
            ]}
            placeholder="Apelido"
            placeholderTextColor={COLORS.SUB_TEXT}
          />
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Condição Física
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: COLORS.CARD, borderColor: COLORS.SUB_TEXT },
            ]}
          >
            <Picker
              selectedValue={condicaoFisica}
              onValueChange={(itemValue) => setCondicaoFisica(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                {
                  color: condicaoFisica ? COLORS.TEXT : COLORS.SUB_TEXT,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item
                label="Selecione..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              <Picker.Item
                label="Sem ferimentos"
                value="semFerimentos"
                color={COLORS.TEXT}
              />
              <Picker.Item
                label="Ferimentos leves"
                value="ferimentosLeves"
                color={COLORS.TEXT}
              />
              <Picker.Item
                label="Ferimentos graves"
                value="ferimentosGraves"
                color={COLORS.TEXT}
              />
            </Picker>
          </View>
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Houve uso de algema?
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: COLORS.CARD, borderColor: COLORS.SUB_TEXT },
            ]}
          >
            <Picker
              selectedValue={usoAlgema}
              onValueChange={(itemValue) => setUsoAlgema(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                {
                  color: usoAlgema ? COLORS.TEXT : COLORS.SUB_TEXT,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item
                label="Selecione..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              <Picker.Item label="Sim" value="sim" color={COLORS.TEXT} />
              <Picker.Item label="Não" value="nao" color={COLORS.TEXT} />
            </Picker>
          </View>
          <Text style={[styles.label, { color: COLORS.TEXT }]}>
            Nacionalidade
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: COLORS.CARD, borderColor: COLORS.SUB_TEXT },
            ]}
          >
            <Picker
              selectedValue={nacionalidade}
              onValueChange={(itemValue) => setNacionalidade(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                {
                  color: nacionalidade ? COLORS.TEXT : COLORS.SUB_TEXT,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item
                label="BRASILEIRO"
                value="BRASILEIRO"
                color={COLORS.TEXT}
              />
              <Picker.Item
                label="ESTRANGEIRO"
                value="ESTRANGEIRO"
                color={COLORS.TEXT}
              />
              <Picker.Item label="Outro" value="OUTRO" color={COLORS.TEXT} />
            </Picker>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.PRIMARY }]}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { color: COLORS.BUTTON_TEXT }]}>
              Próximo
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 10,
    marginBottom: 15,
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
  },
  picker: {
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
