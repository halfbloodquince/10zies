export default function Die(props) {

    const dieIsHeldStyle = { backgroundColor: props.isHeld ? "#59E391": "#FFFFFF"}
 

    return (
    <div style={dieIsHeldStyle} className="die" onClick={props.holdDice}>
        <h2 className="die--num">{props.value}</h2>
    </div>)
}