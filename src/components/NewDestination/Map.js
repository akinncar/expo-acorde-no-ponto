import React from 'react';
import {ActivityIndicator, TextInput, View} from 'react-native';
import MapView from "react-native-maps";
import * as Location from "expo-location";
import {Destination} from '../../sqlite/modules/destinations/destination'
import {Button} from '../../ui/Button'
import {addData} from "../../sqlite/modules/destinations/addData";

export function Map({navigation}) {
    const [marker, setMarker] = React.useState(null);
    const [action, setAction] = React.useState('map') // map or addDestination
    const [destinationTitle, setDestinationTitle] = React.useState('')

    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    function handleAddDestination() {
        const destination = new Destination();
        destination.title = destinationTitle;
        destination.latitude = marker.latitude;
        destination.longitude = marker.longitude;

        const insertId = addData(destination);
        if(!insertId){
            alert("Não foi possivel inserir o novo destino")
        }

        setAction('map')
        setMarker(null)
        setDestinationTitle('')

        navigation.navigate('Início')
    }

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location;
            let locationSuccess = false;
            while(!locationSuccess) {
                try{
                    location = await Location.getCurrentPositionAsync({ accuracy:Location.Accuracy.High });
                    locationSuccess = true;
                } catch( ex ){
                    // Bug: https://github.com/expo/expo/issues/9377
                    console.log("Location failed - Retrying...");
                }
            }

            console.log(location)
            setLocation(location);
        })();
    }, []);

    if(!location) {
        return (
            <ActivityIndicator
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}
                color='#F40002'
            />
        )
    }

    return (
        <>
            {action === 'map' && location &&
                <MapView
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 8 }}
                    provider='google'
                    showsUserLocation
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2
                    }}
                    onPress={(e) => setMarker(e.nativeEvent.coordinate)}
                >
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
