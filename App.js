import React from 'react';
import {StatusBar} from "react-native";

import Routes from "./src/routes";
import {init} from "./src/sqlite/init";

export default function App() {

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

