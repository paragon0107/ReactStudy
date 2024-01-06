const React = require("react");
const {useState ,useRef} = React;

onSubmit = (event) => {
    event.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
        this.setState((prevState)=>{
            return{
                result: "정답 = "+prevState.value + '! 정답입니다', //함수형 반환, 변화기 전 데이터 사용할 때는 함수형으로 사용
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: "",
            }
        });
        this.input.focus();
    } else {
        this.setState({
            result: "땡",
            value: "",
        });
        this.input.focus();
    }
};
const Gugudan = ()=>{
    const [first,setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second,setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value,setValue] = useState(null);
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    const onChangeInput = (event) => {
        setValue(event.target.value);
    };

    const onSubmitForm=(event)=>{
        event.preventDefault();
        if(parseInt(value) === first * second){
            setResult("정답:"+value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue("");
            inputRef.current.focus();
        }else {
            setResult("땡");
            setValue('');
            inputRef.current.focus();
        }
    }
    return (
        <>
            <div>{first}곱하기{second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
                <button>입력</button>
            </form>
            <div id="result"> {result}</div>
        </>);

}

module.exports = Gugudan;