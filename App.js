import React from 'react';
import {StatusBar, LogBox} from "react-native";

import Routes from "./src/routes";
import {init} from "./src/sqlite/init";

init()

export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications

    return (
        <>
            <StatusBar barStyle='dark-content'/>
            <Routes />
        </>
    );
}

