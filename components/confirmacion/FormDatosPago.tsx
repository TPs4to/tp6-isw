import React, { useEffect, useMemo, useState } from "react";
import { Paleta } from "@/constants/Paleta";
import { View, StyleSheet, Text, Image } from "react-native";
import Transportista from "../transportistas/Transportista";
import Calificacion from "../Calificacion";
import Boton from "../Boton";
import { RadioGroup } from "react-native-radio-buttons-group";
import { CreditCardFormData, CreditCardFormField, CreditCardInput, CreditCardView, LiteCreditCardInput } from "react-native-credit-card-input";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icons from 'react-native-credit-card-input/src/Icons';


interface PropsFormPago {
  seleccionado: Transportista
}

export default function FormDatosPago({seleccionado}: PropsFormPago) {
  const [metodoPago, setMetodoPago] = useState<string>('0');
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CreditCardFormData>();
  const [cardName, setCardname] = useState<string>();

  const metodosList = useMemo(() => {
    return seleccionado.tipos_pago.map(tipo => ({
      id: tipo,
      label: tipo,
      value: tipo,
      labelStyle: styles.radioText,
      size: 18
    }));
  }, []);

  function changeMetodoPago(metodo: string) {
    setMetodoPago(metodo);
    if (metodo !== 'Tarjeta') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  function cardInput(data: CreditCardFormData) {
    setCardData(data);
    setFormFilled(true);
    setFormValid(Boolean(data.valid && cardName));
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.name}>{seleccionado.nombre}</Text>
        <Calificacion calificacion={seleccionado.calificacion} />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>Retiro el</Text>
          <Text>{seleccionado.fecha_retiro}</Text>
        </View>

        <Image 
          source={require('@/assets/images/truck_anim.gif')}
          style={styles.truck}
        />

        <View style={styles.dateView}>
          <Text style={styles.dateText}>Llega el</Text>
          <Text>{seleccionado.fecha_entrega}</Text>
        </View>
      </View>

      <View style={styles.importe}>
        <Text style={styles.importeText}>Importe: </Text>
        <Text style={styles.importeNumber}>${seleccionado.precio}</Text>
      </View>

      <Text style={styles.importeText}>Formas de pago: </Text>
      <View style={styles.radioView}>
        <RadioGroup 
          containerStyle={styles.radioContainer}
          radioButtons={metodosList}
          onPress={changeMetodoPago}
          selectedId={metodoPago}
        />
      </View>

      {metodoPago === 'Tarjeta' &&
        <View style={{ marginTop: 13 }}>
          <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
            <View style={{ marginHorizontal: 15, alignSelf: 'stretch', flexGrow: 1 }}>
              <Text style={styles.cardLabel}>NOMBRE EN LA TARJETA</Text>
              <TextInput 
                placeholderTextColor={'darkgray'}
                autoCapitalize = {"characters"}
                style={styles.cardInput} 
                placeholder="Juan Lopez"
                onChangeText={setCardname}
                maxLength={26}
                autoCorrect={false}
              >
              </TextInput>
            </View>

            {(cardData?.values.type === 'mastercard' || cardData?.values.type === 'visa') &&
              <Image 
                style={styles.icon}
                source={{ uri: Icons[cardData?.values.type] }}
              />
            }
          </View>

          <CreditCardInput
            inputStyle={styles.cardInput} 
            labelStyle={styles.cardLabel}
            labels={labels} 
            placeholders={placeholders}
            onChange={cardInput}
          />
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.errorPill, (!cardName || cardName.length < 1) ? styles.show : styles.none]}>
              <Text style={styles.error}>Nombre</Text>
            </View>
            <View style={[styles.errorPill, cardData?.status.number !== 'valid' ? styles.show : styles.none]}>
              <Text style={styles.error}>Numero</Text>
            </View>
            <View style={[styles.errorPill, cardData?.status.expiry !== 'valid' ? styles.show : styles.none]}>
              <Text style={styles.error}>Vencimiento</Text>
            </View>
            <View style={[styles.errorPill, cardData?.status.cvc !== 'valid' ? styles.show : styles.none]}>
              <Text style={styles.error}>CVC</Text>
            </View>
          </View>
        </View>
      }

      <View style={styles.btnContainer}>
        <Boton texto={`Aceptar${metodoPago === 'Tarjeta' ? ' y Pagar' : ''}`} txtStyle={styles.button} disabled={!formValid} onClick={() => {}}/>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  radioView: {
    flexDirection: 'row',
    marginBottom: 10
  },
  button: {
    fontFamily: 'Bogart-Bold',
    fontSize: 18,
  },
  radioContainer: {
    alignItems: 'flex-start'
  },
  radioText: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 15
  },
  btnContainer: {
    marginTop: 20,
  },
  name: {
    fontFamily: 'Bogart-Bold',
    fontSize: 28,
    marginBottom: -5
  },
  truck: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
    top: 0
  },
  HDivider: {
    marginVertical: 18,
    backgroundColor: '#B0B0B0',
    height: 2,
    borderRadius: 3
  },
  mainContainer: {
    margin: 10,
    marginHorizontal: 30
  },
  dateContainer: {
    marginTop: 10,
    backgroundColor: Paleta.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 10
  },
  dateView: {
    alignItems: 'center'
  },
  dateText: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 15,
  },
  importe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  importeText: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 25
  },
  none: {
    display: 'none'
  },
  show: {
    display: 'flex'
  },
  importeNumber: {
    fontSize: 25,
    color: Paleta.semiDark
  },
  cardInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingLeft: 9,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 5,
    height: 40,
    fontSize: 16
  },
  cardLabel: {
    fontFamily: 'Recoleta-Regular'
  },
  icon: {
    width: 60,
    height: 40,
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 2,
    marginLeft: -15
  },
  cardIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }, 
  error: {
    color: 'black'
  },
  errorPill: {
    backgroundColor: '#ff7070',
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 5
  }
});

const labels = {
  number: 'NUMERO DE TARJETA',
  expiry: 'VENCIMINETO',
  cvc: 'CVC'
}

const placeholders = {
  number: '1234 5678 1234 5678',
  expiry: 'MM/AA',
  cvc: 'CVC'
}