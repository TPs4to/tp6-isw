import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Transportista from '../transportistas/Transportista';
import Calificacion from '../Calificacion';
import { Paleta } from "@/constants/Paleta";
import { FlatList } from 'react-native-gesture-handler';
import ItemFormaPago from './ItemFormaPago';
import Boton from '../Boton';


interface PropsPopup {
  seleccionado: Transportista,
  onClose: () => void,
  onAccept: () => void
}

export default function PopupConfirmacion({seleccionado, onClose, onAccept}: PropsPopup) {
  const snapPoints = useMemo(() => ['50%'], []);
  const sheetRef = useRef<BottomSheet>(null);
  const handleClose = () => sheetRef.current?.close();
  const handleOpen = () => sheetRef.current?.expand();
  
  const renderFondo = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <BottomSheet 
      snapPoints={snapPoints} 
      ref={sheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderFondo}
      onClose={onClose}
    >
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.name}>{seleccionado.nombre}</Text>
          <Calificacion calificacion={seleccionado.calificacion} />
        </View>

        <View style={styles.HDivider}></View>

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

        <View>
          <Text style={styles.importeText}>Formas de pago: </Text>
          <View style={{width: '100%'}}>
            <FlatList 
              horizontal
              contentContainerStyle={styles.pagoContainer}
              style={{width: '100%'}}
              data={seleccionado.tipos_pago}
              renderItem={({item}) => 
                <ItemFormaPago descrip={item}/>
              }
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Boton texto='Aceptar' txtStyle={styles.button} onClick={onAccept}/>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Bogart-Bold',
    fontSize: 18,
  },
  pagoContainer: {
    alignItems: 'flex-end',
    flex: 1
  },
  btnContainer: {
    marginTop: 18
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
    marginTop: 15
  },
  importeText: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 25
  },
  importeNumber: {
    fontSize: 25,
    color: Paleta.semiDark
  }
});