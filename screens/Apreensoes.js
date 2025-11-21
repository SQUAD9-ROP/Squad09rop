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
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const COLORS = {
  BACKGROUND: "#FFFFFF",
  TEXT: "#000000",
  SUB_TEXT: "#777777",
  CARD: "#F0F0F0",
  BORDER: "#DDDDDD",
  PRIMARY: "#002366",
  ACCENT: "#007bff",
  DANGER: "#ff4444",
  EMPTY: "#AAAAAA",
};

const gerarTokenRelatorio = () => {
  const date = new Date();
  const timestampPart = date.getTime().toString().slice(-6);
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `NU-${timestampPart}-${randomPart}`;
};

const ExpandableCard = ({ title, showExpandToggle, children }) => {
  const [isExpanded, setIsExpanded] = useState(
    showExpandToggle === false ? true : false
  );

  const toggleExpand = () => {
    if (!showExpandToggle) return;
    setIsExpanded(!isExpanded);
  };
  const renderContent = () => (
    <View style={styles.itemCardContent}>
           {" "}
      {isExpanded ? (
        children
      ) : (
        <Text style={{ color: COLORS.EMPTY, fontStyle: "italic" }}>
                    Toque para expandir e editar.        {" "}
        </Text>
      )}
         {" "}
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={toggleExpand}
      disabled={!showExpandToggle}
      activeOpacity={showExpandToggle ? 0.7 : 1}
    >
           {" "}
      <View style={styles.itemCardHeader}>
                <Text style={styles.itemTitle}>{title}</Text>       {" "}
        {showExpandToggle && (
          <FontAwesome
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={COLORS.ACCENT}
            style={{ paddingLeft: 10 }}
          />
        )}
      </View>
      {showExpandToggle ? isExpanded && renderContent() : renderContent()}
    </TouchableOpacity>
  );
};

const tiposArma = [
  "Pistola",
  "Revólver",
  "Espingarda",
  "Fuzil",
  "Carabina",
  "Outro",
];
const calibres = [
  "9mm",
  ".38",
  ".40",
  ".380",
  ".45",
  "12",
  "5.56",
  "7.62",
  "Outro",
];
const tiposMunicao = [
  "9mm",
  ".38",
  ".40",
  ".380",
  "12",
  "7.62",
  "5.56",
  "Outro",
];
const tiposDroga = ["Maconha", "Cocaína", "Crack", "Ecstasy", "LSD", "Outra"];
const unidadesMedida = ["g (gramas)", "kg (quilos)", "un (unidades)"];
const situacoesObjeto = ["Apreendido", "Recuperado", "Danificado", "Outro"];
const tiposVeiculo = ["Carro", "Moto", "Caminhão", "Ônibus", "Outro"];
const funcoesPolicial = [
  "Comandante",
  "Motorista",
  "Patrulheiro",
  "Apoio",
  "Outra",
];
const novaArma = (id) => ({ id, tipo: "", calibre: "", serie: "" });
const novaMunicao = (id) => ({
  id,
  tipo: "",
  quantidade: "",
  infoApreensao: "",
});
const novaDroga = (id) => ({
  id,
  tipo: "",
  apresentacao: "",
  quantidade: "",
  unidade: "",
  embalagem: "",
});
const novoDinheiro = (id) => ({ id, valor: "", observacoes: "" });
const novoObjeto = (id) => ({
  id,
  descricao: "",
  marcaModelo: "",
  identificador: "",
  situacao: "",
});
const novoVeiculo = (id) => ({
  id,
  tipo: "",
  placa: "",
  chassi: "",
  marcaModelo: "",
  cor: "",
});
const novoPolicial = (id) => ({
  id,
  matricula: "",
  nome: "",
  funcao: "",
});

