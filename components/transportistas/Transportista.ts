export default interface Transportista {
    uuid: string,
    nombre: string,
    calificacion: number,
    telefono: string,
    precio: number,
    fecha_retiro: string,
    fecha_entrega: string,
    tipos_pago: string[]
}