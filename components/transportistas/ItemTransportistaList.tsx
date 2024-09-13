import React from "react";
import {Text, View} from 'react-native';
import Transportista from "./Transportista";

export default function ItemTransportistaList(transportista: Transportista) {
    return(
        <View key={transportista.uuid}>
            <Text>Nombre: {transportista.nombre}</Text>
            <Text>Calificacion: {transportista.calificacion}</Text>
            <Text>Costo: {transportista.precio}</Text>
        </View>
    )
}