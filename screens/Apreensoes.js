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
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from "react-native-currency-input";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TIPOS_ARMA = ["Pistola", "Revólver", "Espingarda", "Fuzil", "Outro"];
const CALIBRES = ["9mm", ".38", ".40", ".380", "12", "Outro"];
const TIPOS_DROGA = ["Maconha", "Cocaína", "Crack", "Ecstasy", "Outro"];
const APRESENTACAO_DROGA = ["Tablete", "Pó", "Pedra", "Porção", "Líquido"];
const UNIDADES = ["g", "kg", "un"];
const TIPOS_VEICULO = ["Carro", "Moto", "Caminhão", "Van", "Outro"];
const SITUACOES = ["Apreendido", "Recuperado", "Danificado", "Periciado"];

const COLORS = {
  BACKGROUND: "#FFFFFF",
  TEXT: "#000000",
  SUB_TEXT: "#777777",
  CARD: "#F0F0F0",
  PRIMARY: "#002366",
  SECONDARY: "#4CAF50",
  BUTTON_TEXT: "#FFFFFF",
  INPUT_BORDER: "#777777",
  CARD_BORDER: "#CCCCCC",
  DANGER: "#D9534F",
};

const initialStateArma = { tipo: "", calibre: "", numSerie: "" };
const initialStateMunicao = { tipo: "", quantidade: "", informacoes: "" };
const initialStateDroga = {
  tipo: "",
  apresentacao: "",
  quantidade: "",
  unidade: "",
  embalagem: "",
};
const initialStateDinheiro = { valorTotal: 0, observacoes: "" };
const initialStateObjeto = {
  descricao: "",
  marcaModelo: "",
  identificador: "",
  situacao: "",
};
const initialStateVeiculo = {
  tipo: "",
  placa: "",
  chassi: "",
  marcaModelo: "",
  cor: "",
};
const initialStatePolicial = { matricula: "", nome: "", funcao: "" };

const ExpandableCard = ({
  title,
  index,
  children,
  isOpen,
  onToggle,
  onRemove,
  type,
}) => {
  return (
    <View style={styles.expandableCardContainer}>
           {" "}
      <TouchableOpacity onPress={onToggle} style={styles.expandableHeader}>
               {" "}
        <Text style={styles.itemTitle}>{title || `${type} #${index + 1}`}</Text>
                <Text style={styles.collapseIcon}>{isOpen ? "▲" : "▼"}</Text>   
         {" "}
      </TouchableOpacity>
           {" "}
      {isOpen && (
        <View style={styles.expandableContent}>
                    {children}         {" "}
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
                       {" "}
            <Text style={styles.removeButtonText}>
                            Remover {type} #{index + 1}           {" "}
            </Text>
                     {" "}
          </TouchableOpacity>
                 {" "}
        </View>
      )}
         {" "}
    </View>
  );
};

