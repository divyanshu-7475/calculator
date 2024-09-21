import React ,{ useState } from 'react'
import  '../../App.css'
import { useOutletContext } from 'react-router-dom'


const operators = new Map([
  ["+","+"],
  ["-","-"],
  ["*","\u00D7"],
  ["/","\u00F7"]
]);



let percentAns=0


function NormalBody() {
  const context=useOutletContext()

  

  function calculateValue(){
    let finalAns=0;
    let num=[]
    let oprt=[]
    let inputStr=context.input
    let clipIndex=0
    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]=="+"|| inputStr[i]=="-" || inputStr[i]=="\u00D7"|| inputStr[i]=="\u00F7"){
        oprt.push(inputStr[i])
      }
    }
    inputStr=inputStr.replace(/[\u00F7\u00D7+-]/gi, ' ')
    
    for(let i=0;i<inputStr.length;i++){
      if(inputStr[i]==' '){
        let str=inputStr.substring(clipIndex,i)
        num.push((+str))
        clipIndex=i+1
      }
    }
    
    let str=inputStr.slice(clipIndex)
    if(str!=0){
      num.push(+str)
    }
    console.log(num)
    if(num.length==oprt.length){
      context.setResult("Inavalid Expression")
      return
    }
    let k;
    k=0;
    let index
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
    
    percentAns=finalAns
    context.setResult(finalAns)
    context.setResultClick(true)
    
  }



  function printValue(value){
    let input=context.input
    if(value=='%' ){
      context.setPoint(0)
      const last=context.input.charAt(input.length-1)
      input+=value
      context.setInput(input)
      if( last=='+'|| last=='-'||last=='\u00D7'|| last=='\u00F7'){
        context.setResult("Invalid Expression")
      }
      else {
        console.log("percent:",percentAns)
        if(percentAns==0){
          calculateValue()
          console.log("percentinside:",percentAns)
        }
        let num=percentAns/100
        percentAns=num
        context.setResult(num)
    }
    }else{
      
      if(context.resultClick){
        if(typeof(value)=="number"){
        input=""
        context.setResult("")
        context.setResultClick(false)
      }else{
        input=""
        input+=context.result
        context.setResult("")
        context.setInput(input)
        context.setResultClick(false)
      }
    }
      if(value=='+'|| value=='-'||value=='*'|| value=='/'){
        context.setPoint(0)
        const last=input.charAt(input.length-1)
        if(last=='+'|| last=='-'||last=='\u00D7'|| last=='\u00F7'){
          input=input.substr(0,input.length-1)
        }
        input+=operators.get(value)
      }else{
        input+=value
      }
      
      context.setInput(input)
    
  }
  log(context.firstNum)
      
      
    }
  
  function allClear(){
    context.setInput("")
      context.setResult("")
      context.setFirstNum(0)
      context.setTempNum(0)
      context.setCount(0)
      context.setPoint(0)
      percentAns=0
  }

  

  function deleteBtn(){
    console.log(context.temp)
    console.log(context.count)
    if((context.count)==1){
      allClear()
    }else{
    let input=context.input
    const last=context.input.charAt(input.length-1)
    input=input.substr(0,input.length-1)
    context.setInput(input)
    if(last=='0'||last=='1'||last=='2'||last=='3'||last=='4'||last=='5'||last=='6'||last=='7'||last=='8'||last=='9'){
      let num=Math.floor(context.tempNum/10)
      context.setTempNum(num)
      if(context.point) context.setPoint(context.point-1)
    }
    else{
      context.setFirstNum(context.result)
      context.setCount(1)
      if(last=='.') context.setPoint(0)
    }}
  }

  function doubleZero(){
    let num
    if(!context.point){
     num=context.tempNum*100
    }else{
      num=context.tempNum*1.0
    }
    context.setTempNum(num)
    let input=context.input
    input+="00"
    context.setInput(input)
  }

  function pointvalue(){
    if(!context.point) {
      context.setPoint(1)
    let input=context.input
    input+="."
    context.setInput(input)
    }
  }


  return (
    <>
      <div className='btnbody'>
        <div className='rowbtn'>
        <button id="ac" onClick={allClear} className="btns grey" value="ac">AC</button>
          <button id="percent" onClick={()=> printValue('%')} className="btns grey" value="%" >%</button>
          <button id="back" onClick={deleteBtn} className="btns grey" value="back">+/-</button>
          <button id="divide" onClick={()=> printValue("/")} className="btns orange" value="/">&#247;</button>
        </div>
        <div className='rowbtn'>
        <button id="7" onClick={()=> printValue(7)} className="btns" value="7" >7</button>
          <button id="8" onClick={()=> printValue(8)} className="btns" value="8">8</button>
          <button id="9" onClick={()=> printValue(9)} className="btns" value="9">9</button>
          <button id="multiply" onClick={()=> printValue("*")} className="btns orange" value="*">&#215;</button>
        </div>
        <div className='rowbtn'>
        <button id="4" onClick={()=> printValue(4)} className="btns" value="4">4</button>
          <button id="5" onClick={()=> printValue(5)} className="btns" value="5">5</button>
          <button id="6" onClick={()=> printValue(6)} className="btns" value="6">6</button>
          <button id="minus" onClick={()=> printValue("-")} className="btns orange" value="-">-</button>
        </div>
        <div className='rowbtn'>
        <button id="1" onClick={()=> printValue(1)} className="btns" value="1">1</button>
          <button id="2" onClick={()=> printValue(2)} className="btns" value="2">2</button>
          <button id="3" onClick={()=> printValue(3)} className="btns" value="3">3</button>
          <button id="plus" onClick={()=> printValue("+")} className="btns orange" value="+">+</button>
        </div>
        <div className='rowbtn'>
        <button id="doublezero" onClick={doubleZero} className="btns" value="00">00</button>
          <button id="zero" onClick={()=> printValue(0)} className="btns" value="0">0</button>
          <button id="point" onClick={pointvalue} className="btns" value=".">.</button>
          <button id="equal" onClick={calculateValue} className="btns orange" value="=">=</button>
        </div>
      </div>
    </>
  )
}

export default NormalBody
