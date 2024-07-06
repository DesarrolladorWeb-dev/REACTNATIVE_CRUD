import React from "react";
import { Button } from 'react-native-paper'; 


const BarraSuperior = ({navigation,  route}) => {
    // console.log(navigation)  -- undefined porque no es parte del StackScreen 
    // console.log(navigation)
    const handlePress = () => {
        navigation.navigate('NuevoCliente')
    }

    return (  
        <Button
            icon="plus-circle"
            textColor="#FFF"
            onPress={() => handlePress() }> 
            Cliente
        </Button> 
    );
}
 
export default BarraSuperior;