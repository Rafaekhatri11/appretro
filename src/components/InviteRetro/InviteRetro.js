import React, { Component } from 'react';
import './invite.css';
import Icon from 'react-icons-kit';
import { caretRight } from 'react-icons-kit/fa/caretRight';
import { checkCircle } from 'react-icons-kit/fa/checkCircle';
import { exclamationCircle } from 'react-icons-kit/fa/exclamationCircle';
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, compose, graphql, Mutation, ApolloConsumer } from "react-apollo";
import { ic_close } from 'react-icons-kit/md/ic_close';

const findroomno = gql`
query($roomcode: ID!){

        findroomcode(roomcode:$roomcode){
          id
          roomcode
        }
      
  }
`
const setRetro = gql`
mutation(
  $useruid: ID!,
  $retroadmin: String!,
  $projectname: String! ,
  $roomcode: String!,
  $templatename: String!,
  $shareablelink: String!,
  $retrocategory1: String!,
  $retrocategory2: String!,
  $retrocategory3: String!,
  $retrocategory4: String!,
  $startTime: String!,
  $Endtime: String!,
  $startdate: String!,
  $Enddate: String!,
  $repeatevery: String!,
  $Endson: String!,
 ) {

      setretro(
          
          useruid : $useruid
          retroadmin :$retroadmin
          projectname :$projectname
          roomcode: $roomcode
          templatename : $templatename
          shareablelink : $shareablelink
          retrocategory1 : $retrocategory1
          retrocategory2 : $retrocategory2
          retrocategory3 : $retrocategory3
          retrocategory4 : $retrocategory4
          startTime  : $startTime
          Endtime : $Endtime
          startdate : $startdate
          Enddate : $Enddate
          repeatevery : $repeatevery
          Endson    : $Endson
       
        ){
            useruid
            retroadmin
            projectname
            roomcode
            templatename
            shareablelink
            retrocategory1
            retrocategory2
            retrocategory3
            retrocategory4
            startTime
            Endtime
            startdate
            Enddate
            repeatevery
            Endson
         
        }
        
    }
    
    `;
class Invite extends Component {
    constructor() {
        super();
        this.state = {
            roomCode: "",
            timeFrom: "",
            timeTo: "",
            inputDate: "",
            inputWeek: "",
            endOnDate: "",
            repeatEvery: "false",
            sendInViteEmail: "",
            sendInViteEmailDisplay: [],
            sharedlink: "",
            createretroinfo: {},
            userinfo: {},
            inputtypetime: false
        }
    }

