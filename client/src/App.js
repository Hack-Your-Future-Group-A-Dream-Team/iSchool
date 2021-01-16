import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SearchSchool from './components/pages/SearchSchool';
import Register from './components/pages/Register';
import Admin  from './components/pages/Admin';
import MySchool from './components/pages/MySchools';
import Activate from "./components/pages/Activate"
import ResetPassword from './components/pages/ResetPassword'
import ForgotPassword from './components/pages/ForgotPassword'
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import SchoolProfile from './components/pages/SchoolProfile'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Information from './components/pages/Info';
import RegisterSchool from './components/pages/RegisterSchool';



function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <UnPrivateRoute path="/user/activate/:token" component={Activate}/>
      <UnPrivateRoute path="/user/password/reset/:token" component={ResetPassword}/>
      <UnPrivateRoute path="/user/password/forgot" component={ForgotPassword}/>
      <Route exact path="/searchschool" component={SearchSchool}/>
      <PrivateRoute path="/myschools" roles={["user","admin","school"]} component={MySchool}/>
      <Route  path="/school/:id" component={SchoolProfile}/>
      <PrivateRoute path="/addschool" roles={["admin","school"]} component={RegisterSchool}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
      <Route exact path="/Info" component={Information}/>
      <Footer/>
    </Router>
  );
}

export default App;
