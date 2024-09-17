import { View, StyleSheet, Image, Text } from "react-native";
import { Paleta } from "@/constants/Paleta";


interface PropsFormaPago {
  descrip: string
}

export default function ItemFormaPago({descrip}: PropsFormaPago) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{descrip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Paleta.light,
    borderRadius: 5,
    marginRight: 5,
    alignContent: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  text: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'Recoleta-Regular',
    fontSize: 13
  }
});