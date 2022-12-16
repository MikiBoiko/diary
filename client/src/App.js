import { useState, useEffect, useCallback } from "react";
import { getConnection } from "./common/api";

import Page from "./view/Page";
import Login from "./view/Login";

import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [logged, setLogged] = useState(false);

  // FIXME : Why the _ is it rendering twice? ..., how?
  useEffect(() => {
    if (!connected)
      getConnection()
        .then((response) => {
          console.log(response.message);
          setLogged(true);
        })
        .catch((err) => {
          console.error(`[${err.name}] : BAD TOKEN`);
          setLogged(false);
        })
        .finally(() => {
          setConnected(true);
          return () => {
            console.log("App loaded.")
          };
        });
  }, [connected]);

  const onDisconnect = useCallback(() => {
    setConnected(false);
    setLogged(false);
  }, [setConnected, setLogged]);

  return (
    <div className="App">
      {
        connected ?
          logged ?
            <Page onDisconnect={onDisconnect} />
            :
            <Login onLogin={() => setLogged(true)} />
          :
          "Connecting..."
      }
    </div>
  );
}

export default App;
