import React, {useEffect, useState} from 'react'
import { Text,FlatList , View} from 'react-native'; 
import axios from 'axios';
import {List, Headline , Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global';
const Inicio = ({navigation}) => {
    // State de la app
    const [clientes, guardarClientes] = useState([]);
    // Si agrego nuevo cliente debe mostrarse
    const [consultarAPI , guardarConsultarAPI] = useState(true);

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const resultado = await axios.get('http://192.168.1.10:3000/clientes')
                guardarClientes(resultado.data)
                // TODO cada vez que cambie de true a false se estara ejecutando el useEffect
                guardarConsultarAPI(false) //una vez ya creado debemos pasarlo a false
                
            } catch (error) {
                console.log(error)
            }
         
        }
         if(consultarAPI){ //pasara porque es true
                obtenerClientesApi()
            }
            // cada vez que cambia se estara ejecutando todo el tiempo
    }, [consultarAPI])

    return ( 
        <View  style={globalStyles.contenedor}>
            {/* LE PASAREMOS LA FUNCION DE CONSULTAR API - de esta manera podremos pasar funciones a los componentes*/}
            <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI}) }>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}>  {clientes.length > 0 ?  "Clientes" : "Aun no hay Clientes"} </Headline>
            <FlatList 
                data={clientes}
                // De esta menera le pasamos el key
                keyExtractor={cliente => (cliente.id).toString() }
                // Itera con los datos pasados
                renderItem={({item}) => (
                    <List.Item 
                        title={item.nombre}
                        description={item.empresa}
                        // Le pasamos guardar Consultar Api
                        onPress={() => navigation.navigate("DetallesCliente", {item, guardarConsultarAPI}) }
                    />
                )}
            /> 
            <FAB 
                icon="plus"  
                style={globalStyles.fab}
                // para irnos al nuevo cliente
                onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI}) }
            />
        </View>
     );
}

export default Inicio;