import { createContext, useReducer } from 'react';
import { USER } from '../constant';
import AuthReducer from './AuthReducer';

const initialState = {
    user: JSON.parse(localStorage.getItem(USER)),
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
