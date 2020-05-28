import React, {Component} from 'react';
import 'materialize-css';
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {HeroCard} from "./components/HeroCard"


class App extends Component {
    render() {
        return (
            <Router>
                <Navbar/>
                <HeroCard/>
            </Router>
        )
    }
}

export default App
