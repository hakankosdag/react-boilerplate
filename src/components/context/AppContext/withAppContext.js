import React from "react";
import { AppContext } from "./AppProvider";

const withAppContext = (WrappedComponent) => {
  const withAppContextHoc = (props) => {
    return (
      <AppContext.Consumer>
        {(context) => {
          return <WrappedComponent {...props} {...context} />;
        }}
      </AppContext.Consumer>
    );
  };

  return withAppContextHoc;
};

export default withAppContext;