    componentDidMount() {
        let data = localStorage.getItem('createretro');
        let values = JSON.parse(data);
        console.log(values);
        let data1 = localStorage.getItem('userdata');
        let values1 = JSON.parse(data1);
        this.setState({ createretroinfo: values, userinfo: values1 })

    }
    logout() {
        this.props.history.push('/');
        localStorage.clear();
    }
    clear() {
        this.setState({

            timeFrom: "",
            timeTo: "",
            inputDate: "",
            inputWeek: "",
            endOnDate: "",
            repeatEvery: false,

        })
    }
    sendInviteHandler = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(this.state.sendInViteEmail).toLowerCase())) {
            let getValue = this.state.sendInViteEmailDisplay;
            getValue.push({ email: this.state.sendInViteEmail, adminstatus: false });
            this.setState({ sendInViteEmailDisplay: getValue ,sendInViteEmail:""})
        }
        else {

            alert("Please write an email");


        }
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    removeEmailHandler(index) {
        let getArr = this.state.sendInViteEmailDisplay;
        getArr.splice(index, 1);
        this.setState({ sendInViteEmailDisplay: getArr })
    }
    adminstatus(index) {
        let oldArray = this.state.sendInViteEmailDisplay
        // console.log("array",oldArray,index)
        // console.log("array",oldArray[index])
        oldArray[index]['adminstatus'] = !oldArray[index]['adminstatus']
        this.setState({ sendInViteEmailDisplay: oldArray });
    }
    render() {

        console.log(this.state)
        const { timeFrom, timeTo, inputDate, inputWeek, endOnDate, repeatEvery } = this.state;
        // const valid = timeFrom === "" || timeTo === "" || inputDate === "" || inputWeek === "" || endOnDate === "" || repeatEvery === "";
        console.log(this.state)
        return (
            <div id="inviteretro">

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
                                        <Link to="/createretro" className="nav-item nav-link" > Create Retro</Link>
                                        <Link to="/invite" className="nav-item nav-link active">Invite Retro</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="row mb-3">
                                <div className="col-md-12 ">
                                    <h3 className="page-title">Invite Your Team</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 pr-3">
                                    <ApolloConsumer>
                                        {client => (
                                            <div>
                                                <h4 className="label">Room Code</h4>
                                                <div className="row mb-3">
                                                    <div className="col-md-5 pr-0">
                                                        <input type="text"

                                                            onBlur={async () => {
                                                                await client.query({
                                                                    query: findroomno,
                                                                    variables: { roomcode: this.state.roomCode }
                                                                })
                                                                    .then((res) => {
                                                                        console.log("Successfull", res)
                                                                    }).catch((err) => {
                                                                        alert(JSON.stringify(err.graphQLErrors[0].message))
                                                                    })
                                                            }}
                                                            className="form-control" name="room_code" placeholder="Room Code" onChange={(text) => this.setState({ roomCode: text.target.value })} />
                                                        {/* <span className="float-right optional">optional</span> */}
                                                    </div>
                                                    <div className="col-md-7 align-left push-left pl-2">
                                                        <h5 className="float-right tip mr-auto">
                                                            <span><Icon icon={exclamationCircle} /></span>Tip
                                <br />
                                                            <span className="text-grey">Customize your room code!</span>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </ApolloConsumer>

                                    <h4 className="label mt-4">Share Link</h4>
                                    <div className="row mb-5">
                                        <div className="col-md-12">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" onChange={(e) => this.setState({ sharedlink: e.target.value })}
                                                    aria-label="https://www.retroapp.com/ABCDE" aria-describedby="basic-addon2" value={"http://www.retroapp.com/" + this.state.roomCode} disabled />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary btn-orange btn-copy-link" type="button" onClick={() => { navigator.clipboard.writeText("http://www.retroapp.com/" + this.state.roomCode) }}>Copy Link</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="label">Schedule Date & Time <span className="ml-auto"><button className="btn btn-sm btn-outline-primary float-right btn-cat-reset" onClick={() => this.clear()}>Clear</button></span></h4>
                                        <h5 className="message-leave">Leave this blank if you are starting a retro immediately</h5>
                                        <div className="row mb-2">
                                            <div className="col-md-7 pr-0">
                                                {/* <input type="text" className="input-time mt-3" placeholder="" /> to
                                
                                    <input type="text" className="input-time mt-3 ml-1" placeholder="" /> */}
                                                <p>
                                                    <div className="tap2dropdown">
                                                        <select className="tabselect" value={this.state.timeFrom} onChange={(text) => this.setState({ timeFrom: text.target.value })}>
                                                            <option className="tap2option" />
                                                            <option className="tap2option" value="9:00 AM">9:00 AM</option>
                                                            <option className="tap2option" value="9:30 AM">9:30 AM</option>
                                                            <option className="tap2option" value="10:00 AM">10:00 AM</option>
                                                            <option className="tap2option" value="10:30 AM">10:30 AM</option>
                                                        </select>
                                                        <span className="tap2to">to</span>
                                                        {/* {
                          this.state.timeTo === true ?
                            <input type="time" min="9:00" required />
                          : */}
                                                        <select className="tabselect" value={this.state.timeTo} onChange={(text) => this.setState({ timeTo: text.target.value })}>
                                                            <option value={true} />

                                                            <option className="tap2option" value="9:30 AM">9:00 PM</option>
                                                            {/* <option className="tap2option" value="10:00 AM">10:00 AM</option>
                        <option className="tap2option" value="10:30 AM<">10:30 AM</option>
                        <option className="tap2option" value="11:00 AM">11:00 AM</option> */}
                                                        </select>
                                                        {/* } */}
                                                        &nbsp;&nbsp;
                    <input type="date" min={this.formatDate(new Date())} className="form-control" placeholder="" onChange={(text) => this.setState({ inputDate: text.target.value })} />

                                                    </div>

                                                </p>







                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="remember">
                                                <input type="checkbox" value={this.state.repeatEvery} id="remember-me" onChange={() => this.setState({ repeatEvery: "true" })} />
                                                <label for="remember-me" class="block">Repeat every</label>
                                            </div>

                                            <div className="col-md-4">
                                                <select value={this.state.inputWeek} className="form-control minimal" onChange={(text) => this.setState({ inputWeek: text.target.value })}>
                                                    <option value={1}>Week</option>
                                                    <option value={2}>2 Weeks</option>
                                                    <option value={3}>3 Weeks</option>
                                                    <option value={4}>4 Weeks</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <label className="repeat-label">On Monday</label>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4 pr-0">

                                            </div>
                                            <div className="col-md-3 pt-2">
                                                Ends On
                                </div>
                                            <div className="col-md-5  pl-0">
                                                <input type="date" min={this.formatDate(new Date())} className="form-control mt-0" placeholder="" value={this.state.endOnDate}
                                                    onChange={(text) => this.setState({ endOnDate: text.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 pl-5 right-section">
                                    <div className="row ml-5 mb-3">
                                        <div className="col-md-6 offset-md-3">
                                            <h5 className="label">Send Invite</h5>
                                            <div className="row mb-4">
                                                <div className="col-md-12">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Recipient's username" value={this.state.sendInViteEmail}
                                                        aria-label="https://www.retroapp.com/ABCDE" aria-describedby="basic-addon2" onChange={(text) => this.setState({ sendInViteEmail: text.target.value })} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-secondary btn-orange btn-copy-link" type="button" onClick={this.sendInviteHandler}>Send Invite</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="label">Who's invited</h5>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h5>Email</h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <h5>Admin</h5>
                                                </div>
                                            </div>




                                            {this.state.sendInViteEmailDisplay.map((value, index) => {

                                                return <div className="row" key={index}>
                                                    {/* <div className="col-md-8">
                                        <h6>{value}</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="admin">
                                            <input type="checkbox" checked className="" name="admin" /> <label>&nbsp;</label>
                                            <span className="ml-4 times">&times;</span>
                                        </div>
                                    </div> */}
                                                    <div className="sendInvideDiv">
                                                        <p className="sendInvideP">{value.email}</p>
                                                        <div className="sendInvideDiv2">
                                                            <p className={this.state.sendInViteEmailDisplay[index]["adminstatus"] ? "sendInvideA" : "sendInvideAN"} onClick={() => this.adminstatus(index)}>A</p>
                                                            <p onClick={() => this.removeEmailHandler(index)}><span className="sendInvideIcon"><Icon size="1.5em" icon={ic_close} /></span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}






                                            {/* <div className="row">
                                    <div className="col-md-8">
                                        <h6>abc.html@gmail.com </h6>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="admin">
                                            <input type="checkbox" className="" name="admin" /> <label>&nbsp;</label>
                                            <a><span className="ml-4 times">&times;</span></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <h6>abc.html@gmail.com </h6>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="admin">
                                            <input type="checkbox" className="" name="admin" /> <label>&nbsp;</label>
                                            <a><span className="ml-4 times">&times;</span></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <h6>abc.html@gmail.com </h6>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="admin">
                                            <input type="checkbox" className="" name="admin" /> <label>&nbsp;</label>
                                            <a><span className="ml-4 times">&times;</span></a>
                                        </div>
                                    </div>
                                </div> */}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 offset-md-4 done-button">
                                    <Mutation mutation={setRetro}>
                                        {(setretro, { data }) => (

                                            <button
                                                //    disabled={

                                                //        JSON.parse(localStorage.getItem("createretro")) === null ? true :false
                                                //        } 
                                                onClick={
                                                    e => {
                                                        e.preventDefault();
                                                        var beginningdata = this.state.inputDate.split('-');
                                                        var endingdate = this.state.endOnDate.split('-');

                                                        if (this.state.createretroinfo === null) {
                                                            alert("Please create a retro first");
                                                        }

                                                        else {

                                                            if (
                                                                beginningdata[2] < endingdate[2] && beginningdata[1] <= endingdate[1] && beginningdata[0] <= endingdate[0]
                                                            ) {
                                                                console.log("success");


                                                                setretro({
                                                                    variables: {
                                                                        useruid: this.state.createretroinfo.useruid,
                                                                        retroadmin: this.state.createretroinfo.retroadmin,
                                                                        projectname: this.state.createretroinfo.projectname,
                                                                        roomcode: this.state.roomCode,
                                                                        templatename: this.state.createretroinfo.templatename,
                                                                        shareablelink: this.state.sharedlink,
                                                                        retrocategory1: this.state.createretroinfo.retrocategory1,
                                                                        retrocategory2: this.state.createretroinfo.retrocategory2,
                                                                        retrocategory3: this.state.createretroinfo.retrocategory3,
                                                                        retrocategory4: this.state.createretroinfo.retrocategory4,
                                                                        startTime: this.state.timeFrom,
                                                                        Endtime: this.state.timeTo,
                                                                        startdate: this.state.inputDate,
                                                                        Enddate: this.state.endOnDate,
                                                                        repeatevery: this.state.repeatEvery,
                                                                        Endson: this.state.endOnDate,
                                                                        // inviteuid : $inviteuid
                                                                        // createdat : $createdat
                                                                    }
                                                                }).then((ress) => {

                                                                    this.setState({
                                                                        useruid: "",
                                                                        retroadmin: "",
                                                                        projectname: "",
                                                                        roomcode: "",
                                                                        templatename: "",
                                                                        shareablelink: "",
                                                                        retrocategory1: "",
                                                                        retrocategory2: "",
                                                                        retrocategory3: "",
                                                                        retrocategory4: "",
                                                                        startTime: "",
                                                                        Endtime: "",
                                                                        startdate: "",
                                                                        Enddate: "",
                                                                        repeatevery: "",
                                                                        Endson: "",
                                                                        sendInViteEmailDisplay: [],
                                                                        createretroinfo: {}
                                                                        // inviteuid : $inviteuid
                                                                    })
                                                                    console.log(ress);
                                                                    localStorage.removeItem("createretro");
                                                                    alert("Successfully scheduled");
                                                                    this.props.history.push("/retros");
                                                                }).catch(err => {
                                                                    console.log(err);
                                                                })
                                                            }
                                                            else {

                                                                console.log("else ", beginningdata[0], beginningdata[1], beginningdata[2], endingdate[0]
                                                                    , endingdate[1], endingdate[2]);
                                                                alert("please select correct date")
                                                            }
                                                        }
                                                    }
                                                }

                                                className="btn btn-default btn-done btn-block">Done</button>
                                        )}
                                    </Mutation>
                                </div>
                            </div>

                        </div>
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
export default Invite;