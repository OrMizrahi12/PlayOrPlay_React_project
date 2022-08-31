import React, { useEffect, useState } from 'react'
import '../checkers/checkers.css'
import { arColor, ar } from './checkers_tools'

const cssKing1 = 'rounded-circle border border-5 border-warning bg-danger mx-auto m-4'
const cssPlayer1 = 'rounded-circle border bg-danger mx-auto m-4'
const cssKing2 = 'rounded-circle border border-5 border-warning bg-primary mx-auto m-4'
const cssPlayer2 = 'rounded-circle border bg-primary mx-auto m-4 '
const player1 = 1;
const player2 = 2;
const king1 = 10;
const king2 = 20;
const empty = 0
const white = "tile white-tile border"
const black = "tile black-tile border"

const Checkers = () => {

    const [bord, setBord] = useState()
    const [operate, setOperate] = useState(false)
    const ar1 = [
        player1, empty, player1, empty, player1, empty, player1, empty, empty, player1,
        empty, player1, empty, player1, empty, player1, player1, empty, player1, empty,
        player1, empty, player1, empty, empty, empty, empty, empty, empty, empty, empty,
        empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, player2,
        empty, player2, empty, player2, empty, player2, player2, empty,
        player2, empty, player2, empty, player2, empty, empty, player2, empty,
        player2, empty, player2, empty, player2
    ]
    let temp;
    let ar_location_y = []
    let ar_x = []
    let canMove;
    let canAttackS1;
    let canAttackS2;

    const test = (x, y) => {

        setOperate(!operate)

        ar_location_y.push(y)
        ar_location_y = ar_location_y.filter(x => x !== undefined)

        if (ar_location_y.length === 2) {
            if (
                ar_location_y[1] - ar_location_y[0] === 9 ||
                ar_location_y[0] - ar_location_y[1] === 9 ||
                ar_location_y[1] - ar_location_y[0] === 7 ||
                ar_location_y[0] - ar_location_y[1] === 7
            ) canMove = true
            else canMove = false;
            if (
                ar_location_y[1] - ar_location_y[0] === 18 ||
                ar_location_y[0] - ar_location_y[1] === 18
            ) canAttackS1 = true
            else canAttackS1 = false
            if (
                ar_location_y[1] - ar_location_y[0] === 14 ||
                ar_location_y[0] - ar_location_y[1] === 14
            ) canAttackS2 = true
            else canAttackS2 = false
        }

        ar_x.push(x)
        ar_x = ar_x.filter(x => x !== undefined)

        if (x === 1 || x === 2 || x === 10 || x === 20) {
            ar1[y] = 0
            temp = x
        }
        if (x === 0 && canMove) {
            ar1[y] = temp
            ar_location_y = []
        }
        else if (x === 0 && canAttackS1 && !canMove && !canAttackS2) {
            ar1[y] = temp
            if (ar_location_y[0] < ar_location_y[1]) ar1[y - 9] = 0;
            else ar1[y + 9] = 0;
            ar_location_y = []
        }
        else if (x === 0 && canAttackS2 && !canMove && !canAttackS1) {
            ar1[y] = temp
            if (ar_location_y[0] < ar_location_y[1]) ar1[y - 7] = 0;
            else ar1[y + 7] = 0;
            ar_location_y = []
        }
        else if (x === 0 && !canMove && !canAttackS1 && !canAttackS2) {
            ar1[ar_location_y[0]] = temp
            ar_location_y = []
        }

        if (ar1[57] == 1) ar1[57] = king1;
        else if (ar1[59] == 1) ar1[59] = king1;
        else if (ar1[61] == 1) ar1[61] = king1;
        else if (ar1[63] == 1) ar1[63] = king1;
        else if (ar1[0] == 2) ar1[0] = king2;
        else if (ar1[2] == 2) ar1[2] = king2;
        else if (ar1[4] == 2) ar1[4] = king2;
        else if (ar1[6] == 2) ar1[6] = king2;

        startBored();
       
        if (!ar1.includes(player1) && !ar1.includes(king1))
            document.querySelector('#id_h1').innerHTML = "blue is win!"
        else if (!ar1.includes(player2) && !ar1.includes(king1))
            document.querySelector('#id_h1').innerHTML = "red is win!"
    }
    useEffect(() => { startBored() }, [operate || !operate])

    const startBored = () => {
        setBord(<div className='mx-auto m-4' id='checkers' >
            {
                ar.map((x, i) => <span
                    onClick={() => test(ar1[i], x)}
                    className={arColor[i] == 1 ? white : black}>
                    {
                        ar1[i] == 1 ?
                            <section
                                className={cssPlayer1}
                                style={{ width: 50, height: 50 }} >
                            </section> : ar1[i] == 2 ?
                                <section
                                    className={cssPlayer2}
                                    style={{ width: 50, height: 50 }} >
                                </section> : ar1[i] == 10 ? <section
                                    className={cssKing1}
                                    style={{ width: 50, height: 50 }} >
                                </section> : ar1[i] == 20 && <section
                                    className={cssKing2}
                                    style={{ width: 50, height: 50 }} >
                                </section>
                    }
                </span>
                )}
        </div>
        )
    }


    return (
        <div>
            <h1 id='id_h1'></h1>
            {bord}
        </div>
    )
}

export default Checkers