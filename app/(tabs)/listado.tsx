import React from "react";
import TransportistaList from "@/components/transportistas/TransportistaList";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native-gesture-handler";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

// CAMBIAR TIPOS DE LETRAS SEGUN HAGA FALTA
export default function Lista() {
  return (
    <Box className="flex-1">
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100, flexGrow: 1}}
        className="flex-1 mb-20 md:mb-2"
      >
        <VStack className="p-4 pb-0 md:px-10 md:pt-6 w-full" space="2xl">
          <Heading size="2xl" className="font-roboto">
            Lista de Transportistas
          </Heading>

          <TransportistaList />
        </VStack>
      </ScrollView>
    </Box>
  )
}