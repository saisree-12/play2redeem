import React from 'react';
import axios from 'axios';
import {  MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import NavComp from '../Components/NavComp'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { MdVerified } from 'react-icons/md'
import { IoMdLogIn } from 'react-icons/io'
import Loading from './Loader'

function Login() {
  const [name,setName] = React.useState('')
  const [mail,setMail] = React.useState('')
  const [uname,setUname] = React.useState('')
  const [pwd,setPwd] = React.useState('')
  const [err,setErr] = React.useState('')
  const [bottomModal, setBottomModal] = React.useState(false);
  const [isLoading,setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    },2000)
    //eslint-disable-next-line
  },[])
  
  const toggleShow = () => setBottomModal(!bottomModal);


  const Navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8888/signup',{uname:uname,mail:mail,name:name,pwd:pwd})
    .then((res) => {
      if (res.data.valid) {
        setErr("Successfull SignIn");
        toggleShow(); // Move the toggleShow() function call here
      } else {
        toggleShow(); // Move the toggleShow() function call here
        setErr("* Invalid Credentials");
      }
    }) 
  }
  
  return ( 
    <>
    {isLoading ? 
    <Loading /> :  
    <div>  
    <NavComp />
    <MDBContainer fluid className='d-flex justify-content-center align-items-center p-4 background-radial-gradient overflow-hidden' style={{height:'100vh'}}>

      <MDBRow className='d-flex justify-content-center  mt-5'>

        <MDBCol md='6' className='h-25 text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)',fontFamily:'Bangers'}}>
            Benefits of<br />
            <span style={{color: 'hsl(218, 81%, 75%)',fontFamily:'Bangers'}}>&nbsp;&nbsp;&nbsp;Signing Up</span>
          </h1>

          <ul className='px-3' style={{color: 'hsl(218, 81%, 85%)',listStyle:'square',fontFamily:'QuickSand'}}>
          <li className='pb-2'>Unlock exclusive offers, bonuses, and promotions available only to registered users. Get access to special discounts, extra coins, and limited-time events that enhance your gaming experience.</li>
          <li className='pb-2'>As a registered user, you'll enjoy personalized gameplay experiences tailored to your preferences.</li>
          <li className='pb-2'>Track your gaming progress, achievements, and milestones as a registered user. </li>
          <li className='pb-2'>Monitor your accomplishments to see how you've grown and improved over time.</li>
          <li className='pb-2'>Enjoy faster response times and dedicated assistance for any technical issues or queries you may have.</li>
          </ul>

        </MDBCol>

        <MDBCol md='4' className='position-relative '>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <form>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>

                <MDBInput wrapperClass='mb-4' label='Full Name' id='form1' type='text' style={{fontFamily:'QuickSand'}} onChange={(e) => {setName(e.target.value)}}/>
                <MDBInput wrapperClass='mb-4' label='Email Id' id='form3' type='text' style={{fontFamily:'QuickSand'}} onChange={(e) => {setMail(e.target.value)}}/>
                <MDBInput wrapperClass='mb-4' label='Username' id='form3' type='text' style={{fontFamily:'QuickSand'}} onChange={(e) => {setUname(e.target.value)}}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' style={{fontFamily:'QuickSand'}} onChange={(e) => {setPwd(e.target.value)}}/>
                <button className='btn btn-primary btn-lg w-100 mb-4' size='md' style={{fontFamily:'Bangers'}} onClick={(e) => {signup(e)}}>SignUp</button>
              </MDBCardBody>
            </MDBCard>
          </form>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
    }

    <div>
      <MDBModal animationDirection='bottom' show={bottomModal} tabIndex='-1' setShow={setBottomModal}>
        <MDBModalDialog position='bottom' frame>
          <MDBModalContent>
            <MDBModalBody className='py-1'>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0 h5' style={{fontFamily:'Bangers'}}><MdVerified className='me-2'/>{err}</p>
                <button onClick={() => Navigate('/login')} className='btn btn-success text-white ms-3' style={{fontFamily:"Bangers",fontSize:"20px"}}>LogIn</button>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
    </> 
  );
}

export default Login;