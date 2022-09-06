import React, { useEffect, useState } from 'react'
import './checkers.css'
import { arColor, ar } from './checkers_tools1'
import { useNavigate } from 'react-router-dom'

const csskingRed = 'shadow rounded-circle border border-5 border-warning redPlayer mx-auto m-2'
const cssred = 'shadow rounded-circle border redPlayer mx-auto m-2'
const csskingBlue = 'rounded-circle border border-5 border-warning bluePlayer mx-auto m-2'
const cssblue = 'shadow rounded-circle border bluePlayer mx-auto m-2 '
const red = 1;
const blue = 2;
const kingRed = 10;
const kingBlue = 20;
const empty = 0
const white = "tile white-tile border"
const black = "tile black-tile border"
const heru = `<<<`

const Checkers = () => {
   
    const navigate = useNavigate();
    const [redCount, setRedCount] = useState(12);
    const [blueCount, setBlueCount] = useState(12);
    const [bord, setBord] = useState()
    const [operate, setOperate] = useState(false)
    const arr_tools = [
        red, empty, red, empty, red, empty, red, empty, empty, red,
        empty, red, empty, red, empty, red, red, empty, red, empty,
        red, empty, red, empty, empty, empty, empty, empty, empty, empty, empty,
        empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, blue,
        empty, blue, empty, blue, empty, blue, blue, empty,
        blue, empty, blue, empty, blue, empty, empty, blue, empty,
        blue, empty, blue, empty, blue
    ]

    // arr_clicks[0] MUST be === some player.
    // arr_clicks[1] MUST be === empty block. 
    let arr_clicks = []

    let arr_location_tools = []
    let arrSwithAct = []
    let realTimePlay = null;
    let emptyBlock = null;
    let count = 0;
    let marker = null
    let testq =[]
    let arrSteps = []
    // x => x != 7 && x !=8 && x != 23&& x != 24&& x != 23 
    let arrBlock = [1,3,5,7,8,10,12,14,17,19,21,23,24,26,28,30,33,35,37,39,40,42,44,46,49,51,53,55,56,58,60,62,64,66]
    const test = (x, y) => {
        document.querySelector('#id_h1a').innerHTML = ""

        setOperate(!operate)

        if (realTimePlay != null) {
            emptyBlock = empty
        }
        arrSwithAct.push(x)
        switch (x) {
            case red:
                realTimePlay = red;
                break;
            case blue:
                realTimePlay = blue;
                break;
            case kingRed:
                realTimePlay = kingRed;
                break;
            case kingBlue:
                realTimePlay = kingBlue;
                break;
            default:
        }

        if (
            count % 2 === 0 && realTimePlay === red ||
            count % 2 === 0 && realTimePlay === kingRed ||
            count % 2 !== 0 && realTimePlay === blue ||
            count % 2 !== 0 && realTimePlay === kingBlue

        ) {
            if (realTimePlay !== null) {

                if (arr_clicks.length === 0) {
                    arr_clicks.push(realTimePlay)
                    arr_location_tools.push(y)



                }
                if (arr_clicks.length === 1 && x === empty) {
                    arr_clicks.push(empty)
                    arr_location_tools.push(y)
                    console.log(arr_location_tools)
                }

            }
        }


        if (x == realTimePlay) {

            arr_location_tools[0] = y
            marker = y
            arrSteps = []
            if (realTimePlay === red) {

                if (arr_tools[y + 9] == empty){
                    arrSteps.push(y + 9)
                } 
                if (arr_tools[y + 7] == empty){
                    arrSteps.push(y + 7)  
                } 
                if (arr_tools[y + 9] == blue && arr_tools[y + (9 * 2)] == 0 || arr_tools[y + 9] == kingBlue && arr_tools[y + (9 * 2)] === empty){
                    arrSteps.push(y + (9 * 2))
                }
                    
                if (arr_tools[y + 7] == blue && arr_tools[y + (7 * 2)] == 0 || arr_tools[y + 7] == kingBlue && arr_tools[y + (7 * 2)] === empty){
                    arrSteps.push(y + (7 * 2))
                }
                    
            }
            if (realTimePlay === blue) {

                if (arr_tools[y - 9] == empty){
                    arrSteps.push(y - 9)
                } 
                if (arr_tools[y - 7] == empty){
                    arrSteps.push(y - 7)  
                } 
                if (arr_tools[y - 9] == red && arr_tools[y - (9 * 2)] == 0 || arr_tools[y - 9] == kingRed && arr_tools[y - (9 * 2)] === empty){
                    arrSteps.push(y - (9 * 2))
                }
                    
                if (arr_tools[y - 7] == red && arr_tools[y - (7 * 2)] == 0 || arr_tools[y - 7] == kingRed && arr_tools[y - (7 * 2)] === empty){
                    arrSteps.push(y - (7 * 2))
                }
                    
            }
            else if (realTimePlay === kingRed) {

                if (arr_tools[y - 9] == empty) {
                    arrSteps.push(y - 9)
                }
                if (arr_tools[y - 7] == empty) {
                    arrSteps.push(y - 7)
                }
                if (arr_tools[y - 9] == blue && arr_tools[y - (9 * 2)] == 0 || arr_tools[y - 9] == kingBlue && arr_tools[y - (9 * 2)] === empty){
                    arrSteps.push(y - (9 * 2))

                }
                if (arr_tools[y - 7] == blue && arr_tools[y - (7 * 2)] == 0 || arr_tools[y - 7] == kingBlue && arr_tools[y - (7 * 2)] === empty){
                    arrSteps.push(y - (7 * 2))
                }


                if (arr_tools[y + 9] == empty) {
                    arrSteps.push(y + 9)
                }
                if (arr_tools[y + 7] == empty) {
                    arrSteps.push(y + 7)
                }
                if (arr_tools[y + 9] == blue && arr_tools[y + (9 * 2)] == 0 || arr_tools[y + 9] == kingBlue && arr_tools[y + (9 * 2)] === empty){
                    arrSteps.push(y + (9 * 2))

                }
                if (arr_tools[y + 7] == blue && arr_tools[y + (7 * 2)] == 0 || arr_tools[y + 7] == kingBlue && arr_tools[y + (7 * 2)] === empty){
                    arrSteps.push(y + (7 * 2))
                }
                    
            }
            else if (realTimePlay === kingBlue) {

                if (arr_tools[y - 9] == empty) {
                    arrSteps.push(y - 9)
                }
                if (arr_tools[y - 7] == empty) {
                    arrSteps.push(y - 7)
                }
                if (arr_tools[y - 9] == red && arr_tools[y - (9 * 2)] == 0 || arr_tools[y - 9] == kingRed && arr_tools[y - (9 * 2)] === empty){
                    arrSteps.push(y - (9 * 2))

                }
                if (arr_tools[y - 7] == red && arr_tools[y - (7 * 2)] == 0 || arr_tools[y - 7] == kingRed && arr_tools[y - (7 * 2)] === empty){
                    arrSteps.push(y - (7 * 2))
                }


                if (arr_tools[y + 9] == empty) {
                    arrSteps.push(y + 9)
                }
                if (arr_tools[y + 7] == empty) {
                    arrSteps.push(y + 7)
                }
                if (arr_tools[y + 9] == red && arr_tools[y + (9 * 2)] == 0 || arr_tools[y + 9] == kingRed && arr_tools[y + (9 * 2)] === empty){
                    arrSteps.push(y + (9 * 2))

                }
                if (arr_tools[y + 7] == red && arr_tools[y + (7 * 2)] == 0 || arr_tools[y + 7] == kingRed && arr_tools[y + (7 * 2)] === empty){
                    arrSteps.push(y + (7 * 2))
                }
                
            }

            // for (let i = 0; i < arrSteps.length; i++) {
            //     for (let j = 0; j < arrBlock.length; j++) {
            //         arrSteps = arrSteps.filter(()=> arrSteps[i] != arrBlock[j] )  
            //     }
                
            // }
        
            
                arrSteps = arrSteps.filter(x => ! arrBlock.includes(x) )

        }


        if (arr_clicks.length === 2 && arr_location_tools.length === 2) {
            // #1 move version one

            if (
                arr_location_tools[1] - arr_location_tools[0] === 9 ||
                arr_location_tools[0] - arr_location_tools[1] === 9

            ) {
                if (realTimePlay == red && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = red
                    count++;

                }
                else if (realTimePlay == blue && arr_location_tools[0] > arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = blue
                    count++;

                }
                else if (realTimePlay == kingRed && arr_location_tools[0] > arr_location_tools[1] ||
                    realTimePlay == kingRed && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = realTimePlay
                    count++;
                }
                else if (realTimePlay == kingBlue && arr_location_tools[0] > arr_location_tools[1] ||
                    realTimePlay == kingBlue && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = realTimePlay
                    count++;
                }
            }
            // #2 move version 2
            else if (
                arr_location_tools[1] - arr_location_tools[0] === 7 ||
                arr_location_tools[0] - arr_location_tools[1] === 7

            ) {
                if (realTimePlay == red && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = red
                    count++;

                }
                else if (realTimePlay == blue && arr_location_tools[0] > arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = empty
                    arr_tools[arr_location_tools[1]] = blue
                    count++;

                }
                else if (realTimePlay == kingRed && arr_location_tools[0] > arr_location_tools[1] ||
                    realTimePlay == kingRed && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = realTimePlay
                    count++;
                }
                else if (realTimePlay == kingBlue && arr_location_tools[0] > arr_location_tools[1] ||
                    realTimePlay == kingBlue && arr_location_tools[0] < arr_location_tools[1]) {
                    arr_tools[arr_location_tools[0]] = 0
                    arr_tools[arr_location_tools[1]] = realTimePlay
                    count++;
                }
            }
            //  #3 red atteck or king red atteck version 1
            else if (
                arr_location_tools[1] - arr_location_tools[0] === 18 &&
                realTimePlay === red && arr_tools[y - 9] === blue ||
                realTimePlay === red && arr_tools[y - 9] === kingBlue

            ) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay

            }
            // #4 red atteck or king red atteck version 2
            else if (
                arr_location_tools[1] - arr_location_tools[0] === 14 &&
                realTimePlay === red && arr_tools[y - 7] === blue ||
                realTimePlay === red && arr_tools[y - 7] === kingBlue
            ) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            // #5 blue atteck or king red atteck version 1

            else if (
                arr_location_tools[0] - arr_location_tools[1] === 18 &&
                realTimePlay === blue && arr_tools[y + 9] === red ||
                realTimePlay === blue && arr_tools[y + 9] === kingRed

            ) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay

            }
            // #6 blue atteck or king red atteck version 1
            else if (

                arr_location_tools[0] - arr_location_tools[1] === 14 &&
                realTimePlay === blue && arr_tools[y + 7] === red ||
                realTimePlay === blue && arr_tools[y + 7] === kingRed

            ) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay

            }

            // kings --> 
            // #7 king move  
            else if (arr_location_tools[1] - arr_location_tools[0] === 18 &&
                realTimePlay === kingRed && arr_tools[y - 9] === blue ||
                realTimePlay === kingRed && arr_tools[y - 9] === kingBlue) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[0] - arr_location_tools[1] === 18 &&
                realTimePlay === kingRed && arr_tools[y + 9] === blue ||
                realTimePlay === kingRed && arr_tools[y + 9] === kingBlue) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[1] - arr_location_tools[0] === 14 &&
                realTimePlay === kingRed && arr_tools[y - 7] === blue ||
                realTimePlay === kingRed && arr_tools[y - 7] === kingBlue) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[0] - arr_location_tools[1] === 14 &&
                realTimePlay === kingRed && arr_tools[y + 7] === blue ||
                realTimePlay === kingRed && arr_tools[y + 7] === kingBlue) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            // ;;;
            else if (arr_location_tools[1] - arr_location_tools[0] === 18 &&
                realTimePlay === kingBlue && arr_tools[y - 9] === red ||
                realTimePlay === kingBlue && arr_tools[y - 9] === kingRed) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[0] - arr_location_tools[1] === 18 &&
                realTimePlay === kingBlue && arr_tools[y + 9] === red ||
                realTimePlay === kingBlue && arr_tools[y + 9] === kingRed) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 9] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[1] - arr_location_tools[0] === 14 &&
                realTimePlay === kingBlue && arr_tools[y - 7] === red ||
                realTimePlay === kingBlue && arr_tools[y - 7] === kingRed) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y - 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else if (arr_location_tools[0] - arr_location_tools[1] === 14 &&
                realTimePlay === kingBlue && arr_tools[y + 7] === red ||
                realTimePlay === kingBlue && arr_tools[y + 7] === kingRed) {
                count++
                arr_tools[arr_location_tools[0]] = empty
                arr_tools[y + 7] = empty
                arr_tools[arr_location_tools[1]] = realTimePlay
            }
            else document.querySelector('#id_h1a').innerHTML = "not allowed"

            if (count % 2 === 0) {
                document.querySelector("#id_h1_turn").innerHTML = "turn red"
                document.querySelector("#id_h1_turn").style.color = "red"
            } else {
                document.querySelector("#id_h1_turn").innerHTML = "turn blue"
                document.querySelector("#id_h1_turn").style.color = "blue"
            }
            arrSteps = []
            marker = null
            arr_clicks = []
            arr_location_tools = []
        }




        if (arr_tools[57] == 1) arr_tools[57] = kingRed;
        else if (arr_tools[59] == 1) arr_tools[59] = kingRed;
        else if (arr_tools[61] == 1) arr_tools[61] = kingRed;
        else if (arr_tools[63] == 1) arr_tools[63] = kingRed;
        else if (arr_tools[0] == 2) arr_tools[0] = kingBlue;
        else if (arr_tools[2] == 2) arr_tools[2] = kingBlue;
        else if (arr_tools[4] == 2) arr_tools[4] = kingBlue;
        else if (arr_tools[6] == 2) arr_tools[6] = kingBlue;


        let red1 = arr_tools.filter(x => x == 1 || x == 10)
        let blue1 = arr_tools.filter(x => x == 2 || x == 20)
        setBlueCount(blue1.length);
        setRedCount(red1.length);

        startBored();

        if (x === 0) {
            if (!arr_tools.includes(red) && !arr_tools.includes(kingRed))
                document.querySelector('#id_h1').innerHTML = "blue is win!"
            else if (!arr_tools.includes(blue) && !arr_tools.includes(kingBlue))
                document.querySelector('#id_h1').innerHTML = "red is win!"
        }


    }
    useEffect(() => { startBored() }, [operate || !operate])

    const startBored = () => {
        setBord(<div className='mx-auto m-4' id='checkers' >
            {
                ar.map((x, i) => <span
                    key={i}
                    style={{ backgroundColor: arrSteps.includes(i) &&  'yellow' }}
                    onClick={() => test(arr_tools[i], x)}
                    className={arColor[i] == 1 ? white : black}>
                    {
                        arr_tools[i] == 1 ?
                            <button
                                disabled={count % 2 !== 0}
                                className={cssred}
                                style={{
                                    width: 30, height: 30,
                                }} >
                            </button> : arr_tools[i] == 2 ?
                                <button
                                    disabled={count % 2 === 0}
                                    className={cssblue}
                                    style={{ width: 30, height: 30 }} >
                                </button> : arr_tools[i] == 10 ? <button
                                    disabled={count % 2 !== 0}
                                    className={csskingRed}
                                    style={{ width: 30, height: 30 }} >
                                </button> : arr_tools[i] == 20 && <button
                                    disabled={count % 2 === 0}
                                    className={csskingBlue}
                                    style={{ width: 30, height: 30 }} >
                                </button>
                    }
                </span>
                )}
        </div>
        )
    }


    return (
        <div style={{ minHeight: '800px' }} >
            <h1 className='display-3' id='id_h1'></h1>
            <h1 id='id_h1_turn'>red start</h1>
            {bord}
            <h1 className='display-4' >blue: {blueCount} | red: {redCount}</h1>
            <h1 id='id_h1a'></h1>
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        </div>
    )
}

export default Checkers