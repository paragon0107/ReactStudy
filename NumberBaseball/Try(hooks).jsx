import React from "react";

const Try = ({tryInfo}) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}
export default Try;


//이럴게 반복문을 따로 빼는 이유는 가독성,재사용성 떄문도 있지만 성능 최적화 때문도 있다.