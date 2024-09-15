import React from "react";
import { useFonts } from 'expo-font';
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View, StyleSheet, Image, Text } from "react-native";

// CAMBIAR TIPOS DE LETRAS SEGUN HAGA FALTA
export default function Lista() {
  return (
    <View>
      <View style={styles.HView}>
        <Image 
          source={require('@/assets/images/logoTest.png')}
          style={styles.logo}
        />
        <Text>Transportistas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  logo: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
    top: 0
  },
  header: {

  }
});