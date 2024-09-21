import React ,{ useEffect, useState } from 'react'
import  '../../App.css'
import {useResult} from "../../contexts/ResultContext"

const operators = new Map([
  ["+","+"],
  ["-","-"],
  ["*","\u00D7"],
  ["/","\u00F7"]
]);

let percentAns=0;
let count=0
let notanumber=false;

function ExpandedBody() {
  const [radColor,setRadColor]=useState(true)
  const {resultFullBody,setResultFullBody,inputFullBody,setInputFullBody}=useResult()

  useEffect ( ()=>{
    setResultFullBody("")
  },[radColor])

  function calculateSimple(value){
    let num=[]
    let oprt=[]
    let inputStr=value
    let x=0
    let indexTrig=0
    do{
        indexTrig=inputStr.indexOf("\u221A",x)
        if(indexTrig!=-1){
          inputStr+=')'
        }
        if(indexTrig!=-1){
          let str1="";
          
          for(let i=indexTrig+2;i<inputStr.length;i++){
            if(inputStr[i]==')'){
              console.log(str1,"str1")
              let num=calculateExtra("\u221A",str1)
              if(typeof(num)=="string"){
              setResultFullBody("Invalid Expression")
              return
              }
              let resplaceStr="\u221A("+str1+")"
              console.log(num,"num")
              str1=""
              x=indexTrig+1
              num=""+num
              inputStr=inputStr.replace(resplaceStr,num)
              break
            }
            else{
              str1+=inputStr[i]
            }
          }
        }
        x=indexTrig+1
      }while(indexTrig!=-1)
    console.log(inputStr,"input in simple")
    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]=="+"|| inputStr[i]=="-" || inputStr[i]=="\u00D7"|| inputStr[i]=="\u00F7"){
        oprt.push(inputStr[i])
      }
    }
    inputStr=inputStr.replace(/[\u00F7\u00D7+-]/gi, ' ')
    
    let clipIndex=0
    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]==' '){
        let str=inputStr.substring(clipIndex,i)
        num.push((+str))
        clipIndex=i+1
      }
    }
    let str=inputStr.slice(clipIndex)
    if(str!=0|| inputStr==0){
      num.push(+str)
    }
    
    if(num.length==oprt.length){
      return("Inavalid Expression")
    }
    let k;
    k=0;
    let index
    let finalAns=0
    do{
      index=oprt.indexOf("\u00F7",k)
      if(index!=-1){
        num[index+1]=num[index]/num[index+1]
        num[index]=0
      }
      k=index+1
    }while(index!=-1)
      
      do{
          index=oprt.indexOf("\u00D7",k)
          if(index!=-1){
            num[index+1]=num[index]*num[index+1]
            num[index]=0
          }
          
          k=index+1
        }while(index!=-1)
        
    finalAns=finalAns+num[0]
    
    for(let i=1;i<num.length;i++){
      if(oprt[i-1]=='-'){
        finalAns=finalAns-num[i]
      }
      else{
        finalAns=finalAns+num[i]
      }
    }
    
    console.log(finalAns,"finalans")
    return(finalAns)
    
  }

  function calculateExtra(str1,str2){
    let num=calculateSimple(str2)
    if(typeof(num)=="string"){
      return ("Invalid Expression")
    }else if(str1=="sin"){
      if(!radColor){
        if(num==90||num==270){
          return 0
        }
        let radians=num*((Math.PI)/180)
        return (Math.sin(radians))
      }
      else{
        return (Math.sin(num))
      }
    }else if(str1=="cos"){
      console.log("cos")
      if(!radColor){
        let radians=num*((Math.PI)/180)
        console.log(radians)
        console.log("vaue",Math.cos(radians))
        return (Math.cos(radians))
      }
      else{
        return (Math.cos(num))
      }
    }
    else if(str1=="tan"){
      if(!radColor){
        if(num==90|| num==270){
          return "\u221E"
        }
        let radians=num*((Math.PI)/180)
        return (Math.tan(radians))
      }
      else{
        return (Math.tan(num))
      }
    }
    else if(str1=="log"){
      return ((Math.log10(num)))
    }else if(str1=="ln"){
      return(Math.log(num))
    }
    else if(str1=="Exp"){
      return (Math.exp(num))
    }
    else if(str1=="\u221A"){
      //console.log("sqrt")
      return(Math.sqrt(num))
    }
  }

  function deleteBtn(){
    if((count)==1){
      clearBtn()
    }else{
    let input=inputFullBody
    const last=input.charAt(input.length-1)
    input=input.substr(0,input.length-1)
    setInputFullBody(input)
    if(last=="%"){
      count=1
    }
    
  }
}

  function calculateValue(){
    let finalAns=0;
    let num=[]
    let oprt=[]
    let inputStr=inputFullBody
    let clipIndex=0

    let x=0
    let indexTrig=0
    do{
      indexTrig=inputStr.indexOf("sin",x)
      if(indexTrig!=-1){
        let str1="";
        for(let i=indexTrig+4;i<inputStr.length;i++){
          if(inputStr[i]==')'){
            if(inputStr[i+1]==')'){
              let firstPart=inputStr.substr(0,i+1)
              let secondpart=inputStr.substr(i+2)
              inputStr=firstPart+secondpart
            }
            let num=calculateExtra("sin",str1)
            if(typeof(num)=="string"){
              setResultFullBody("Invalid Expression")
              return
            }
            let resplaceStr="sin("+str1+")"
            str1=""
            x=indexTrig+1
            num=""+num
            inputStr=inputStr.replace(resplaceStr,num)
            break
          }
          else{
            str1+=inputStr[i]
          }
        }
        console.log(inputStr)
      }
      x=indexTrig+1
    }while(indexTrig!=-1)

    x=0
    indexTrig=0
    do{
      indexTrig=inputStr.indexOf("cos",x)
      if(indexTrig!=-1){
        let str1="";
        for(let i=indexTrig+4;i<inputStr.length;i++){
          if(inputStr[i]==')'){
            if(inputStr[i+1]==')'){
              let firstPart=inputStr.substr(0,i+1)
              let secondpart=inputStr.substr(i+2)
              inputStr=firstPart+secondpart
            }
            let num=calculateExtra("cos",str1)
            if(typeof(num)=="string"){
              setResultFullBody("Invalid Expression")
              return
            }
            let resplaceStr="cos("+str1+")"
            str1=""
            x=indexTrig+1
            num=""+num
            inputStr=inputStr.replace(resplaceStr,num)
            break
          }
          else{
            str1+=inputStr[i]
          }
        }
        console.log(inputStr)
      }
      x=indexTrig+1
    }while(indexTrig!=-1)
    
      x=0
      indexTrig=0
      do{
        indexTrig=inputStr.indexOf("tan",x)
        if(indexTrig!=-1){
          let str1="";
          for(let i=indexTrig+4;i<inputStr.length;i++){
            if(inputStr[i]==')'){
              if(inputStr[i+1]==')'){
                let firstPart=inputStr.substr(0,i+1)
                let secondpart=inputStr.substr(i+2)
                inputStr=firstPart+secondpart
              }
              let num=calculateExtra("tan",str1)
              if(typeof(num)=="string" ){
                setResultFullBody(num)
                return
              }
              let resplaceStr="tan("+str1+")"
              str1=""
              x=indexTrig+1
              num=""+num
              inputStr=inputStr.replace(resplaceStr,num)
              break
            }
            else{
              str1+=inputStr[i]
            }
          }
          console.log(inputStr)
        }
        x=indexTrig+1
      }while(indexTrig!=-1)
        x=0
        indexTrig=0
        do{
          indexTrig=inputStr.indexOf("log",x)
          if(indexTrig!=-1){
            let str1="";
            for(let i=indexTrig+4;i<inputStr.length;i++){
              if(inputStr[i]==')'){
                if(inputStr[i+1]==')'){
                  let firstPart=inputStr.substr(0,i+1)
                  let secondpart=inputStr.substr(i+2)
                  inputStr=firstPart+secondpart
                }
                let num=calculateExtra("log",str1)
                if(typeof(num)=="string"){
                  setResultFullBody("Invalid Expression")
                  return
                }
                let resplaceStr="log("+str1+")"
                str1=""
                x=indexTrig+1
                num=""+num
                inputStr=inputStr.replace(resplaceStr,num)
                break
              }
              else{
                str1+=inputStr[i]
              }
            }
          }
          x=indexTrig+1
        }while(indexTrig!=-1)

          x=0
          indexTrig=0
          do{
            indexTrig=inputStr.indexOf("ln",x)
            if(indexTrig!=-1){
              let str1="";
              for(let i=indexTrig+3;i<inputStr.length;i++){
                if(inputStr[i]==')'){
                  if(inputStr[i+1]==')'){
                    let firstPart=inputStr.substr(0,i+1)
                    let secondpart=inputStr.substr(i+2)
                    inputStr=firstPart+secondpart
                  }
                  let num=calculateExtra("ln",str1)
                  if(typeof(num)=="string"){
                    setResultFullBody("Invalid Expression")
                    return
                  }
                  let resplaceStr="ln("+str1+")"
                  str1=""
                  x=indexTrig+1
                  num=""+num
                  inputStr=inputStr.replace(resplaceStr,num)
                  break
                }
                else{
                  str1+=inputStr[i]
                }
              }
            }
            x=indexTrig+1
          }while(indexTrig!=-1)

            x=0
            indexTrig=0
            do{
              
              indexTrig=inputStr.indexOf("Exp",x)
              if(indexTrig!=-1){
                let str1="";
                for(let i=indexTrig+4;i<inputStr.length;i++){
                  if(inputStr[i]==')'){
                    if(inputStr[i+1]==')'){
                      let firstPart=inputStr.substr(0,i+1)
                      let secondpart=inputStr.substr(i+2)
                      inputStr=firstPart+secondpart
                    }
                    let num=calculateExtra("Exp",str1)
                    if(typeof(num)=="string"){
                      setResultFullBody("Invalid Expression")
                      return
                    }
                    let resplaceStr="Exp("+str1+")"
                    str1=""
                    x=indexTrig+1
                    num=""+num
                    inputStr=inputStr.replace(resplaceStr,num)
                    break
                  }
                  else{
                    str1+=inputStr[i]
                  }
                }
              }
              x=indexTrig+1
            }while(indexTrig!=-1)

              x=0
              indexTrig=0
              do{
                
                indexTrig=inputStr.indexOf("\u221A",x)
                if(indexTrig!=-1){
                  let str1="";
                  for(let i=indexTrig+2;i<inputStr.length;i++){
                    if(inputStr[i]==')'){
                      if(inputStr[i+1]==')'){
                        let firstPart=inputStr.substr(0,i+1)
                        let secondpart=inputStr.substr(i+2)
                        inputStr=firstPart+secondpart
                      }
                      //console.log(str1,"str1")
                      let num=calculateExtra("\u221A",str1)
                      console.log(num,"finalnum")
                      if(typeof(num)=="string"){
                        setResultFullBody("Invalid Expression")
                        return
                      }
                      let resplaceStr="\u221A("+str1+")"
                      str1=""
                      x=indexTrig+1
                      num=""+num
                      inputStr=inputStr.replace(resplaceStr,num)
                      break
                    }
                    else{
                      str1+=inputStr[i]
                    }
                  }
                }
                x=indexTrig+1
              }while(indexTrig!=-1)
  

    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]=="+"|| inputStr[i]=="-" || inputStr[i]=="\u00D7"|| inputStr[i]=="\u00F7" || inputStr[i]=="^"){
        oprt.push(inputStr[i])
      }
    }
    
    inputStr=inputStr.replace(/[\u00F7\u00D7+-]/gi, ' ')
    inputStr=inputStr.replaceAll("^",' ')
    inputStr=inputStr.replaceAll("\u03C0",'3.1441593')
    inputStr=inputStr.replaceAll("\u0065",'2.7182818')
    //console.log(inputStr)
    
    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]==' '){
        let str=inputStr.substring(clipIndex,i)
        num.push((+str))
        clipIndex=i+1
      }
    }
    let str=inputStr.slice(clipIndex)

    if(str!=""){
      num.push(+str)
    }
    if(num.length==oprt.length){
      setResultFullBody("Inavalid Expression")
      notanumber=true
      return
    }
    let k;
    k=0;
    let index

    do{
      index=oprt.indexOf("^",k)
      if(index!=-1){
        num[index+1]=Math.pow(num[index],num[index+1])
        
        num[index]=0
      }
      k=index+1
    }while(index!=-1)

    do{
      index=oprt.indexOf("\u00F7",k)
      if(index!=-1){
        if(num[index+1]==0){
          setResultFullBody("\u221E")
          return
        }
        num[index+1]=num[index]/num[index+1]
        num[index]=0
      }
      k=index+1
    }while(index!=-1)
      
    do{
        index=oprt.indexOf("\u00D7",k)
        if(index!=-1){
            num[index+1]=num[index]*num[index+1]
            num[index]=0
          }
          
          k=index+1
        }while(index!=-1)
        
    finalAns=finalAns+num[0]
    
    for(let i=1;i<num.length;i++){
      if(oprt[i-1]=='-'){
        finalAns=finalAns-num[i]
      }
      else{
        finalAns=finalAns+num[i]
      }
    }
    
    percentAns=finalAns
    setResultFullBody(finalAns)
    
    
  }

  function btnClick(value){
    let input=inputFullBody
    if(resultFullBody!=""){
      if(typeof(value)=="number"){
        input=""
        setResultFullBody("")
      }
      else{
        input=resultFullBody
        setResultFullBody("")
      }
    }
    
    input+=value
    setInputFullBody(input)
    
  }


  function clearBtn(){
    setInputFullBody("")
    setResultFullBody("")
    notanumber=false
    percentAns=0
    count=0
  }
  
 function percentValue(){
  
  if(percentAns==0){
    console.log("hello")
  calculateValue()
  console.log(notanumber)
}

  if(notanumber){
    setResultFullBody("Invalid Expression")
  }
  else{
    let input=inputFullBody
    input+="%"
    setInputFullBody(input)
    let num=percentAns/100
    percentAns=num
    setResultFullBody(num)
  }
 }

  function factorialValue(){
    let input=inputFullBody
    input+="!"
    setInputFullBody(input)
    console.log(inputFullBody)
    if(isNaN(inputFullBody)){
      setResultFullBody("Invalid Expression")
    }
    else{
      let factAns=1
      let n=(+inputFullBody)
      if(n===0){
        factAns=1
      }
      else{
        for(let i=2;i<=n;i++){
          factAns=factAns*i
        }
      }
      setResultFullBody(factAns)
  }
  }

  function radClick(){
    if(!radColor) {
      setRadColor(true)
    }
  }

  function degClick(){
    if(radColor) {
      setRadColor(false)
    }
  }

  return (
    <>
    
      <div className='full-btnbody'>
      <div className='full-rowbtn'>
        <button id="sine" onClick={()=>{btnClick("sin(")}} className="full-btns " value="sine">sin</button>
        <button id="cosine" onClick={()=>{btnClick("cos(")}} className="full-btns " value="cosine">cos</button>
         <button id="tan" onClick={()=>{btnClick("tan(")}} className="full-btns  " value="tan" >tan</button>
          <button id="rad" onClick={radClick} className={`colorchanger ${radColor ? 'text-orange-600': 'text-white'}`} value="radian">rad</button>
          <button id="degree" onClick={degClick} className={`colorchanger ${radColor ?'text-white' : 'text-orange-600'}`} value="degree">deg</button>
        </div>
        <div className='full-rowbtn'>
        <button id="log" onClick={()=>{btnClick("log(")}} className="full-btns" >log</button>
        <button id="ln"onClick={()=>{btnClick("ln(")}} className="full-btns" >ln</button>
          <button onClick={()=>{btnClick("Exp(")}} className="full-btns " >&#8494;<sup>x</sup></button>
          <button onClick={()=>{btnClick("(")}} className="full-btns " >&#40;</button>
          <button onClick={()=>{btnClick(")")}} className="full-btns" value="inverse">&#41;</button>
        </div>
        <div className='full-rowbtn'>
        <button id="fact" onClick={factorialValue} className="full-btns" value="!">!</button>
        <button id="ac" onClick={clearBtn} className="full-btns grey" value="ac">AC</button>
          <button id="percent" onClick={percentValue} className="full-btns grey" value="%" >%</button>
          <button id="back" onClick={deleteBtn}  className="full-btns grey" value="back">+/-</button>
          <button id="divide" onClick={()=>{btnClick("\u00F7")}} className="full-btns orange" value="/">&#247;</button>
        </div>
        <div className='full-rowbtn'>
        <button id="power" onClick={()=>{btnClick("^")}} className="full-btns" value="^">^</button>
        <button id="7" onClick={()=>{btnClick(7)}} className="full-btns" value="7" >7</button>
          <button id="8" onClick={()=>{btnClick(8)}} className="full-btns" value="8">8</button>
          <button id="9" onClick={()=>{btnClick(9)}} className="full-btns" value="9">9</button>
          <button id="multiply"onClick={()=>{btnClick("\u00D7")}} className="full-btns orange" value="*">&#215;</button>
        </div>
        <div className='full-rowbtn'>
        <button id="sqrt" onClick={()=>{btnClick("\u221A(")}} className="full-btns" value="sqrt">&#8730;</button>
        <button id="4" onClick={()=>{btnClick(4)}} className="full-btns" value="4">4</button>
          <button id="5" onClick={()=>{btnClick(5)}} className="full-btns" value="5">5</button>
          <button id="6" onClick={()=>{btnClick(6)}} className="full-btns" value="6">6</button>
          <button id="minus" onClick={()=>{btnClick("-")}} className="full-btns orange" value="-">-</button>
        </div>
        <div className='full-rowbtn'>
        <button id="pi" onClick={()=>{btnClick("\u03C0")}} className="full-btns" value="3.14159265359">&pi;</button>
        <button id="1" onClick={()=>{btnClick(1)}} className="full-btns" value="1">1</button>
          <button id="2" onClick={()=>{btnClick(2)}} className="full-btns" value="2">2</button>
          <button id="3" onClick={()=>{btnClick(3)}} className="full-btns" value="3">3</button>
          <button id="plus" onClick={()=>{btnClick("+")}} className="full-btns orange" value="+">+</button>
        </div>
        <div className='full-rowbtn'>
        <button id="e" onClick={()=>{btnClick("\u0065")}} className="full-btns" value="2.718281828459045">&#8494;</button>
        <button id="doublezero" onClick={()=>{btnClick("00")}} className="full-btns" value="00">00</button>
          <button id="zero" onClick={()=>{btnClick("0")}} className="full-btns" value="0">0</button>
          <button id="point" onClick={()=>{btnClick(".")}} className="full-btns" value=".">.</button>
          <button id="equal" onClick={calculateValue} className="full-btns orange" value="=">=</button>
        </div>
      </div>
    </>
  )
}

export default ExpandedBody
