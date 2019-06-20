import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar.jsx'
import Details from './components/Details.jsx'
import Default from './components/Default.jsx'
import Footer from "./components/Footer";
import ProductCategories from "./components/ProductCategories";
import ShittySearch from "./components/ShittySearch";
import Management from "./components/Management";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>

        <Switch>
          <Route exact path="/" component={ShittySearch}/>
          <Route path="/details" component={Details}/>
          <Route path="/management" component={Management}/>
          <Route path="/categories" component={ProductCategories}/>
          <Route component={Default}/>
        </Switch>

        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;