import { CreditCardFormData } from "react-native-credit-card-input";
import { Paleta } from "@/constants/Paleta";
import { View, StyleSheet, Text, Image, ActivityIndicator} from "react-native";
import { CardInfo } from "./FormDatosPago";
import { useEffect, useState } from "react";

interface PropsPago {
  cardData?: CardInfo,
  metodoPago: string
}

enum ScreenState {
  LOADING = "Procesando pago...",
  OK = "Todo listo!",
  ERROR = "Hubo un problema"
}

export default function ValidacionPago({ cardData, metodoPago }: PropsPago) {
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.LOADING);
  const [statusLabel, setStatusLabel] = useState<string>();

  useEffect(() => {
    if (metodoPago !== 'Tarjeta') {
      setScreenState(ScreenState.OK);
    } else {

    }
  }, []);

  async function processPayment() {

  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.center}>
        <Image
          style={[styles.iconError, screenState === ScreenState.ERROR ? styles.show : styles.hide]}
          source={require('@/assets/images/close.png')}
        />
        <Image
          style={[styles.iconOk, screenState === ScreenState.OK ? styles.show : styles.hide]}
          source={require('@/assets/images/checkmark.png')}
        />
        <ActivityIndicator size='large' style={[styles.spinner, screenState === ScreenState.LOADING ? styles.show : styles.hide]}/>
        <Text style={styles.status}>{screenState}</Text>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  spinner: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    marginBottom: 19
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginTop: 15,
    fontSize: 25,
    fontFamily: 'Recoleta-Regular',
    color: 'gray'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'flex'
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  },
  iconOk: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  iconError: {
    resizeMode: 'contain',
    width: 75,
    height: 100,
  }
});