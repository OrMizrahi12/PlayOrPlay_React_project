import React from 'react'
import { Howl } from 'howler';
import sound1 from './sounds/sound1.mp3'
import sound2 from './sounds/sound2.mp3'
import sound3 from './sounds/sound3.mp3'
import sound4 from './sounds/sound4.mp3'
import winSound from './sounds/winSound.mp3'
import lossSound from './sounds/gameOverSound.mp3'
import { random, shuffle } from 'lodash';
import '../game.css'
import { useEffect } from 'react';
import { useState } from 'react';
import './memorySound.css'
import clickToPlay from '../clickToPlay.mp3'
import { useNavigate } from 'react-router-dom';


let arr_sounds_arsenal = [
    { sound: sound1, id: 0 },
    { sound: sound2, id: 1 },
    { sound: sound3, id: 2 },
    { sound: sound4, id: 3 },
    { sound: winSound, id: 4 },
    { sound: lossSound, id: 5 },
    { sound: clickToPlay, id: 6 }
]
let arr_sounds_play = [{sound: "", id:0}]


const MemorySound = () => {

    const navigate = useNavigate()
    let timer;
    let ip1 = 0
    let ip2 = 0
    let [newGame, setNewGame] = useState(false)
    let [canClick, setCanCLick] = useState(false)
    let [canPlay, setCanPlay] = useState(true)
    let [ok, setOk] = useState(false)
    let [resultMsg, setResultMsg] = useState({ theClass: "", msg: "" })
    let [level, setLevel] = useState(1)
    let [record, setRecord] = useState(0)
    let arr_shuffle =[0,1,2,3]

    const startGame = () => {
        
        setResultMsg({ theClass: "", msg: "" })
        if (ok) {
            setCanPlay(false)
            playSound(6)
        }
        setCanCLick(false)

        
        if (newGame && ok){
            let temp_arr_shuffle =shuffle(arr_shuffle)
            for (let i = 0; i < 3; i++) {
                arr_sounds_play.push(arr_sounds_arsenal[temp_arr_shuffle[i]])
            }
            setNewGame(false)
        }
        if(!ok)setNewGame(true)
        else { 
            arr_sounds_play.push(arr_sounds_arsenal[random(0, 3)])
        }

        if(ok) timer = setInterval(playSoundsInterval, 700)
        setOk(true)
    }

    const playSoundsInterval = () => {

        if (ip2 === 1) {
            if (arr_sounds_play[ip1].id === 0)
                document.querySelector(`#id_btn${0}`).style.backgroundColor = 'red';
            else if (arr_sounds_play[ip1].id === 1)
                document.querySelector(`#id_btn${1}`).style.backgroundColor = 'blue';
            else if (arr_sounds_play[ip1].id === 2)
                document.querySelector(`#id_btn${2}`).style.backgroundColor = 'orange';
            else if (arr_sounds_play[ip1].id === 3)
                document.querySelector(`#id_btn${3}`).style.backgroundColor = 'yellow';

            playSound(arr_sounds_play[ip1].id)
        }
        else if (ip2 === 2) {
            document.querySelector(`#id_btn${arr_sounds_play[ip1].id}`).style.backgroundColor = '';
            ip2 = 0
            ip1++
        }

        ip2++


        if (ip1 === arr_sounds_play.length - 1) {
            for (let i = 0; i < arr_sounds_arsenal.length; i++) {
                document.querySelector(`#id_btn${i}`).style.backgroundColor = '';
            }
            ip1 = 0;

            // for the first loading of the component.
            if (ok) setCanCLick(true)
            setOk(true)

            clearInterval(timer)
        }
    }

    let local = 0
    let arrInputResult = []
    const checkResult = (x) => {

        arrInputResult.push(x)
        if (arrInputResult[local].id === arr_sounds_play[local].id) {
            if (arrInputResult.length === arr_sounds_play.length - 1) {
                setResultMsg({ theClass: "memorySound-txt-win", msg: "win!" })
                setCanCLick(false)
                setCanPlay(true)
                playSound(4)
                setLevel(level+1)
                if(level > record) setRecord(level)
                
                local = 0
                arrInputResult = []
            }
        } else {
            setResultMsg({ theClass: "memorySound-txt-loss", msg: "loss" })
            arr_sounds_play = []
            setLevel(1)
            setNewGame(true)
            setCanCLick(false)
            setCanPlay(true)
            playSound(5)
            local = 0
            arrInputResult = []
        }

        local++
    }
    const onMouseDown_event = (x) => {
        if (canClick) {
            if (x.id === 0)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'red';
            else if (x.id === 1)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'blue';
            else if (x.id === 2)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'orange';
            else if (x.id === 3)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'yellow';

            playSound(x.id)
        }

    }
    const onMouseUp_event = (x) => {
        document.querySelector(`#id_btn${x.id}`).style.backgroundColor = '';
    }

    const onPointerDown_event = (x) => {
        if (canClick) {
            if (x.id === 0)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'red';
            else if (x.id === 1)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'blue';
            else if (x.id === 2)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'orange';
            else if (x.id === 3)
                document.querySelector(`#id_btn${x.id}`).style.backgroundColor = 'yellow';

            playSound(x.id)
        }
    }

    const onPointerUp_event = (x) => {
        document.querySelector(`#id_btn${x.id}`).style.backgroundColor = '';
    }

    const playSound = (x) => {

        let sfx = {
            push: new Howl({
                src: [
                    arr_sounds_arsenal[x].sound
                ],
                html5: true,
                volume: 1,
            })
        }

        sfx.push.play()
    }

    useEffect(() => {
        arr_sounds_play =[]
        startGame()
    }, [])



    return (
        <div>

            {
                arr_sounds_arsenal.map(x => <> <button
                    key={x.id}
                    className="sountMemory-btnChoose"
                    hidden={x.id >= 4}
                    disabled={!canClick}
                    onClick={() => checkResult(x)}
                    onMouseDown={() => onMouseDown_event(x)}
                    onMouseUp={() => onMouseUp_event(x)}
                    onPointerDown={() => onPointerDown_event(x)}
                    onPointerUp={() => onPointerUp_event(x)}
                    id={`id_btn${x.id}`}>
                </button>
                    {x.id === 1 && <><br /> <button 
                    disabled={!canPlay} onClick={startGame}
                    className="Pattern">▶</button></>}
                </>
                )
            }
            <br />
            <h1 className={resultMsg.theClass}>{resultMsg.msg}</h1>
            <br />
            <h2 className='level_record_msg'>level: {level} | record: {record}</h2>
        <br /> 
        <button onClick={() => navigate(-1)} className='btn btn-dark'>{"<<<"}</button>

        </div>
    )
}

export default MemorySound