import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {Feather} from '@expo/vector-icons';

import { Home } from './components/Home/Home'
import { Route } from './components/Home/Route'
import { Map } from './components/NewDestination/Map'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTab() {
    return (
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
                tabBarActiveTintColor: '#F40002',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Início" component={Home} />
            <Tab.Screen name="Novo Destino" component={Map} />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"BottomTab"}>
                <Stack.Screen
                    name="BottomTab"
                    component={BottomTab}
                    options={{
                        title: '',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Route"
                    options={{
                        title: 'Rota'
                    }}
                    component={Route}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
