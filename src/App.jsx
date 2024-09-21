import { useState } from 'react'
import './App.css'
import Result from './components/result'
import NormalBody from './components/body/NormalBody'

function App() {
  const [changeBtn, setChangeBtn] = useState(true)

  if(changeBtn){
  return (
    <>
    <div className='mob-body'>
      <div className='upperbtn'>
    <button 
    onClick={()=> setChangeBtn(!changeBtn)}
    className='changebtn' >&#8730;&pi;<span className='nextline'>&#8494;&#61;</span></button>
    </div>
      < Result/>
      <NormalBody/>
      </div>

    </>
  )
}
else{
  
}
}

export default App
