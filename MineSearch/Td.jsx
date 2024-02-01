import React, {useCallback, useContext} from "react";
import {CODE, OPEN_CELL, TableContext} from "./MineSearch";

function getTdStyle(code) {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            };
    }
}

function getTdText(code) {
    console.log('getTdtext');
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}

const Td=({rowIndex,cellIndex})=>{
    const {tableData ,dispatch } = useContext(TableContext);
    const onClickTd = useCallback(()=>{
        dispatch({type:OPEN_CELL,row:rowIndex,cell:cellIndex});
    },[])
    return(
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    )
}

export default Td;