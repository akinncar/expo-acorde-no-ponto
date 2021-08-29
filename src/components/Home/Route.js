import React from 'react';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import {GOOGLE_MAPS_API_KEY} from '@env'

export function Route({route, navigation}) {
    const { destination } = route.params;

    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            await Location.watchPositionAsync({accuracy: Location.Accuracy.High}, (location) => {
                console.log(location)
                setLocation(location);
            });
        })();
    }, []);

    return (
        <MapView
            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 8 }}
            provider='google'
            showsUserLocation
            initialRegion={{
              latitude: destination.latitude,
              longitude: destination.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2
            }}
        >
            {destination && <MapView.Marker coordinate={destination} />}
            {location &&
                <MapViewDirections
                    lineDashPattern={[0]}
                    origin={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                    destination={destination}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                />
            }
        </MapView>
    )
}
