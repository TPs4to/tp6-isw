import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "react-native"
import ItemTransportistaList from "./ItemTransportistaList";
import { FlatList } from "react-native-gesture-handler";

interface Transportista {
    id: number,
    nombre: string,
    calificacion: number,
    costo: number
}



export default function TransportistaList() {


    const [datos, setDatos] = useState<Transportista[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    async function traerDatos() {
        
        try {
            const response = await axios.get<Transportista[]>('');
            setDatos(response.data)
            setLoading(true)
        } catch (error) {
            console.log("Error al cargar Datos" + error)
            setLoading(false)
            
        }
    }

    useEffect(() => {traerDatos(), []})
    
    if (loading) {
        return (
            <FlatList 
            data={[{
                id: 1,
                nombre: 'jorge',
                calificacion: 4,
                costo: 50
            },
            {
                id: 2,
                nombre: 'jorge',
                calificacion: 4,
                costo: 50
            }]}
            renderItem={({item}) => (
                <ItemTransportistaList {...item}></ItemTransportistaList>
            )}>
            </FlatList>
        )
    } else {
        return (
            <Text>Error :C</Text>
        )
    }
    
}