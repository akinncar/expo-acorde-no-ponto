import React from 'react';

import Routes from "./src/routes";
import {init} from "./src/sqlite/init";

export default function App() {

  React.useEffect(() => {
    init()
  }, [])

  return (
    <Routes />
  );
}

