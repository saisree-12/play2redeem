import React,{ useEffect,useState } from "react";
import IMG1 from "../Assests/rid1.jpg";
import IMG2 from "../Assests/rid6.jpg";
import IMG3 from "../Assests/rid2.jpg";
import IMG4 from "../Assests/rid4.jpg";
import IMG5 from "../Assests/rid3.jpg";
import IMG6 from "../Assests/rid5.jpg";
import Footer from "./Footer";
import NavComp from "./NavComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import { VscDebugContinue } from 'react-icons/vsc'
import Confetti from 'react-confetti'

import Flippy ,{FrontSide,BackSide} from "react-flippy";


const QCard = (params) => (
  <React.Fragment>
    <FrontSide
      style={{
        backgroundColor: '#F8E8EE',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'50px',
        color:'black'
      }}
    > 
      <p className="h5" style={{fontFamily:'Bangers'}}>Tap to Reveal the Word!</p>
    </FrontSide>
    <BackSide
      style={{
        backgroundColor: 'rgba(255,255,255,.4)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'50px',
      }}> 
      <p className="h5" style={{fontFamily:'QuickSand'}}>{params.word}</p>
    </BackSide>
  </React.Fragment>);

const FlippyQCard = (params) => {
  return (
    <Flippy
    flipOnClick={true}
      flipDirection={params.flipDirection}
      style={QCardFlippyStyle}
    >
      <QCard img = {params.img} word = {params.word}></QCard>
    </Flippy>
  )
};

const QCardFlippyStyle = {
  width: '250px',
  height: '50px',
  textAlign: 'center',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '30px',
  justifyContent: 'center'
}

