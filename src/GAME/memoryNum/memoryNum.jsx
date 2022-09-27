import { random } from 'lodash';
import React, { useEffect, useState } from 'react'
import './memoryNum.css'
import '../memoryNum/btn.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Records from '../records';
import '../game.css'
import clockSound from './memoryNumSounds/clock.mp3'
import correctNumber from './memoryNumSounds/correctNumber.mp3'
import wrongNum from './memoryNumSounds/wrongNum.mp3'
import { Howl } from 'howler';
import clickToPlay from '../clickToPlay.mp3'

let arr_num = [];

const MemoryNum = () => {
    
    const navigate = useNavigate()
    const heru = `<<<`
    const siteName = 'memorynum';
    const [showRecords,setShoeRecords] = useState(false)
    const name = localStorage.getItem("name")
    const [canSee, setCanSee] = useState(false)
    const [showText, setShowText] = useState(false)
    const [canCheck, setCanCheck] = useState(false)
    const [canPlay, setCanPlay] = useState(true)
    const [level, setLevel] = useState(5);
    const [stage,setStage] = useState(1)
    const [numbers, setNumbers] = useState([])
    const [record,setRecord]=useState()
    const [inputNumbers, setInputNumbers] = useState([]);
    let sum = 0;
    
    let timer;


    const play = () => {
        playSound(clickToPlay)
        playSound(clockSound)
        document.querySelector("#id_h1").innerHTML = ""
        setCanCheck(false)
        clearInterval(timer)
        setInputNumbers([])
        setCanSee(true)
        setShowText(false)
        setCanPlay(false)
        arr_num = []
        for (let i = 0; i < level; i++) {
            let rand = random(0, level);
            arr_num.push(rand);
        }

        setNumbers(arr_num)
        timer = setInterval(time, 1000)
    }
    let s = 4;
    const time = () => {
        sum++
        s--
        document.querySelector("#id_timer").innerHTML = s
        console.log(sum)
        if (sum == 4) {
            setCanSee(false)
            setShowText(true)
            setCanCheck(true)
            sum = 0;
            s = 4
            clearInterval(timer)
        }
    }

    useEffect(() => {
        getRecord();
    },[])
    const getRecord = async() => {
        let {data} = await axios.get(`https://moreservgame.herokuapp.com/memorynum/${name}`)  
       setRecord(data.record)
    }

    const checkResult = () => {
        setShowText(false)
        let checkCount = 0
        setCanPlay(true)

        if (inputNumbers.length > 1) {
            setCanCheck(false)
            setCanSee(true)
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] == inputNumbers[i]) checkCount += 1

            }
            if (checkCount === numbers.length) {
                setLevel(level + 1)
                document.documentElement.style.setProperty("--n-char", level);
                document.querySelector("#id_h1").innerHTML = "WIN"
                document.querySelector("#id_h1").style.color = "green"
                playSound(correctNumber)
                setStage(stage+1)
                if(stage > record){
                    (async()=>{
                        let {data} = await axios.put(`https://moreservgame.herokuapp.com/memorynum/${name}`,{
                            username:name,
                            record:record+1
                        })  
                       setRecord(data.record)
                    })();
                    
                }

            }
            else {
                playSound(wrongNum)
                document.querySelector("#id_h1").innerHTML = "lose"
                document.querySelector("#id_h1").style.color = "red"
                if (level > 5) {
                    setLevel(level - 1)
                    document.documentElement.style.setProperty("--n-char", level);
                }
                if(stage > 1) setStage(stage-1)

            }
        }
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
            {
                canPlay && <button
                    disabled={!canPlay}
                    onClick={play}
                    className='btnPlay'>
                    play
                </button>
            }
            {
                canCheck && <button
                    disabled={!canCheck || inputNumbers.length < 1}
                    className='btnCheck'
                    onClick={checkResult}
                >check
                </button>
            }
            {
                canSee && <h1 id='id_timer' ></h1>
            }
            {
                canSee && numbers.flatMap((x, i) => <strong key={i} className='strong h1Number'
                    style={{ color: 'green', fontSize: 30 }}> {x} </strong>)
            }
            <br />
            {
                canSee && inputNumbers.flatMap((x, i) => <strong key={i} className='strong h1Number'
                    style={{ color: x != numbers[i] ? 'red' : 'green', fontSize: 30 }}> {x} </strong>)
            }
            {
                showText && <> <input
                    className='inputS'
                    style={{color:'white'}}
                    onChange={e => setInputNumbers([...e.target.value])}
                    type="number"
                    maxLength={level}
                />
            
                </>
            }
             <br />
             <br />
            <h1 id='id_h1' className='css-3d-text' ></h1>
            <br />
            <br />
            <h1 className='display-5' >digits: {level} | level: {level - 4}</h1>
            <h1 className='display-5' >Record: {record}</h1>
            <button className='btnRcords' onClick={()=> setShoeRecords(!showRecords)}>records</button>
            {
                showRecords && <Records gameName={siteName} />
            }
                        <br/> <br /> 
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        </div>

    )
}

export default MemoryNum