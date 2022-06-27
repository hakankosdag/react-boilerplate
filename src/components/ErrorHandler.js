import React from "react";

class ErrorHandler extends React.Component {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ error: true });
  }

  render() {
    const { messages } = this.props;
    const locale = "en"; // it just temporary defined, local storage implementation should be provided

    if (this.state.error) {
      return (
        <div className="general-error-wrapper ">
          <h1>{messages[locale]["shared.app.error"]}</h1>
          <div>{messages[locale]["shared.app.error.description"]}</div>
          <button
            className="refresh-button"
            onClick={() => {
              window.location.reload();
            }}
          >
            {messages[locale]["shared.app.error.refresh"]}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;
