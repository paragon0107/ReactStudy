import React, {Component} from "react";

class ResponseCheck extends Component{
    state ={
        state: "waiting",
        message: "클릭해서 시작하세요",
        result:[],
    };

    timeout;
    startTime;
    endTime;
    onClickScreen =()=>{
        const {state, message, result} = this.state;
        if(state === "waiting"){
            this.setState({
                state:"ready",
                message:"초록색이 되면 클릭!",
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    state: "now",
                    message: "지금클릭",
                });
                this.startTime = new Date();
            },Math.floor(Math.random() * 1000) + 2000);
        }else if(state === "ready"){
            clearTimeout(this.timeout);
            this.setState({
                state: "waiting",
                message: "너무 성급해! 초록색이 되면 클릭!@!",
            });
        }else if(state === "now"){
            this.endTime = new Date();
            this.setState((prevState)=>{
                return{
                    state:"waiting",
                    message: "클릭해서 시작!",
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }

    };
    renderAverage = () => {//이런식으로 함수로 나누는 것 보다 따로 파일을 만들어 props로 연결해 주는 것이 더 낫다
                                //result 스테이트가 바뀌면 렌더가 일어나는데 그러면 이 부분뿐 아니라 메시지가 출렷되는 부분도
                                //렌더가 된다 따라서 다른 컴포넌트로 분리
        const {result} = this.state;
        return result.length === 0 ? null : <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
    };

    render() {
        const {state, message} = this.state;
        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;