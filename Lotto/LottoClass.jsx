import React, { Component} from 'react';
import Ball from "./Ball";
function getWinNumbers(){       //state 안쓰는 얘들은 이렇게 기능 분리하기
    console.log("getWinNumbers");
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c)=> p-c);
    return [...winNumbers,bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls:[],
        bonus: null,
        redo:false,
    };

    timeouts=[];

    runTimeouts = ()=>{
        const{winNumbers} = this.state;
        for(let i = 0; i< winNumbers.length - 1;i++){
            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevsteate)=>{
                    return{
                        winBalls:[...prevsteate.winBalls, winNumbers[i]],
                    };
                });
            },(i+1)*1000);
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumbers[6],
                redo:true,
            });
        },7000);
    }
    componentDidMount() {
        this.runTimeouts();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.winBalls.length === 0){
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        });
    }
    onClickRedo = ()=>{
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const {winBalls,bonus,redo } = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과칭">
                    {winBalls.map((v)=> <Ball key={v} number={v}></Ball>)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number = {bonus}></Ball>}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        )
    }

}

export default Lotto;
