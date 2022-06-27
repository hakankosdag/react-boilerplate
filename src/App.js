import React from "react";
import { FormattedMessage } from "react-intl";
import AppProvider from "./components/context/AppContext/AppProvider";
import ErrorHandler from "./components/ErrorHandler";
import LanguageProvider from "./components/LanguageProvider";
import { translationMessages } from "./translations/i18n";

const App = () => {
  return (
    <ErrorHandler messages={translationMessages}>
      <AppProvider>
        <LanguageProvider messages={translationMessages}>
          <h1>
            <FormattedMessage id="helloReact" />
          </h1>
        </LanguageProvider>
      </AppProvider>
    </ErrorHandler>
  );
};

export default App;
