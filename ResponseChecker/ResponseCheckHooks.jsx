import React, {useRef, useState} from "react";


const ResponseCheck =()=>{
    const [state,setState] = useState("waiting");
    const [message,setMessage] = useState("클릭해서 시작하세요");
    const [result,setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen =()=>{
        if(state === "waiting"){
            setState("ready");
            setMessage("초록색이 되면 클릭!")

            this.timeout = setTimeout(()=>{
                setState("now");
                setMessage("지금 클릭!!!");
                startTime.current = new Date();
            },Math.floor(Math.random() * 1000) + 2000);
        }else if(state === "ready"){
            clearTimeout(timeout.current);
            setState("waiting");
            setMessage("너무 성급해! 초록색이 되면 클릭!@!@!#");
        }else if(state === "now"){
            endTime.current = new Date();
            setState("waiting");
            setMessage("클릭해서 시작!!");
            setResult((prevState)=>{
                return[...prevState.result, endTime.current - startTime.current];
            });
        }

    };

    const renderAverage = () => {//이런식으로 함수로 나누는 것 보다 따로 파일을 만들어 props로 연결해 주는 것이 더 낫다
        //result 스테이트가 바뀌면 렌더가 일어나는데 그러면 이 부분뿐 아니라 메시지가 출렷되는 부분도
        //렌더가 된다 따라서 다른 컴포넌트로 분리
        return result.length === 0 ? null : <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
    };


    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    );
}
export default ResponseCheck;