import React from 'react'
import { BallTriangle } from 'react-loader-spinner'


const Loader = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{width:'100vw',height:'100vh',background:'#0b2447'}}>
      <BallTriangle
        height={80}
        width={60}
        radius={5}
        color="white"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
      </div>
    </>
  )
}

export default Loader