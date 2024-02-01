import React, {Component, useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Ball from "./Ball";
function getWinNumbers(){       //state 안쓰는 얘들은 이렇게 기능 분리하기
    console.log("getWinNumbers");
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c)=> p-c);
    return [...winNumbers,bonusNumber];
}

const Lotto = ()=>{
    const lottoNumbers = useMemo(()=> getWinNumbers(),[]);
    const [winNumbers,setWinNumbers ]= useState(lottoNumbers);
    const [winBalls,setWinBalls] = useState([]);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);//훅스들은 조건문안에는 절대 넣으면 안되고 반복문과 함수 안에도
                                                                //웬만해선 넣으면 안된다.

    useEffect(()=>{
        console.log("useEffect");
        for(let i = 0; i< winNumbers.length - 1;i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]]);
            },(i+1)*1000);
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        },7000);
        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        };
    },[timeouts.current]);
    const onClickRedo = useCallback(()=>{//만약 자식에게 함수를 넘겨줄 때는 useCallback을 해서 넘겨줘야 한다.
        console.log("onClickRedo");
        setWinNumbers(getWinNumbers());
        setWinBalls(getWinNumbers());
        setBonus(null);
        setRedo(false);
        this.timeouts = [];
    },[winNumbers]);

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과칭">
                {winBalls.map((v)=> <Ball key={v} number={v}></Ball>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number = {bonus}></Ball>}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    )
}


export default Lotto;

