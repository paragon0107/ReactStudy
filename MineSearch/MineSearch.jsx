import React, {createContext, useMemo, useReducer} from "react";
import Table from "./Table";
import Form from "./Form";


export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,//0이상이면 opened
};

export const TableContext =createContext({
    tableData:[],
    dispatch:()=>{

    },
});
const initialState = {
    tableData:[],
    timer:0,
    result:"",
};

export const START_GAME = "START_GAME";
export const OPEN_CELL ="OPEN_CELL";
const plantMine = (row, cell, mine) => {
    console.log(row,cell,mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while (candidate.length > row *cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data =[];
    for(let i =0; i<row;i++){
        const rowData = [];
        data.push(rowData);
        for(let j = 0;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for(let k =0;k<shuffle.length;k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};
const reducer = (state,action)=>{
    switch (action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row,action.cell,action.mine),
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
            }
        }


        default:
            return state;
    }
};
const MineSearch=()=>{
    const [state,dispatch] = useReducer(reducer,initialState);

    //contextAPI를 사용하면 최적화 하기 매우 힘듦 따라서 이렇게 useMemo로 한번 감싸서 캐싱 작업을 해줘야 한다.
    const value = useMemo(()=>({ tableData: state.tableData, dispatch}),[state.tableData]);
    return(
        <TableContext.Provider value={value}>
            <Form></Form>
            <div>{state.timer}</div>
            <Table></Table>
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;