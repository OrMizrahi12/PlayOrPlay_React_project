import React, { useState } from 'react'
import { uniq } from 'lodash'
import './flashBox.css'

let arr_num = []

const FlashBox = () => {

    let count = 15
    let timer;
    const [str, strTrik] = useState('paused');
    const arr_color = ['black', 'blue', 'black'];
    const btnNum = [0, 1, 2, 3];
    const btnNum1 = [4, 5, 6, 7];
    const btnNum2 = [8, 9, 10, 11];
    const btnNum3 = [12, 13, 14, 15];
    const btnNum4 = [16, 17, 18, 19];
    const [speed, setSpeed] = useState(2500);
    const [show, setShow] = useState(true);
    const [ar, setAr] = useState([]);
    const [canPley, setCanPley] = useState(false);
    const [level, setLevel] = useState(1);

    const pley = () => {

        clearInterval(timer)
        setShow(false)
        setCanPley(false)
        arr_num = []

        document.querySelector('#id_h1').innerHTML = ""
        if (level >= 4) {
            strTrik("loading")
            count = 19
            for (let i = 0; i <= count; i++)
                document.querySelector(`#btn${i}`).style.backgroundColor = 'black'
        }
        if (level < 4) count = 15

        for (let i = 0; i <= count; i++)
            document.querySelector(`#btn${i}`).style.backgroundColor = 'black'

        for (let i = 0; i <= count; i++)
            arr_num.push(Math.floor(Math.random() * count))
        setAr(arr_num)

        timer = setInterval(runOnColor, speed)
        for (let i = 0; i <= count; i++)
            document.querySelector(`#btn${i}}`).style.backgroundColor = 'black'
    }

    let sum = 0
    const runOnColor = () => {
        sum++
        if (level >= 4) count = 19;
        else count = 15;

        for (let i = 0; i <= count; i++)
            document.querySelector(`#btn${arr_num[i]}`).style.backgroundColor = arr_color[sum]
        if (sum === 2) {
            setCanPley(true)
            setShow(true)
            sum = 0
            clearInterval(timer)
        }
    }

    let temp_ar = []
    const checkResult = (y) => {

        if (level >= 4) count = 19;
        else count = 15;

        clearTimeout(timer)
        let arr = uniq(ar)

        for (let i = 0; i < ar.length; i++) {
            if (arr.includes(y) && !temp_ar.includes(y)) {
                temp_ar.push(y)
                document.querySelector(`#btn${y}`).style.backgroundColor = 'green'
            }
            if (!arr.includes(y)) {
                for (let i = 0; i <= count; i++) 
                    document.querySelector(`#btn${i}`).style.backgroundColor = 'red'
                
                document.querySelector('#id_h1').innerHTML = "LOSE"
                document.querySelector('#id_h1').style.color = 'red'
                strTrik('paused')
                setCanPley(false)
                setLevel(level > 0 && level - 1)
                if (level < 10 && level > 5) setSpeed(speed < 3000 && speed + 250)
            }
        }
        if (temp_ar.length === arr.length) {
            setCanPley(false)
            document.querySelector('#id_h1').innerHTML = "WIN" 
            document.querySelector('#id_h1').style.color = 'green'
            setLevel(level + 1)
            strTrik('paused')
            if (level > 5) setSpeed(speed > 1000 && speed - 250)
        }
    }

    return (
        <div>
            <br />
            <div className={str} >
                {btnNum.map(x => <button key={x} disabled={!canPley} id={`btn${x}`} onClick={() => checkResult(x)} className='btn btn border' style={{ height: 80, width: 80, backgroundColor: 'black' }}></button>)}
                <br />
                {btnNum1.map(x => <button key={x} disabled={!canPley} id={`btn${x}`} onClick={() => checkResult(x)} className='btn btn border' style={{ height: 80, width: 80, backgroundColor: 'black' }}></button>)}
                <br />
                {btnNum2.map(x => <button key={x} disabled={!canPley} id={`btn${x}`} onClick={() => checkResult(x)} className='btn btn border' style={{ height: 80, width: 80, backgroundColor: 'black' }}></button>)}
                <br />
                {btnNum3.map(x => <button key={x} disabled={!canPley} id={`btn${x}`} onClick={() => checkResult(x)} className='btn btn border' style={{ height: 80, width: 80, backgroundColor: 'black' }}></button>)}
                <br />
                {level >= 4 && btnNum4.map(x => <button key={x} disabled={!canPley} id={`btn${x}`} onClick={() => checkResult(x)} className='btn btn border' style={{ height: 80, width: 80, backgroundColor: 'black' }}></button>)}

            </div>
            <h1 id='id_h1' ></h1>
            {
                show && <button
                    className='btn btn-outline-secondary bg-dark p-3'
                    onClick={pley}>
                    play
                </button>
            }
            <h1>level: {level}</h1>
        </div>


    )
}

export default FlashBox