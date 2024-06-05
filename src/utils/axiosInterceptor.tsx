import React, { createContext, useContext, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';
import { UserSession } from './sessionStore';
import { useNavigate } from 'react-router-dom';

interface AxiosContextType {
    axiosInstance: AxiosInstance;
}

// Create the context with an initial value of undefined
const AxiosContext = createContext<AxiosContextType | undefined>(undefined);

export const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const sessionService = new UserSession();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3023',
    });

    // Add request interceptor
    axiosInstance.interceptors.request.use(request => {
        if (!request.url?.includes("LoginUser")) {
            const token = sessionStorage.getItem("token");
            if (token) {
                request.headers["authorization"] = `Bearer ${token}`;
            }
        }
        return request;
    }, error => {
        debugger
        Promise.reject(error)
    });

    // Add response interceptor
    axiosInstance.interceptors.response.use(
        response => {
            sessionService.SetAuthHeaders(response);
            return response;
        },
        error => {
            if (error.response) {   
                debugger
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    console.log('Redirecting to login...');
                    navigate('/login');  // Adjust the login URL as necessary
                }
            }
            return Promise.reject(error);
        }
    );

    return (
       <AxiosContext.Provider value={{ axiosInstance }}>
            {children}
        </AxiosContext.Provider>
    );
};

// Custom hook to use the Axios instance
export const useAxios = (): AxiosInstance => {
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error('useAxios must be used within an AxiosProvider');
    }
    return context.axiosInstance;
};
