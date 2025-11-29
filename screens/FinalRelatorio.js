import React, { useState } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput, 
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  PRIMARY: "#002366",
  ACCENT: "#007bff",
  BACKGROUND: "#FFFFFF",
  CARD: "#F5F5F5",
  SUCCESS: "#28a745",
  TEXT: "#000000",
  WARNING: "#ffc107",
  ERROR: "#dc3545",
};

const SummaryItem = ({ label, value }) => (
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>{label}:</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

export default function FinalRelatorio({ navigation, route }) {
  const todosOsDados = route.params || {};
  const apreensoes = todosOsDados.apreensoes || {};
  const tokenRelatorio = apreensoes.tokenRelatorio || "TOKEN-NAO-GERADO";
  
  const relatorioIAOriginal = todosOsDados.relatorioIA || apreensoes.historico || "Nenhum relatório automático gerado.";

  const [relatorioEditavel, setRelatorioEditavel] = useState(relatorioIAOriginal);


  const handleFinalizar = () => {
    const dadosFinaisParaSalvar = {
        ...todosOsDados,
        relatorioFinal: relatorioEditavel, 
        apreensoes: { 
            ...apreensoes,
            historico: relatorioEditavel,
        }
    };

    console.log("Relatório Salvo:", dadosFinaisParaSalvar);

    navigation.popToTop();

    setTimeout(() => {
      Alert.alert(
        "Concluído! ✅",
        `O Relatório de Ocorrência com o Token **${tokenRelatorio}** foi salvo e registrado com sucesso.`
      );
    }, 100);
  };
  
  const getTotalApreensoes = () => {
    return (
      (apreensoes.armas ? apreensoes.armas.length : 0) +
      (apreensoes.drogas ? apreensoes.drogas.length : 0) +
      (apreensoes.dinheiro ? apreensoes.dinheiro.length : 0) +
      (apreensoes.veiculos ? apreensoes.veiculos.length : 0) +
      (apreensoes.policiais ? apreensoes.policiais.length : 0)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>5. Relatório de Ocorrência Final</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.tokenCard}>
          <MaterialCommunityIcons
            name="security"
            size={24}
            color={COLORS.BACKGROUND}
            />
          <Text style={styles.tokenLabel}>TOKEN ÚNICO DO RELATÓRIO</Text>
          <Text style={styles.tokenValue}>{tokenRelatorio}</Text>
        </View>
        
        {/* Sumário do Registro */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Sumário do Registro</Text>
          <SummaryItem
            label="Total de Apreensões"
            value={getTotalApreensoes()}
          />
          <SummaryItem
            label="Armas Apreendidas"
            value={apreensoes.armas ? apreensoes.armas.length : 0}
          />
          <SummaryItem
            label="Drogas Apreendidas"
            value={apreensoes.drogas ? apreensoes.drogas.length : 0}
          />
          <SummaryItem
            label="Veículos Envolvidos"
            value={apreensoes.veiculos ? apreensoes.veiculos.length : 0}
          />
          <SummaryItem
            label="Policiais Envolvidos"
            value={apreensoes.policiais ? apreensoes.policiais.length : 0}
          />
          
          <Text style={styles.historicoTitle}>
            Relatório Gerado (Revisar e Editar):
          </Text>
          
          {/* ⚠️ NOVO: Campo de texto editável com o relatório da IA */}
          <TextInput
            style={styles.relatorioInput} 
            value={relatorioEditavel}
            onChangeText={setRelatorioEditavel}
            multiline
            numberOfLines={10}
            placeholder="Relatório automático falhou ou está sendo preenchido manualmente."
          />
        </View>

        <Text style={styles.noteText}>
          Os detalhes completos (Pessoais, Endereço, Fato) estão vinculados a
          este token.
        </Text>
        <TouchableOpacity style={styles.finalButton} onPress={handleFinalizar}>
          <FontAwesome
            name="check-circle"
            size={20}
            color={COLORS.BACKGROUND}
          />
          <Text style={styles.finalButtonText}>
            CONCLUIR E SALVAR OCORRÊNCIA
          </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.PRIMARY,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.PRIMARY,
    paddingBottom: 5,
  },
  tokenCard: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  tokenLabel: {
    fontSize: 14,
    color: COLORS.BACKGROUND,
    marginTop: 5,
    marginBottom: 5,
  },
  tokenValue: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.WARNING,
    textAlign: "center",
    letterSpacing: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.CARD,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.SUCCESS,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
  },
  historicoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TEXT,
    marginTop: 15,
    marginBottom: 5,
  },
  relatorioInput: { 
    fontSize: 15,
    color: COLORS.TEXT,
    backgroundColor: COLORS.BACKGROUND,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    textAlignVertical: 'top',
    minHeight: 200, 
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
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
