import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Information from './components/pages/Info';

function App() {
  return (
    <>
      <Router>
        <Navbar />
       
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Info' exact component={Information} />
     
        </Switch>
          <Footer />
      </Router>
     
    </>
  );
}

export default App;