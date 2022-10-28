import {motion} from "framer-motion"

export default function Scores(props) {

    const scoresClick = !props.scoresOn ? 100 : 440
    console.log(scoresClick)

    // repeatType:"reverse", repeat:1 not good with clicks

    return (
        <motion.div  animate={{x: 0,y: scoresClick,scale: 1,rotate: 0,}} transition={{ ease: "easeOut", duration: 5,  } } 
        initial={false} className="scores--container">
            <div className="scores--text">
                <h2>High Scores</h2>
                <p>MJW : 999</p>
                <p>MJW : 932</p>
                <p>MJW : 918</p>
                <p>MJW : 842</p>
                <p>MJW : 831</p>
                <p>MJW : 828</p>
                <p>MJW : 772</p>
                <p>MJW : 611</p>

            </div>
        </motion.div>
    )
}