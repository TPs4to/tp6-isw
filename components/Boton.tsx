import React from "react";
import { Pressable } from "react-native";
import { Paleta } from "@/constants/Paleta";
import { View, StyleSheet, Text } from "react-native";


interface BotonProps {
  texto: string,
  onClick: () => void
}

export default function Boton({texto, onClick}: BotonProps) {
  return (
    <Pressable 
      style={({pressed}) => [styles.button, pressed ? styles.click : {}]} 
      onPress={() => onClick()}
    >
      <Text style={styles.text}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Paleta.semiDark,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF'
  },
  click: { 
    backgroundColor: Paleta.medium
  } 
});