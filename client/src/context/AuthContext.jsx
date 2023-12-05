import { createContext, useContext, useState } from 'react';
import * as userService from '../services/userService'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getStoredUser()); // Retrieve stored user from local storage

    const login = async ({ email, password }) => {
        try {
            const loggedInUser = await userService.login({ email, password });
            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const register = async ({ email, password, username, bio, profileImage }) => {
        try {
            const registeredUser = await userService.register({ email, password, username, bio, profileImage });
            setUser(registeredUser);
            return registeredUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const logout = () => {
        // Perform logout actions, e.g., clear local storage, reset state, etc.
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
