import axios from "axios";
import React, { useEffect, useState } from "react";

/**Debounce frontend question  */
const MachineCode = () => {

  const [searchText , setInputTex] = useState(""); 
  const [debounceText , setDebounceText] = useState(searchText) ; 

  const [data , setData] = useState([]) ; 


  const handleInput = (e :any)=>{
    setInputTex(e.target.value)
  }


  useEffect(()=>{
    const timeout  = setTimeout(()=>{
      setDebounceText(searchText) ; 
    } , 300) ; 

    return ()=>clearTimeout(timeout) ; 
  } , [searchText] )
  

  const fetchResults = async (query : any)=>{
    const res:any =await  axios.get(`/api/search?query=${query}`) ; 
    console.log(res.data) ; 
    setData(res.data.results) ; 

  }
//**API  caall  */
  useEffect(()=>{
    if(!debounceText)return ;

    fetchResults(debounceText)

  }, [debounceText])

  return (
    <div className="pt-4 pl-4  flex flex-col space-y-4 justify-between items-center">
      <div className="flex w-full ">
        <input className="p-2 w-[50%] border border-t-2  border-black" onChange={(e)=>handleInput(e)}  value={searchText} /> 
        {data.map((ele, ind)=>(
          <div>
            {ele} 
            </div>

        ))
        }
      </div>
    </div>
  );
};

export default MachineCode


********************************************************************************************************************************************************************************************************



import type { NextApiRequest , NextApiHandler , NextApiResponse } from "next";

const data = ["React", "React Native", "Redux", "Recoil", "Readable Streams"];

export default function handler(
    req : NextApiRequest , 
    res : NextApiResponse
) {

    const {query} = req.query ; 

    if(!query || typeof query!=="string" ){
        return res.status(400).json({"error" : "invalid input"}) ; 
    }

    const filtered = data.filter((item : any)=>{
        return item.toLocaleLowerCase().includes(query.toLocaleLowerCase()); 
    }) ;
    
    
    setTimeout(()=>{

        res.status(200).json({"results" : filtered}) ; 
    } , 1000)
}




