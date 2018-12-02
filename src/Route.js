import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';
import Myretro from './components/myretro/myretro.js';
import Landingpage from './components/landingpage/landing.js';
import Createretro from './components/createretro/createretro.js';
import Invite from './components/InviteRetro/InviteRetro.js';
class Routers extends React.Component {
  constructor() {
    super();
    this.state = {
      userRoutData: false,
      auth : false
    }
  }
  runFunction() {
    let data = localStorage.getItem('userdata');
    let User = JSON.parse(data);
    if(User){
      this.setState({auth : true ,userRoutData: true});
    }
    else{
        this.setState({auth: false,userRoutData:true})
    }
  }
  componentWillMount() {
    this.runFunction()

}
componentWillReceiveProps(props) {
  this.runFunction()
}
  render() {
    console.log("route render")
    const PrivateRoute = ({ component: Component, ...rest }) => (
      this.state.userRoutData ?
      <Route {...rest} render={(props) => {
        switch(rest.path) {
          case "/":
          if(this.state.auth) {
              return <Redirect to="/createretro" />
        } else {
            return <Component {...props} />
          }
          case "/myretro":
          if(this.state.auth) {
            return <Component {...props} />
          } else {
            return <Redirect to="/" />
          }
          case "/createretro":
          if(this.state.auth) {
            return <Component {...props} />
          } else {
            return <Redirect to="/" />
          }
          case "/invite":
          if(this.state.auth){
            return <Component {...props} />
          } else {
            return <Redirect to="/" />
          }
          case "/retros":
          if(this.state.auth){
            return <Component {...props} />
          } else {
            return <Redirect to="/" />
          }
        }
      }} />
      :''
    )
    return (
      <div>
        <PrivateRoute exact path="/" component={Landingpage} />
        <PrivateRoute  path="/myretro" component={Myretro} />
        <PrivateRoute path="/createretro" component={Createretro} />
        <PrivateRoute path="/invite" component={Invite} />
        <PrivateRoute path="/retros" component={Myretro} />
      </div>
    )
  }
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Route component={Routers}/>
    </BrowserRouter>
  )
}

export default AppRoutes;