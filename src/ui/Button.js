import React from 'react';
import {Text, TouchableOpacity} from "react-native";

export function Button({ title, onPress = () => {} }) {
    return (
        <TouchableOpacity style={{ backgroundColor: '#F40002', justifyContent: 'center', alignItems: 'center' ,padding: 8 }} onPress={onPress}>
            <Text style={{ color: 'white' }}>{title}</Text>
        </TouchableOpacity>
    )
}
