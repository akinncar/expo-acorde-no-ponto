import React from 'react';
import {Dimensions, FlatList, Text, View} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import {findAll} from "../../sqlite/modules/destinations/findAll";
import {ListItem} from "./ListItem";
import {deleteById} from "../../sqlite/modules/destinations/deleteById";

export function Home() {
    const isFocused = useIsFocused();

    const [destinations, setDestnations] = React.useState([])

    React.useEffect(() => {
        if(isFocused) getDestinations()
    }, [isFocused])

    async function getDestinations() {
        const response = await findAll()
        setDestnations(response._array)
    }

    async function deleteDestination(id) {
        deleteById(id)
        setDestnations(destinations.filter(d => d.id !== id))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                style={{width: '100%'}}
                data={destinations}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <ListItem destination={item} deleteDestination={deleteDestination}/>}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: Dimensions.get('screen').height * 0.8
                    }}>
                        <Text>Você ainda não possui destinos</Text>
                    </View>
                }
            />
        </View>
    )
}
