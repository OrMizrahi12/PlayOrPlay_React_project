import { random } from 'lodash';
import React, { useState } from 'react'
import './memoryNum.css'
import '../memoryNum/btn.scss'

let arr_num = [];

const MemoryNum = () => {

    const [canSee, setCanSee] = useState(false)
    const [showText, setShowText] = useState(false)
    const [canCheck, setCanCheck] = useState(false)
    const [canPlay, setCanPlay] = useState(true)
    const [level, setLevel] = useState(5);
    const [numbers, setNumbers] = useState([])
    const [inputNumbers, setInputNumbers] = useState([]);
    let sum = 0;
    let timer;


    const play = () => {
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
                document.querySelector("#id_h1").innerHTML = "WIN"
                document.querySelector("#id_h1").style.color = "green"

            }
            else {
                document.querySelector("#id_h1").innerHTML = "lose"
                document.querySelector("#id_h1").style.color = "red"
                if (level > 5) setLevel(level - 1)

            }
        }
    }

    return (
        <div>
            {
                canPlay && <button
                    disabled={!canPlay}
                    onClick={play}
                    className='btn btn-outline-dark bg-success p-3 m-3'>
                    play
                </button>
            }
            {
                canCheck && <button
                    disabled={!canCheck || inputNumbers.length < 1}
                    className='btn btn-outline-warning bg-danger p-3'
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
                showText && <input
                    className='inputS'
                    onChange={e => setInputNumbers([...e.target.value])}
                    type="text"
                    maxLength={level}
                />
            }
             <br />
             <br />
            <h1 id='id_h1' className='css-3d-text' ></h1>
            <br />
            <br />
            <h1 className='display-4' >digits: {level} | level: {level - 4}</h1>
        </div>

    )
}

export default MemoryNum