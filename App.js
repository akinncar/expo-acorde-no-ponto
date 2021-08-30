import React from 'react';
import {StatusBar, LogBox} from "react-native";

import Routes from "./src/routes";
import {init} from "./src/sqlite/init";

export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications

  React.useEffect(() => {
    init()
  }, [])

  return (
    <>
      <StatusBar barStyle='dark-content'/>
      <Routes />
    </>
  );
}

