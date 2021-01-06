import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";

import "./index.css";
import Routes from "./components/Routes";
import * as serviceWorker from "./serviceWorker";
import configureStore, { ApplicationState } from "./state/Store";

interface Props {
  store: Store<ApplicationState>;
}
const Root: React.FC<Props> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configureStore();
ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root") as HTMLElement
);

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
