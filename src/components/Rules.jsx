import {motion} from "framer-motion"

export default function Rules(props) {

    const buttonClick = props.rulesOn ? 0 : 180

    return (
        <motion.div  animate={{x: 0,y: buttonClick,scale: 1,rotate: 0,}} transition={{ ease: "easeOut", duration: 3 }} 
        initial={false} className="rules--container">
            <div className="rules--text">
                <p>Roll until all numbers are the same.</p>
                <p>Click on a number to freeze or unfreeze its value.</p>
                <p>Do yourself proud.</p>
            </div>
        </motion.div>
    )
}