import React from 'react';
import { Parallax, Background } from 'react-parallax';
import game from '../Assests/empty.jpg';
import { Fade } from 'react-awesome-reveal'
import NavComp from '../Components/NavComp'
import ProgressBar from "react-progressbar-on-scroll";
import Footer from '../Components/Footer'

import spin from '../Assests/spin.png'
import card from '../Assests/card.png'
import { AiFillQuestionCircle } from  'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBAccordion, MDBAccordionItem
} from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


const LandingPage = () => {
  const Navigate = useNavigate();
  const Login = () => {
    if(Cookies.get('process_id')){
      Navigate('/games')
    }
    else{
      Navigate('/login',{state:{flag:0}})
    }
  } 

  const Casino = () => {
    if(Cookies.get('process_id')){
      Navigate('/games/casino')
    }
    else{
      Navigate('/login',{state:{flag:1}}) 
    }
  } 

  const Riddle = () => {
    if(Cookies.get('process_id')){
      Navigate('/games/riddle')
    }
    else{
      Navigate('/login',{state:{flag:3}})
    }
  } 
  return (
    <>
      <Parallax strength={500}>
      <ProgressBar
        color="white" 
        gradient={true}
        height={10}
        gradientColor="#0b2447"
      />   
        <Background>
          <div className='content curve' style={{backgroundColor:'#0B2447'}} >
          <svg style={{bottom:0,position:"fixed"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="orange" fill-opacity="1" d="M0,64L60,96C120,128,240,192,360,224C480,256,600,256,720,234.7C840,213,960,171,1080,138.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
          </div>
        </Background>  
        <NavComp />
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', }} className='content'>
            <Fade cascade duration={2000} className='w-100 text-center p-5'>
              <div className='container text-center'>
                <h1 style={{fontFamily:'Bangers',fontSize:'10em',color:"orange"}} className='fw-bold ls-tight'><b>Play 2 Redeem</b></h1>
                <h1 style={{fontFamily:'QuickSand',color:"white",fontSize:"33px"}} className='fw-bold ls-tight'><b>Welcome to our website, where you can play games like spin the wheel and scratch cards to win exciting rewards. Earn coupons, gift cards, and redeemable coins as you test your luck and skills. Start playing now and unlock a world of prizes!</b></h1>
                <button onClick={() => Login()} className='btn btn-lg text-white mt-3 me-5' style={{width:"200px",height:"60px",Radius:"30px",backgroundColor:"orange",fontFamily:"Bangers",fontSize:"20px"}}>LogIn <IoMdLogIn className='ms-2'/></button>
              </div>
            </Fade>
        </div>
      </Parallax> 

      <Parallax className=''> 
      <Background className='h-100'><div className='h-100' style={{backgroundColor:'orange'}}></div></Background>
      <div className='content' style={{backgroundColor:'orange'}}>
        <div className='d-flex justify-content-evenly flex-wrap h-100'>
          <Fade cascade duration={2000} className='w-100 text-center p-5'>
            <p className=' fw-bold ' style={{fontFamily:"Bangers",fontSize:"60px"}}>Our Games</p>
          </Fade>
          <div className='d-flex flex-column '>
          <Fade cascade damping={.1} duration={2000}> 
            <img src={spin} className='img-hov'></img>
            </Fade>
          </div>
          <div className='d-flex flex-column justify-content-center '>
          <Fade cascade damping={.1} duration={2000} direction='right'>
          <MDBCard className='border-0 landing-card p-3 hov-effect' style={{backgroundColor:"rgba(255,255,255,.4)"}}>
          <MDBCardBody>
            <MDBCardTitle className='h2 ' style={{fontFamily:"Bangers"}}>Lucky Wheel Bonanza</MDBCardTitle>
            <MDBCardText>
            Spin, Win & Save! Play our addictive Spin the Wheel game and unlock amazing rewards. Score coupons, Amazon offers, and more with every spin. Get ready to spin your way to incredible savings and prizes!
            </MDBCardText>
            <button onClick={() => {Casino()}} className='btn btn-success btn-lg' style={{Radius:"30px",fontFamily:"Bangers",fontSize:"20px"}}>Let's Play</button>
          </MDBCardBody>
          </MDBCard>
          </Fade>
          </div>
        </div>

        <div className='d-flex justify-content-evenly flex-wrap ' style={{backgroundColor:'orange'}}>
          <div className='d-flex flex-column justify-content-center'>
          <Fade cascade damping={.1} duration={2000} direction='left'>
          <MDBCard className='border-0 landing-card shadow p-3 hov-effect' style={{backgroundColor:"rgba(255,255,255,.4)"}}>
          <MDBCardBody>
            <MDBCardTitle className='h2' style={{fontFamily:"Bangers"}}>Card Riddle</MDBCardTitle>
            <MDBCardText>
            Crack Riddles, Win Coins! Immerse yourself in our Card Riddle game, solve mind-bending puzzles, and earn shiny coins. Sharpen your wit, unlock rewards, and embrace the thrill of cleverness!
            </MDBCardText>
          <button onClick={() => {Riddle()}} className='btn btn-success btn-lg' style={{Radius:"30px",fontFamily:"Bangers",fontSize:"20px"}}>Let's Play</button>
          </MDBCardBody>
          </MDBCard>
          </Fade>
          </div>
          <div className='d-flex flex-column'>
          <Fade cascade damping={.1} duration={2000}>
            <img src={card} className='img-hov'></img>
            </Fade>
          </div>
        </div>
      </div>
      </Parallax>

      <Parallax strength={600}>
        <Background className='content '><div className='content' style={{backgroundColor:'orange'}}></div></Background>
            <div className='container mt-5' style={{fontFamily:'Josefin Sans'}}>
              <Fade cascade duration={2000} className='w-100 text-center p-5'>
                <p className=' fw-bold ' style={{fontFamily:"Bangers",fontSize:"60px"}}>Frequently asked questions ?</p>
              </Fade> 
              <Fade cascade duration={2000} className='w-100 text-center p-5'>
              <MDBAccordion initialActive={1} style={{backgroundColor:'rgba(255,255,255,.4)'}}>
                <MDBAccordionItem collapseId={1} headerTitle={<><AiFillQuestionCircle /> &nbsp; How can I play the games on your website?</>}>
                To play the games on our website, simply sign up for an account and log in. Once logged in, browse through the available games and 
                choose the one you want to play. Click on the game and follow the instructions provided to start playing.
                </MDBAccordionItem>
                <MDBAccordionItem collapseId={2} headerTitle={<><AiFillQuestionCircle /> &nbsp; How do I win prizes on your website?</>}>
                Winning prizes on our website is easy! Each game has its own set of rules and objectives. By playing the games and achieving the 
                required goals or scores, you can earn points, redeem coins, or unlock prizes. The more you play and excel, the higher your chances of winning exciting rewards.                
                </MDBAccordionItem>
                <MDBAccordionItem collapseId={3} headerTitle={<><AiFillQuestionCircle /> &nbsp; What kinds of prizes can I win?</>}>
                We offer a variety of prizes for our users. These include coupons for discounts on popular brands, redeemable coins that can be used to unlock exclusive content 
                or features within the games, and even exciting offers like gift cards or vouchers for popular online platforms such as Amazon or other partner websites.                
                </MDBAccordionItem>
                <MDBAccordionItem collapseId={4} headerTitle={<><AiFillQuestionCircle /> &nbsp; Are there any restrictions on redeeming prizes?</>}>
                Some prizes may have certain restrictions or conditions associated with them. These restrictions could include expiration dates, usage limitations, or eligibility
                criteria. Please read the terms and conditions provided for each prize before redeeming to ensure you meet the requirements.
                </MDBAccordionItem>
                <MDBAccordionItem collapseId={5} headerTitle={<><AiFillQuestionCircle /> &nbsp; What happens if I encounter an issue while playing or redeeming prizes?</>}>
                If you experience any issues or have questions regarding gameplay or prize redemption, we have a dedicated support team ready to assist you. Simply visit the "Contact Us" 
                page on our website and reach out to us via the provided communication channels. We will do our best to address your concerns promptly.
                </MDBAccordionItem>
              </MDBAccordion>
              </Fade>
            </div>
            <div style={{marginTop:'150px'}}>
              <Footer color={"black"}/>
            </div>
      </Parallax>
    </>
  );
};

export default LandingPage;
