import React, { useState } from "react";
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View, StyleSheet, Image, Text } from "react-native";
import { Paleta } from "@/constants/Paleta";
import constants from "expo-constants";
import PopupConfirmacion from "@/components/confirmacion/PopupConfirmacion";
import Transportista from "@/components/transportistas/Transportista";
import FormDatosPago, { CardInfo } from "@/components/confirmacion/FormDatosPago";
import ValidacionPago from "@/components/confirmacion/ValidacionPago";
import { CreditCardFormData } from "react-native-credit-card-input";

enum Screen {
  LIST,
  PAYMENT,
  CONFIRMATION
}

export default function Lista() {
  const [seleccionado, setSeleccionado] = useState<Transportista | null>(null);
  const [frmPagoActive, setFrmPagoActive] = useState<boolean>(false);
  const [validacionPago, setValidacionPago] = useState<boolean>(false);

  const [screen, setScreen] = useState<Screen>(Screen.LIST);

  const [cardData, setCardData] = useState<CardInfo>();
  const [metodo, setMetodo] = useState<string>();

  function handleSeleccion(selec: Transportista) {
    setSeleccionado(selec);
  }

  function handleCancel() {
    setSeleccionado(null);
  }

  function handleContinue() {
    setScreen(Screen.PAYMENT);
  }

  function handleAccept(metodo: string, cardData?: CardInfo) {
    setScreen(Screen.CONFIRMATION);
    setMetodo(metodo);
    setCardData(cardData);
  }

  function list() {
    return (
      <>
        <TransportistaList selectHandler={handleSeleccion}/>
        { seleccionado ? <PopupConfirmacion seleccionado={seleccionado} onClose={handleCancel} onAccept={handleContinue} /> : null}
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
          {screen === Screen.LIST ? 'Cotizaciones' : 'Pago'}
        </Text>
      </View>

      <View style={styles.HDivider}></View>

      {screen === Screen.LIST && 
        <>
          <TransportistaList selectHandler={handleSeleccion}/>
          { seleccionado ? <PopupConfirmacion seleccionado={seleccionado} onClose={handleCancel} onAccept={handleContinue} /> : null }
        </>
      }

      {screen === Screen.PAYMENT && seleccionado && <FormDatosPago seleccionado={seleccionado} handleAccept={handleAccept}/>}
      {screen === Screen.CONFIRMATION && seleccionado && metodo &&
        <ValidacionPago metodoPago={metodo} cardData={cardData} />
      }
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