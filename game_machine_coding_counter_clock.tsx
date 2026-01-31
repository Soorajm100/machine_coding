import React, { useEffect, useState } from "react";

/**Timer frontend question  */
const MachineCode = () => {

  const [timerMintues , setTimerMintues] =useState(0) ; 
  const [timerSeconds , setTimerSeconds] =useState(0) ;
  const [timerHours , setTimerHours] =useState(0) ;
  const [isActive , setIsActive] =useState(false) ;

  useEffect(()=>{

    if(!isActive)return ; 
    const interval:any = setInterval(() => {
      setTimerSeconds((prevSeconds:any)=>{
         if(prevSeconds+1===60){
             setTimerMintues((prevMin )=>{
                 if(prevMin + 1 ===60){
                      setTimerHours( (prevHour : any ) =>prevHour + 1);
                      return 0 ;
               }
               return prevMin + 1  ; 
              });
             

             return 0 ;
         }
         return prevSeconds + 1 ; 
      });
    }, 1000); 


    return  ()=>clearInterval(interval) ; 

  } , [isActive])


  const handleStart = ()=>{
    setIsActive(true) ; 
  }

  return (
    <div className="pt-4 pl-4  lex flex-col space-y-4 justify-between items-center">
      
      <div className="h-2 border border-t-4 h-20 w-60 flex items-center justify-center text-2xl font-bold">
        {`${timerHours<= 9 ? "0" + timerHours : timerHours } : ${timerMintues<= 9 ? "0" + timerMintues : timerMintues } : ${timerSeconds<= 9 ? "0" + timerSeconds : timerSeconds}`}
      </div>
      
      <div className="flex lex-row space-x-2">  
        <button className="bg-purple-200 p-2 rounded " onClick={()=>{handleStart()}}> Start</button>
        <button className="bg-purple-200 p-2 rounded " onClick={()=>{setIsActive(false)}}> Pause</button>
        <button className="bg-purple-200 p-2 rounded " onClick={()=>{setTimerHours(0) ; setTimerMintues(0) ; setTimerSeconds(0) ; setIsActive(false)}}> Reset</button>
      </div>
     
    </div>
  );
};

export default MachineCode;