const Riddle = () => {
  const Navigate = useNavigate();


    const [toggle, setToggle] = React.useState(false);
    const navigate = useNavigate()
    const toggleShow = () => setToggle(!toggle);
    //eslint-disable-next-line
    const [rewards,setRewards] = useState([
      "Lenskart Coupon worth 500/-",
      "70 coins",
      "Amazon Gift Card",
      "Flipcart Gift Card",
      "10 coins",
      "won uber pass",
      "won Spotify Subsription for 3 months",
      "100 coins"
    ])



    function shuffleArray(array) {
      const newArray = [...array]; 
    
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; 
      }
    
      return newArray;
    }

    const [flippedCards, setFlippedCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win,setwin] = useState(false)
    const [wish,setWish] = useState('Better Luck Next Time')
    const [msg,setmsg] = useState('Come Tomorrow to play again')
    // const [letters,setLetters] = useState(['Dog','Cat','Pig','Doll','Man','Ant','Bat','Egg','Fan','Eat','Bun','Tom','Gun','Hat','Hen'])

    useEffect(() => {
      checkMatchedPairs();
      //eslint-disable-next-line
    }, [flippedCards]);
  
    const handleFlip = (card) => {
      if (!gameOver && !card.flipped && flippedCards.length < 3) {
        const updatedCards = cards.map((c) =>
          c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(updatedCards);
        setFlippedCards([...flippedCards, card]);
      }
    };
  
    const checkMatchedPairs = () => {
      if (flippedCards.length === 3) {
        toggleShow()
        setGameOver(true)
        const [card1, card2,card3] = flippedCards;
        console.log(card1.text+card2.text+card3.text === word)
        if (card1.text+card2.text+card3.text === word) {
            setTimeout(() => {
            setWish("Congratulations !")
            const winner = rewards[Math.floor(Math.random() * rewards.length)];
            setmsg(`You have won ${winner}`)

            //Insert into Database
            const key = `${process.env.REACT_APP_KEY}`
            const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
            const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
            setwin(true)
            let type,win;
              if(winner.includes('coins')){
                type="coins"
                win = parseInt(winner.split(' ')[0])
              }else{
                type="vouchers";
                win = winner;
              }
              axios.post('http://localhost:8888/win',{uname:uname,win:win,type:type}) 
            }, 0);
          }
          else{
            const key = `${process.env.REACT_APP_KEY}`
            const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
            const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
            axios.post('http://localhost:8888/lose',{uname:uname})
            .then(res => {
              console.log(res);
            })
          }
          setTimeout(() => {
              navigate('/games')
          },4000)
        }
    };
    const [letters,setLetters] = useState(['DOG','CAT','PIG','MAN','ANT','BAT','EGG','FAN','EAT','BUN','TOM','GUN','HAT','HEN'])
    const [word,setWord] = useState(letters[Math.floor(Math.random() * letters.length)])
    const [az,setAz] = useState(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
    const [check,setCheck] = useState([...word.split(""),'X','Q'])
    
    const texts = shuffleArray(check)
    console.log(texts)
    const [cards, setCards] = useState([
      { id: 1, text: texts[0], flipped: false, matched: false },
      { id: 2, text: texts[1], flipped: false, matched: false },
      { id: 3, text: texts[2], flipped: false, matched: false },
      { id: 4, text: texts[3], flipped: false, matched: false },
      { id: 5, text: texts[4], flipped: false, matched: false },
    ])

  return (
    <>
    {win && <Confetti/>}
  <NavComp />
  <div className="d-flex flex-column align-items-center" style={{minHeight: "100%", backgroundColor: '#0b2447', gap: 70}}>
    <div className="d-flex flex-column justify-content-center align-items-center text-white pb-5" style={{marginTop: '150px', gap: 20}}>
      <h1 style={{fontFamily: 'Bangers', color: 'orange'}}>Card Riddle</h1>
      <FlippyQCard flipDirection="horizontal" img={IMG1} word ={word}/>
    </div>

    <div className="d-flex flex-column justify-content-around">
      <div className="flip-card-container d-flex flex-wrap gap-3">
              {cards.map((card,index) => (
                  <div 
                  key={card.id} 
                  className={`flip-card ${card.flipped ? 'flipped' : ''} ${
                      card.matched ? 'matched' : ''
                  } rounded rounded-5`}
                  onClick={() => handleFlip(card)}
                  >
                  <div className="flip-card-inner">
                      <div className="flip-card-front">
                      <img src={require(`../Assests/rid${index+1}.jpg`)} alt="EMOJIS"  className="rounded rouned-5" style={{objectFit:"cover",height:"100%"}}></img>
                      </div>
                      <div className="flip-card-back">
                      <h2 className="card-text">{card.text}</h2>
                      </div>
                  </div>
                  </div>
              ))}
            </div>

      <div className="container d-flex flex-column p-5 justify-content-center align-items-center" style={{marginBottom: "120px"}}>
        <h1 className="mt-5 mb-5" style={{fontFamily: 'Bangers', color: 'orange'}}>About the Game</h1>
        <p className="h5 text-white" style={{fontFamily: 'QuickSand', textIndent: '90px', textAlign: 'justify'}}>Welcome to Card Riddle! In this captivating game, you'll encounter 5 mysterious cards.
          Your mission is to unveil a secret 3-letter word, such as "cat" or "dog," by flipping the cards in the correct sequence.
          Delve into the challenge of card flipping, but remember, the order of the letters is crucial. Pay close attention as you reveal each card,
          ensuring you uncover the word in the precise spell order. If you successfully solve the Card Riddle, you will be rewarded with redeemable coins!
          Enjoy the excitement of deciphering the hidden word and claim your well-deserved rewards in the form of redeemable coins. Get ready for a thrilling experience with Card Riddle!</p>
      </div>
    </div>
      <Footer />
  </div>
  <MDBModal animationDirection='bottom' show={toggle} tabIndex='-1' setShow={setToggle}>
        <MDBModalDialog position='bottom' frame>
          <MDBModalContent>
            <MDBModalBody className='py-1'>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0 h5' style={{fontFamily:'Bangers'}}><VscDebugContinue className='me-2'/>{wish}</p>
                {/* <p className='mb-0 h5' style={{fontFamily:'Bangers'}}><VscDebugContinue className='me-2'/>{msg}</p> */}
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
</>
  )
}

export default Riddle




















