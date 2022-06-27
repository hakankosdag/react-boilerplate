import React, { useContext } from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { AppContext } from "./context/AppContext/AppProvider";

const LanguageProvider = ({ messages, children }) => {
  const appCtx = useContext(AppContext);

  const { locale } = appCtx;
  return (
    <IntlProvider defaultLocale={locale} locale={locale} key={locale} messages={messages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

export default React.memo(LanguageProvider);
