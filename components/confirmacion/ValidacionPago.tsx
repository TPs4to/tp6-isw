import { CreditCardFormData } from "react-native-credit-card-input";
import { Paleta } from "@/constants/Paleta";
import { View, StyleSheet, Text, Image, ActivityIndicator, Linking} from "react-native";
import { CardInfo } from "./FormDatosPago";
import { useEffect, useState } from "react";
import Transportista from "../transportistas/Transportista";
import Icons from 'react-native-credit-card-input/src/Icons';
import { CreditCardIssuer } from "react-native-credit-card-input/lib/typescript/src/useCreditCardForm";
import Boton from "../Boton";
import axios from "axios";


interface PropsPago {
  cardData?: CardInfo,
  metodoPago: string,
  transportista: Transportista,
  handleRetry: () => void
}

enum ScreenState {
  LOADING = "Procesando pago...",
  OK = "Todo listo!",
  ERROR = "Hubo un problema"
}

const locations = {
  retiro: 'Laprida 984',
  entrega: 'Del Peje 9165'
}

const tipo = 'Paquete'

const emptyCards = [
  '4508 7500 1574 1019'
];

const URL = 'https://mxag8j0yx2.execute-api.sa-east-1.amazonaws.com/api-v1/aceptar';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const rnd = (a: number, b: number) => Math.floor(Math.random()*(b-a) + a); 

export default function ValidacionPago({ cardData, metodoPago, transportista, handleRetry }: PropsPago) {
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.LOADING);
  const [transacID, setTransacID] = useState<string | null>(null);
  const [cardType, setCardType] = useState<CreditCardIssuer>('visa');

  useEffect(() => {
    if (metodoPago !== 'Tarjeta') {
      setScreenState(ScreenState.OK);
      sendAccept();
    } else {
      setCardType(cardData?.tipo === 'mastercard' ? 'mastercard' : 'visa');
      processPayment();
    }
  }, []);

  async function processPayment() {
    await delay(rnd(1000, 3000));
    if (emptyCards.includes(cardData?.numero!)) {
      await delay(1000);
      setScreenState(ScreenState.ERROR);
    } else {
      setScreenState(ScreenState.OK);
      setTransacID(String(rnd(100000000, 999999999)));
      sendAccept();
    }
  }

  async function sendAccept() {
    axios.post(URL, {
      dador: 'Matias Sampieri',
      tipo: tipo,
      fecha_retiro: transportista.fecha_retiro,
      direc_retiro: locations.retiro,
      fecha_entrega: transportista.fecha_entrega,
      direc_entrega: locations.entrega,
      imagen: 'https://i.ibb.co/5sHrvvt/IMG-2323.jpg',
      email: 'elmatisampie@gmail.com'
    })
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
        {transacID && <Text style={styles.refnum}>Numero de referencia de pago: #{transacID}</Text>}
      </View>

      <View style={[styles.errorMsg, screenState === ScreenState.ERROR ? styles.show : styles.hide]}>
        <Text style={styles.errorText}>Saldo Insuficiente</Text>
        <View style={{ marginVertical: 10 }}></View>
        <Boton texto='Volver atras' onClick={handleRetry} btnStyle={styles.button} txtStyle={styles.btnTxt}/>
      </View>

      <View style={[styles.summary, screenState === ScreenState.OK ? styles.show : styles.hide]}>
        <View style={styles.HView}>
          <Text>Medio de pago:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {metodoPago === 'Tarjeta' && <Image 
              style={styles.iconCard}
              source={{ uri: Icons[cardType] }}
            />}
            <Text>
              {metodoPago === 'Tarjeta' ? 
                `${cardData?.tipo} (${cardData?.numero?.slice(-4)})` : 
                metodoPago}
            </Text>
          </View>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Importe:</Text>
          <Text>${transportista.precio}</Text>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Tipo de Carga:</Text>
          <Text>{tipo}</Text>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Retiro el {transportista.fecha_retiro} de:</Text>
          <Text>{locations.retiro}</Text>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Entrega el {transportista.fecha_entrega} en:</Text>
          <Text>{locations.entrega}</Text>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Transportista:</Text>
          <Text>{transportista.nombre}</Text>
        </View>

        <View style={styles.HDivider}></View>
        <View style={styles.HView}>
          <Text>Contacto:</Text>
          <Text onPress={() => {Linking.openURL(`tel:${transportista.telefono}`)}}>
            {transportista.telefono}
          </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  errorText: {
    fontFamily: 'Bogart-Bold',
    alignSelf: 'center',
    marginTop: 10
  },
  refnum: {
    marginTop: 10,
    color: 'lightgray'
  },
  button: {
    backgroundColor: '#fac020'
  },
  btnTxt: {
    color: 'black'
  },
  HView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  summary: {
    backgroundColor: Paleta.light,
    padding: 10,
    borderRadius: 8,
    width: '90%',
    margin: 20
  },
  errorMsg: {
    backgroundColor: '#ff7070',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    margin: 20
  },
  HDivider: {
    marginVertical: 10,
    backgroundColor: '#B0B0B0',
    height: 1,
    borderRadius: 3
  },
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
  },
  iconCard: {
    width: 30,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  }
});