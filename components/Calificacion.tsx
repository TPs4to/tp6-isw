import React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from 'react-native';
import { Paleta } from "@/constants/Paleta";
import { FlatList } from "react-native-gesture-handler";
import { Icono } from "@/components/Icono";


interface PropsCalificacion {
  calificacion: number
}

export default function Calificacion(props: PropsCalificacion) {
  const [estrellas, setEstrellas] = useState<Array<string>>([]) 

  function calcEstrellas() {
    const cantidad = Math.floor(props.calificacion);
    let _estrellas = Array(5).fill("star-outline");
    _estrellas.fill("star", 0, cantidad);
    if ((props.calificacion - cantidad) >= 0.5) {
      _estrellas[cantidad] = "star-half";
    }

    setEstrellas(_estrellas);
  }

  useEffect(calcEstrellas, [])

  return (
    <View style={styles.HView}>
      <FlatList 
        horizontal
        style={styles.HView}
        data={estrellas}
        renderItem={({item}) => 
          <Icono name={item} size={20} color={Paleta.semiDark}/>
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  HView: {
    flexDirection: 'row',
    //alignItems: 'center'
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
  }
});