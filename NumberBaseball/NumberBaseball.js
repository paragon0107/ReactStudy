import React,{Component} from "react";

function  getNumbers(){

}
class NumberBaseball extends Component{
    state={
        result : "",
        value: "",
        answer: getNumbers(),
        tries :[],
    }
    oncSubmit =()=>{

    };
    onChangeInput=()=>{

    };
    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도:{this.state.tries.state}</div>
                <ul>
                    {this.state.tries.map((v)=>{
                        return(
                            <li>{v}</li>
                        )
                    })}
                </ul>

            </>

        )
    }
}

export  const hello = 'hello'; //import { hello }
export const  bye = 'hello'; // import { hello,bye }
export default NumberBaseball; // import NumberBaseball
//export를 할 때 const default의 경우 그냥 import NumberBaseball을 진행하고
// hello와 bye 처럼 각각 이름이 정해져 있으면 import {hello}, import {bye}로 import를 진행한다.