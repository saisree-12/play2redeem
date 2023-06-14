import React, { useState } from 'react';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,} from 'mdb-react-ui-kit';
import NavComp from './NavComp';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Loading from './Loader'

const Login = () => {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [uname,setUname] = React.useState('')
  const [pwd,setPwd] = React.useState('')
  const [err,setErr] = React.useState('')
  const [flag,setFlag] = React.useState('1')

  const key =  `${process.env.REACT_APP_KEY}`;

  React.useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    },2000)
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams.get('flag'));
    setFlag(queryParams.get('flag'));
    console.log(flag)
    //eslint-disable-next-line
  },[flag])

  // Assuming the current URL is "/login?flag=example"

  const login = (e) => {
    e.preventDefault();
    axios.post('https://play2redeem.onrender.com/login',{uname:uname,pwd:pwd})
    .then((res) => {
      if(res.data.valid){
        const encrypteduname = CryptoJS.AES.encrypt(JSON.stringify(uname),key).toString()
        Cookies.set('process_id',encrypteduname,{path:'/',expires:1})
        if(flag==='0') Navigate('/games')
        else{
          if(Location.state.flag===0) Navigate('/games');
          else if(Location.state.flag===1)  Navigate('/games/casino')
          else if(Location.state.flag===3)  Navigate('/games/riddle')
          else if(Location.state.flag===4) Navigate('/profile') 
          else Navigate('/games')
        }
      }      
      else { 
          Cookies.remove('process_id')
          setErr("* Invalid Credentials")  
      }  
    })
  }

  const Uname = (uname) => {
    setUname(uname);
    setErr("");
  } 
  const Pwd = (pwd) => {
    setPwd(pwd);
    setErr("");
  }

  return (
    <>
    {isLoading ? 
    <Loading /> :  
      <div>
        <NavComp />
        <MDBContainer
          fluid
          className="d-flex justify-content-center align-items-center p-4 background-radial-gradient overflow-hidden "
          style={{ height: '100vh' }}
        >
          <MDBRow className="d-flex justify-content-center mt-5">
            <MDBCol md="6" className="h-25  text-center text-md-start d-flex flex-column justify-content-center">
              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)', fontFamily: 'Bangers' }}>
                Benefits of
                <br />
                <span style={{ color: 'hsl(218, 81%, 75%)', fontFamily: 'Bangers' }}>&nbsp;&nbsp;&nbsp;Logging In</span>
              </h1>
              <ul className="px-3" style={{ color: 'hsl(218, 81%, 85%)', listStyle: 'square', fontFamily: 'QuickSand' }}>
                <li className="pb-2">Unlock exclusive offers, bonuses, and promotions available only to registered users. Get access to special discounts, extra coins, and limited-time events that enhance your gaming experience.</li>
                <li className="pb-2">As a registered user, you'll enjoy personalized gameplay experiences tailored to your preferences.</li>
                <li className="pb-2">Track your gaming progress, achievements, and milestones as a registered user.</li>
                <li className="pb-2">Monitor your accomplishments to see how you've grown and improved over time.</li>
                {/* <li className="pb-2">Enjoy faster response times and dedicated assistance for any technical issues or queries you may have.</li> */}
              </ul>
            </MDBCol>
            <MDBCol md="4" className="position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              <form>
              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <MDBInput wrapperClass="mb-4" label="Username" id="form3" type="text" style={{ fontFamily: 'QuickSand' }} onChange={(e) => Uname(e.target.value)}/>
                  <MDBInput wrapperClass="" label="Password" id="form4" type="password" style={{ fontFamily: 'QuickSand' }} onChange={(e) => Pwd(e.target.value)}/>
                  {/* <button className="btn btn-link ps-0" onClick={(e) => openModal(e)}>Forgot Password</button> */}
                  <button className="btn btn-primary btn-lg w-100 mb-4 mt-3" size="md" style={{ fontFamily: 'Bangers' }} onClick={(e) => {login(e)}}>LogIn</button>
                  <p className='h6' style={{color:'red',textAlign:'start',fontFamily:'Josefin Sans'}}>{err}</p><br></br>
                </MDBCardBody>
              </MDBCard>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    }
    </>
  ); 
};

export default Login;
