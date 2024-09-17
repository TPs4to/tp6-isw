import React, { useState } from "react";
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View, StyleSheet, Image, Text } from "react-native";
import { Paleta } from "@/constants/Paleta";
import constants from "expo-constants";
import PopupConfirmacion from "@/components/confirmacion/PopupConfirmacion";
import Transportista from "@/components/transportistas/Transportista";
import FormDatosPago from "@/components/confirmacion/FormDatosPago";


export default function Lista() {
  const [seleccionado, setSeleccionado] = useState<Transportista | null>(null);
  const [frmPagoActive, setFrmPagoActive] = useState<boolean>(false);

  function handleSeleccion(selec: Transportista) {
    setSeleccionado(selec);
  }

  function handleCancel() {
    setSeleccionado(null);
  }

  function handleAccept() {
    setFrmPagoActive(true);
  }

  function list() {
    return (
      <>
        <TransportistaList selectHandler={handleSeleccion}/>
        { seleccionado ? <PopupConfirmacion seleccionado={seleccionado} onClose={handleCancel} onAccept={handleAccept} /> : null}
      </>
    );
  }

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View style={styles.HView}>
        <Image 
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        
        <View style={styles.VDivider}></View>
        <Text style={styles.headerTitle}>
          {frmPagoActive ? 'Pago' : 'Cotizaciones'}
        </Text>
      </View>

      <View style={styles.HDivider}></View>

      {!frmPagoActive && 
        <>
          <TransportistaList selectHandler={handleSeleccion}/>
          { seleccionado ? <PopupConfirmacion seleccionado={seleccionado} onClose={handleCancel} onAccept={handleAccept} /> : null}
        </>
      }

      {frmPagoActive && seleccionado && <FormDatosPago seleccionado={seleccionado}/>}
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
    marginLeft: 18,
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