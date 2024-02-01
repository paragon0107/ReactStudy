import React, {memo, useMemo} from "react";
import Td from "./Td";
const Tr=memo(({rowDate, rowIndex,dispatch})=>{
    return(
        <tr>
            {Array(rowDate.length).fill().map((td,i)=>(

                    <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowDate[i]}>{" "}</Td>

            ))}

        </tr>
    )
});


export default Tr;
