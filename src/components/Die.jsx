import {motion} from "framer-motion"


export default function Die(props) {



    const dieIsHeldStyle = { backgroundColor: props.isHeld ? "#59E391": "#FFFFFF"}
 

    return (
    <motion.div
        transition={{
            ease: [0.97, 0.97, 0.93, 0.97]
      }} 
        initial={{rotate:180}} 
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