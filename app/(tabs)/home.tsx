import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#c79a48' }}
      headerImage={
        <Image
          source={require('@/assets/images/truck.gif')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TangoAPP</ThemedText>
        <HelloWave />  {/* CAMBIAR COMPONENTE*/}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tu nueva forma enviar</ThemedText>
        <ThemedText>
          Te conectamos con una red de transportistas para que puedas tomar la mejor desicion que se ajuste a lo que necesitas.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nuestras opciones, tu eleccion</ThemedText>
        <ThemedText>
          Encuentra el mejor precio para tu envio y elije la forma de pago que quieras.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">"El Uber de los fletes"</ThemedText>
        <ThemedText>
          Venimos a revolucionar el mercado de los fletes para traerte la mayor comodidad a la hora de contratar uno.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
