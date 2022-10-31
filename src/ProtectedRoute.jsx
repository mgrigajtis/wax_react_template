import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { WaxLoginService } from './WaxLoginService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (WaxLoginService.isLogged()) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;
