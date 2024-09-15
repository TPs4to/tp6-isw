import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, View, StyleSheet } from "react-native"
import ItemTransportistaList from "./ItemTransportistaList";
import { FlatList } from "react-native-gesture-handler";
import Transportista from "./Transportista";
import { Paleta } from "@/constants/Paleta";


export default function TransportistaList() {
  const [datos, setDatos] = useState<Transportista[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  async function traerDatos() {

    try {
      const response = await axios.get<Transportista[]>('https://mxag8j0yx2.execute-api.sa-east-1.amazonaws.com/api-v1/transportistas');
      setDatos(response.data)
      setLoading(false)
    } catch (error) {
      console.log("Error al cargar Datos" + error)
    }
  }

  useEffect(() => {traerDatos()}, [])

  if (!loading) {
    return (
      <View>
        <View style={styles.HView}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerTitle}>Nombre</Text>
          </View>
          <View style={styles.VDivider}></View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerTitle}>Calificación</Text>
          </View>
          <View style={styles.VDivider}></View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerTitle}>Cotización</Text>
          </View>
        </View>
        <FlatList 
          data={datos}
          renderItem={({item}) => 
            <ItemTransportistaList {...item} />
          }
        />
      </View>
    )
  } else {
    return (
      <View>
        <ActivityIndicator style={styles.spinner} size="large" color={Paleta.medium}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 100
  },
  HView: {
    flexDirection: 'row',
    marginTop: 20,
    alignContent: 'center',
    marginBottom: 8,
    width: '100%'
  },
  tableHeader: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'Bogart-Bold',
    fontSize: 19
  },

  VDivider: {
    height: '90%',
    width: 1,
    borderRadius: 3,
    backgroundColor: '#808080'
  },
  HDivider: {
    marginTop: 3,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#B0B0B0',
    height: 2,
    borderRadius: 3
  }
});