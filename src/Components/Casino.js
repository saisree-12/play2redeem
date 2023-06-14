import WheelComponent from "react-wheel-of-prizes";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import React ,{useState} from "react";
import Footer from "./Footer";
import NavComp from "./NavComp";
import Confetti from "react-confetti";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Loading from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VscDebugContinue } from 'react-icons/vsc'


function Spinner(params) {
  const [flag,setFlag] = React.useState(false)
  const [wins,setWins] = React.useState(false)
  const [wish,setWish] = useState('Better Luck Next Time')
    const [msg,setmsg] = useState('Continue to play again')
  const segments = [
    "better luck next time",
    "70 coins",
    "Amazon Gift Card",
    "better luck next time",
    "10 coins",
    "won uber pass",
    "better luck next time",
    "100 coins"
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#EC3F3F",
    "#FF9000"
  ];
  const [bottomModal, setBottomModal] = React.useState(false);
  const [isLoading,setLoading] = React.useState();
  const toggleShow = () => setBottomModal(!bottomModal);
  const Navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    },2000)
    //eslint-disable-next-line
  },[])
  const onFinished = (winner) => {
    toggleShow()
    const key = `${process.env.REACT_APP_KEY}`
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
    let type,win;
    if(winner!=="better luck next time"){
      setWins(true);
      if(winner.includes('coins')){
        type="coins"
        win = parseInt(winner.split(' ')[0])
      }else{
        type="vouchers";
        win = winner;
      }
      setWish("Congratulations !")
      setmsg(`You have won ${winner}`) 
      setFlag(true); 
      axios.post('https://play2redeem.onrender.com/win',{uname:uname,win:win,type:type,won:true})
      .then(res => {
        console.log(res);
      }) 
    }
    else{ 
      
      const key = `${process.env.REACT_APP_KEY}`
      const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
      const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
      axios.post('https://play2redeem.onrender.com/lose',{uname:uname})
      .then(res => {
        console.log(res);
      })
    } 
  };
  
  return (
    <>
      {wins && <Confetti />}
      {isLoading ? <Loading /> :
      <div className=" text-white d-flex flex-column align-items-center " style={{minHeight:'100vh',backgroundColor:"#0b2447"}}>
          <div style={{width:"100vw",fontFamily:'Bangers',color:'orange',marginTop:140}}><p className="h1 text-center">Lucky Wheel Bonanza</p></div> 
          <div className="d-flex justify-content-center align-items-start">
              <div className=" d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center justidy-content-center " style={{width:"600px",marginTop:"60px",height:"600px"}}>
                      <WheelComponent
                      segments={segments}
                      segColors={segColors}
                      winningSegment="won 10"
                      onFinished={(winner) => onFinished(winner)}
                      primaryColor="white"
                      contrastColor="black"
                      buttonText="Spin"
                      isOnlyOnce={true}
                      size={window.screen.width<=600?200:250}
                      upDuration={500}
                      downDuration={900}
                      fontFamily="Arial"
                      />
                  </div>
              </div>
              <div className=" d-flex flex-column justify-content-center align-items-start" style={{gap:20,width:"50vw",padding:'100px',paddingTop:"60px"}}>
                  <p className="h2" style={{fontFamily:'Bangers'}}>Welcome to the Spin the Wheel Game!</p>
                  <p className="h4" style={{fontFamily:'Josefin Sans'}}>Get ready for an exciting and thrilling experience as you spin the wheel and try your luck to win amazing prizes. Are you feeling lucky today? Give it a spin and see what fortune awaits!</p>
                  <p className="h2" style={{fontFamily:'Bangers'}}>How to Play:</p>
                  <ul className="d-flex flex-column justify-content-center align-items-start" style={{listStyle:"square",fontFamily:'Josefin Sans'}}>
                      <li className="h5" style={{fontFamily:'Josefin Sans'}}>Click on the "Spin" button to start spinning the wheel.</li>
                      <li className="h5" style={{fontFamily:'Josefin Sans'}}>The wheel will gradually slow down and stop at a random segment.</li>
                      <li className="h5" style={{fontFamily:'Josefin Sans'}}>The prize or reward associated with the selected segment will be displayed.</li>
                      <li className="h5" style={{fontFamily:'Josefin Sans'}}>Enjoy your winnings and feel free to spin again for more chances to win!</li>
                  </ul>
                  <p className="h3" style={{fontFamily:'Bangers'}}>Good luck and have fun playing the Spin the Wheel Game!</p>
              </div>
          </div> 
          <Footer/>
      </div>
      }
      <div>
      <MDBModal animationDirection='bottom' show={bottomModal} tabIndex='-1' setShow={setBottomModal}>
        <MDBModalDialog position='bottom' frame>
          <MDBModalContent>
            <MDBModalBody className='py-1'>
              <div className='d-flex justify-content-center flex-column gap-3 align-items-center my-3'>
                <p className='mb-0 h5' style={{fontFamily:'Bangers'}}>{wish} 👍{msg}</p>
                <button onClick={() => window.location.reload('/games/casino')} className='btn btn-success text-white ms-3' style={{fontFamily:"Bangers",fontSize:"20px"}}>Continue</button>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
    </>
  );
}


