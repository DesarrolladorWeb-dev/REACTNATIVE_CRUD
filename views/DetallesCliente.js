import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import {Headline, Text , Subheading , Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'
const DetallesCliente = ({navigation, route}) => {
    const {guardarConsultarAPI} = route.params;
    const {nombre, telefono , correo , empresa, id} = route.params.item;

    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Desear eliminar este cliente?',
            'Un contacto eliminado no se puede eliminar',
            [
                {text: 'Si, Eliminar', onPress : () => eliminarContacto()},
                {text: 'Cancelar' , style: 'cancel'}
            ]
        )
    }
    const eliminarContacto = async () => {
        const url=`http://192.168.1.10:3000/clientes/${id}`
        try {

            await axios.delete(url);
        } catch (error) {
            console.log(error)
        }
        // redireccionar 
        navigation.navigate('Inicio')
        // volver a consultar la api
        guardarConsultarAPI(true); //para que nos vuelva a hacer la consulta
    }

    return ( 
        <View style={globalStyles.contenedor}>
            <Headline style = {globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading> </Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading> </Text>
            <Text style={styles.texto}>telefono: <Subheading>{telefono}</Subheading> </Text>
            <Button
                style={styles.boton}
                mode="contained" 
                icon="cancel" 
                onPress={() => mostrarConfirmacion()}
                >Eliminar Cliente
            </Button>
            <FAB 
                icon="pencil"  
                style={globalStyles.fab}
                // para irnos al nuevo cliente
                onPress={() => navigation.navigate("NuevoCliente", {cliente: route.params.item,  guardarConsultarAPI}) }
            />
        </View>
     );
}
const styles = StyleSheet.create({
    texto:{
        marginBottom: 20,
        fontSize: 18,

    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})
 
export default DetallesCliente;