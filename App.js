import React from 'react';
import { StyleSheet } from 'react-native';

import Inicio from './views/Inicio';
import DetallesCliente from './views/DetallesCliente';
import NuevoCliente from './views/NuevoCliente';

import { DefaultTheme,  Provider as PaperProvider } from 'react-native-paper'; 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

//todo  Definir el tema Y - USAR THEME COMO VARIABLES
const theme = {
  // tomamos una copia de todas sus propiedades y lo guardamos en theme para usarlo 
  ...DefaultTheme,
  // portque todo lo que tenemos en theme es un objeto,  colors es un objeto con valores propios dentro de defaultTheme y aqui cambiamos sus valores desde una copia 
  colors: {
    ...DefaultTheme.colors, //toma una copia de defaultTheme pero la parte de colors, y copiara todos los colores que esten dentro de DefaultTheme
    // y aqui modificamos sus valores
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

// console.log(theme.colors.primary)


export default function App() {
  return (
    <>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          // Cambiamos la apariencia de la parte superior
          screenOptions = {{
            headerStyle: {
              // y usamos el theme para cambiar el color del encabezado, esto ayuda a que sea como variable
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            // Cambiar los estilos de la fuente
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            // BarraSuperior no es parte de StackScreen para aplicar navigate
            options={({navigation, route}) => ({ //TODO realizar la navegacion usando Barra superior
              headerTitleAlign: 'center',
              // voy a definir con este pequeño colback que voy a mostrar este componente y como es un collback le puedes pasar props o cualquier otra cosa como si fuese un componente
              // y para la navegacion le pasamos una copia de los props y asi tener todos los metodos 
              
              /* 
              headerLeft: (props) =>  <BarraSuperior {...props}
              // Todo y de esta manera es como si estubiesen registrados para usar Stack.Screen
                                    navigation = {navigation}
                                    route = {route}
                                  /> 
              */

            })}
          />
          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title:"Nuevo Cliente "
            }}
          /> 
          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{
              title:"Detalles Cliente"
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </>
  )
}

const styles = StyleSheet.create({
 
});
