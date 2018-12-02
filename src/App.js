import React from 'react';
// import Myretro from './components/myretro/myretro.js';
// import Landingpage from './components/landingpage/landing.js';
import AppRoutes from './Route';
// import { Provider } from 'react-redux';
// import store from '../src/store/index';
import history from './History'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
})


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userRoutData: "user"
    }
  }
  componentWillMount() {
    
  }
  render() {
  
    return (
      <ApolloProvider client={client}>
        
      <div>
      
        <AppRoutes history={history} />
      </div>
      </ApolloProvider>
    )
  }
}


export default App;