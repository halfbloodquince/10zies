

export default function Clock(props) {

    return (
        <div className="time--container">
            <div className="new--time--count">
                <div className="time--count">Time :</div>
                <div className="timer--clock">
                    <span className="min">{("0" + Math.floor((props.time / 60000)%60)).slice(-2)} : </span>
                    <span className="sec">{("0" + Math.floor((props.time / 1000)%60)).slice(-2)} : </span>
                    <span className="ms">{("0" + ((props.time / 10)%100)).slice(-2)}</span>
                </div>
            </div>
            <div className="top--time">
                <div className="best--time--count">Best Time :</div>
                <div className="best--time">
                    <span className="min">{props.topTime ===0 ? "--" : ("0" + Math.floor((props.topTime / 60000)%60)).slice(-2)} : </span>
                    <span className="sec">{props.topTime ===0 ? "--" : ("0" + Math.floor((props.topTime / 1000)%60)).slice(-2)} : </span>
                    <span className="ms">{props.topTime ===0 ? "--" : ("0" + Math.floor((props.topTime / 10)%100)).slice(-2)}</span>
                </div>
            </div>
        </div>
)
}