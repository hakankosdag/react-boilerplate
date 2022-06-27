import React from "react";
import { appLocales } from "../../../translations/i18n";
import useSetState from "../../hooks/useSetState";

const getInitialLocale = () => {
  const [currentLangCode] = navigator.language.split("-");
  
  if (appLocales.includes(currentLangCode)) {
    return currentLangCode;
  }

  return "en";
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [state, setState] = useSetState({
    locale: getInitialLocale()
  });

  const setLocale = (locale) => {
    setState({
      locale
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLocale
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppProvider;
