import { random, uniq } from 'lodash'
import { useEffect } from 'react'
import { useState } from 'react'
import '../flashBox/flashBox.css'
import '../game.css'
import axios from 'axios'
import Records from '../records'
import { useNavigate } from 'react-router-dom'
import { Howl } from 'howler'
import clickToPlay from '../clickToPlay.mp3'
import winSound from '../memorySound/sounds/winSound.mp3'
import lossSound from '../memorySound/sounds/gameOverSound.mp3'
import clickCorrectBox from './flashBoxSounds/clickCorrectBox.mp3'

const FlashBox = () => {

    const heru = "<<<"
    const navigate = useNavigate()
    const siteName = 'flashbox'
    const name = localStorage.getItem("name")
    let [difficultyMsg, setDifficultyMsg] = useState("Very easy")
    let [difficultyCss, setDifficultyCss] = useState("difficulty1")
    let [showRecords, setShowRecords] = useState(false)
    let [canPlay, setCanPlay] = useState(false)
    let [canStart, setCanStart] = useState(true)
    let [level, setLevel] = useState(1)
    let [rangeNum, setRangeNum] = useState(9)
    let [boxes, setBoxses] = useState(5)
    let [seconds, setSeconds] = useState(1000)
    let [idBox, setIdBox] = useState("boxses1")
    let [arrBored, setArBored] = useState([])
    let [arrBox, setArrBox] = useState([])
    let [record, setRecord] = useState()
    let [resultMsg, setResultMsg] = useState()
    let timer;
    let win;
    let continuTimer;
    let dynamic_arr = []
    let arr_levels = []
    let s = 0;


    const difficulty_1 = () => {
        dynamic_arr = []
        for (let i = 1; i <= 9; i++)
            dynamic_arr.push(i)
        setArBored(dynamic_arr)
        setIdBox("boxses1")
    }
    const difficulty_2 = () => {
        dynamic_arr = []
        for (let i = 1; i <= 16; i++)
            dynamic_arr.push(i)
        setArBored(dynamic_arr)
        setIdBox("boxses2")
    }
    const difficulty_3 = () => {
        dynamic_arr = []
        for (let i = 1; i <= 25; i++)
            dynamic_arr.push(i)
        setArBored(dynamic_arr)
        setIdBox("boxses3")
    }
    const difficulty_4 = () => {
        dynamic_arr = []
        for (let i = 1; i <= 36; i++)
            dynamic_arr.push(i)
        setArBored(dynamic_arr)
        setIdBox("boxses4")
    }
    const difficulty_5 = () => {
        dynamic_arr = []
        for (let i = 1; i <= 49; i++)
            dynamic_arr.push(i)
        setArBored(dynamic_arr)
        setIdBox("boxses5")
    }

    const play = () => {
        playSound(clickToPlay)
        setCanStart(false)
        setCanPlay(false)
        for (let i = 1; i <= arrBored.length; i++)
            document.querySelector(`#btn${i}`).style.backgroundColor = 'black'

        for (let i = 0; i < boxes; i++)
            arr_levels.push(random(1, rangeNum))

        arr_levels = uniq(arr_levels)
        setArrBox(arr_levels)
        timer = setInterval(runGame, seconds)
    }

    useEffect(() => {
        if (level >= 1 && level < 3) {
            difficulty_1()
            setRangeNum(9)
            setBoxses(5)
            setSeconds(1200)
            setDifficultyMsg("Very Easy")
            setDifficultyCss("difficulty1")
        }
        else if (level >= 3 && level < 5) {
            difficulty_2()
            setRangeNum(16)
            setBoxses(7)
            setSeconds(1400)
            setDifficultyMsg("Easy")
            setDifficultyCss("difficulty2")
        }
        else if (level >= 5 && level < 7) {
            difficulty_3()
            setRangeNum(25)
            setBoxses(12)
            setSeconds(1600)
            setDifficultyMsg("Medium")
            setDifficultyCss("difficulty3")
        }
        else if (level >= 8 && level < 9) {
            difficulty_4()
            setRangeNum(36)
            setBoxses(13)
            setSeconds(2100)
            setDifficultyMsg("Hard")
            setDifficultyCss("difficulty4")
        }
        else if (level >= 10) {
            difficulty_5()
            setRangeNum(49)
            setBoxses(18)
            setSeconds(3000)
            setDifficultyMsg("Super Hard")
            setDifficultyCss("difficulty5")
        }
        for (let i = 1; i <= arrBored.length; i++) {
            document.querySelector(`#btn${i}`).style.backgroundColor = 'black'
        }
    }, [level])

    useEffect(() => { difficulty_1() }, [])


    const runGame = () => {
        s++
        for (let i = 0; i < arr_levels.length; i++)
            document.querySelector(`#btn${arr_levels[i]}`).style.backgroundColor = 'blue'

        if (s === 2) {
            clearInterval(timer)
            for (let i = 0; i < arr_levels.length; i++)
                document.querySelector(`#btn${arr_levels[i]}`).style.backgroundColor = 'black'
            s = 0;
            setCanPlay(true)
        }
    }

    let arrCheckResult = []

    const checkResult = (x) => {
        
        if (arrBox.includes(x)) {
            if (!arrCheckResult.includes(x)) arrCheckResult.push(x)
            document.querySelector(`#btn${x}`).style.backgroundColor = 'blue'
            playSound(clickCorrectBox)
        }
        else {
            document.querySelector(`#btn${x}`).style.backgroundColor = 'red'
           

            for (let i = 1; i <= arrBored.length; i++)
                document.querySelector(`#btn${i}`).style.backgroundColor = 'red'

            setCanPlay(false)
            win = false
            setResultMsg("lossResultMsg")
            playSound(lossSound)
            document.querySelector(`#id_msgResult`).innerHTML = "Loss"
            continuTimer = setInterval(setTheLevel, 1000)
        }
        if (arrBox.length === arrCheckResult.length) {
            setCanPlay(false)
            win = true
            playSound(winSound)
            setResultMsg("winResultMsg")
            document.querySelector(`#id_msgResult`).innerHTML = "Win"
            continuTimer = setInterval(setTheLevel, 1000)
        }
    }

    let i = 0;
    const setTheLevel = () => {
        i++
        if (i === 1) {
            if (win === false) {
                setCanStart(true)
                if (level > 1) setLevel(level - 1)
            } else if (win === true) {
                setCanStart(true)
                setLevel(level + 1)
                if (level > record) {
                    (async () => {
                        let { data } = await axios.put(`https://moreservgame.herokuapp.com/flashbox/${name}`, {
                            username: name,
                            record: record + 1
                        })
                        setRecord(data.record)
                    })();
                }
            }
            clearInterval(continuTimer)
            i = 0;
            document.querySelector(`#id_msgResult`).innerHTML = ""
        }
    }

    useEffect(() => { getRecord(); }, [])

    const getRecord = async () => {
        let { data } = await axios.get(`https://moreservgame.herokuapp.com/flashbox/${name}`)
        setRecord(data.record)
    }

    const playSound = (sound) => {

        let sfx = {
            push: new Howl({
                src: [
                    sound
                ],
                html5: true,
                volume: 1,
            })
        }

        sfx.push.play()
    }

    return (
        <div>
            <div className='mx-auto'>
                <h1 className={difficultyCss}>{difficultyMsg}</h1>
                <div className={idBox + " justify-content-center"} id={idBox}>
                    {
                        arrBored.map((x) => <button
                            key={x}
                            style={{ backgroundColor: 'black', boxShadow: '4px 1px 1px silver' }}
                            disabled={!canPlay}
                            className={"border border-2 btn" + " btnsBox"}
                            onClick={() => checkResult(x)}
                            id={`btn${x}`}>
                        </button>
                        )
                    }
                </div>
            </div>
            <br />
            {
                level >= 7 && <br /> && <br />
            }
            {level >= 9 && <br />}
            <br />
            <h1 id='id_msgResult' className={resultMsg}></h1>
            <br />
            {
                canStart && <button className='btnPlay' disabled={!canStart} onClick={play} >play</button>
            }
            <br />

            <h1 className={resultMsg}>level: {level} | record: {record}</h1>
            <br />
            <button className='btnRcords' onClick={() => setShowRecords(!showRecords)}>records ⬇</button>
            <br />
            {
                showRecords && <Records gameName={siteName} />
            }
            <br />
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        </div>
    )
}

export default FlashBox