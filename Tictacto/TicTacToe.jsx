import React, {Component, useState, useReducer, useCallback, useEffect, memo} from "react";
import Table from "./Table";


const initialState ={
    winner:"",
    turn:"O",
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']],
    recentCell:[-1,-1]
};
export const SET_WINNER ="SET_WINNER"
export const CLICK_CELL = "CLICK_SELL"
export const CHANGE_TURN ="CHANGE_TURN"
export const RESET_GAME = "RESET_GAME"

const reducer=(state,action)=>{
    switch (action.type){
        case SET_WINNER:
            //state.winner = action.winner 이렇게 하면 X 주소가 변경 되어야 한다.
            return {
                ...state,
                winner:action.winner,
            };
        case CLICK_CELL:{

            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];    //이걸 넣어야 나중에 최적화 시이 정상적으로 작동한다.
            tableData[action.row][action.cell]= state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row,action.cell],
            };
        }
        case CHANGE_TURN:{
            return {
                ...state,
                turn:state.turn === "O"?"X":"O",
            };
        }
        case RESET_GAME:{
            return {
                ...state,
                turn:"O",
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','','']],
                recentCell:[-1,-1]
            }
        }
        default:
            return state;
    }
};

const TicTacToe = ()=>{
    // const [winner,setWinner] = useState("");
    // const [turn,setTurn] = useState("O");
    // const [table,setTableData] = useState([['','',''],['','',''],['','','']]);


    const [state,dispatch] = useReducer(reducer,initialState);
    const {tableData,turn,winner,recentCell} = state;

    useEffect(() => {
        const [row,cell]= recentCell;
        if(row<0){
            return;
        }
        let win = false;
        console.log(win, row, cell, tableData, turn);
        console.log("-1111111111111111111111111--");
        console.log(cell)
        console.log(row)
        console.log(tableData[0][1] ,tableData[1][cell],tableData[2][cell] ,turn)
        console.log("--11111111111111111111111-");
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            console.log(tableData[row][cell])
            win = true;
            console.log("1111")
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
            console.log("2222")
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
            console.log("3333")
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
            console.log("4444")
        }
        console.log(win, row, cell, tableData, turn);

        console.log("-2222--");
        console.log(tableData[0][cell] ,tableData[1][cell],tableData[2][cell] ,turn)
        console.log("--2222-");

        if(win){
            dispatch({type:SET_WINNER, winner:turn});
            dispatch({type:RESET_GAME});
        }else{
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){
                console.log("!")
                dispatch({type:RESET_GAME});
                dispatch({type:SET_WINNER, winner:"무승부"});

            }else{
                dispatch({type:CHANGE_TURN});
            }

        }

    }, [recentCell]);

    const onClickTable = useCallback(()=>{
        console.log("!!!!")
        dispatch({ type: SET_WINNER, winner:'O'}); //비동기임
    },);

    return(
        <>
            <Table onClick={onClickTable} tableDate={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}

        </>
    )
}



export default TicTacToe;