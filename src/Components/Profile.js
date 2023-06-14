import React from 'react'
import Av1 from '../Assests/Av1.jpg'
import NavComp from './NavComp'
import { CgMail } from 'react-icons/cg' 
import { MdAlternateEmail } from 'react-icons/md'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Loading from './Loader'

const Profile = () => {

    Location = useLocation();
    const [details,setDetails] = React.useState();

    const [isLoading,setLoading] = React.useState(true)
    React.useEffect(() => {
        var d_uname;
        const key = `${process.env.REACT_APP_KEY}`
        const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
        d_uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
        axios.post('https://play2redeem.onrender.com/profile',{uname:d_uname}).then((res) => {
            setDetails(res.data[0]);
        }) 
        setTimeout(() => {
            setLoading(false)
        },2000)
    },[])
        //eslint-disable-next-line

  return (
    <> 
    {isLoading ? 
    <Loading /> :  
    <div>
        <NavComp />
        <div className='d-flex justify-content-center text-white'  style={{width:'100vw',minHeight:'100vh',background:'#0b2447',gap:50,paddingTop:'150px'}}>
            <div className='d-flex flex-column justify-content-start' style={{gap:30}}>
                <div className='p-4 rounded rounded-5' style={{minHeight: 'fit-content',background:'rgba(255,255,255,.4)'}}> 
                    <div className='d-flex px-3'>
                        <img src={Av1} style={{width:'100px'}} className='rounded rounded-5'></img>
                        <p className='h2 m-2 p-2' style={{fontFamily:'Bangers'}}>{details.fullname}</p>
                    </div>

                    <div className='d-flex p-3 flex-column'>
                        <p className='h5' style={{fontFamily:'Josefin Sans'}}><MdAlternateEmail className='h5 me-2'/>{details.username}</p>
                    </div>

                    <hr></hr>
                    <div className='m-3'>
                        <p className='h5' style={{fontFamily:'Josefin Sans'}}><CgMail className='me-2 h3' />{details.email}</p>   
                    </div>
                </div>

                <div className='p-4 rounded rounded-5' style={{minHeight: 'fit-content',background:'rgba(255,255,255,.4)'}}> 
                    <div className='d-flex px-3' style={{gap:20}}>
                        <div className='circle rounded rounded-circle'>
                            <p className='h2 mb-0'>{details.played}</p>
                            <p className='h6' style={{fontFamily:'Josefin Sans'}}>Played</p>
                        </div>
                        <div className='circle rounded rounded-circle' style={{background:'#bed5d9'}}>
                            <p className='h2 mb-0'>{details.wins}</p>
                            <p className='h6' style={{fontFamily:'Josefin Sans'}}>Wins</p>
                        </div>
                        <div className='circle rounded rounded-circle'>
                            <p className='h2 mb-0'>{details.loses}</p>
                            <p className='h6' style={{fontFamily:'Josefin Sans'}}>Looses</p>
                        </div>
                    </div>
                </div>

                <div className='p-4 rounded rounded-5' style={{minHeight: 'fit-content', marginBottom: 'auto',background:'rgba(255,255,255,.4)'}}> 
                    <div className='d-flex px-3' style={{gap:20}}>
                        <div className='circle rounded rounded-circle' style={{background:'#bed5d9'}}>
                            <p className='h2 mb-0'>{details.vouchers.length}</p>
                            <p className='h6' style={{fontFamily:'Josefin Sans'}}>Vouchers</p>
                        </div>
                        <div className='circle rounded rounded-circle' style={{background:'#bed5d9'}}>
                            <p className='h2 mb-0'>{details.coins}</p>
                            <p className='h6' style={{fontFamily:'Josefin Sans'}}>Coins</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column fit p-3 rounded rounded-5' style={{minHeight: 'fit-content', marginBottom: 'auto',}}>
                <div className="px-4 text-center">
                    <hr></hr>
                    <p className='h1' style={{fontFamily:'Bangers'}}>My Rewards</p>
                    <hr></hr>
                </div>
                <div className='mt-4  px-4'>
                    <p className='h1 text-center' style={{fontFamily:'Cookie'}}>My Vouchers</p>
                    {details.vouchers.map((item) => {
                        return (
                        <div className='m-3' style={{background:'rgba(255,255,255,.4)',borderRadius:'50px'}}>
                            <p className='h5 p-4' style={{fontFamily:'Josefin Sans'}}>{item}</p>
                        </div>
                        )
                    })
                    }
                </div> 
            </div> 
        </div>
    </div>
    }
    </>
  )
}

export default Profile