export default function Apreensoes({ navigation, route }) {
  const dadosAnteriores = route.params || {};

  const [armas, setArmas] = useState([]);
  const [municoes, setMunicoes] = useState([]);
  const [drogas, setDrogas] = useState([]);
  const [dinheiro, setDinheiro] = useState([]);

  const [objetos, setObjetos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [policiais, setPoliciais] = useState([]);

  const [tokenRelatorio, setTokenRelatorio] = useState("");

  const getNextId = (arr) => (arr.length > 0 ? arr[arr.length - 1].id + 1 : 1);

  const handleAddArma = () => {
    setArmas([...armas, novaArma(getNextId(armas))]);
  };
  const handleRemoveArma = (id) => {
    setArmas(armas.filter((arma) => arma.id !== id));
  };
  const handleUpdateArma = (id, field, value) => {
    setArmas(
      armas.map((arma) => (arma.id === id ? { ...arma, [field]: value } : arma))
    );
  };
  const handleAddMunicao = () => {
    setMunicoes([...municoes, novaMunicao(getNextId(municoes))]);
  };
  const handleRemoveMunicao = (id) => {
    setMunicoes(municoes.filter((municao) => municao.id !== id));
  };
  const handleUpdateMunicao = (id, field, value) => {
    setMunicoes(
      municoes.map((municao) =>
        municao.id === id ? { ...municao, [field]: value } : municao
      )
    );
  };
  const handleAddDroga = () => {
    setDrogas([...drogas, novaDroga(getNextId(drogas))]);
  };
  const handleRemoveDroga = (id) => {
    setDrogas(drogas.filter((droga) => droga.id !== id));
  };
  const handleUpdateDroga = (id, field, value) => {
    setDrogas(
      drogas.map((droga) =>
        droga.id === id ? { ...droga, [field]: value } : droga
      )
    );
  };
  const handleAddDinheiro = () => {
    setDinheiro([...dinheiro, novoDinheiro(getNextId(dinheiro))]);
  };
  const handleRemoveDinheiro = (id) => {
    setDinheiro(dinheiro.filter((item) => item.id !== id));
  };
  const handleUpdateDinheiro = (id, field, value) => {
    setDinheiro(
      dinheiro.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  const handleAddObjeto = () => {
    setObjetos([...objetos, novoObjeto(getNextId(objetos))]);
  };
  const handleRemoveObjeto = (id) => {
    setObjetos(objetos.filter((objeto) => objeto.id !== id));
  };
  const handleUpdateObjeto = (id, field, value) => {
    setObjetos(
      objetos.map((objeto) =>
        objeto.id === id ? { ...objeto, [field]: value } : objeto
      )
    );
  };
  const handleAddVeiculo = () => {
    setVeiculos([...veiculos, novoVeiculo(getNextId(veiculos))]);
  };
  const handleRemoveVeiculo = (id) => {
    setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
  };
  const handleUpdateVeiculo = (id, field, value) => {
    setVeiculos(
      veiculos.map((veiculo) =>
        veiculo.id === id ? { ...veiculo, [field]: value } : veiculo
      )
    );
  };
  const handleAddPolicial = () => {
    setPoliciais([...policiais, novoPolicial(getNextId(policiais))]);
  };
  const handleRemovePolicial = (id) => {
    setPoliciais(policiais.filter((policial) => policial.id !== id));
  };
  const handleUpdatePolicial = (id, field, value) => {
    setPoliciais(
      policiais.map((policial) =>
        policial.id === id ? { ...policial, [field]: value } : policial
      )
    );
  };

  const handleNext = () => {
    const novoToken = gerarTokenRelatorio();
    setTokenRelatorio(novoToken);

    const dadosDestaTela = {
      armas,
      municoes,
      drogas,
      dinheiro,
      objetos,
      veiculos,
      policiais,
      historico: "",
      tokenRelatorio: novoToken,
    };

    const todosOsDadosAcumulados = {
      ...dadosAnteriores,
      apreensoes: dadosDestaTela,
    };

    console.log("Fluxo de coleta concluído. Navegando para RelatorioFinal.");
    navigation.navigate("RelatorioFinal", todosOsDadosAcumulados);
  };
  const ArmaDeFogoForm = ({ arma, showExpandToggle }) => (
    <ExpandableCard
      title={`Arma #${armas.findIndex((a) => a.id === arma.id) + 1} (${
        arma.tipo || "Não Informado"
      })`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Tipo da Arma *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={arma.tipo}
          onValueChange={(v) => handleUpdateArma(arma.id, "tipo", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione o Tipo..."
            value=""
            color={COLORS.SUB_TEXT}
          />
          {tiposArma.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Calibre *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={arma.calibre}
          onValueChange={(v) => handleUpdateArma(arma.id, "calibre", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione o Calibre..."
            value=""
            color={COLORS.SUB_TEXT}
          />
          {calibres.map((c, i) => (
            <Picker.Item key={i} label={c} value={c} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Nº de Série / ID (Opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nº de Série ou Identificação"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={arma.serie}
        onChangeText={(v) => handleUpdateArma(arma.id, "serie", v)}
      />
      {armas.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveArma(arma.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Arma</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const MunicaoForm = ({ municao, showExpandToggle }) => (
    <ExpandableCard
      title={`Munição #${municoes.findIndex((m) => m.id === municao.id) + 1} (${
        municao.quantidade && municao.tipo
          ? `${municao.quantidade}x ${municao.tipo}`
          : "Não Informado"
      })`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Tipo (Calibre) *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={municao.tipo}
          onValueChange={(v) => handleUpdateMunicao(municao.id, "tipo", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione o Tipo..."
            value=""
            color={COLORS.SUB_TEXT}
          />

          {tiposMunicao.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Quantidade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade (apenas números)"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={municao.quantidade}
        onChangeText={(v) => handleUpdateMunicao(municao.id, "quantidade", v)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Informações da Apreensão</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Detalhes sobre a apreensão (opcional)"
        placeholderTextColor={COLORS.SUB_TEXT}
        multiline
        value={municao.infoApreensao}
        onChangeText={(v) =>
          handleUpdateMunicao(municao.id, "infoApreensao", v)
        }
      />
      {municoes.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveMunicao(municao.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Munição</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const DrogaForm = ({ droga, showExpandToggle }) => (
    <ExpandableCard
      title={`Droga #${drogas.findIndex((d) => d.id === droga.id) + 1} (${
        droga.quantidade && droga.unidade
          ? `${droga.quantidade} ${droga.unidade}`
          : "Não Informado"
      })`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Tipo *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={droga.tipo}
          onValueChange={(v) => handleUpdateDroga(droga.id, "tipo", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione o Tipo..."
            value=""
            color={COLORS.SUB_TEXT}
          />

          {tiposDroga.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Apresentação (Ex.: tablete, pó, pedra) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Apresentação da droga"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={droga.apresentacao}
        onChangeText={(v) => handleUpdateDroga(droga.id, "apresentacao", v)}
      />
      <View style={styles.inlineGroup}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Quantidade *</Text>
          <TextInput
            style={styles.inputInline}
            placeholder="Qtd."
            placeholderTextColor={COLORS.SUB_TEXT}
            value={droga.quantidade}
            onChangeText={(v) => handleUpdateDroga(droga.id, "quantidade", v)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Unidade *</Text>
          <View style={[styles.pickerContainer, styles.pickerContainerInline]}>
            <Picker
              selectedValue={droga.unidade}
              onValueChange={(v) => handleUpdateDroga(droga.id, "unidade", v)}
              dropdownIconColor={COLORS.SUB_TEXT}
              style={styles.pickerBase}
            >
              <Picker.Item label="Unidade" value="" color={COLORS.SUB_TEXT} /> 
              {unidadesMedida.map((u, i) => (
                <Picker.Item key={i} label={u} value={u.split(" ")[0]} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <Text style={styles.label}>Embalagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de embalagem (Ex.: saco plástico, papel alumínio)"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={droga.embalagem}
        onChangeText={(v) => handleUpdateDroga(droga.id, "embalagem", v)}
      />
      {drogas.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveDroga(droga.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Droga</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const DinheiroForm = ({ item, showExpandToggle }) => (
    <ExpandableCard
      title={`Dinheiro Apreendido #${
        dinheiro.findIndex((d) => d.id === item.id) + 1
      } (${item.valor ? `R$ ${item.valor}` : "Não Informado"})`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Valor Total (R$) *</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0,00"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={item.valor}
        onChangeText={(v) => handleUpdateDinheiro(item.id, "valor", v)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Observações (Opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Ex.: Discriminação de cédulas, origem do dinheiro"
        placeholderTextColor={COLORS.SUB_TEXT}
        multiline
        value={item.observacoes}
        onChangeText={(v) => handleUpdateDinheiro(item.id, "observacoes", v)}
      />
      {dinheiro.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveDinheiro(item.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Item</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const ObjetoForm = ({ objeto, showExpandToggle }) => (
    <ExpandableCard
      title={`Objeto #${objetos.findIndex((o) => o.id === objeto.id) + 1} (${
        objeto.descricao || "Não Informado"
      })`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Ex.: Telefone celular, notebook, jóias, documento"
        placeholderTextColor={COLORS.SUB_TEXT}
        multiline
        value={objeto.descricao}
        onChangeText={(v) => handleUpdateObjeto(objeto.id, "descricao", v)}
      />
      <Text style={styles.label}>Marca/Modelo (Opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Apple iPhone 13, Samsung Galaxy S21"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={objeto.marcaModelo}
        onChangeText={(v) => handleUpdateObjeto(objeto.id, "marcaModelo", v)}
      />
      <Text style={styles.label}>
        Identificador (Ex.: IMEI/Serial) (Opcional)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="IMEI, número de série, etc."
        placeholderTextColor={COLORS.SUB_TEXT}
        value={objeto.identificador}
        onChangeText={(v) => handleUpdateObjeto(objeto.id, "identificador", v)}
      />
      <Text style={styles.label}>Situação *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={objeto.situacao}
          onValueChange={(v) => handleUpdateObjeto(objeto.id, "situacao", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione a Situação..."
            value=""
            color={COLORS.SUB_TEXT}
          />
          {situacoesObjeto.map((s, i) => (
            <Picker.Item key={i} label={s} value={s} />
          ))}
        </Picker>
      </View>
      {objetos.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveObjeto(objeto.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Objeto</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const VeiculoForm = ({ veiculo, showExpandToggle }) => (
    <ExpandableCard
      title={`Veículo #${veiculos.findIndex((v) => v.id === veiculo.id) + 1} (${
        veiculo.placa || "Não Informado"
      })`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Tipo *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={veiculo.tipo}
          onValueChange={(v) => handleUpdateVeiculo(veiculo.id, "tipo", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione o Tipo..."
            value=""
            color={COLORS.SUB_TEXT}
          />
          {tiposVeiculo.map((t, i) => (
            <Picker.Item key={i} label={t} value={t} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Placa *</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa ou 'SEM PLACA'"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.placa}
        onChangeText={(v) => handleUpdateVeiculo(veiculo.id, "placa", v)}
        autoCapitalize="characters"
      />
      <Text style={styles.label}>Marca/Modelo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca/Modelo (Ex.: Fiat Uno, Honda CG 160)"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={veiculo.marcaModelo}
        onChangeText={(v) => handleUpdateVeiculo(veiculo.id, "marcaModelo", v)}
      />
      <View style={styles.inlineGroup}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Cor *</Text>
          <TextInput
            style={styles.inputInline}
            placeholder="Cor"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={veiculo.cor}
            onChangeText={(v) => handleUpdateVeiculo(veiculo.id, "cor", v)}
          />
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Chassi (Opcional)</Text>
          <TextInput
            style={styles.inputInline}
            placeholder="Nº do Chassi"
            placeholderTextColor={COLORS.SUB_TEXT}
            value={veiculo.chassi}
            onChangeText={(v) => handleUpdateVeiculo(veiculo.id, "chassi", v)}
          />
        </View>
      </View>
      {veiculos.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveVeiculo(veiculo.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Veículo</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );

  const PolicialForm = ({ policial, showExpandToggle }) => (
    <ExpandableCard
      title={`Policial #${
        policiais.findIndex((p) => p.id === policial.id) + 1
      } (${policial.nome || "Não Informado"})`}
      showExpandToggle={showExpandToggle}
    >
      <Text style={styles.label}>Matrícula *</Text>
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={policial.matricula}
        onChangeText={(v) => handleUpdatePolicial(policial.id, "matricula", v)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Nome Completo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={COLORS.SUB_TEXT}
        value={policial.nome}
        onChangeText={(v) => handleUpdatePolicial(policial.id, "nome", v)}
      />
      <Text style={styles.label}>Função na Ocorrência *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={policial.funcao}
          onValueChange={(v) => handleUpdatePolicial(policial.id, "funcao", v)}
          dropdownIconColor={COLORS.SUB_TEXT}
          style={styles.pickerBase}
        >
          <Picker.Item
            label="Selecione a Função..."
            value=""
            color={COLORS.SUB_TEXT}
          />
          {funcoesPolicial.map((f, i) => (
            <Picker.Item key={i} label={f} value={f} />
          ))}
        </Picker>
      </View>
      {policiais.length >= 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemovePolicial(policial.id)}
        >
          <FontAwesome name="trash-o" size={18} color={COLORS.DANGER} />
          <Text style={styles.removeButtonText}>Remover Policial</Text>
        </TouchableOpacity>
      )}
    </ExpandableCard>
  );
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
          <Text style={styles.pageTitle}>Apreensões e Finalização</Text>
          <Text style={styles.sectionTitle}>
            2.2 Armas de Fogo ({armas.length})
          </Text>
          {armas.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma arma cadastrada.</Text>
          )}
          {armas.map((arma) => (
            <ArmaDeFogoForm
              key={arma.id}
              arma={arma}
              showExpandToggle={armas.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddArma}>
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Arma de Fogo</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.3 Munições ({municoes.length})
          </Text>
          {municoes.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma munição cadastrada.</Text>
          )}
          {municoes.map((municao) => (
            <MunicaoForm
              key={municao.id}
              municao={municao}
              showExpandToggle={municoes.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMunicao}>
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Munição</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.4 Drogas Apreendidas ({drogas.length})
          </Text>
          {drogas.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma droga cadastrada.</Text>
          )}
          {drogas.map((droga) => (
            <DrogaForm
              key={droga.id}
              droga={droga}
              showExpandToggle={drogas.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddDroga}>
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Droga</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.5 Dinheiro Apreendido ({dinheiro.length})
          </Text>
          {dinheiro.length === 0 && (
            <Text style={styles.emptyText}>Nenhum valor cadastrado.</Text>
          )}
          {dinheiro.map((item) => (
            <DinheiroForm
              key={item.id}
              item={item}
              showExpandToggle={dinheiro.length > 1}
            />
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddDinheiro}
          >
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Dinheiro</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.6 Objetos ({objetos.length})
          </Text>
          {objetos.length === 0 && (
            <Text style={styles.emptyText}>Nenhum objeto cadastrado.</Text>
          )}
          {objetos.map((objeto) => (
            <ObjetoForm
              key={objeto.id}
              objeto={objeto}
              showExpandToggle={objetos.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddObjeto}>
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Objeto</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.7 Veículos ({veiculos.length})
          </Text>
          {veiculos.length === 0 && (
            <Text style={styles.emptyText}>Nenhum veículo cadastrado.</Text>
          )}
          {veiculos.map((veiculo) => (
            <VeiculoForm
              key={veiculo.id}
              veiculo={veiculo}
              showExpandToggle={veiculos.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddVeiculo}>
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Veículo</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            2.8 Policiais Envolvidos ({policiais.length})
          </Text>
          {policiais.length === 0 && (
            <Text style={styles.emptyText}>Nenhum policial cadastrado.</Text>
          )}
          {policiais.map((policial) => (
            <PolicialForm
              key={policial.id}
              policial={policial}
              showExpandToggle={policiais.length > 1}
            />
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPolicial}
          >
            <FontAwesome name="plus-circle" size={20} color={COLORS.ACCENT} />
            <Text style={styles.addButtonText}>Adicionar Policial</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            3.0 Finalização
          </Text>
          <Text style={styles.label}>Token do Relatório *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: COLORS.CARD }]}
            editable={false}
            placeholder={
              tokenRelatorio ||
              "O Token Único do Relatório será gerado ao finalizar"
            }
            placeholderTextColor={COLORS.SUB_TEXT}
            value={tokenRelatorio}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              Finalizar e Gerar Relatório
            </Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={COLORS.BACKGROUND}
              style={{ marginLeft: 10 }}
            />
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.BORDER,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.TEXT,
    marginBottom: 15,
    marginTop: 10,
  },
  itemCard: {
    backgroundColor: COLORS.CARD,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  itemCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TEXT,
    flexShrink: 1,
  },
  itemCardContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.BACKGROUND,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUND,
    overflow: "hidden",
    height: 45,
    justifyContent: "center",
  },
  pickerBase: {
    color: COLORS.TEXT,
  },
  inlineGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  inputContainerHalf: {
    width: "48%",
  },
  inputInline: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.BACKGROUND,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  pickerContainerInline: {
    height: 45,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 5,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    borderRadius: 8,
    backgroundColor: "#E3F2FD",
  },
  addButtonText: {
    marginLeft: 10,
    color: COLORS.ACCENT,
    fontWeight: "bold",
    fontSize: 16,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginTop: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: COLORS.DANGER,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
  },
  removeButtonText: {
    marginLeft: 10,
    color: COLORS.DANGER,
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.SUB_TEXT,
    fontStyle: "italic",
    paddingVertical: 10,
    paddingLeft: 5,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginTop: 30,
  },
  nextButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: 16,
    fontWeight: "bold",
  },
});
