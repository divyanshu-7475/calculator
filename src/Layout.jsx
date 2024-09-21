import React, { useEffect, useState } from "react";
import MobileBody from "./components/MobileBody";
import { Outlet } from "react-router-dom";
import {ResultProvider} from "./contexts"



function Layout(){
    const[resultFullBody,setResultFullBody]=useState("")
    const[inputFullBody,setInputFullBody]=useState("")
    

    const [tempNum,setTempNum]=useState(0)
    const [result, setResult]=useState("")
    const [input, setInput]=useState("")
    const[firstNum,setFirstNum]=useState(0)
    const[resultClick,setResultClick]=useState(false)
    const [count,setCount]=useState(0)
    const [point,setPoint]=useState(0)
    const[operator,setOperator]=useState("+")
    const variables={result,setResult,
        operator,setOperator,resultClick,setResultClick,
        firstNum,setFirstNum,input,setInput,tempNum,setTempNum,
        count,setCount,point,setPoint
    }

    
    

        return (
        < ResultProvider value={{setResultFullBody,resultFullBody,setInputFullBody,inputFullBody}} >
        <div className='mob-body'>
            <MobileBody/>
            <Outlet context={variables}/>
        </div>
        </ResultProvider>
    )
}

export default Layout