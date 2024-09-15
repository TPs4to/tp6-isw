import React from "react";
import { Image, StyleSheet, View, Text, Button } from 'react-native';
import Transportista from "./Transportista";
import { Paleta } from "@/constants/Paleta";
import Calificacion from "./Calificacion";
import Boton from "../Boton";

interface ItemListaProps {
  item: Transportista,
  handleSelect: (item: Transportista) => void
}

export default function ItemTransportistaList({item, handleSelect}: ItemListaProps) {
  return(
    <View key={item.uuid} style={styles.HView}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nombre}</Text>
      </View>

      <View style={[styles.cell, styles.starCell]}>
        <Calificacion calificacion={item.calificacion} />
      </View>

      <View style={styles.cell}>
        <Boton texto={"$"+item.precio} onClick={() => {handleSelect(item)}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HView: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5
  },
  cell: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  starCell: {
    alignItems: 'center'
  },
  cellText: {
    //fontFamily: 'Bogart-Medium',
    fontFamily: 'Recoleta-Regular',
    fontSize: 15,
  },
  VDivider: {
    height: '80%',
    width: 1,
    borderRadius: 3,
    backgroundColor: '#B0B0B0'
  },
  HDivider: {
    marginTop: 3,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#B0B0B0',
    height: 2,
    borderRadius: 3
  },
});