import "./Quiz.css"
import { data } from "../../assets/data"
import { useRef, useState } from "react"
function Quiz() {
  let [index,setindex]=useState(0);
  let [Questions, setqustions]=useState(data[index]);
  let [score,setscore]=useState(0);
  let [result,setresult]=useState(false);
  let [Lock,setLock]=useState(false)
  let option1=useRef(null);
  let option2=useRef(null);
  let option3=useRef(null);
  let option4=useRef(null);
let arr=[option1,option2,option3,option4];

  let checkans=(e,ans)=>{
    if(Lock===false){
        if(Questions.ans===ans){
            e.target.classList.add('correct');
            setLock(true);
            setscore(prev=>(prev+1))
        }
        else{
            e.target.classList.add('wrong') ;
            setLock(true);
            arr[Questions.ans-1].current.classList.add('correct')
        }
    }
 
  }
  const next=()=>{
    if(Lock===true){
        if(index===data.length-1){
            setresult(true);
            return 0;
        }
        setindex(++index);
        setqustions(data[index]);
        setLock(false);
        arr.map((item)=>{
            item.current.classList.remove('correct');
            item.current.classList.remove('wrong');
            return null;
        })
    }
  }
  const reset =()=>{
    setLock(false);
    setqustions(data[0]);
    setindex(0);
    setscore(0);
    setresult(false)
  }
  return (
    <>
    <div className="contaner">
        <h1>Quiz App</h1>
        <hr />
        {result?<>
        <h2>your scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>:<> 
        <h2>{index+1}.{Questions.Questions}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkans(e,1)}}>{Questions.option1}</li>
            <li ref={option2} onClick={(e)=>{checkans(e,2)}}>{Questions.option2}</li>
            <li ref={option3} onClick={(e)=>{checkans(e,3)}}>{Questions.option3}</li>
            <li ref={option4} onClick={(e)=>{checkans(e,4)}}>{Questions.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} to {data.length} Questions</div>
        </>}
       
    </div>
    </>
  )
}

export default Quiz