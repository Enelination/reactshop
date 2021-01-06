import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  useLocation
} from "react-router-dom";

import "./Routes.css";

import ProductsPage from "./ProductsPage";
import Header from "./Header";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import ContactUsPage from "./ContactUsPage";

const AdminPage = React.lazy(() => import("./AdminPage"));

const Routes: React.FC<RouteComponentProps> = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const location = useLocation<{ key: string }>();

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="animate">
          <Switch>
            <Redirect exact={true} from="/" to="/products" />
            <Route exact={true} path="/products" component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/contact" component={ContactUsPage} />
            <Route path="/admin">
              {loggedIn ? (
                (props: RouteComponentProps) => (
                  <React.Suspense
                    fallback={<div className="page-container">Loading...</div>}
                  >
                    <AdminPage {...props} />
                  </React.Suspense>
                )
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

export default RoutesWrap;
