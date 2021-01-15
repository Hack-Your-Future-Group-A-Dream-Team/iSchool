import React, { useState, useContext } from 'react'
import { Link} from 'react-router-dom';
import './Navbar.css';
import Logo from './assets/logo-blue.png';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Navbar = props => {

    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }


    const [click, setClick] = useState(false);
    
    const iconMenu = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <li className = "nav-item" >
                   <Link to = '/'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-home icons"><p className="icon">Home</p></i>
                   </Link> 
               </li>
                <li className = "nav-item" >
                   <Link to = '/Info'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-info-circle icons"><p className="icon">Information</p></i>
                   </Link> 
               </li>
                <li className = "nav-item" >
                   <Link to = '/searchschool'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-search-plus icons"><p className="icon">Search School</p></i>
                   </Link> 
               </li>
               <li className="nav-item" >
                   <Link to = '/login'
                     className = "nav-links"
                     onClick={closeMobileMenu} > <i class="fas fa-sign-in-alt icons"><p className="icon">Sign In</p></i> 
                  </Link>
                </li>
                <li className = "nav-item" >
                    <Link to='/register'
                      className = "nav-links"
                      onClick={closeMobileMenu} > <i class="fas fa-user-plus icons"><p className="icon">Sign Up</p></i>
                      </Link>
                </li>
            </>
        )
    }

    const authenticatedNavBar = () =>{
        return(
            <>
                <li className = "nav-item" >
                   <Link to = '/'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-home icons" ><p className="icon">Home</p></i>
                   </Link> 
               </li>
                <li className = "nav-item" >
                   <Link to = '/Info'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-info-circle icons"><p className="icon">Information</p></i>
                   </Link> 
               </li>
               <li className = "nav-item" >
                   <Link to = '/searchschool'
                    className = "nav-links" onClick={closeMobileMenu} > <i class="fas fa-search-plus icons"><p className="icon">Search School</p></i>
                   </Link> 
               </li>
               <li className="nav-item" >
                   <Link to="/myschools"
                     className = "nav-links"
                     onClick={closeMobileMenu} ><i class="fas fa-synagogue icons"><p className="icon">My School</p></i>
                   </Link>
                </li>
               <li className="nav-item" >
                   <Link to="/editprofile"
                     className = "nav-links"
                     onClick={closeMobileMenu} > <i class="fas fa-user-circle icons" ><p className="icon">Profile</p></i> 
                  </Link>
                </li>
                <li className = "nav-item" >
                {
                    user.role === "admin" ? 
                    <Link to="/admin"
                    className = "nav-links"
                     onClick={closeMobileMenu}> Admin 
                    </Link>
                   : null
                } 
                </li>
                <li className = "nav-item" >
                {
                    user.role === "school" ? 
                    <Link to="/addschool"
                    className = "nav-links"
                     onClick={closeMobileMenu}> <i class="fas fa-plus-circle icons"><p className="icon">Add School</p></i>
                   </Link>
                   : null
                } 
                {
                    user.role === "admin" ? 
                    <Link to="/addschool"
                    className = "nav-links"
                     onClick={closeMobileMenu}> Add School </Link>
                   : null
                } 
                </li>
                
                  
                    <button type="button" 
                            className="btn btn-link nav-item nav-link Logoutbtn" 
                            onClick={onClickLogoutHandler}>
                            <i class="fas fa-sign-out-alt icons"><p className="icon">Logout</p></i>
                    </button>
                    
                    
                

                
            </>
        )
    }

    return ( 
    <>
        <nav className = "navbar" >

              <div className = "navbar-icon" >
              <div to = "/"className = "navbar-logo" >
              
              <Link to = "/"className = "navbar-logo" onClick={closeMobileMenu} >
                 <img src={Logo} alt="logo"/>
                </Link> 
              </div>
                    
              <div className = "menu-icon"
                   onClick = { iconMenu } >
                  <i className = { click ? 'fas fa-times' : 'fas fa-bars' }/>
             </div> 
             <ul className={click ? 'nav-menu active' : 'nav-menu'} >
             { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()} 
            </ul>
            </div> 
        </nav> 
     </>
    )
}


export default Navbar