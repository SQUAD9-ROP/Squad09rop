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
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";

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
    "Jardins",
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
const tiposRop = ["Prisão em Flagrante", "Ocorrência Simples", "Apoio"];
const eventos = ["Blitz", "Patrulhamento", "Mandado de Busca"];

const COLORS = {
  BACKGROUND: "#FFFFFF", 
  TEXT: "#000000", 
  SUB_TEXT: "#777777", 
  CARD: "#F0F0F0", 
  PRIMARY: "#002366", 
  BUTTON_TEXT: "#FFFFFF",
  SWITCH_TRACK_ON: "#002366", 
  SWITCH_TRACK_OFF: "#CCC",
  SWITCH_THUMB: "#FFFFFF", 
};

export default function DadosDoFato({ navigation, route }) {
  
  const dadosAnteriores = route.params || {};

  const [tipoRop, setTipoRop] = useState("");
  const [evento, setEvento] = useState("");
  const [numAtendimento, setNumAtendimento] = useState("");
  const [destino, setDestino] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [referencia, setReferencia] = useState("");
  const [dataFato, setDataFato] = useState("");
  const [horaFato, setHoraFato] = useState("");
  const [elementos, setElementos] = useState({
    envolvidos: false,
    armaFogo: false,
    munições: false,
    dinheiro: false,
    drogas: false,
    objetos: false,
    veiculos: false,
  });

  const handleToggle = (key) => {
    setElementos((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    if (
      !tipoRop ||
      !cidade ||
      !logradouro ||
      !dataFato ||
      !horaFato ||
      !evento ||
      !numAtendimento ||
      !cidade ||
      !bairro ||
      !numero ||
      !destino
    ) {
      Alert.alert(
        "Campos Obrigatórios",
        "Preencha o Tipo do ROP, Cidade, Logradouro, Data e Hora do Fato."
      );
      console.log("ERRO: Validação falhou, mostrando alerta.");
      return;
    }

    const dadosDestaTela = {
      tipoRop,
      evento,
      numAtendimento,
      destino,
      cidade,
      bairro,
      logradouro,
      numero,
      referencia,
      dataFato,
      horaFato,
      elementosPresentes: elementos,
    };

    const todosOsDadosAcumulados = {
      ...dadosAnteriores,
      dadosDoFato: dadosDestaTela, 
    };
   
    if (elementos.envolvidos) {
      console.log("INDO PARA: DadosPessoais com dados acumulados.");
    
      navigation.navigate("DadosPessoais", todosOsDadosAcumulados);
    } else {
      console.log("INDO PARA: Apreensoes com dados acumulados.");
     
      navigation.navigate("Apreensoes", todosOsDadosAcumulados);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Etapa 1: Dados do Fato</Text>
          <Text style={styles.label}>Tipo do ROP *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoRop}
              onValueChange={(itemValue) => setTipoRop(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                { color: tipoRop ? COLORS.TEXT : COLORS.SUB_TEXT },
              ]}
            >
              <Picker.Item
                label="Selecione o Tipo..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              {tiposRop.map((tipo, index) => (
                <Picker.Item
                  key={index}
                  label={tipo}
                  value={tipo}
                  color={COLORS.TEXT}
                />
              ))}
            </Picker>
          </View>

         
          <Text style={styles.label}>Evento/Operação</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={evento}
              onValueChange={(itemValue) => setEvento(itemValue)}
              dropdownIconColor={COLORS.TEXT}
              style={[
                styles.picker,
                { color: evento ? COLORS.TEXT : COLORS.SUB_TEXT },
              ]}
            >
              <Picker.Item
                label="Selecione o Evento..."
                value=""
                color={COLORS.SUB_TEXT}
              />
              {eventos.map((evento, index) => (
                <Picker.Item
                  key={index}
                  label={evento}
                  value={evento}
                  color={COLORS.TEXT}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Número de Atendimento *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 19000123"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={numAtendimento}
            onChangeText={setNumAtendimento}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Destino *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Unidade PM X, Delegacia Y"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={destino}
            onChangeText={setDestino}
          />

          <Text style={styles.label}>Cidade *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={cidade}
              onValueChange={(itemValue) => {
                setCidade(itemValue);
                setBairro("");
              }}
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

          <Text style={styles.label}>Bairro *</Text>
          <View style={styles.pickerContainer}>
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
                label="Selecione o Bairro..."
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

          <Text style={styles.label}>Logradouro do Fato *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rua A, Avenida B, Rodovia C"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={logradouro}
            onChangeText={setLogradouro}
          />

          <Text style={styles.label}>Número *</Text>
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ponto de Referência</Text>
          <TextInput
            style={styles.input}
            placeholder="Perto da escola, em frente ao mercado..."
            placeholderTextColor={COLORS.SUB_TEXT}
            value={referencia}
            onChangeText={setReferencia}
          />

          <Text style={styles.label}>Data do Fato *</Text>
          <MaskedTextInput
            mask="99/99/9999"
            onChangeText={setDataFato}
            style={styles.input}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={dataFato}
          />

          <Text style={styles.label}>Hora do Fato *</Text>
          <MaskedTextInput
            mask="99:99"
            onChangeText={setHoraFato}
            style={styles.input}
            keyboardType="numeric"
            placeholder="HH:MM"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={horaFato}
          />

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Elementos Presentes
          </Text>

          {Object.keys(elementos).map((key) => (
            <View key={key} style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>
                {/* Formatando o nome para exibição */}
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </Text>
              <Switch
                trackColor={{
                  false: COLORS.SWITCH_TRACK_OFF,
                  true: COLORS.SWITCH_TRACK_ON,
                }}
                thumbColor={COLORS.SWITCH_THUMB}
                onValueChange={() => handleToggle(key)}
                value={elementos[key]}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Próxima Etapa</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND, 
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 50,
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
    borderColor: COLORS.SUB_TEXT,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: COLORS.CARD,
    borderRadius: 10,
    marginBottom: 15,
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.SUB_TEXT,
  },
  picker: {
    color: COLORS.TEXT,
    backgroundColor: "transparent",
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.CARD,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.SUB_TEXT,
  },
  toggleLabel: {
    color: COLORS.TEXT,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
