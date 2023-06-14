import React from "react";
import ScratchCard from "react-scratchcard-v2";
import IMG1 from "../Assests/sc1.jpg";
import IMG2 from "../Assests/sc2.jpg";
import IMG3 from "../Assests/sc3.jpg";
import IMG4 from "../Assests/sc4.jpg";
import Footer from "../Components/Footer";
import NavComp from "../Components/NavComp";
import { CUSTOM_BRUSH_PRESET } from 'react-scratchcard-v2';
import Confetti from 'react-confetti'

const Reward = (params) => {
  return (
    <div className="d-flex justify-content-center  align-items-center">
      <ScratchCard
        width={250}
        height={250}
        image={params.img}
        finishPercent={80}
        onComplete={() => console.log("complete")} 
        customBrush={CUSTOM_BRUSH_PRESET}
      >
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <p className=" h2 text-white" style={{fontFamily:"QuickSand"}}>Scratch card</p>
        </div>
      </ScratchCard>
    </div>
  );
};

const Scratch = () => {
  return (
    <div style={{backgroundColor:"#0b2447"}}>
        <Confetti></Confetti>
        <div className="d-flex flex-column" style={{width:"100vw",minHeight:"100vh",backgroundColor:'#0b2447',gap:40}}>
            <NavComp />
            <div className="w-100 text-center" style={{marginTop:'180px',fontFamily:'Bangers'}}>
                <h1  style={{color:'orange'}}>Scratch Mania</h1>
            </div>

            <div className="d-flex flex-column w-100"> 
                <div className="d-flex w-100 justify-content-center" style={{gap:100}}>
                    <Reward img = {IMG1}/>
                    <Reward img = {IMG2}/>
                    <Reward img = {IMG3}/>
                    <Reward img = {IMG4}/>
                </div> 
                <div className="d-flex flex-column text-white justify-content-center align-items-center h-100 mt-5 pt-3" style={{gap:30}}>
                    <p className="h1" style={{fontFamily:'Bangers',color:'orange'}}>About Scratch Mania</p>
                    <div className="container" style={{fontFamily:'QuickSand',textIndent:'90px',textAlign:'justify'}}>
                        <p className="h4">Introducing "Scratch Mania" – scratch one card, win amazing surprises! Uncover offers, coupons, and redeemable coins. 
                        Choose wisely for unique rewards. Experience the anticipation, the thrill, and the joy of revealing hidden treasures. Engaging interface for all ages.
                        Instant excitement, valuable offers. Scratch and unlock a world of possibilities. Play "Scratch Mania" now!</p>
                    </div>
                </div>
            </div>
            <div style={{bottom:0,position:"fixed",width:"100%"}}>
            <Footer color = {"white"}/>
            </div>
        </div> 
    </div>
  )
}

export default Scratch
