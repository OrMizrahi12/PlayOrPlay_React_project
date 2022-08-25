import { random, uniq } from 'lodash';
import React, { useState } from 'react'
    ;

const LocationMemory = () => {
    let shuffleArr = []
    const ar1 = [1, 2, 3, 4];
    const ar2 = [5, 6, 7, 8];
    const ar3 = [9, 10, 11, 12];
    const ar4 = [13, 14, 15, 16];
    const [level, setLevel] = useState(8)
    let timer;
    let count = 1
    const [canClick,setCanClick] = useState(false)
    const [canPlay,setCanPlay] = useState(true)
    const [arr, setAr] = useState([])

    const shuffleNum = () => {
        setCanPlay(false)
        setCanClick(false)
        shuffleArr = []
        setAr([])
        for (let i = 1; i <= 16; i++) {
            document.querySelector(`#btn${i}`).style.backgroundColor = 'black'

        }
        clearInterval(timer)
        for (let i = 1; i <= level; i++) {

            shuffleArr.push(random(1, 16))
        }
        setAr(uniq(shuffleArr))

        timer = setInterval(runColor, 1000)


    }
    const runColor = () => {
        let ar = uniq(shuffleArr)
        if (count < ar.length) {
            document.querySelector(`#btn${ar[count - 1]}`).style.backgroundColor = 'black'
            document.querySelector(`#btn${ar[count]}`).style.backgroundColor = 'blue'
        }

        console.log(ar[count])
        count++


        if (count >= ar.length + 1) {
            for (let i = 1; i <= 16; i++) {
                document.querySelector(`#btn${i}`).style.backgroundColor = 'black'

            }
            count = 1;
            setCanClick(true)
            clearInterval(timer)
        }
    }

    let i = 1;
    let y = 0;
    const checkResult = (x) => {

        if (arr[i] === x) {
            document.querySelector(`#btn${x}`).style.backgroundColor = 'green';
            y++
        }
        else {
            document.querySelector(`#btn${x}`).style.backgroundColor = 'red';
            console.log("loss")
            setCanClick(false)
            setCanPlay(true)
            document.querySelector('#id_h1').innerHTML = 'loss'
        }
        i++;
        if (i == arr.length) {
            if (y == arr.length - 1) {
                console.log("win")
                setCanPlay(true)
                setCanClick(false)
                if(level < 16) setLevel(level+1)
                document.querySelector('#id_h1').innerHTML = 'WIN !'
            }
        }

    }

    return (
        <div>
            <div>
                {ar1.map(x =>
                    <button
                        disabled={!canClick}
                        onClick={() => checkResult(x)}
                        key={x}
                        id={`btn${x}`}
                        style={{ width: 50, height: 50, backgroundColor: 'black' }}
                        className='btn btn rounded-circle m-1' >

                    </button>
                )}
                <br />
                {ar2.map(x =>
                    <button
                        disabled={!canClick}
                        onClick={() => checkResult(x)}
                        key={x}
                        id={`btn${x}`}
                        style={{ width: 50, height: 50, backgroundColor: 'black' }}
                        className='btn btn rounded-circle m-1 '>
                    </button>
                )}
                <br />
                {ar3.map(x =>
                    <button
                        disabled={!canClick}
                        onClick={() => checkResult(x)}
                        key={x}
                        id={`btn${x}`}
                        style={{ width: 50, height: 50, backgroundColor: 'black' }}
                        className='btn btn rounded-circle m-1 '>
                    </button>
                )}
                <br />
                {ar4.map(x =>
                    <button
                        disabled={!canClick}
                        onClick={() => checkResult(x)}
                        key={x}
                        id={`btn${x}`}
                        style={{ width: 50, height: 50, backgroundColor: 'black' }}
                        className='btn btn rounded-circle m-1 '>
                    </button>
                )}
            </div>
            <br />

            <button disabled={!canPlay} onClick={shuffleNum} >shuffle</button>
            <h1 id='id_h1' ></h1>
        
        </div>
    )
}

export default LocationMemory