
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import NavComp from '../Components/NavComp'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import { useNavigate } from 'react-router-dom'

import spin from '../Assests/spin.png'
import scratch from '../Assests/scratch.png'
import card from '../Assests/card.png'
import Loading from './Loader'


const Games = () => {
  const [isLoading,setLoading] = React.useState(true);
    React.useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    },2000)
    //eslint-disable-next-line
  },[])
    const Navigate = useNavigate();
  return (
    <>
    {isLoading ? 
        <Loading /> :
        <>
        <div className='d-flex' style={{width:"100vw",height:"100vh",backgroundColor:"#0b2447"}}>
        <NavComp />
        <div className='d-flex flex-column align-items-center justify-content-center mt-5' style={{width:"100vw"}}>
            <p className='text-center mb-5' style={{fontFamily:"Bangers",fontSize:"60px",color:'orange'}}>Games Available</p>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: -40, 
                    depth: 120,
                    modifier: 3,
                    slideShadows: false,
                }}   
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper w-100" 
                >   
                <div className='d-flex flex-row flex-wrap justify-content-center align-items-center' >
                    <div>  
                    <SwiperSlide className='rounded rounded-5' style={{width:'400px',height:'600px'}} onClick={() => Navigate('/games/casino')}>
                        <img style={{borderRadius:15,height:'350px',width:'400px'}} alt='Card' src={spin} />
                        <br></br>   
                        <div className='p-3 rounded-5' style={{background:'rgba(255,255,255.3)',backgroundColor:'orange'}}>
                        <h5 className='text-white text-center h4' style={{fontFamily:"Bangers"}}>Casino</h5>
                        </div>   
                    </SwiperSlide>   
                    <SwiperSlide className='rounded rounded-5' style={{width:'350px',height:'600px'}} onClick={() => Navigate('/games/riddle')}> 
                        <img style={{borderRadius:15,height:'350px',width:'380px'}} alt='Card' src={card} />
                        <br></br>
                        <div className='p-3 rounded-5' style={{background:'rgba(255,255,255.3)',backgroundColor:'orange'}}>
                        <h5 className='text-white text-center h4' style={{fontFamily:"Bangers"}}>Card Riddle</h5>
                        </div>
                    </SwiperSlide>  
                    </div>  
            </div>  
            </Swiper>
        </div> 
        </div>
        </>
    }
    </>
  )
}

export default Games

























// import React from 'react';
// import NavComp from '../Components/NavComp'
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { EffectCoverflow, Pagination } from "swiper";

// import spin from '../Assests/spin.png'
// import scratch from '../Assests/scratch.png'
// import card from '../Assests/card.png'

// const Games = () => {
//   return (
//     <>
//     <div className='' style={{height:'100vh',backgroundColor:'orange'}}>
//         <NavComp />
//         <div className=' d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
//             <Swiper
//                 effect={"coverflow"}
//                 grabCursor={true}
//                 centeredSlides={true}
//                 slidesPerView={"auto"}
//                 coverflowEffect={{
//                     rotate: 0,
//                     stretch: -120,
//                     depth: 200,
//                     modifier: 3,
//                     slideShadows: false,
//                 }}  
//                 pagination={true}
//                 modules={[EffectCoverflow, Pagination]}
//                 className="mySwiper"
//                 >
//                 {/* <div className='bg-dark border d-flex flex-row flex-wrap justify-content-center align-items-center' style={{gap:80}}> */}
//                     <SwiperSlide className='rounded rounded-5 text-center' style={{width:'400px',height:'600px',gap:40}} >
//                         <img style={{borderRadius:15}} alt='Card' className='' src={spin} />
//                         <br></br>
//                         <div className='p-3 rounded-5' style={{background:'rgba(0,0,0,0.3)'}}>
//                         <h5 className='text-white text-center h4' style={{fontFamily:"Bangers"}}>Casino</h5>
//                         </div>
//                     </SwiperSlide>
//                     <SwiperSlide className='rounded rounded-5' style={{width:'400px',height:'600px',gap:40}} >
//                         <img style={{borderRadius:15}} alt='Card' src={scratch} />
//                         <br></br>
//                         <div className=' p-3 rounded-5' style={{background:'rgba(0,0,0,0.3)'}}>
//                         <h5 className='text-white text-center h4' style={{fontFamily:"Bangers"}}>Scratch Mania</h5>
//                         </div>
//                     </SwiperSlide>
//                     <SwiperSlide className='rounded rounded-5' style={{width:'400px',height:'600px',gap:40}} >
//                         <img style={{borderRadius:15}} alt='Card' src={card} />
//                         <br></br>
//                         <div className=' p-3 rounded-5' style={{background:'rgba(0,0,0,0.3)'}}>
//                         <h5 className='text-white text-center h4' style={{fontFamily:"Bangers"}}>card Riddle</h5>
//                         </div>
//                     </SwiperSlide> 
//                 {/* </div>   */}
//             </Swiper>
//         </div>
//     </div>
//     </>
//   )
// }

// export default Games