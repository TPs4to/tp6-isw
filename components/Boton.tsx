import React from "react";
import { Pressable } from "react-native";
import { Paleta } from "@/constants/Paleta";
import { View, StyleSheet, Text } from "react-native";


interface BotonProps {
  texto: string,
  onClick: () => void,
  txtStyle?: any,
  disabled?: boolean
}

export default function Boton({texto, onClick, txtStyle, disabled}: BotonProps) {
  return (
    <Pressable 
      disabled={disabled}
      style={({pressed}) => [
        styles.button, 
        pressed ? styles.click : {}, 
        disabled ? styles.disabled : {}
      ]} 
      onPress={() => onClick()}
    >
      <Text style={[styles.text, txtStyle]}>{texto}</Text>
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
  }, 
  disabled: {
    backgroundColor: '#D0D0D0'
  } 
});