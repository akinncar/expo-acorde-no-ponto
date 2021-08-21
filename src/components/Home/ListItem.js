import React from 'react';
import {FlatList, Text, View} from "react-native";
import {Button} from "../../ui/Button";

export function ListItem({destination, deleteDestination}) {
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
                <Text>Latitude: destination.latitude}</Text>
                <Text>Longitude: {destination.longitude}</Text>
            </View>
            <View style={{ justifyContent: 'space-around' }}>
                <View style={{ margin: 4 }}>
                    <Button title='Editar'  />
                </View>
                <View style={{ margin: 4 }}>
                    <Button title='Excluir' onPress={() => deleteDestination(destination.id)} />
                </View>
            </View>
        </View>
    )
}
