import React from 'react';
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {Button} from "../../ui/Button";

export function ListItem({destination, deleteDestination}) {
    const navigation = useNavigation()

    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 16,
            flexDirection: 'row'
        }}>
            <View>
                <Text style={{ fontWeight:'bold', fontSize: 20, paddingBottom: 6 }}>{destination.title}</Text>
                <Text>Latitude: {destination.latitude}</Text>
                <Text>Longitude: {destination.longitude}</Text>
            </View>
            <View style={{ justifyContent: 'space-around' }}>
                <View style={{ margin: 4 }}>
                    <Button title='Iniciar' onPress={() => { navigation.navigate('Route', {
                        destination: destination
                    }) }} />
                </View>
                <View style={{ margin: 4 }}>
                    <Button title='Excluir' onPress={() => deleteDestination(destination.id)} />
                </View>
            </View>
        </View>
    )
}
