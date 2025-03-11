import { StyleSheet, Text, View } from "react-native";
import { createElement } from "react";


export function TelaConto(){

    return(
        <>
        <View style={styles.container}> 
            <Text>Conto</Text>
        </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });