import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios'; 

const gerarTokenRelatorio = () => {
  const timestamp = Date.now().toString().slice(-6);
  const randomNum = Math.floor(Math.random() * 900) + 100;
  return `NU-${timestamp}-${randomNum}`;
};

const COLORS = {
  PRIMARY: "#002366",
  ACCENT: "#007bff",
  BACKGROUND: "#FFFFFF",
  CARD: "#F5F5F5",
  SUCCESS: "#28a745",
  TEXT: "#000000",
  WARNING: "#ffc107",
};

const ItemCounter = ({ count, label, icon }) => (
  <View style={styles.counterContainer}>
    <FontAwesome
      name={icon}
      size={20}
      color={COLORS.PRIMARY}
      style={{ marginRight: 8 }}
    />
    <Text style={styles.counterText}>
      {label}: <Text style={{ fontWeight: "bold" }}>{count}</Text>
    </Text>
  </View>
);
const API_REPORT_URL = "https://seu-servidor-backend.com/api/relatorio/gerar";

export default function ApreensoesScreen({ navigation, route }) {
  const dadosAnteriores = route.params || {};

  const dadosApreensoesAnteriores = dadosAnteriores.apreensoes || {};

  const armas = dadosApreensoesAnteriores.armas || [];
  const drogas = dadosApreensoesAnteriores.drogas || [];
  const municoes = dadosApreensoesAnteriores.municoes || [];
  const objetos = dadosApreensoesAnteriores.objetos || [];
  const dinheiro = dadosApreensoesAnteriores.dinheiro || [];
  const veiculos = dadosApreensoesAnteriores.veiculos || [];
  const policiais = dadosApreensoesAnteriores.policiais || [];

  const [historico, setHistorico] = useState(
    dadosApreensoesAnteriores.historico || ""
  );

  const handleNext = async () => {
    if (historico.length < 20) {
      Alert.alert(
        "Atenção",
        "O histórico deve ter no mínimo 20 caracteres para detalhamento completo da ocorrência e melhor geração do relatório."
      );
      return;
    }
    const novoToken = gerarTokenRelatorio();

    const dadosApreensoesFinais = {
      ...dadosApreensoesAnteriores,
      historico: historico,
      tokenRelatorio: novoToken,
    };

    const dadosCompletosParaIA = {
      ...dadosAnteriores,
      apreensoes: dadosApreensoesFinais,
    };

    let relatorioGerado = "Falha ao gerar o relatório automático. Por favor, preencha a seção de histórico manualmente.";

    console.log("Simulando chamada à IA (API Real Desativada)...");
    
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    relatorioGerado = `RELATÓRIO AUTOMÁTICO DE OCORRÊNCIA (TOKEN: ${novoToken})
Data e Hora: (Dados Anteriores)
Local: (Dados Anteriores)

I. ENVOLVIMENTO E FATOS:
No dia ${new Date().toLocaleDateString('pt-BR')}, a guarnição (Policiais: ${policiais.length}) deu início à diligência. O fato central se desenrolou conforme o histórico detalhado inserido pelo usuário:
"${historico}"

II. APREENSÕES:
Ocorrência de Apreensão/Envolvimento com os seguintes itens:
- Armas: ${armas.length} unidade(s).
- Drogas: ${drogas.length} porção(ões).
- Veículos: ${veiculos.length} envolvido(s).
- Dinheiro: ${dinheiro.length} registro(s) de valores.

III. PROVIDÊNCIAS:
O registro segue para a Delegacia de Polícia Civil para as devidas ações judiciárias. O presente relatório foi gerado automaticamente por Inteligência Artificial e requer a revisão e confirmação do agente.

(Este texto deve aparecer na tela FinalRelatorio e ser editável)`;
  
    const todosOsDadosComRelatorio = {
      ...dadosCompletosParaIA,
      relatorioIA: relatorioGerado, 
    };

    navigation.navigate("FinalRelatorio", todosOsDadosComRelatorio);
  };
 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>4. Histórico e Resumo da Ocorrência</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Itens Registrados:</Text>

          <View style={styles.countersRow}>
            <ItemCounter count={armas.length} label="Armas" icon="crosshairs" />
            <ItemCounter
              count={municoes.length}
              label="Munições"
              icon="circle-o"
            />
          </View>

          <View style={styles.countersRow}>
            <ItemCounter count={drogas.length} label="Drogas" icon="flask" />
            <ItemCounter
              count={dinheiro.length}
              label="Dinheiro"
              icon="money"
            />
          </View>

          <View style={styles.countersRow}>
            <ItemCounter count={objetos.length} label="Objetos" icon="cube" />
            <ItemCounter count={veiculos.length} label="Veículos" icon="car" />
          </View>

          <View style={styles.countersRow}>
            <ItemCounter
              count={policiais.length}
              label="Policiais"
              icon="user"
            />
          </View>
        </View>
        <View style={styles.historicoCard}>
          <View style={styles.headerHistorico}>
            <MaterialCommunityIcons
              name="pencil-ruler"
              size={24}
              color={COLORS.PRIMARY}
            />
            <Text style={styles.sectionTitle}>
              Histórico / Narrativa do Fato
            </Text>
          </View>

          <Text style={styles.label}>
            Descreva o desenrolar da ocorrência detalhadamente (quem, o quê,
            como, onde, quando):
          </Text>
          <TextInput
            style={styles.historicoInput}
            value={historico}
            onChangeText={setHistorico}
            multiline
            numberOfLines={8}
            placeholder="Ex: No patrulhamento pela Rua X, a guarnição avistou indivíduo em atitude suspeita..."
          />
          <Text style={styles.charCount}>
            Caracteres: {historico.length}/50 (Mínimo)
          </Text>
        </View>
        <TouchableOpacity style={styles.finalButton} onPress={handleNext}>
          <FontAwesome name="file-text-o" size={20} color={COLORS.BACKGROUND} />
          <Text style={styles.finalButtonText}>GERAR RELATÓRIO FINAL</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.PRIMARY,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.PRIMARY,
    paddingBottom: 5,
  },
  summaryCard: {
    backgroundColor: COLORS.CARD,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.ACCENT,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
  historicoCard: {
    backgroundColor: COLORS.CARD,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.WARNING,
  },
  headerHistorico: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.TEXT,
    marginLeft: 10,
  },
  countersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 5,
    width: "48%",
    justifyContent: "flex-start",
  },
  counterText: {
    fontSize: 15,
    color: COLORS.TEXT,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  historicoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 5,
    minHeight: 180,
    backgroundColor: COLORS.BACKGROUND,
    fontSize: 16,
  },
  charCount: {
    fontSize: 14,
    color: COLORS.TEXT,
    textAlign: "right",
    marginTop: 5,
  },
  finalButton: {
    flexDirection: "row",
    backgroundColor: COLORS.SUCCESS,
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },
  finalButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
