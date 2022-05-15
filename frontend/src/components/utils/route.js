import React from "react";
import * as rr from "react-redux";
import {Route, Navigate} from "react-router-dom";

export function RouteClient({ element: Element, ...rest }) {
    const users = rr.useSelector(state => state.users);
    if (users.token){
        return (
            <Route
              {...rest}
              render={routeProps => (
                  <Element {...routeProps} />
              )}
            />
          );
    }
    return (<Route path="*" element={<Navigate to ="/404" />}/>);
  }

  export function RouteGuest({ element: Element, ...rest }) {
    const users = rr.useSelector(state => state.users);
    if (!users.token){
        return (
            <Route
              {...rest}
              render={routeProps => (
                  <Element {...routeProps} />
              )}
            />
          );
    }
    return (<Route path="*" element={<Navigate to ="/404" />}/>);
  }
