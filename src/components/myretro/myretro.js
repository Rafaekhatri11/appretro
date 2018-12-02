import React, { Component } from 'react';
import {
  
    Table
} from 'react-bootstrap';


class Myretro extends Component {
    constructor(){
        super();
        this.state = {
            userinfo: {}
        }
    }
    componentDidMount() {
        var data = localStorage.getItem('userdata');
        var userdata = JSON.parse(data);
        this.setState({userinfo:userdata})
        console.log(this.state.userinfo,userdata);
    }

    logout() {
        this.props.history.push('/');
        localStorage.clear();
      }
    render() {
        return (

            <div className="body-content">
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-header">
          <a className="navbar-brand" href="#"><img src={require("./img/retro-logo.png")} alt="Retro" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hi, <b id="name">{this.state.userinfo.firstname}</b><span className="sr-only">(current)</span>
                                    <img className="user-image" src={require("./img/user.svg")} />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right bg-primary" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">My Profile</a>
                                    <a className="dropdown-item" href="#">Enterprise Account</a>
                                    <a className="dropdown-item" href="#">My Retros</a>
                                    <a className="dropdown-item" href="#">My Templates</a>
                                    <a className="dropdown-item sign-out" onClick={() => this.logout()}>Sign Out</a>
                                </div>
                            </li>
                        </ul>
          
                    </div>
                </nav>

                <h1>
                    Welcome to retros
                </h1>
            </div>
           );
            }
        }
        
export default Myretro;