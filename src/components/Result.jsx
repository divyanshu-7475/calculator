import React ,{ useState } from 'react'
import '../App.css'
import { useOutletContext } from 'react-router-dom'

function Result() {
  const context=useOutletContext()
  return (
    <>
      <div className='result'>
        <p className='input'>{context.input}</p>
        <p className='result-p'>{context.result}</p>
      </div>
    </>
  )
}

export default Result
