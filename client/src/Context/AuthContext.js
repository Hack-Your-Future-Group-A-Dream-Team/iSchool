import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import * as ReactBootStrap from "react-bootstrap";

export const AuthContext = createContext();

export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);
    
    return (
        <div>
            {!isLoaded ? ( <div className="d-flex justify-content-center align-items-center mt-5">
            <ReactBootStrap.Spinner animation="border" variant="danger"/>
            </div> ) : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>} 
        </div>
    )
}