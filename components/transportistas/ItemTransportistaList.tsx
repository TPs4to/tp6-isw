import React from "react";
import { Image, StyleSheet, Platform } from 'react-native';

import {Text, View} from 'react-native';
import Transportista from "./Transportista";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box } from "@/components/ui/box";


export default function ItemTransportistaList(transportista: Transportista) {
  return(

    <Box key={transportista.uuid}>
      <ThemedText>
        <ThemedText type="title">{transportista.nombre}</ThemedText>
        <ThemedText type="subtitle" style={styles.precio}>${transportista.precio}</ThemedText>
      </ThemedText>
    
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {

  },

  precio: {
    flexDirection: 'row',
    marginRight: 0,
    textAlign: 'right'
  }
})