import React from "react";
import { Image, StyleSheet, Platform} from 'react-native';

import {Text, View} from 'react-native';
import Transportista from "./Transportista";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box } from "@/components/ui/box";
import { HStack } from "../ui/hstack";
import { GridItem } from "../ui/grid";
import { VStack } from "../ui/vstack";
import { Button, ButtonText } from "../ui/button";


export default function ItemTransportistaList(transportista: Transportista) {
  return(
    <GridItem _extra={{className: "col-span-12 sm:col-span-6 lg:col-span-4"}} key={transportista.uuid}>
      <HStack 
        space="md" 
        className="border border-border-300 rounded-lg p-4 items-center justify-between"
      >
        <VStack>
          <Text className="font-semibold text-typography-900 line-clamp-1">
            {transportista.nombre}
          </Text>
          <Text className="line-clamp-1">
            Calificación: {transportista.calificacion}
          </Text>
        </VStack>
        <Button size="xs">
          <ButtonText>${transportista.precio}</ButtonText>
        </Button>
      </HStack>
    </GridItem>
  )
}