import React from 'react'
import {MdOutlineAlternateEmail} from 'react-icons/md'


const Footer = (params) => {
  return (
    <div className='footer' style={{background:'rgba(255,255,255,.4)'}}>
        <span className='' style={{fontFamily:'Josefin Sans',color:`${params.color}`}}>&copy; Play2Redeem. All rights reserved. | Made with <span role='img' aria-label='love'>❤️</span> by Mandarapu <p>Reach me <MdOutlineAlternateEmail/> : gnanasaisreemandarapu@gmail.com</p></span>
    </div>
  )
}

export default Footer