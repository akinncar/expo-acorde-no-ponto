import React from 'react';
import {TextInput, View} from 'react-native';
import MapView from "react-native-maps";
import {Destination} from '../../sqlite/modules/destinations/destination'
import {Button} from '../../ui/Button'
import {addData} from "../../sqlite/modules/destinations/addData";

export function Map({navigation}) {
    const [marker, setMarker] = React.useState(null);
    const [action, setAction] = React.useState('map') // map or addDestination
    const [destinationTitle, setDestinationTitle] = React.useState('')

    function handleAddDestination() {
        const destination = new Destination();
        destination.title = destinationTitle;
        destination.latitude = marker.latitude;
        destination.longitude = marker.longitude;

        const insertId = addData(destination);
        if(!insertId){
            alert("Não foi possivel inserir o novo animal")
        }

        setAction('map')
        setMarker(null)
        setDestinationTitle('')

        navigation.navigate('Início')
    }

    return (
        <>
            {action === 'map' &&
                <MapView
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 8 }}
                    onPress={(e) => setMarker(e.nativeEvent.coordinate)}>
                    <>
                        {marker && <MapView.Marker coordinate={marker} />}
                    </>
                </MapView>
            }

            {action === 'map' && marker && <Button title="Adicionar Destino" onPress={() => setAction('addDestination')} />}

            {action === 'addDestination' &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={{ width: '80%', height: 40, borderWidth: 1, marginBottom: 8}}
                        onChangeText={text => setDestinationTitle(text)}
                        value={destinationTitle}
                    />
                    <View style={{ flexDirection: 'row', width: '50%', justifyContent:'space-evenly' }}>
                        <Button title='Cancelar' onPress={() => setAction('map')} />
                        <Button title='Adicionar' onPress={handleAddDestination} />
                    </View>
                </View>
            }
        </>
    )
}
