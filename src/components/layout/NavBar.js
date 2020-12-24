import React, {Component} from 'react';
import styled from 'styled-components';



class NavBar extends Component {
    render() {
        return (
           <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
           style={{
               backgroundColor: '#ef5450'
           }}>
               <a className="navbar-brand col-sm-3 col-md-2 mr-0 allign-items-center" href="#">Pokedex</a>
           </nav>

        );
    }
}

export default NavBar;