import React from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env'
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";

export function Route({route, navigation}) {
    const { destination } = route.params;

    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

    TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
        if (error) {
            console.error(error);
            return;
        }
        const [location] = locations;
        try {
            console.log(location)
            setLocation(location);
        } catch (err) {
            console.error(err);
        }
    });

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 1, // minimum change (in meters) betweens updates
                deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
                // foregroundService is how you get the task to be updated as often as would be if the app was open
                foregroundService: {
                    notificationTitle: 'Using your location',
                    notificationBody: 'To turn off, go back to the app and switch something off.',
                },
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
