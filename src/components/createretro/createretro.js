import React, { Component } from 'react';
// import {
//   Navbar, Nav, NavItem,
//   Button, MenuItem, NavDropdown, FormControl, Tabs, Tab,
//   Table, Modal, Form, FormGroup, ControlLabel ,
// } from 'react-bootstrap';
// import logo from './Selection_003.png';
// import personlogo from './dropdownpersion.png';
// import { caretRight } from 'react-icons-kit/fa/caretRight';
// import { checkCircle } from 'react-icons-kit/fa/checkCircle';
// import Icon from 'react-icons-kit';
// import { close } from "react-icons-kit/fa/close";
// import { ic_close } from 'react-icons-kit/md/ic_close';
// import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import './create.css';
import {Link} from 'react-router-dom';
import {plus} from 'react-icons-kit/iconic/plus'
import Icon from 'react-icons-kit';
import { caretRight } from 'react-icons-kit/fa/caretRight';
import { checkCircle } from 'react-icons-kit/fa/checkCircle';
import gql from "graphql-tag";
import { Query, compose, graphql, Mutation, ApolloConsumer } from "react-apollo";
var jwt = require('jsonwebtoken');


const usertemplatequery = gql`
     query($useruid : ID!){
    usertemplate(useruid : $useruid){
      id
      useruid
      templatename
      retroadmin
      retrocategory1
      retrocategory2
      retrocategory3
      retrocategory4
    }
  }
`;

const submitcreateretro = gql`
mutation(
  $useruid: ID!
  $retroadmin: String!
  $projectname: String!
  $sprintnumber: String!
  $templatename: String!
  $retrocategory1: String!
  $retrocategory2: String!
  $retrocategory3: String!
  $retrocategory4: String!) {

    createretro(
      useruid:  $useruid
      retroadmin :$retroadmin
      projectname:  $projectname
      sprintnumber: $sprintnumber
      templatename: $templatename
      retrocategory1: $retrocategory1
      retrocategory2: $retrocategory2
      retrocategory3: $retrocategory3
      retrocategory4: $retrocategory4){
        id
        useruid
        retroadmin
        projectname
        sprintnumber
        templatename
        retrocategory1
        retrocategory2
        retrocategory3
        retrocategory4
      }

    }
`

class Createretro extends Component {
  constructor() {
    super();
    this.state = {
      userinfo: {},
      sprint : "",
      edit: false,
      projectname: false,
      nameofproject: '',
      show: false,
      show1: false,
      templatename: '',
      whatdidwelearn: 'What did we learn',
      whatwentwell: 'what went well',
      whatcanweimprove: 'what can we improve',
      whatpuzzleus: 'what puzzle us',
      reset: false,
      newtemplatename: '',
      navigation: true,
     
    }
  }
  componentDidMount() {
    var data = localStorage.getItem('userdata');
    var userdata = JSON.parse(data);
    this.setState({userinfo:userdata})
    console.log(this.state.userinfo,userdata);

    // jwt.verify(userdata.token, 'secret', (err, decoded) => {
    //   console.log(decoded);
    //   this.setState({ userinfo: decoded })

    // });

    //this timeout is used for check user information thorugh api is takes some time
    //  setTimeout(() => {console.log(this.state.userinfo)} ,5000);
  }

  handleHide() {
    this.setState({ show: false });
    var dropdownvalue = document.getElementById('mydropdown');
    var options = document.createElement("option");
    options.setAttribute('selected', "selected")
    var optiontext = document.createTextNode(this.state.nameofproject);
    // var att = document.createAttribute("selected");
    // att.value = "selected";
    var newdropdown = options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
    dropdownvalue.appendChild(options);


    // att.value = "selected";
    // var newdropdown =  options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
  }
  newtemplatevalue() {
    var newtemplatename = document.getElementById("savetemplate");
    var options = document.createElement("option");
    options.setAttribute('selected', "selected");
    var optiontext = document.createTextNode(this.state.newtemplatename);
    // var att = document.createAttribute("selected");
    // att.value = "selected";
    var newdropdown = options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
    newtemplatename.appendChild(options);
    console.log(this.state.newtemplatename);
    this.setState({templatename : this.state.newtemplatename});
    
  }

