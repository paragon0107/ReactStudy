import React,{Component} from "react";

class Try extends Component{
    render() {
        return(
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        )
    }
}
export default Try;


//이럴게 반복문을 따로 빼는 이유는 가독성,재사용성 떄문도 있지만 성능 최적화 때문도 있다.