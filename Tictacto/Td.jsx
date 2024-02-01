import React, {useCallback, useRef, useEffect, memo} from "react";
import {CHANGE_TURN, CLICK_CELL} from "./TicTacToe";

const Td=memo(({dispatch,rowIndex,cellIndex,cellData})=>{

    //useRef와 useEffect를 사용해서 어떤 부분이 바뀌고 있는지 확인하는 방법이다.
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex===ref.current[0],cellIndex === ref.current[1],dispatch === ref.current[2],cellData === ref.current[3]);
    //     ref.current = [rowIndex,cellIndex,dispatch,cellData];
    // }, [rowIndex,cellIndex,dispatch,cellData]);



    const onClickTd = useCallback(()=>{

        if(cellData){
            return
        }
        dispatch({type:CLICK_CELL,row:rowIndex,cell:cellIndex});

    },[cellData]);
    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;