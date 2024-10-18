
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'firebase'
import React, { useState } from 'react';

const Tab = createMaterialTopTabNavigator();


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
  //aqui você deve inserir as configurações para a conexão com o firebase
};
 
 if (!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
 }

const Formulario = () => {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [mensagem, setMensagem] = useState('')
   const handleSubmit = () => {
    const clientesRef = firebase.database().ref('/paciente')

    clientesRef.push({
      codigo: codigo,
      nome: nome,
      idade: idade,
    });

    Alert.alert(
    'Sucesso', 
    'Os dados foram enviados para o firebase.',  
    [
      {
        text: 'OK', 
        onPress: () => console.log("Alerta fechado")}
    ]
    );
    setMensagem('Os dados foram enviados para o firebase.')
       setTimeout(() => {
               setMensagem('');
           }, 3000);
    setCodigo('');
    setNome('');
    setIdade('');
   }

   return (
        <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Formulário do paciente</Text>
      <Text style={styles.label}>1. Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código"
        value={codigo}
             keyboardType="numeric"
        onChangeText={setCodigo}
      />
      <Text style={styles.label}>2. Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>3. Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        value={idade}
        keyboardType="numeric"
        onChangeText={setIdade}
      />
         <Text style={styles.label}>{mensagem}</Text>
      <Button title="Enviar" onPress={handleSubmit} />
    </ScrollView>
    </SafeAreaView>
   )
}

export default Formulario;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});