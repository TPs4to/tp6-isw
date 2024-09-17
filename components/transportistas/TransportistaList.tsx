import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native"
import ItemTransportistaList from "./ItemTransportistaList";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import Transportista from "./Transportista";
import PopupConfirmacion from "../confirmacion/PopupConfirmacion";

interface PropsLista {
  selectHandler: (seleccionad: Transportista) => void
}

export default function TransportistaList({selectHandler}: PropsLista) {
  const [datos, setDatos] = useState<Transportista[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  async function traerDatos() {
    try {
      setLoading(true);
      console.log('reload!')
      const response = await axios.get<Transportista[]>('https://mxag8j0yx2.execute-api.sa-east-1.amazonaws.com/api-v1/transportistas');
      setDatos(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error al cargar Datos: " + error);
    }
  }

  useEffect(() => {traerDatos()}, [])

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
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
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={traerDatos}/>
        }
        data={datos}
        style={styles.list}
        renderItem={({item}) => 
          <ItemTransportistaList item={item} handleSelect={selectHandler}/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18
  },
  list: {
    height: '100%'
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