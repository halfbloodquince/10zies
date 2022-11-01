import {motion} from "framer-motion"

export default function Scores(props) {

    const scoresClick = !props.scoresOn ? "50%" : "145%"

    function timeConverter(time) {
        let mins = ("0" + Math.floor(time / 60000)%60).slice(-2)
        let secs = ("0" + Math.floor((time / 1000)%60)).slice(-2)
        let ms = ("0" + ((time / 10)%100)).slice(-2)

        console.log((JSON.parse(localStorage.getItem("newscore"))))
        return `${mins}:${secs}:${ms}`
    }



    // repeatType:"reverse", repeat:1 not good with clicks

    return (
        <motion.div  animate={{x: 0,y: scoresClick,scale: 1,rotate: 0,}} transition={{ ease: "easeOut", duration: 3,  } } 
        initial={false} className="scores--container" >
            <div className="scores--text">
                <h4>Fastest Times</h4>
                <p>1 - MJW - {timeConverter(JSON.parse(localStorage.getItem("toptime")))}</p>
                <p>2 - MJW - 00:12:55</p>
                <p>3 - MJW - 00:21:11</p>
                <p>4 - MJW - 00:25:35</p>
                <p>5 - MJW - 00:38:21</p>

            </div>
        </motion.div>
    )
}

// style={{color: props.scoresOn ? "#e8bfff" : "#010e16"}}