const Casino = () => {
    const [size,setSize] = React.useState(250)

    React.useEffect(() => {
        console.log("Called");
        setSize(window.screen.width<=600?200:250);
    },[window.screen.width])
  return (
    <>
            <NavComp/>
            <div style={{backgroundColor:"#0b2447"}}>
            <Spinner size = {size}/>
            {/* <Footer/>       */}
              
            </div>
    </>
  )
}

export default Casino

















// import WheelComponent from "react-wheel-of-prizes";
// import React from "react";
// import Footer from "./Footer";
// import NavComp from "./NavComp";

// function Spinner(params) {
//   const segments = [
//     "better luck next time",
//     "won 70",
//     "won 10",
//     "better luck next time",
//     "won 222",
//     "won uber pass",
//     "better luck next time"
//   ];
//   const segColors = [
//     "#EE4040",
//     "#F0CF50",
//     "#815CD1",
//     "#3DA5E0",
//     "#34A24F",
//     "#EC3F3F",
//     "#FF9000"
//   ];
//   const onFinished = (winner) => {
//     // console.log(winner);
// };

// return (
//     <div className="text-white d-flex flex-column align-items-start" style={{width:'100vw',paddingTop:90}}>
//         <div style={{width:"100vw",fontFamily:'Bangers',color:'orange'}}><p className="h1 text-center mt-5">Lucky Wheel Bonanza</p></div> 

//         <div className="d-flex justify-content-center " style={{width:"100vw"}}> 
//             <div className="container d-flex flex-column justify-content-start px-5 align-items-start w-50 " style={{gap:20,paddingTop:'100px'}}>
//                 <p className="h2" style={{fontFamily:'Bangers'}}>About the Game</p> 
//                     <p className="h" >"Lucky Wheel Bonanza" is an exciting game where players spin a wheel for a chance to win enticing gifts and rewards. 
//                     With each spin, players have the opportunity to land on various prizes, including exclusive offers, valuable coupons, and redeemable coins. 
//                     It's a thrilling experience that combines luck and anticipation, providing players with an entertaining way to earn exciting bonuses and discounts. 
//                     Spin the wheel and see what fortunes await in this captivating game of chance!</p>
//             </div>
            
//             <div className="d-flex flex-column align-items-start" style={{width:"600px"}}>
//                 <WheelComponent
//                 segments={segments}
//                 segColors={segColors}
//                 winningSegment="won 10"
//                 onFinished={(winner) => onFinished(winner)}
//                 primaryColor="white"
//                 contrastColor="black"
//                 buttonText="Spin"
//                 isOnlyOnce={true}
//                 size={window.screen.width<=600?200:250}
//                 upDuration={500}
//                 downDuration={900}
//                 fontFamily="Arial"
//                 />
//             </div> 
            
//             <div className=" d-flex flex-column justify-content-start px-5 align-items-start w-50 " style={{gap:20,paddingTop:'100px'}}>
//                     <p className="h2" style={{fontFamily:'Bangers'}}>How to Play:</p>
//                     <ul className="d-flex flex-column justify-content-center align-items-start" style={{listStyle:"square"}}>
//                         <li>Click on the "Spin" button to start spinning the wheel.</li>
//                         <li>The wheel will gradually slow down and stop at a random segment.</li>
//                         <li>The prize or reward associated with the selected segment will be displayed.</li>
//                         <li>Enjoy your winnings and feel free to spin again for more chances to win!</li>
//                     </ul>
//                     <p className="h3">Good luck and have fun playing the Spin the Wheel Game!</p>
//             </div>
//         </div> 

//     </div> 
// );} 


// const Casino = () => {
//     const [size,setSize] = React.useState(250)

//     React.useEffect(() => {
//         console.log("Called");
//         setSize(window.screen.width<=600?200:250);
//     },[window.screen.width])
//   return (
//     <>
//         <div style={{width:"100vw",minHeight:'100vh',backgroundColor:"#0b2447"}}>
//             <NavComp/>
//             <Spinner size = {size}/>
//             <div style={{position:'fixed',bottom:'0px'}}l>
//                 <Footer />
//             </div>
//         </div>
//     </>
//   )
// }

// export default Casino