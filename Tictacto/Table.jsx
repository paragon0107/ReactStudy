import React, {memo} from "react";
import Tr from "./Tr";
const Table=memo(({onClick, tableDate,dispatch} )=>{
    return(
        <table>
            {Array(tableDate.length).fill().map((tr,i)=>(
                <Tr key={i} dispatch={dispatch} rowIndex={i}rowDate={tableDate[i]}></Tr>
            ))}
        </table>
    );
});


export default Table;
