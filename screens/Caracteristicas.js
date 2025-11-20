import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const COLORS = {
  BACKGROUND: "#FFFFFF",
  TEXT: "#000000",
  SUB_TEXT: "#777777",
  CARD: "#F0F0F0",
  PRIMARY: "#002366",
  BUTTON_TEXT: "#FFFFFF",
};

export default function Caracteristicas({ navigation, route }) {
  const dadosAnteriores = route.params || {};

  const [tipoSinal, setTipoSinal] = useState("");
  const [localSinal, setLocalSinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir o acesso à galeria para enviar imagens."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!resultado.canceled) {
      const novosUris = resultado.assets
        .filter((asset) => {
          const uri = asset.uri.toLowerCase();
          return (
            uri.endsWith(".jpg") ||
            uri.endsWith(".png") ||
            uri.endsWith(".jpeg")
          );
        })
        .map((asset) => asset.uri);

      if (novosUris.length === 0 && resultado.assets.length > 0) {
        Alert.alert(
          "Formato inválido",
          "Nenhuma das imagens selecionadas é JPG ou PNG."
        );
        return;
      }
      setImagens((prevImagens) => [...prevImagens, ...novosUris]);
    }
  };

  const handleNext = () => {
    if (!tipoSinal.trim() || !localSinal.trim() || !descricao.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos antes de continuar."
      );
      return;
    }
    const dadosDestaTela = {
      tipoSinal,
      localSinal,
      descricao,
      imagensAnexadas: imagens,
    };
    const todosOsDadosAcumulados = {
      ...dadosAnteriores,
      caracteristicas: dadosDestaTela,
    };

    console.log("INDO PARA: Apreensoes com todos os dados acumulados.");
    navigation.navigate("Apreensoes", todosOsDadosAcumulados);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.sectionTitle}>Características do Envolvido</Text>
      <Text style={styles.label}>Tipo de Sinal Identificador</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: tatuagem, cicatriz, pinta, marca, etc."
        placeholderTextColor={COLORS.SUB_TEXT}
        value={tipoSinal}
        onChangeText={setTipoSinal}
      />
      <Text style={styles.label}>Local do Sinal</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: braço direito, rosto, cabeça, perna, costas, etc."
        placeholderTextColor={COLORS.SUB_TEXT}
        value={localSinal}
        onChangeText={setLocalSinal}
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Descreva o sinal..."
        placeholderTextColor={COLORS.SUB_TEXT}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Upload de Imagem (opcional)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={selecionarImagem}>
        <Text style={styles.uploadText}>Selecionar Imagens</Text>
      </TouchableOpacity>
      {imagens.length > 0 && (
        <View style={styles.previewsContainer}>
          {imagens.map((uri, index) => (
            <View key={index} style={styles.imagePreviewWrapper}>
              <Image source={{ uri }} style={styles.imagePreview} />
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próxima Etapa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  previewsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginTop: 10,
  },
  imagePreviewWrapper: {
    marginRight: 10,
    marginBottom: 10,
  },

  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.TEXT,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  uploadButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadText: {
    color: COLORS.BUTTON_TEXT,
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
