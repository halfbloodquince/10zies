import {motion} from "framer-motion"

export default function Scores(props) {

    const scoresClick = !props.scoresOn ? "50%" : "145%"

    function timeConverter(time) {
        let mins = ("0" + Math.floor(time / 60000)%60).slice(-2)
        let secs = ("0" + Math.floor((time / 1000)%60)).slice(-2)
        let ms = ("0" + Math.floor((time / 10)%100)).slice(-2)

        return `${mins}:${secs}:${ms}`
    }



    // repeatType:"reverse", repeat:1 not good with clicks

    return (
        <motion.div  animate={{x: 0,y: scoresClick,scale: 1,rotate: 0,}} transition={{ ease: "easeOut", duration: 3,  } } 
        initial={false} className="scores--container" >
            <div className="scores--text">
                <h4>Fastest Times</h4>
                <p>1 - {props.allScores.length > 0 ? timeConverter(props.allScores[0]) : "59:59:99"}</p>
                <p>2 - {props.allScores.length > 1 ? timeConverter(props.allScores[1]) : "59:59:99"}</p>
                <p>3 - {props.allScores.length > 2 ? timeConverter(props.allScores[2]) : "59:59:99"}</p>
                <p>4 - {props.allScores.length > 3 ? timeConverter(props.allScores[3]) : "59:59:99"}</p>
                <p>5 - {props.allScores.length > 4 ? timeConverter(props.allScores[4]) : "59:59:99"}</p>

            </div>
        </motion.div>
    )
}

// style={{color: props.scoresOn ? "#e8bfff" : "#010e16"}}