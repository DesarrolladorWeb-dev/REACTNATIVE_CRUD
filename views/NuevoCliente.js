import React , {useState , useEffect}from 'react'
import {View, Text, StyleSheet, Platform } from 'react-native'; 
import { TextInput , Headline , Button, Paragraph,  Dialog, Portal, PaperProvider} from 'react-native-paper'; 
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation ,route}) => {



    // Todo lo que pasaese en funciones y objetos estaran en route
    const {guardarConsultarAPI} = route.params; // aun sique en true

    // campos formulario
    const [nombre, guardarNombre] = useState('')
    const [telefono, guardarTelefono] = useState('')
    const [correo, guardarCorreo] = useState('')
    const [empresa, guardarEmpresa] = useState('')
    const [alerta, guardarAlerta] = useState(false)
    // Detectar si estamos editando o no 
    useEffect(() => {
        if (route.params.cliente) { 
            const {nombre, telefono, correo, empresa} = route.params.cliente;
            // Rellenamos los campos automaticamente
            guardarNombre(nombre)
            guardarTelefono(telefono)
            guardarCorreo(correo)
            guardarEmpresa(empresa)
        }
    },[])

    // almacena el cliente en la BD
    const guardarCliente = async () => {
        // validar 
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true)
            return;
        }
        // generar el cliente
        const cliente = { nombre, telefono, empresa, correo};
        console.log(cliente)
        
        // Si estamos editando o creando n nuevo cliente
        if(route.params.cliente) {
            const {id} = route.params.cliente;
            cliente.id = id;
            const url = `http://192.168.1.10:3000/clientes/${id}`;
            
            try {
                // url y luego con que lo vamos a actualizar
                await axios.put(url, cliente)
            } catch (error) {
                console.log(error)
            }
        }else{
             // guardar el cliente en la api
            try {
                if(Platform.OS === 'ios'){
                // para ios 
                await axios.post('http://localhost:3000/clientes', cliente)
                }else{
                // para android 
                await axios.post('http://192.168.1.10:3000/clientes', cliente)
                }
        
            } catch (error) {
                console.log(error)
            }
        }

        // redireccionar 
        navigation.navigate('Inicio');
        // limpiar el form
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

    // Cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true) 
    }

    return ( 
        // <PaperProvider> App.js
        <View style={globalStyles.contenedor }>
            {/* Es Como un H1 */}
            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
            <TextInput
                label="Nombre"
                placeholder='Fernando'
                onChangeText={texto => guardarNombre(texto)}
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Telefono"
                placeholder='1123123'
                onChangeText={texto => guardarTelefono(texto)}
                value={telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                placeholder='correo@gmail.com'
                onChangeText={texto => guardarCorreo(texto)}
                value={correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                placeholder='Nombre Empresa'
                onChangeText={texto => guardarEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />
            <Button
                icon="pencil-circle"
                mode='contained'
                onPress={() => guardarCliente()}
            >
                Guardar Cliente
            </Button>
            {/* En primera no se vera nada porque hay un prop que se llama visible */}
            
                <Portal>
                    <Dialog
                        visible={alerta}
                        onDismiss={() => guardarAlerta(false)}
                    >
                        <Dialog.Title>Error</Dialog.Title>

                        <Dialog.Content>
                            {/* es un texto mas pequeño que el heading */}
                            <Paragraph>Todos los campos son obligatorios</Paragraph>
                        </Dialog.Content>
                        
                        <Dialog.Actions><Button onPress={() => guardarAlerta(false)}>OK</Button></Dialog.Actions>

                    </Dialog>
                </Portal>
        </View>
        // </PaperProvider>  App.js
     );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente; 