import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function Icono({ name, ...rest }: any) {
  return <Ionicons name={name} {...rest} />;
}
