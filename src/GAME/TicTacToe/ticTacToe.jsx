import { random } from 'lodash';
import { useEffect } from 'react'
import { useState } from 'react'
import '../TicTacToe/ticTacToe.css'
import '../game.css'
import { useNavigate } from 'react-router-dom';
import winXO from './TicTacToeSounds/winXO.mp3'
import lossXO from './TicTacToeSounds/lossXO.mp3'
import clickSoundXO from './TicTacToeSounds/clickSoundXO.mp3'
import { Howl } from 'howler';
import clickToPlay from '../clickToPlay.mp3'


let canPlay = true;
let twoPlayers = false
let i = 0;

const TicTacToe = () => {

    const heru = "<<<"
    const navigate = useNavigate()
    const [bored, setBored] = useState()
    const [xWin, setXwin] = useState(0)
    const [oWin, setOwin] = useState(0)
    const [computerWin, setComputerWin] = useState(0)
    const empty = 0;
    const xPlayer = 1;
    const oPlayer = 2;
    let ok = true

    let arrBored = [
        { num: 0, player: empty },
        { num: 1, player: empty },
        { num: 2, player: empty },
        { num: 3, player: empty },
        { num: 4, player: empty },
        { num: 5, player: empty },
        { num: 6, player: empty },
        { num: 7, player: empty },
        { num: 8, player: empty }
    ]

    let possibleWin = [
        [{ num: 0, player: empty }, { num: 1, player: empty }, { num: 2, player: empty }],
        [{ num: 3, player: empty }, { num: 4, player: empty }, { num: 5, player: empty }],
        [{ num: 6, player: empty }, { num: 7, player: empty }, { num: 8, player: empty }],
        [{ num: 0, player: empty }, { num: 4, player: empty }, { num: 8, player: empty }],
        [{ num: 6, player: empty }, { num: 4, player: empty }, { num: 2, player: empty }],
        [{ num: 0, player: empty }, { num: 3, player: empty }, { num: 6, player: empty }],
        [{ num: 1, player: empty }, { num: 4, player: empty }, { num: 7, player: empty }],
        [{ num: 2, player: empty }, { num: 5, player: empty }, { num: 8, player: empty }],
    ]

    const reset = () => {
        arrBored = [
            { num: 0, player: empty },
            { num: 1, player: empty },
            { num: 2, player: empty },
            { num: 3, player: empty },
            { num: 4, player: empty },
            { num: 5, player: empty },
            { num: 6, player: empty },
            { num: 7, player: empty },
            { num: 8, player: empty }
        ]

        possibleWin = [
            [{ num: 0, player: empty }, { num: 1, player: empty }, { num: 2, player: empty }],
            [{ num: 3, player: empty }, { num: 4, player: empty }, { num: 5, player: empty }],
            [{ num: 6, player: empty }, { num: 7, player: empty }, { num: 8, player: empty }],
            [{ num: 0, player: empty }, { num: 4, player: empty }, { num: 8, player: empty }],
            [{ num: 6, player: empty }, { num: 4, player: empty }, { num: 2, player: empty }],
            [{ num: 0, player: empty }, { num: 3, player: empty }, { num: 6, player: empty }],
            [{ num: 1, player: empty }, { num: 4, player: empty }, { num: 7, player: empty }],
            [{ num: 2, player: empty }, { num: 5, player: empty }, { num: 8, player: empty }],
        ]
        canPlay = true
        i = 0;
        initalBored();
        document.querySelector("#id_h1").innerHTML = ""
    }





    const getAct = (player, num) => {


        if (player === empty && i % 2 === 0) {
            playSound(clickSoundXO)
            arrBored[num].player = xPlayer
            i++

            possibleWin.forEach(x => {
                let winCount = 0;

                x.forEach(y => {
                    if (y.num === num) y.player = xPlayer

                    if (y.player === xPlayer) {
                        winCount++
                        if (winCount === 3) {
                            canPlay = false
                            document.querySelector("#id_h1").innerHTML = "x WIN"
                            setXwin(xWin + 1)
                            playSound(winXO)
                        }

                    }

                })

            })


            let xCount;

            if (canPlay && !twoPlayers) {

                if (i === 1 && arrBored[4].player === empty) {
                    arrBored[4].player = oPlayer
                    i++
                    possibleWin.forEach(x => { x.forEach(y => { if (y.num === 4) y.player = oPlayer }) })
                }
                else if (i === 1 && arrBored[4].player === xPlayer) {
                    i++
                    let ok = true
                    while (ok) {
                        let rand = random(0, 8)
                        if (arrBored[rand].player === empty) {
                            arrBored[rand].player = oPlayer
                            possibleWin.forEach(x => { x.forEach(y => { if (y.num === rand) y.player = oPlayer }) })
                            ok = false
                        }

                    }
                }
                else if (i === 3 && arrBored[5].player === xPlayer && arrBored[7].player === xPlayer
                    && arrBored[8].player === empty) {
                    i++
                    arrBored[8].player = oPlayer
                    possibleWin.forEach(x => { x.forEach(y => { if (y.num === 8) y.player = oPlayer }) })

                }
                else if (i !== 1) {
                    i++

                    for (let i = 0; i < possibleWin.length; i++) {
                        xCount = 0
                        for (let j = 0; j < possibleWin[i].length; j++) {
                            if (possibleWin[i][j].player === oPlayer) {

                                xCount++;
                                if (xCount === 2) {
                                    possibleWin[i].forEach(x => {
                                        if (x.player === empty && ok) {
                                            ok = false
                                            arrBored[x.num].player = oPlayer
                                            console.log(arrBored[x.num])
                                            possibleWin.forEach(j => {
                                                let winCount = 0;
                                                j.forEach(y => {
                                                    if (y.num === x.num) {
                                                        y.player = oPlayer
                                                    }
                                                    if (y.player === oPlayer) {
                                                        winCount++
                                                        if (winCount === 3) {
                                                            canPlay = false
                                                            document.querySelector("#id_h1").innerHTML = "O WIN"
                                                            setComputerWin(computerWin + 1)
                                                            playSound(lossXO)


                                                        }

                                                    }
                                                })
                                            })
                                        }

                                    })


                                }


                            }

                        }


                    }
                    for (let i = 0; i < possibleWin.length; i++) {
                        xCount = 0
                        for (let j = 0; j < possibleWin[i].length; j++) {
                            if (possibleWin[i][j].player === xPlayer) {
                                xCount++;
                                if (xCount === 2) {
                                    possibleWin[i].forEach(x => {
                                        if (x.player === empty && ok) {
                                            ok = false
                                            arrBored[x.num].player = oPlayer
                                            console.log(arrBored[x.num])
                                            possibleWin.forEach(j => {
                                                let winCount = 0;
                                                j.forEach(y => {
                                                    if (y.num === x.num) {
                                                        y.player = oPlayer
                                                    }
                                                    if (y.player === oPlayer) {
                                                        winCount++
                                                        if (winCount === 3) {
                                                            canPlay = false
                                                            document.querySelector("#id_h1").innerHTML = "O WIN"
                                                            setComputerWin(computerWin + 1)
                                                            playSound(lossXO)

                                                        }

                                                    }
                                                })
                                            })
                                        }

                                    })


                                }


                            }

                        }


                    }



                    for (let i = 0; i < possibleWin.length; i++) {
                        xCount = 0
                        let eCount = 0;

                        possibleWin[i].forEach(x => {
                            if (x.player === oPlayer) xCount++
                            else if (x.player === empty) eCount++

                        })
                        if (xCount === 1 && eCount === 2) {
                            possibleWin[i].forEach(x => {
                                if (x.player === empty && ok) {
                                    ok = false
                                    arrBored[x.num].player = oPlayer
                                    possibleWin.forEach(j => {
                                        let winCount = 0;
                                        j.forEach(y => {
                                            if (y.num === x.num) {
                                                y.player = oPlayer
                                            }
                                            if (y.player === oPlayer) {
                                                winCount++
                                                if (winCount === 3)
                                                    canPlay = true
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    }

                    for (let i = 0; i < possibleWin.length; i++) {
                        xCount = 0
                        for (let j = 0; j < possibleWin[i].length; j++) {
                            if (possibleWin[i][j].player === xPlayer) {
                                xCount++;
                                if (xCount === 1) {
                                    possibleWin[i].forEach(x => {
                                        if (x.player === empty && ok) {
                                            ok = false
                                            arrBored[x.num].player = oPlayer
                                            possibleWin.forEach(j => {
                                                let winCount = 0;
                                                j.forEach(y => {
                                                    if (y.num === x.num) {
                                                        y.player = oPlayer
                                                    }
                                                    if (y.player === oPlayer) {
                                                        winCount++
                                                        if (winCount === 3)
                                                            canPlay = true
                                                    }


                                                })
                                            })
                                        }
                                    })

                                }
                            }

                        }


                    }
                }




            }


            ok = true

        }
        else if (twoPlayers === true && player === empty && i % 2 !== 0) {
            playSound(clickSoundXO)

            arrBored[num].player = oPlayer
            i++
            possibleWin.forEach(x => {
                let winCount = 0;

                x.forEach(y => {
                    if (y.num === num) y.player = oPlayer

                    if (y.player === oPlayer) {
                        winCount++
                        if (winCount === 3) {
                            canPlay = false
                            document.querySelector("#id_h1").innerHTML = "O WIN"
                            playSound(lossXO)

                            setOwin(oWin + 1)
                        }

                    }

                })

            })
        }


        if (arrBored.every(x => x.player === oPlayer || x.player === xPlayer)) {
            document.querySelector("#id_h1").innerHTML = ""
            canPlay = false
        }





        initalBored()
    }

    const initalBored = () => {

        setBored(<div className='mx-auto m-4' id='bored'>
            {
                arrBored.map(
                    (x, i) => <>
                        <button

                            disabled={!canPlay}
                            style={{ width: 100, height: 100 }}
                            onClick={() => getAct(arrBored[i].player, arrBored[i].num)}
                            key={x.num}
                            className='mx-auto bg-dark border'>
                            {
                                arrBored[i].player === xPlayer ? <h1 className='display-1  text-warning'>X</h1> :
                                    arrBored[i].player === oPlayer ? <h1 className='display-1 text-danger'>O</h1> : ""
                            }
                        </button>
                    </>
                )
            }
        </div>
        )
    }



    useEffect(() => {
        initalBored()
    }, [])

    
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
            <h1 className='display-4'>Tic Tac Toe</h1>
            {bored}
            <h1 className='display-3' id='id_h1'></h1>
            {
                !canPlay && <button onClick={() => {
                    reset()
                    canPlay = true
                    playSound(clickToPlay)
                }} className='btnPlay'>more game</button>
            }
            <br />
            <br />
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-danger">
                    <input type="radio" name="options" id="option1" autocomplete="off" onClick={() => {
                        twoPlayers = true
                        setComputerWin(0)
                        setXwin(0)
                    }} />
                    two player
                </label>
                <label className="btn btn-warning">
                    <input type="radio" name="options" id="option2" autocomplete="off" onClick={() => {
                        twoPlayers = false
                        setXwin(0)
                        setOwin(0)
                    }} />
                    one player
                </label>

            </div>
            {
                !twoPlayers ? <h1 className='XO_msg'>you: {xWin} | computer: {computerWin}</h1> :
                    <h1 className='XO_msg'>X: {xWin} | O: {oWin}</h1>
            }
            <br />
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>

        </div>
    )
}

export default TicTacToe