import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";

// Importe todos os seus componentes de tela
import TelaInicial from "./screens/TelaInicial";
import Iniciologin from "./screens/Iniciologin";
import CadastroPrincipal from "./screens/CadastroPrincipal";
import MenuPrincipal from "./screens/MenuPrincipal";
import DadosPessoais from "./screens/DadosPessoais";
import Endereco from "./screens/Endereco";
import Caracteristicas from "./screens/Caracteristicas";
import DadosDoFato from "./screens/DadosDoFato";
import Apreensoes from "./screens/Apreensoes";
import Logindireto from "./screens/Logindireto";
import RelatorioFinal from "./screens/RelatorioFinal";
import FinalRelatorio from "./screens/FinalRelatorio";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          // Define TelaInicial como a tela de início
          initialRouteName="TelaInicial"
          screenOptions={{
            // Estilo global do cabeçalho, usado se 'headerShown' for true
            headerStyle: { backgroundColor: "#121212" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          {/* =================================================== */}
          {/* TELAS DE INÍCIO E AUTENTICAÇÃO (Transição Limpa/Sem Header) */}
          {/* Usamos headerShown: false para a transição limpa */}
          {/* =================================================== */}

          <Stack.Screen
            name="TelaInicial"
            component={TelaInicial}
            options={{ headerShown: false }} // 1. Primeira tela: Sem cabeçalho
          />
          <Stack.Screen
            name="Logindireto"
            component={Logindireto}
            options={{ headerShown: false }} // 2. Login: Sem cabeçalho para fluidez
          />
          <Stack.Screen
            name="Iniciologin"
            component={Iniciologin}
            options={{ headerShown: false }} // 3. Login Alternativo: Sem cabeçalho
          />
          <Stack.Screen
            name="CadastroPrincipal"
            component={CadastroPrincipal}
            options={{ title: "Novo Cadastro", headerShown: false }} // 4. Cadastro: Sem cabeçalho
          />

          {/* =================================================== */}
          {/* TELAS PRINCIPAIS E FLUXOS DE FORMULÁRIO (Com Header para Navegação) */}
          {/* Manter o header (headerShown: true por padrão) para dar o botão "Voltar" */}
          {/* =================================================== */}

          <Stack.Screen
            name="MenuPrincipal"
            component={MenuPrincipal}
            options={{ title: "Menu Principal", headerShown: false }} // Sem cabeçalho aqui, pois é a tela principal
          />
          <Stack.Screen
            name="DadosDoFato"
            component={DadosDoFato}
            options={{ title: "1. Dados do Fato" }}
          />
          <Stack.Screen
            name="DadosPessoais"
            component={DadosPessoais}
            options={{ title: "2. Dados Do Envolvido" }}
          />
          <Stack.Screen
            name="Endereco"
            component={Endereco}
            options={{ title: "3. Endereço" }}
          />
          <Stack.Screen
            name="Caracteristicas"
            component={Caracteristicas}
            options={{ title: "4. Características" }}
          />
          <Stack.Screen
            name="Apreensoes"
            component={Apreensoes}
            options={{ title: "5. Apreensões" }}
          />
          <Stack.Screen
            name="RelatorioFinal"
            component={RelatorioFinal}
            options={{ title: "Criando Relatório" }}
          />
          <Stack.Screen
            name="FinalRelatorio"
            component={FinalRelatorio}
            options={{ title: "Relatório" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
