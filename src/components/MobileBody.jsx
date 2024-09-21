import React ,{ useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

function MobileBody() {
  
  const navigate=useNavigate()
  const [changeBtn, setChangeBtn] = useState(true)
  
  function ChangeDisplay() {
    if(changeBtn){
      navigate("/")
    }
    else{
      navigate("/full")
    }
  }

  useEffect(()=>{
    ChangeDisplay()
  },[changeBtn])

  return (
    <>
      <div className='upperbtn'>
      <button 
      onClick={()=> setChangeBtn(!changeBtn)}
    className='changebtn' >&#8730;&pi;<span className='nextline'>&#8494;&#61;</span></button>
    </div>
    </>
  )
}

export default MobileBody
