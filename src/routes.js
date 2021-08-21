import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather} from '@expo/vector-icons';

import { Home } from './components/Home/Home'
import { Map } from './components/NewDestination/Map'

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Início') {
                            iconName = 'home'
                        } else if (route.name === 'Novo Destino') {
                            iconName = 'map-pin';
                        }

                        return <Feather name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Início" component={Home} />
                <Tab.Screen name="Novo Destino" component={Map} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