  reset(){
      this.setState({
          whatcanweimprove: "",
          whatdidwelearn: "",
          whatpuzzleus:"",
          whatwentwell : ""
      })
  }
  changeimage(evt){
    console.log("run or not",evt);
    if( evt === 2){

      document.getElementById("createretrobackground").id = "inviteretro"; 
    }
    else if(evt === 1 ){
      document.getElementById("inviteretro").id = "createretrobackground"; 
    }
  }

  handleHide1() {
    this.setState({ show1: false });
  }
  getprojectnam(evt) {
    if (evt.target.value === "New Project") {
      this.setState({ show: true, })
    }
    else {
      this.setState({ nameofproject: evt.target.value });
    }
  }


  gettemplatename(evt) {
    if (evt.target.value) {
      this.setState({ show1: true, reset: true, templatename: evt.target.value });
    }
    else {
      this.setState({ templatename: evt.target.value });
    }

  }

  logout() {
    this.props.history.push('/');
    localStorage.clear();
  }


  render() {
     const { newtemplatename , nameofproject, templatename } = this.state;
    // const valid = newtemplatename === "";
     const valid = nameofproject === "" || templatename  ===  "";
    
    console.log(this.state.templatename);
    return (
      <div id="createretrobackground">

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
<div className="main-content">
  <div className="bg-light">
      <div className="row">
          <div className="col-md-4 offset-md-4 pr-5 pl-5">
              <nav className="nav nav-pills nav-justified">
                  <Link to="/createretro" className="nav-item nav-link active" > Create Retro</Link>
                  <Link to="/invite" className="nav-item nav-link" >Invite Retro</Link>
              </nav>
          </div>
      </div>
  </div>
  <Mutation mutation={submitcreateretro}>
        {(createretro,{data}) => (

            <div className="section">
      <div className="row">
          <div className="col-md-4 pr-0">
              <h4 className="label">Project Information</h4>
              <div className="row mb-3">
                  <div className="col-md-8 pr-1">
                      <input type="text" className="form-control"
                        onChange={(e) => this.setState({nameofproject:e.target.value})}
                      name="project_name" placeholder="Project Name" />
                  </div>
                  <div className="col-md-4 pl-0">
                  
                      <input type="text" className="form-control" name="sprint_name"
                       onChange={(e) => this.setState({sprint:e.target.value})}
                      placeholder="Sprint Number" />
                      <span className="float-right optional">optional</span>
                  </div>
              </div>
              <h4 className="label">Choose a Template:</h4>
              <div className="row mb-5">
                  <div className="col-md-12">
                      <select  onChange={(evt) => this.gettemplatename(evt)} id="savetemplate" className="form-control minimal" >
                          <optgroup id="selectbox" label="Default Templates">
                              <option value="Sprint Ceremonies">Sprint Ceremonies</option>
                              <option value="Product Launch">Product Launch</option>
                              <option value="Failed Sprint">Failed Sprint</option>
                              <option value="Client Check-in">Client Check-in</option>

                          </optgroup>
                            <optgroup id="selectbox" label="My Templates">
                            <Query query={usertemplatequery} fetchPolicy="network-only"
                             variables={{useruid : "5bfab5276ce0553c18ff5a29"}}>
                            {
                                ({loading,error,data}) => {
                                    if(loading) return null;
                                        if(error) return `Error! : ${error}`;
                                        if(data){

                                            return(

                                                
                                                data.usertemplate.map((values, index) => {
                                                    console.log(values);
                                                     if(values.useruid === this.state.userinfo.id){

                                                        return(
                                                            
                                                            <option key={index} value={values.templatename}>{values.templatename}</option>
                                                            
                                                            );
                                                            
                                                            
                                                         }
                                                        })
                                                        )
                                                }
                                            }
                                        }

                            </Query>
                                </optgroup>   
                          <option id="newtemplate" value="true" >  <Icon size="1rem" icon={plus} /> New Template</option>
                      </select>
                      {/* <input type="text" className="form-control" name="project_name" placeholder="Project Name" /> */}
                  </div>
              </div>
              <div className="cat-bg mt-3 pt-3 pb-3 pl-3 pr-3">
                  <h4 className="label">Retro Categories</h4>
                  <div id="editbutton " className="col-md-12">
                    {this.state.whatcanweimprove !="" || this.state.whatdidwelearn != "" || this.state.whatpuzzleus != "" || this.state.whatwentwell != ""
                            ?
                            <button  onClick={()=>this.reset()}
                            className="btn btn-sm btn-outline-primary float-right btn-cat-reset">Reset</button>   :
                            
                            <button className="btn btn-sm btn-primary float-right btn-cat-edit">Edit</button>
                        }
                  </div>
               <div className="row mb-2">
                      <div className="col-md-12">
                          <input type="text" className="form-control mt-3" value={this.state.whatwentwell}
                          onChange={(evt) => this.setState({ whatwentwell: evt.target.value })}  
                          placeholder="" />
                          <input type="text" className="form-control mt-3" value={this.state.whatdidwelearn}
                          onChange={(evt) => this.setState({ whatdidwelearn: evt.target.value })}
                          placeholder="" />
                          <input type="text" className="form-control mt-3" value={this.state.whatcanweimprove}
                          onChange={(evt) => this.setState({ whatcanweimprove: evt.target.value })} 
                          placeholder="" />
                          <input type="text" className="form-control mt-3" value={this.state.whatpuzzleus}
                          onChange={(evt) => this.setState({ whatpuzzleus: evt.target.value })} 
                          placeholder="" />
                      </div>
                  </div>
               {
                   this.state.templatename === "true" ? 
                   <div>

                   <h4 className="label">Name New Template:</h4>
                   <div className="row mb-3">
                       <div className="col-md-10 pr-1">
                           <input type="text" className="form-control bg-white border" 
                            onChange={(e) => this.setState({newtemplatename:e.target.value})}
                            name="template_name" placeholder="" />
                       </div>
                       <div className="col-md-2 pl-0">
                           <button className="btn btn-primary btn-block" onClick={() => this.newtemplatevalue()}>Save</button>
                       </div>
                   </div>
                   </div> : ""
               }
              </div>
          </div>
          <div className="col-md-8 pl-5 pt-5 right-section">
              <div className="row ml-5 ">
                  <div className="col-md-3 bars">
                      <div className=" bg-light">
                          <h4>{this.state.whatwentwell}</h4>
                      </div>
                  </div>
                  <div className="col-md-3 bars">
                      <div className=" bg-light">
                          <h4>{this.state.whatdidwelearn}</h4>
                      </div>
                  </div>
                  <div className="col-md-3 bars">
                      <div className=" bg-light">
                          <h4>{this.state.whatcanweimprove}</h4>
                      </div>
                  </div>
                  <div className="col-md-3 bars">
                      <div className=" bg-light">
                          <h4>{this.state.whatpuzzleus}</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-md-4 offset-md-4 next-button">
              <button 
                    onClick={ e =>  {
                        e.preventDefault();
                        let flag = 0;
                        let arr = [this.state.whatwentwell,this.state.whatdidwelearn,this.state.whatcanweimprove,this.state.whatpuzzleus];
                        
                       for(let i = 0;i < 4;i++) {
                           if(arr[i] !== "") {
                               ++flag;
                           }
                       }
                     if(flag >= 2) {

                         createretro({variables : { 
    
                             useruid: this.state.userinfo.id,
                             retroadmin: this.state.userinfo.email,
                             projectname: this.state.nameofproject,
                             sprintnumber: this.state.sprint,
                             templatename: this.state.templatename,
                             retrocategory1: this.state.whatwentwell,
                             retrocategory2: this.state.whatdidwelearn,
                             retrocategory3: this.state.whatcanweimprove,
                             retrocategory4: this.state.whatpuzzleus,
                         }}).then(res => {
                             localStorage.setItem("createretro",JSON.stringify(res.data.createretro));
                             this.props.history.push('/invite')
                             console.log("====datasend" , data);
                         })
                     } else {
                         alert("Please select atleast two retro category")
                     }                       
                    }} 
                    disabled={valid}
              className="btn btn-default btn-next btn-block">Next</button>
          </div>
      </div>
  </div>
)}
</Mutation>
</div>
{/* <div className="footer">
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
<img src={require("./img/footer.png")} alt="" />
</span>
</div>
<div className="col-md-3">
<div className="navbar-text f-copyright">
© Dom & Tom 2018<br/>
Visit our Website
</div>
</div>

</nav>
</div> */}
</div>
</div>
 
    );
  }
}

export default compose(
  graphql(submitcreateretro, { name: "createretro" })
)(Createretro)

// export default Createretro