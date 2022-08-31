import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'
import api from './src/services/api'

export default function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  const buscarCep = async()=>{
    if (!input){
      return
    }
    try {
      const response = await api.get(`${input}/json/`)
      setCep(response.data)
      setInput("")
    } catch (error) {
      alert("ops, cep não encontrado")
      setInput("")
    }
   
  }
  return (
    <View style={styles.container}>
    <LinearGradient style={styles.gradient} colors={['#121212', '#212b46']}>
      <Text style={styles.titulo}>Buscador de cep</Text>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
      placeholder="digite seu cep..." 
      style={styles.input}
      placeholderTextColor="#FFF"
      onChangeText={(texto)=>setInput(texto)}
      keyboardType="numeric"
      value={input}
      />
      <TouchableOpacity onPress={buscarCep}>
      <AntDesign name="search1" style={{marginLeft: -40,}} size={24} color="white" />
      </TouchableOpacity>
      </View>
      {Object.keys(cep).length > 0 &&(
      <View style={styles.resultados}>
        <Text style={styles.cep}>cep: {cep.cep}</Text>
        <Text style={styles.dataCep}> {cep.logradouro}</Text>
        <Text style={styles.dataCep}>complemento: {cep.complemento}</Text>
        <Text style={styles.dataCep}>bairro: {cep.bairro} </Text>
        <Text style={styles.dataCep}>{cep.uf}, {cep.localidade}</Text>
      </View>)}
    </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
     height: '100%',
     width: '100%',  
    alignItems: 'center',
    justifyContent: 'center',

  },
  titulo: {
    fontSize: 30,
    color:'#fff',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 20,
    width: 290,
    height: 45,
    paddingStart: 25,
    borderRadius: 10,
    color: '#fff',
  },
  resultados:{
   marginTop: 30,
   backgroundColor: '#fff',
   paddingVertical: 15,
   paddingHorizontal: 30,
   borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cep:{
    fontSize: 30,
    fontWeight: 'bold', 
  },
  dataCep: {
    fontSize: 20,
    marginTop: 4
  }
});