export default function Apreensoes({ navigation, route }) {
  const todosOsDadosAnteriores = route.params || {};

  const [armas, setArmas] = useState([]);
  const [municoes, setMunicoes] = useState([]);
  const [drogas, setDrogas] = useState([]);
  const [dinheiro, setDinheiro] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [policiaisEnvolvidos, setPoliciaisEnvolvidos] = useState([]);

  const [openCards, setOpenCards] = useState({});

  const [narrativa, setNarrativa] = useState("");

  const handleAddItem = (setter, initialState, type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter((prev) => {
      const newArray = [...prev, initialState];

      const newIndex = newArray.length - 1;
      setOpenCards((prevOpen) => ({
        ...prevOpen,
        [type]: { ...prevOpen[type], [newIndex]: true },
      }));

      return newArray;
    });
  };

  const handleRemoveItem = (setter, index, type) => {
    Alert.alert(
      "Confirmar Remoção",
      `Deseja realmente remover o item de ${type} #${index + 1}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setter((prev) => prev.filter((_, i) => i !== index));

            setOpenCards((prev) => {
              const newTypeCards = { ...prev[type] };
              delete newTypeCards[index];
              return { ...prev, [type]: newTypeCards };
            });
          },
        },
      ]
    );
  };

  const handleChangeItem = (setter, index, key, value) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleToggleCard = (type, index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenCards((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: !prev[type]?.[index],
      },
    }));
  };
  const handleFinalizar = () => {
    if (!narrativa || narrativa.trim().length < 50) {
      Alert.alert(
        "Campo Obrigatório",
        "A Narrativa/Histórico do Fato é obrigatória e deve ser detalhada (mínimo de 50 caracteres) para finalizar o relatório."
      );
      return;
    }

    const armasInvalidas = armas.filter((arma) => !arma.tipo || !arma.calibre);
    if (armasInvalidas.length > 0) {
      Alert.alert(
        "Erro de Validação",
        "Todas as Armas de Fogo devem ter Tipo e Calibre informados."
      );
      return;
    }

    const drogasInvalidas = drogas.filter(
      (droga) => !droga.tipo || !droga.quantidade || !droga.unidade
    );
    if (drogasInvalidas.length > 0) {
      Alert.alert(
        "Erro de Validação",
        "Todas as Drogas devem ter Tipo, Quantidade e Unidade informados."
      );
      return;
    }

    const dadosDestaTela = {
      armas,
      municoes,
      drogas,
      dinheiro,
      objetos,
      veiculos,
      policiaisEnvolvidos,
      narrativa,
    };

    const todosOsDadosAcumulados = {
      ...todosOsDadosAnteriores,
      apreensoes: dadosDestaTela,
    };
    navigation.navigate("RelatorioFinal", todosOsDadosAcumulados);
  };

  const getCardTitle = (item, type) => {
    switch (type) {
      case "Arma":
        return item.tipo && item.calibre
          ? `${item.tipo} (${item.calibre})`
          : "Nova Arma (Incompleto)";
      case "Municao":
        return item.tipo && item.quantidade
          ? `${item.quantidade} x ${item.tipo}`
          : "Nova Munição (Incompleto)";
      case "Droga":
        return item.tipo && item.quantidade
          ? `${item.tipo} (${item.quantidade}${item.unidade || ""})`
          : "Nova Droga (Incompleto)";
      case "Dinheiro":
        return item.valorTotal > 0
          ? `R$ ${item.valorTotal.toFixed(2).replace(".", ",")}`
          : "Novo Dinheiro (R$ 0,00)";
      case "Objeto":
        return item.descricao
          ? `${item.descricao} ${
              item.marcaModelo ? `(${item.marcaModelo})` : ""
            }`
          : "Novo Objeto (Incompleto)";
      case "Veiculo":
        return item.placa
          ? `${item.tipo}: ${item.placa}`
          : "Novo Veículo (Incompleto)";
      case "Policial":
        return item.nome || `Matrícula ${item.matricula || "(Sem Nome)"}`;
      default:
        return `Item #${index + 1}`;
    }
  };

  const renderArma = (arma, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Arma"
      title={getCardTitle(arma, "Arma")}
      isOpen={!!openCards.Arma?.[index]}
      onToggle={() => handleToggleCard("Arma", index)}
      onRemove={() => handleRemoveItem(setArmas, index, "Arma")}
    >
            <Text style={styles.label}>Tipo da arma *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={arma.tipo}
          onValueChange={(value) =>
            handleChangeItem(setArmas, index, "tipo", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione o Tipo..." value="" />       
           {" "}
          {TIPOS_ARMA.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
            <Text style={styles.label}>Calibre *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={arma.calibre}
          onValueChange={(value) =>
            handleChangeItem(setArmas, index, "calibre", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione o Calibre..." value="" />     
             {" "}
          {CALIBRES.map((c, i) => (
            <Picker.Item key={i} label={c} value={c} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
            <Text style={styles.label}>Número de Série (Opcional)</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Nº de Série"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={arma.numSerie}
        onChangeText={(value) =>
          handleChangeItem(setArmas, index, "numSerie", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  const renderMunicao = (municao, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Municao"
      title={getCardTitle(municao, "Municao")}
      isOpen={!!openCards.Municao?.[index]}
      onToggle={() => handleToggleCard("Municao", index)}
      onRemove={() => handleRemoveItem(setMunicoes, index, "Municao")}
    >
            <Text style={styles.label}>Tipo (Calibre) *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Ex: 9mm, .38"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={municao.tipo}
        onChangeText={(value) =>
          handleChangeItem(setMunicoes, index, "tipo", value)
        }
      />
            <Text style={styles.label}>Quantidade *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={municao.quantidade}
        onChangeText={(value) =>
          handleChangeItem(setMunicoes, index, "quantidade", value)
        }
        keyboardType="numeric"
      />
            <Text style={styles.label}>Informações da Apreensão</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Ex: Munições intactas, percutidas, etc."
        placeholderTextColor={COLORS.SUB_TEXT}
        value={municao.informacoes}
        onChangeText={(value) =>
          handleChangeItem(setMunicoes, index, "informacoes", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  const renderDroga = (droga, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Droga"
      title={getCardTitle(droga, "Droga")}
      isOpen={!!openCards.Droga?.[index]}
      onToggle={() => handleToggleCard("Droga", index)}
      onRemove={() => handleRemoveItem(setDrogas, index, "Droga")}
    >
            <Text style={styles.label}>Tipo *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={droga.tipo}
          onValueChange={(value) =>
            handleChangeItem(setDrogas, index, "tipo", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione o Tipo..." value="" />       
           {" "}
          {TIPOS_DROGA.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
            <Text style={styles.label}>Apresentação *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={droga.apresentacao}
          onValueChange={(value) =>
            handleChangeItem(setDrogas, index, "apresentacao", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione a Apresentação..." value="" />
                   {" "}
          {APRESENTACAO_DROGA.map((a, i) => (
            <Picker.Item key={i} label={a} value={a} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
           {" "}
      <View style={styles.inlineGroup}>
               {" "}
        <View style={styles.inlineItem}>
                    <Text style={styles.label}>Quantidade *</Text>         {" "}
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={droga.quantidade}
            onChangeText={(value) =>
              handleChangeItem(setDrogas, index, "quantidade", value)
            }
          />
                 {" "}
        </View>
               {" "}
        <View style={styles.inlineItem}>
                    <Text style={styles.label}>Unidade *</Text>         {" "}
          <View style={styles.pickerContainer}>
                       {" "}
            <Picker
              selectedValue={droga.unidade}
              onValueChange={(value) =>
                handleChangeItem(setDrogas, index, "unidade", value)
              }
              style={styles.picker}
            >
                            <Picker.Item label="Un." value="" />             {" "}
              {UNIDADES.map((u, i) => (
                <Picker.Item key={i} label={u} value={u} />
              ))}
                         {" "}
            </Picker>
                     {" "}
          </View>
                 {" "}
        </View>
             {" "}
      </View>
            <Text style={styles.label}>Embalagem</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Tipo de embalagem"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={droga.embalagem}
        onChangeText={(value) =>
          handleChangeItem(setDrogas, index, "embalagem", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  const renderDinheiro = (item, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Dinheiro"
      title={getCardTitle(item, "Dinheiro")}
      isOpen={!!openCards.Dinheiro?.[index]}
      onToggle={() => handleToggleCard("Dinheiro", index)}
      onRemove={() => handleRemoveItem(setDinheiro, index, "Dinheiro")}
    >
            <Text style={styles.label}>Valor Total (R$) *</Text>     {" "}
      <CurrencyInput
        style={styles.input}
        value={item.valorTotal}
        onChangeValue={(value) =>
          handleChangeItem(setDinheiro, index, "valorTotal", value)
        }
        prefix="R$"
        delimiter="."
        separator=","
        precision={2}
        keyboardType="numeric"
        placeholder="R$ 0,00"
      />
            <Text style={styles.label}>Observações (Opcional)</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Discriminação de cédulas, moedas..."
        placeholderTextColor={COLORS.SUB_TEXT}
        value={item.observacoes}
        onChangeText={(value) =>
          handleChangeItem(setDinheiro, index, "observacoes", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  const renderObjeto = (objeto, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Objeto"
      title={getCardTitle(objeto, "Objeto")}
      isOpen={!!openCards.Objeto?.[index]}
      onToggle={() => handleToggleCard("Objeto", index)}
      onRemove={() => handleRemoveItem(setObjetos, index, "Objeto")}
    >
            <Text style={styles.label}>Descrição *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Ex: Celular, relógio, jóia"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={objeto.descricao}
        onChangeText={(value) =>
          handleChangeItem(setObjetos, index, "descricao", value)
        }
      />
            <Text style={styles.label}>Marca/Modelo (Opcional)</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Marca/Modelo"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={objeto.marcaModelo}
        onChangeText={(value) =>
          handleChangeItem(setObjetos, index, "marcaModelo", value)
        }
      />
            <Text style={styles.label}>Identificador (Opcional)</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="IMEI/Serial"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={objeto.identificador}
        onChangeText={(value) =>
          handleChangeItem(setObjetos, index, "identificador", value)
        }
      />
            <Text style={styles.label}>Situação *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={objeto.situacao}
          onValueChange={(value) =>
            handleChangeItem(setObjetos, index, "situacao", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione a Situação..." value="" />   
               {" "}
          {SITUACOES.map((s, i) => (
            <Picker.Item key={i} label={s} value={s} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
         {" "}
    </ExpandableCard>
  );

  const renderVeiculo = (veiculo, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Veiculo"
      title={getCardTitle(veiculo, "Veiculo")}
      isOpen={!!openCards.Veiculo?.[index]}
      onToggle={() => handleToggleCard("Veiculo", index)}
      onRemove={() => handleRemoveItem(setVeiculos, index, "Veiculo")}
    >
            <Text style={styles.label}>Tipo *</Text>     {" "}
      <View style={styles.pickerContainer}>
               {" "}
        <Picker
          selectedValue={veiculo.tipo}
          onValueChange={(value) =>
            handleChangeItem(setVeiculos, index, "tipo", value)
          }
          style={styles.picker}
        >
                    <Picker.Item label="Selecione o Tipo..." value="" />       
           {" "}
          {TIPOS_VEICULO.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
                 {" "}
        </Picker>
             {" "}
      </View>
            <Text style={styles.label}>Placa *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Placa (ou 'sem placa')"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.placa}
        onChangeText={(value) =>
          handleChangeItem(setVeiculos, index, "placa", value)
        }
        autoCapitalize="characters"
      />
            <Text style={styles.label}>Chassi (Opcional)</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Número do Chassi"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.chassi}
        onChangeText={(value) =>
          handleChangeItem(setVeiculos, index, "chassi", value)
        }
      />
            <Text style={styles.label}>Marca/Modelo *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Ex: Fiat Palio, Honda Biz"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.marcaModelo}
        onChangeText={(value) =>
          handleChangeItem(setVeiculos, index, "marcaModelo", value)
        }
      />
            <Text style={styles.label}>Cor *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Cor do veículo"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.cor}
        onChangeText={(value) =>
          handleChangeItem(setVeiculos, index, "cor", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  const renderPolicial = (policial, index) => (
    <ExpandableCard
      key={index}
      index={index}
      type="Policial"
      title={getCardTitle(policial, "Policial")}
      isOpen={!!openCards.Policial?.[index]}
      onToggle={() => handleToggleCard("Policial", index)}
      onRemove={() =>
        handleRemoveItem(setPoliciaisEnvolvidos, index, "Policial")
      }
    >
            <Text style={styles.label}>Matrícula *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={policial.matricula}
        onChangeText={(value) =>
          handleChangeItem(setPoliciaisEnvolvidos, index, "matricula", value)
        }
        keyboardType="numeric"
      />
            <Text style={styles.label}>Usuário *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={policial.nome}
        onChangeText={(value) =>
          handleChangeItem(setPoliciaisEnvolvidos, index, "nome", value)
        }
      />
            <Text style={styles.label}>Função na Ocorrência *</Text>     {" "}
      <TextInput
        style={styles.input}
        placeholder="Ex: Comandante, Condutor, Auxiliar"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={policial.funcao}
        onChangeText={(value) =>
          handleChangeItem(setPoliciaisEnvolvidos, index, "funcao", value)
        }
      />
         {" "}
    </ExpandableCard>
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
           {" "}
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
               {" "}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
                   {" "}
          <Text style={styles.sectionTitle}>
                        Etapa Final: Apreensões e Relato          {" "}
          </Text>
                    {/* 2.2 Armas de Fogo */}         {" "}
          <Text style={styles.subSectionTitle}>
                        🔫 Armas de Fogo ({armas.length})          {" "}
          </Text>
                    {armas.map(renderArma)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddItem(setArmas, initialStateArma, "Arma")}
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Arma</Text>         {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.3 Munições */}         {" "}
          <Text style={styles.subSectionTitle}>
                        🟡 Munições ({municoes.length})          {" "}
          </Text>
                    {municoes.map(renderMunicao)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddItem(setMunicoes, initialStateMunicao, "Municao")
            }
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Munição</Text>       
             {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.4 Drogas */}         {" "}
          <Text style={styles.subSectionTitle}>
                        🌿 Drogas ({drogas.length})          {" "}
          </Text>
                    {drogas.map(renderDroga)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddItem(setDrogas, initialStateDroga, "Droga")}
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Droga</Text>         {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.5 Dinheiro */}         {" "}
          <Text style={styles.subSectionTitle}>
                        💰 Dinheiro ({dinheiro.length})          {" "}
          </Text>
                    {dinheiro.map(renderDinheiro)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddItem(setDinheiro, initialStateDinheiro, "Dinheiro")
            }
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Dinheiro</Text>     
               {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.6 Objetos */}         {" "}
          <Text style={styles.subSectionTitle}>
                        📱 Objetos ({objetos.length})          {" "}
          </Text>
                    {objetos.map(renderObjeto)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddItem(setObjetos, initialStateObjeto, "Objeto")
            }
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Objeto</Text>       
             {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.7 Veículos */}         {" "}
          <Text style={styles.subSectionTitle}>
                        🚗 Veículos ({veiculos.length})          {" "}
          </Text>
                    {veiculos.map(renderVeiculo)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddItem(setVeiculos, initialStateVeiculo, "Veiculo")
            }
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Veículo</Text>       
             {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.8 Policiais Envolvidos */}         {" "}
          <Text style={styles.subSectionTitle}>
                        👮 Policiais Envolvidos ({policiaisEnvolvidos.length})  
                   {" "}
          </Text>
                    {policiaisEnvolvidos.map(renderPolicial)}         {" "}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              handleAddItem(
                setPoliciaisEnvolvidos,
                initialStatePolicial,
                "Policial"
              )
            }
          >
                       {" "}
            <Text style={styles.addButtonText}>+ Adicionar Policial</Text>     
               {" "}
          </TouchableOpacity>
                    <View style={styles.separator} />         {" "}
          {/* 2.9 Histórico / Narrativa */}         {" "}
          <Text style={styles.subSectionTitle}>📖 Histórico / Narrativa *</Text>
                   {" "}
          <TextInput
            style={styles.textarea}
            placeholder="Descreva o relato técnico da ocorrência (obrigatório)"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={narrativa}
            onChangeText={setNarrativa}
            multiline
            textAlignVertical="top"
            numberOfLines={8}
          />
                    {/* Botão de Navegação Final / Gerar Relatório */}         {" "}
          <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
                       {" "}
            <Text style={styles.buttonText}>GERAR RELATÓRIO ABNT (IA)</Text>   
                 {" "}
          </TouchableOpacity>
                 {" "}
        </ScrollView>
             {" "}
      </KeyboardAvoidingView>
         {" "}
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
  subSectionTitle: {
    color: COLORS.PRIMARY,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    color: COLORS.TEXT,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.BACKGROUND,
    color: COLORS.TEXT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    fontSize: 16,
  },
  textarea: {
    backgroundColor: COLORS.CARD,
    color: COLORS.TEXT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    fontSize: 16,
    minHeight: 150,
  },
  pickerContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 10,
    marginBottom: 15,
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    overflow: "hidden",
  },
  picker: {
    color: COLORS.TEXT,
    backgroundColor: "transparent",
    fontSize: 16,
    ...Platform.select({
      ios: { height: 55 },
      android: { height: 55 },
    }),
  },
  expandableCardContainer: {
    backgroundColor: COLORS.CARD,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.PRIMARY,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  expandableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.CARD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.CARD_BORDER,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TEXT,
    flexShrink: 1,
  },
  collapseIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginLeft: 10,
  },
  expandableContent: {
    padding: 15,
    paddingTop: 5,
  },
  addButton: {
    backgroundColor: COLORS.SECONDARY,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  addButtonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: COLORS.DANGER,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  removeButtonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 14,
    fontWeight: "bold",
  },
  inlineGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inlineItem: {
    flex: 1,
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.CARD_BORDER,
    marginVertical: 15,
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
