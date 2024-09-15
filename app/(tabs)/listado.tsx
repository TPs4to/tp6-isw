import React from "react";
import { useFonts } from 'expo-font';
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View, StyleSheet, Image, Text } from "react-native";
import { Paleta } from "@/constants/Paleta";
import constants from "expo-constants";


export default function Lista() {
  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
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
    marginLeft: 10,
    flexDirection: 'row',
    marginTop: constants.statusBarHeight + 5,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 100,
    height: 40,
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
    height: '50%',
    width: 2,
    borderRadius: 3,
    backgroundColor: '#B0B0B0'
  },
  HDivider: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#B0B0B0',
    height: 2,
    borderRadius: 3
  }
});