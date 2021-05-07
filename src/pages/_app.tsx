// react
import React, { useReducer, useEffect } from "react";
import { AppProps } from "next/app";
// components
import Framework from "../components/templates/framework"
import Default from '../components/templates/default'
// apollo
import Apollo from "../apollo/config"
// auth
import AuthContext from "../hooks/authContext";
import authReducer from "../lib/reducer";
import { listenAuthState } from "../lib/firebase";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  );

  useEffect(() => {
    return listenAuthState(dispatch);
  }, []);

  return (
    <Framework>
      <Apollo.provider client={Apollo.client}>
        <AuthContext.Provider value={state}>
          <Default>
            <Component {...pageProps} />
          </Default>
        </AuthContext.Provider>
      </Apollo.provider>
    </Framework>
  )
}

export default App;