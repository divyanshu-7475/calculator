import React  from 'react'
import  '../../App.css'
import {useResult} from "../../contexts/ResultContext"
function FullBodyResult() {
  
  const {resultFullBody,inputFullBody} =useResult()
  

  return (
    <>
      <div className='full-result'>
      <p className='full-input ' >{inputFullBody}</p>
        <p className='full-result-p ' >{resultFullBody}</p>
      </div>

    </>
  )
}

export default FullBodyResult
