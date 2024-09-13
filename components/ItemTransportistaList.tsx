import React from "react";
import {Text, View} from 'react-native';

interface ItemTransportistaListProps {
    id: number;
    nombre: string;
    calificacion: number;
    costo: number;
  }

export default function ItemTransportistaList(props: ItemTransportistaListProps) {
    return(
        <View key={props.id}>
            <Text>Nombre: {props.nombre}</Text>
            <Text>Calificacion: {props.calificacion}</Text>
            <Text>Costo: {props.costo}</Text>
        </View>
    )
}