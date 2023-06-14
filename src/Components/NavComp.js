import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Games from '../Components/Games'
import Login from '../Components/Login'
import Signup from '../Components/Signup' 
import { Parallax } from "react-parallax"
import { Link } from 'react-router-dom';
import Logo from '../Assests/logo.png';
import { useNavigate } from 'react-router-dom';
import Av1 from '../Assests/Av1.jpg'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const NavComp = () => {

    const Navigate = useNavigate();
    const Logout = () => {
        if(document.getElementById('log').innerHTML==='Logout'){
            Cookies.remove('process_id')
            Navigate('/')
        }
    }
    const Profile = () => {
        if(Cookies.get('process_id')){
            Navigate('/profile')
        }else{ 
            Navigate('/login',{state:{flag:4}})
        }
    }   
    
return ( 
    <> 
        <div style={{width:"100vw",position:"fixed",zIndex:100}} className='d-flex justify-content-center p-5' >
            <div className='nav-container rounded rounded-4'>
            <Navbar variant={'dark'} expand="sm" className='h5' style={{ fontFamily: "QuickSand", }}>
                <Container className='rb'>
                <Navbar.Brand as={Link} to='/'>
                    <img
                    alt="Play2Redeem"
                    src={Logo}
                    width="100"
                    height="50"
                    className="d-inline-block align"
                    />  
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse> 
                    <Nav className='ms-auto'> 
                    <Nav.Link href={Cookies.get('process_id')?`/games`:'/login?flag='+'0'} >Games</Nav.Link>
                    <Nav.Link href='/signup'>SignUp</Nav.Link>
                    {/* <Nav.Link id='log' href={Cookies.get('process_id')?`/`:`/login`} onClick = {Logout}>{Cookies.get('process_id')?'Logout':'Login'}</Nav.Link>                     */}
                    <Nav.Link id='log' href={`${Cookies.get('process_id') ? '/' : '/login?flag=' + '0'}`} onClick={Logout}>
                        {Cookies.get('process_id') ? 'Logout' : 'Login'}
                    </Nav.Link>

                    <Nav.Item> 
                        <img onClick={Profile} src={Av1} style={{width:40}} className="rounded rounded-5 ms-5" alt="Card" />  
                    </Nav.Item>
                    </Nav>  
                </Navbar.Collapse> 
                </Container> 
            </Navbar>
            </div>  
        </div> 
    </> 
  );
};

export default NavComp;