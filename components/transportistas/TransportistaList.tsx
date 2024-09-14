import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "react-native"
import ItemTransportistaList from "./ItemTransportistaList";
import { FlatList } from "react-native-gesture-handler";
import Transportista from "./Transportista";
import { Spinner } from '@/components/ui/spinner';
import { Grid, GridItem } from "@/components/ui/grid";



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
      <Grid className="gap-5" _extra={{className: "gap-5"}}>
        {datos.map((item, index) => {
          return <ItemTransportistaList {...item} key={item.uuid}/>
        })}
      </Grid>
    )
  } else {
    return (
      <Spinner size="large" />
    )
  }

}