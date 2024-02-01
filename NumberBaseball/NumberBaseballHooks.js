import React,{useState,useRef} from "react";
import Try from "./Try(hooks)";

function  getNumbers(){
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i =0;i<4;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()* (9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseballHooks = ()=>{
    const [result, setResult] = useState("");
    const [value,setValue] = useState("");
    const[answer,setAnswer] = useState(getNumbers);// 처음에만 실행해 주고 그 후론 실행해 주지 않음 , lazy init 기법
    const [tries,setTries] = useState([]);
    const inputEl = useRef(null);
    const onSubmitForm =(e)=>{
        e.preventDefault();
        if(value === answer.join('')){
            setResult("홈런!");
            setTries((prevState)=>{//옛날 state로 새 state를 만드는 경우 이런식으로 prevstate를 사용해줘야 한다
                return [...prevState, { try:value , result:"홈런!"}]
            });
            alert("게임을 다시 시작합니다.");
            setValue("");
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        }else{
            const answerArray = value.split("").map((v)=> parseInt(v));
            let strike = 0;
            let ball =0;
            if(tries.length >= 9){
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)
                alert("게임을 다시 시작합니다.");
                setValue("");
                setAnswer(getNumbers());
                setTries([]);
                inputEl.current.focus();
            }else{
                for(let i = 0;i<4;i+=1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    }else  if (answer.includes(answerArray[i])){
                        ball +=1;
                    }
                }
                setTries((prevState)=>{
                    return [...prevState, {try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}]
                });
                setValue("");
                inputEl.current.focus();
            }
        }
        console.log(value)
    };
    const onChangeInput=(e)=>{
        setValue(e.target.value)

    };


    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도:{tries.length}</div>
            <ul>
                {tries.map((v,i)=>{
                    return(
                        <Try key = {`${i + 1}차 시도 : `} tryInfo={v}/>
                    )
                })}
            </ul>
        </>
    )
}


export  const hello = 'hello'; //import { hello }
export const  bye = 'hello'; // import { hello,bye }
export default NumberBaseballHooks; // import NumberBaseballHooks
//export를 할 때 const default의 경우 그냥 import NumberBaseball을 진행하고
// hello와 bye 처럼 각각 이름이 정해져 있으면 import {hello}, import {bye}로 import를 진행한다.