import React from "react";
import { useFonts } from 'expo-font';
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View, StyleSheet, Image, Text } from "react-native";
import { Paleta } from "@/constants/Paleta";
import constants from "expo-constants";

// CAMBIAR TIPOS DE LETRAS SEGUN HAGA FALTA
export default function Lista() {
  return (
    <View>
      <View style={styles.HView}>
        <Image 
          source={require('@/assets/images/logoTest.png')}
          style={styles.logo}
        />
        <View style={styles.VDivider}></View>
        <Text style={styles.headerTitle}>Transportistas</Text>
      </View>
      <View style={styles.HDivider}></View>

      <TransportistaList />
    </View>
  );
}

const styles = StyleSheet.create({
  HView: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row',
    marginTop: constants.statusBarHeight + 20,
    alignItems: 'center',
    marginBottom: 8
  },
  logo: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
    top: 0
  },
  headerTitle: {
    marginLeft: 20,
    fontFamily: 'AppleGaramound-Bold',
    fontWeight: 'black',
    fontSize: 40,
    color: Paleta.semiDark
  },
  VDivider: {
    height: '80%',
    width: 2,
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