import {motion} from "framer-motion"


export default function Die(props) {



    const dieIsHeldStyle = { backgroundColor: props.isHeld ? "#610094": props.count == 0 ? "#1C0C5B" : "#FFFFFF", 
    color: props.isHeld || props.count == 0 ?  "#FFFFFF" : "black"}


    const startOfGame = props.count ==0 ? 0 : 180

    // const startingBackground = {color: props.count == 0 && "white"}
 

    return (
    <motion.div 
        transition={{
            ease: [0.97, 0.97, 0.93, 0.97]
      }} 
        initial={{rotate:startOfGame}} 
        animate={{
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }} 
        style={{...dieIsHeldStyle}} 
        className="die" 
        onClick={props.holdDice}>
        <h2 className="die--num">{props.value}</h2>
    </motion.div>)
}