import React, { Component } from 'react';
import './landing.css';
import {
  Navbar, Nav, NavItem, Button, FormGroup, FormControl, Table, Modal, Checkbox, Radio
  , Panel, ListGroup, ListGroupItem
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './img/retro-logo.png';
import featurethought from './img/feature-thoughts.png';
import voteonthought from './img/vote-on-thoughts.png';
import organizeproject from "./img/organize-projects.png";
import footer from "./img/footer.png";
// import teampic from './teampic.png';
// import curve from './curve.png';
// import footerpic from './footer.png';
import {ic_close} from 'react-icons-kit/md/ic_close';
import Icon from 'react-icons-kit';
// import starpng from './star.png';
// import likespng from './likes.png'
// import searchpng from './search.png';
// import green from './green.png';
// import green2 from './green2.png';
 import {caretRight} from 'react-icons-kit/fa/caretRight';
// import {connect} from 'react-redux';
// import { userlogin } from '../../store/action/action';
import gql from "graphql-tag";
import { Query, compose, graphql, Mutation, ApolloConsumer } from "react-apollo";
import { ErrorLink } from 'apollo-link-error';



const loginUser = gql`
    query($email: String! ,$password : String!){
      signIn(email:$email ,password : $password ){
        id
        email
        password
      }
    }
`

const signUpuser = gql`
mutation($lastname :String!,$firstname:String!,$email: String!,$password : String!, $userStatus: String!){

  signUp(
    lastname: $lastname
    firstname: $firstname
    email: $email
    password: $password
    userStatus: $userStatus
  ){
    id
    lastname
    firstname
    email
    password
    userStatus
  }
}
`;

var check = [];

class Landingpage extends Component {

  constructor() {
    super();
    this.crossBtn = React.createRef();
    this.crossBtnUp = React.createRef();
    this.state = {
      joinretro: false,
      show: false,
      join: false,
      login: false,
      email: '',
      password: '',
      createuseremail: '',
      createaccountfirstname: '',
      createaccountsecondname: '',
      createaccountpassword: '',
      createaccountconfirmpassword: '',
      businessUser: '',
      profession: '',
      lorem1: '',
      lorem2: '',
      skills: [],
      status: '',
      checkstatus: false,
      signupError:false,
      signinError:false,
    }
  }

  handleChangeBox = name => event => {
    if (event.target.checked === true) {
      check.push(event.target.value)
      this.setState({ skills: check })


    } else {
      check.map((value, index) => {
        return (
          value === event.target.value ?
            [check.splice(index, 1), this.setState({ skills: check }), console.log('ok ', this.state.skills)] : ''
        )
      })
    }
  };



  // login(evt) {
  //   evt.preventDefault();
  //   if (this.state.email === "" || this.state.password === "") {
  //     alert("Please Enter Login or Password");
  //   }
  //   else {
  //     // alert('Successfull');
  //     const data = {
  //       // Email: this.state.email,
  //       // Pass: this.state.password,
  //       email: this.state.email,
  //       password: this.state.password
  //     }

  //     const json = data;
  //     // https://retro-app-server-13.herokuapp.com/user/login
  //     axios.post('http://localhost:4000/user/login', json).then(res => {
  //       console.log('=======', res, res.data);
  //       // if(res.data.token){
  //       // localStorage.setItem('userdata', JSON.stringify(res.data));
  //       //   dispatch({type: myActions.userlogin , payload:data})
  //       this.props.history.push('/createretro');
  //       //  }

  //       // else{
  //       //     alert(res.data.message);
  //       // }

  //     })
  //       .catch(err => {
  //         console.log(err)
  //       })



  //   }
  // }



  handlejoin() {
    this.setState({ login: false, join: false, show: false })
  }
  handleHide() {
    this.setState({ login: false, show: false, join: false });
  }

  handlelogin() {
    this.setState({ login: false, show: false, join: false })
  }


  getValidationState() {
    const length = this.state.createuseremail.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }



  // createAccount(evt) {
  //   evt.preventDefault();
  //   if (this.state.createaccountconfirmpassword === this.state.createaccountpassword) {
  //     const user = {
  //       // Firstname: this.state.createaccountfirstname,
  //       // Lastname: this.state.createaccountsecondname,
  //       // Emaiemal: this.state.createuseremail,
  //       // Pass: this.state.createaccountconfirmpassword,
  //       // Status : this.state.status
  //       email: this.state.createuseremail,
  //       password: this.state.createaccountconfirmpassword,
  //     }
  //     const json = user;
  //     // https://retro-app-server-13.herokuapp.com/user/signup
  //     axios.post('http://localhost:4000/user/signup', json).then(res => {
  //       console.log(res);
  //       // alert(res.data.message);
  //       if (res.data.token) {
  //         this.setState({
  //           createaccountfirstname: "",
  //           createaccountsecondname: "",
  //           createuseremail: "",
  //           createaccountconfirmpassword: "",
  //           createaccountpassword: ""
  //         })
  //         localStorage.setItem('userdata', JSON.stringify(res.data));
  //         this.props.history.push('/createretro');
  //       }
  //       else {
  //         alert(res.data.message);
  //       }
  //     }
  //     ).catch(err => alert(err))
  //   }


  //   else {
  //     alert('Password Did not Matched');
  //   }
  // }

joinBtnHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  this.setState({ joinretro: true })
}
  render() {
     const {email, password ,createaccountconfirmpassword,createaccountfirstname,createuseremail,createaccountpassword,status} = this.state;
       const isValid  = email===''|| password=== '';
     const isValid2 = status==='' || createaccountconfirmpassword === '' || createaccountfirstname === '' || createuseremail === '' || createaccountconfirmpassword === '' || createaccountpassword ==='';
    console.log(this.state.status)
    return (
      <div className="body-content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-header" style={{ backgroundColor: '#ffffffde !important' }}>
          <a className="navbar-brand" href="#"><img src={logo} alt="Retro" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Join/Create <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Get the Beta</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Plans & Pricing</a>
              </li>

              <li className="nav-item">
                <a className="nav-link btn btn-dark" data-toggle="modal" data-target="#loginModal">
                  <b>Log In</b> / Sign Up
                                </a>
              </li>
            </ul>

          </div>
        </nav>
        <section className="section-one" onClick={() => this.setState({joinretro:false})}>
          <div className="landingBanner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="content">
                  <h4>Remote Teams.<br />Shared Space.</h4>

                  {
                    this.state.joinretro ?
                    <div style={{display:'inline-flex'}}>
                        <input type="email" className="form-control" placeholder="Enter room code"
                          aria-label="Recipient's username" aria-describedby="basic-addon2" size={40} onClick={(e) => {  e.preventDefault();
                            e.stopPropagation();} } />
                        <button type="button" className="btn btn-primary btn-lg"   id="joinretro" >Join Retro</button>
                      </div>
                      :
                      <div>

                        <button type="button" className="btn btn-primary btn-lg" onClick={(e) => this.joinBtnHandler(e)} >Join Retro</button>
                        <button className="btn btn-outline-orange btn-lg btn-create-retro" type="button" data-toggle="modal" data-target="#registerModal">
                        Create Retro</button>
                      </div>
                  }
                </div>

              </div>
            </div>
          </div>
         </div>
        </section>

        <section className="section-two"onClick={() => this.setState({joinretro:false})}>
          <div className="bg-orange">
            <div className="container-fluid">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">

                    <h3>Better decisions. Better products. Stronger teams.</h3>
                    <h4>Share your thoughts. Vote on what’s important. Group your ideas. Commit to a better
                                    process and better future.</h4>
                  </div>

                </div>

                <div className="row two-column">
                  <div className="col-md-6 ">
                    <img src={featurethought} alt="" />
                  </div>
                  <div className="col-md-6">
                    <h3>Discuss team thoughts in a real-time, configurable enivonment</h3>
                    <p>
                      Use a real-time, configurable, feedback tool for your team
                      to discuss and share their thoughts. Teams can scale to 50+
                      team members concurrently, for either internal or remote, to
                      support efficient and transparent shared understanding
                                </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="bg-green">
            <div className="container-fluid">
              <div className="content">
                <div className="row two-column mt-5">
                  <div className="col-md-6">
                    <h3 className="review-heading">Review your team's feedback</h3>
                    <p>
                      Group, Sort, and Vote on Thoughts to prioritize your and
                      your team's feedback and support a better understanding
                      of the "How Well" a team is working together
                                </p>
                  </div>
                  
                  <div className="col-md-6 ">
                    <img src={voteonthought} alt="" />
                  </div>
                    
                  </div>
                </div>
                <div className="row two-column mt-5">
                  <div className="col-md-6 ">
                    <img src={organizeproject} alt="" />
                  </div>
                  <div className="col-md-6">
                    <h3 className="mt-5">Organize by Projects & Schedules</h3>
                    <p>
                      Organize your Retro's to specific projects to better assess
                      your team's understanding. Schedule Retros to create a
                      consistent, recurring feedback loop.
                        </p>
                  </div>
                </div>
              
            </div>
          </div>
        </section>

        <section className="section-three">
          <div className="bg-blue">
            <div className="container-fluid">
              <div className="content">
                <div className="row mt-5">
                  <div className="col-md-4 offset-md-4">
                    <h4>Sign up for the Beta</h4>
                    <form action="">
                      <div className="input-group mb-3 zclass">
                        <input type="email" className="form-control" placeholder="youremail@yourcompany.com"
                          aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-secondary btn-orange" type="button">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row two-column mt-5">
                  <div className="col-md-12">
                    <h3>Plans & Pricing</h3>
                  </div>
                  <div className="col-md-4">
                    <div className="plans">
                      <div className="head">
                        <h4>Freelancer</h4>
                        <h5>Free</h5>
                      </div>
                      <div className="content">
                        <ul className="list-group">
                          <li className="list-group-item">Join any retro</li>
                          <li className="list-group-item">Receive a retro summary</li>
                          <li className="list-group-item">Create a retro</li>
                          <li className="list-group-item">Up to <b>1</b> retro admin</li>
                          <li className="list-group-item">Limit of <b>7</b> users in a retro</li>
                          <li className="list-group-item">Up to <b>5</b> retros</li>
                        </ul>
                        <div className="other-features">
                          <ul>
                            <li>Schedule retros</li>
                            <li>Invite/Uninvite users</li>
                            <li>Manage projects</li>
                            <li>Templates</li>
                            <li>Decision Log</li>
                            <li>Reportings (v2)</li>
                            <li>Action Items</li>
                            <li>Retro Notes (Project & Personal Notes)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="plans">
                      <div className="head">
                        <h4>Startup</h4>
                        <h5>$49/mo</h5>
                      </div>
                      <div className="content">
                        <ul className="list-group">
                          <li className="list-group-item">Join any retro</li>
                          <li className="list-group-item">Receive a retro summary</li>
                          <li className="list-group-item">Create a retro</li>
                          <li className="list-group-item">Up to <b>10</b> retro admin</li>
                          <li className="list-group-item">Limit of <b>7</b> users in a retro</li>
                          <li className="list-group-item"><b>Unlimited</b> retros</li>
                        </ul>
                        <div className="other-features">
                          <ul>
                            <li>Schedule retros</li>
                            <li>Invite/Uninvite users</li>
                            <li>Manage projects</li>
                            <li>Templates</li>
                            <li>Decision Log</li>
                            <li>Reportings (v2)</li>
                            <li>Action Items</li>
                            <li>Retro Notes (Project & Personal Notes)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="plans">
                      <div className="head">
                        <h4>Enterprise</h4>
                        <h5>Contact for Pricing</h5>
                      </div>
                      <div className="content">
                        <ul className="list-group">
                          <li className="list-group-item">Join any retro</li>
                          <li className="list-group-item">Receive a retro summary</li>
                          <li className="list-group-item">Create a retro</li>
                          <li className="list-group-item"><b>Unlimited</b> retro admin</li>
                          <li className="list-group-item"><b>Unlimited</b> users in a retro</li>
                          <li className="list-group-item"><b>Unlimited</b> retros</li>
                          <li className="list-group-item">Everything in <b>Startup</b></li>
                        </ul>
                        <div className="other-features">
                          <ul>
                            <li>Security (SSL)</li>
                            <li>Data Isolated</li>
                            <li>Manage Users</li>
                            <li>User List / User Details</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div>

        </section>
        <div className="footer">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-footer">
            <div className="col-md-5">
              <div className="" id="navbarText">
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <a className="nav-link" href="#">Contact Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Terms & Condition</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <span className="footer-img">
                <img src={footer} alt="" />
              </span>
            </div>
            <div className="col-md-3">
              <div className="navbar-text f-copyright">
                © Dom & Tom 2018<br />
                Visit our Website
                    </div>
            </div>

          </nav>
        </div>
        {/* <!-- Button trigger modal -->
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
        </button> */}

        {/* Login Modal */}
        <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <ApolloConsumer>
        {client => (
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" ref={this.crossBtn}>&times;</span>
                </button>
                <h5 className="modal-title" id="exampleModalLabel">
                  New to Retro App?<br />
                  <a href="" data-toggle="modal" data-dismiss="modal" data-target="#registerModal">Create Account</a>
                </h5>
              </div>
              <div className="modal-body">
                <h4 className="content-heading">Please log in:</h4>
                <form id="loginForm"
              
                
                >
                  <div className="row">
                    <div className="col-md-4"><label>Your Email:</label></div>
                    <div className="col-md-8">
                      <input type="email" name="email" title="Email" required onChange={(e) => this.setState({email:e.target.value,signinError:false})} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4"><label>Your Password:<br /><span>Requirements</span></label></div>
                    <div className="col-md-8">
                      <input type="password" onChange={(e) => this.setState({password:e.target.value,signinError:false})} name="password" title="Password" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                    {/* LognIN */}
                      <button className="btn btn-default btn-orange btn-submit" onClick={
                        async (e) => {
                          e.preventDefault();
                          console.log(this.state.email , this.state.password);
                          const { data } = await client.query({
                            query: loginUser,
                            variables: { email: this.state.email ,password : this.state.password }
                          });
                          if(data.signIn){
                            console.log(data);
                            if(data.signIn.email != this.state.email || data.signIn.password != this.state.password){
                              this.setState({signinError:"Email or password is incorrect"})
                            }
                            else {
                                 
                              localStorage.setItem('userdata', JSON.stringify(data.signIn));
                              this.crossBtn.current.click()
                              
                              this.props.history.push("/createretro");

                            }
                            
                          }
                          else{
                            this.setState({signinError:"This email does not exists"})
                          }
                        }
                      }
                        
                       disabled={isValid} id="loginbutton" type="submit">Log In</button>
                    </div>
                    <p className={this.state.signinError ? "showError" : "hideError"}>{this.state.signinError}</p>
                  </div>
                </form>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
        )}
        </ApolloConsumer>
        </div>
        </div>
        {/* register Modal */}
        <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
                       
          <Mutation mutation={signUpuser}>
                     {(signUp,{loading,data,error,}) => (

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" ref={this.crossBtnUp}>&times;</span>
                </button>
                <h5 className="modal-title" id="exampleModalLabel">
                  Already have an account?<br />
                  <a  data-toggle="modal" data-dismiss="modal" data-target="#loginModal">Login</a>
                </h5>
              </div>
              <div className="modal-body">
                <h4 className="content-heading">To Create an account,<br />
                  <b>tell us about yourself:</b></h4>
                <form id="registerForm"
                       // onSubmit={(evt) => this.createAccount(evt)}
                     
                >
                  <div className="row">
                    <div className="col-md-3"><label>Your Name:</label></div>
                    <div className="col-md-9">
                      <div className="row mb-0">
                        <div className="col-md-6">
                          <input className="input" type="text" name="first_name"  onChange={(e) => this.setState({createaccountfirstname:e.target.value,signupError:false})}
                          title="First Name" placeholder="First Name" required />
                        </div>
                        <div className="col-md-6">
                          <input className="input" type="text" name="last_name" onChange={(e) => this.setState({createaccountsecondname:e.target.value,signupError:false})}
                           title="Last Name" placeholder="Last Name" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"><label>Your Email:</label></div>
                    <div className="col-md-9">
                      <input className="input" required type="email" onChange={(e) => this.setState({createuseremail:e.target.value,signupError:false})} name="email" title="Email" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"><label>Your Password:<br /><span>Requirements</span></label></div>
                    <div className="col-md-9">
                      <div className="row mb-0">
                        <div className="col-md-6">  
                          <input className="input" type="password" onChange={(e) => this.setState({createaccountpassword:e.target.value,signupError:false})} name="password" title="Password" required />
                        </div>
                        <div className="col-md-6">
                          <input className="input" type="password"  onChange={(e) => this.setState({createaccountconfirmpassword:e.target.value,signupError:false})} name="confirm_password" title="Password" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"><label>I'm a:<br /><span>Requirements</span></label></div>
                    <div className="col-md-9">
                      <ul>
                        <li> <input type="checkbox" className="checkbox"  checked={this.state.checkstatus === 1 ? true : false} onClick={() => this.setState({checkstatus:1,status:"Business User"})} value="Business Users" />  Business User</li>
                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 2 ? true : false} onClick={() => this.setState({checkstatus:2,status :"Freelance Professional"})} name="profession" value="Freelance Professional" />  Freelance Professional</li>
                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 3 ? true :  false} onClick={() => this.setState({checkstatus:3 ,status: "Lorem Ipsum Dolar Sit Amet"}) } value="Lorem ipsum Dolor"/>  Lorem ipsum Dolor</li>
                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 4 ? true : false} onClick={() => this.setState({checkstatus:4 ,status:"Lorem Ipsum Dolar Sit Amet"})} value="Lorem ipsum Dolor" />  Lorem ipsum Dolor</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                    {/* signUP */}
                      <button className="btn btn-default btn-orange btn-submit" disabled={isValid2} 
                        onClick={
                          e => {
                            e.preventDefault();
                            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                             
                            if(re.test(String(this.state.createuseremail).toLowerCase())) {

                              if(this.state.createaccountpassword === this.state.createaccountconfirmpassword){
                               
                                signUp({variables:{
                                  lastname : this.state.createaccountsecondname,
                                  firstname : this.state.createaccountfirstname,
                                  email : this.state.createuseremail,
                                  password : this.state.createaccountconfirmpassword,
                                  userStatus : this.state.status.toString()
                                }}).then((user) => {
                                  var userSignUp = user.data.signUp;
                                 
                                  // if(userSignUp){
                                  
                                    // if(userSignUp.email === this.state.createuseremail){
                                      // alert("This email address is already taken by user");
                                    // }
                                    
                                  // }
                                      // else{
                                        localStorage.setItem('userdata', JSON.stringify(user.data.signUp));
                                        this.crossBtnUp.current.click()
                                        this.props.history.push('/createretro');
                                    // }
                                    
                                }).catch((err) => {
                                  this.setState({signupError:JSON.stringify(err.graphQLErrors[0] ? err.graphQLErrors[0].message : {message:"Error"})})
                                })
                               
                              }
                              else {
                                this.setState({signupError:"Password did not match"})
                              }
                            } else {
                              this.setState({signupError:"Invalid email address"})
                            }
                            }}
                            // data-dismiss="modal"
                      >Create Account</button>

                    </div>
                    <p className={this.state.signupError ? "showError" : "hideError"}>{this.state.signupError}</p>
                  </div>
                </form>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div> */}
            </div>
               
               )}

            </Mutation>
          </div>
        </div>
        
                 
      {/* /body-content  */}
      </div>
    )
  }
}


// export function mapStateToProps(state) {
//   console.log(state) 
//     return {

//   }
// }

// export function mapDispatchToProps(dispatch) {
//   return {
//      userlogin : (data) => {dispatch(userlogin(data))}
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Landingpage)

export default compose(
  graphql(signUpuser, { name: "mysignup" })
)(Landingpage)
// export default Landingpage;