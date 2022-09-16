import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import axios from 'axios'
import Records from '../records'
import { useNavigate } from 'react-router-dom'
import '../game.css'
import './findTheWord.css'
import { Howl } from 'howler'
import goodResult from './findTheWordSound/goodResult.mp3'
import clickSound from './findTheWordSound/clickSound.mp3'
import loss from './findTheWordSound/loss.mp3'
import win from './findTheWordSound/win.mp3'


const FindTheWord = () => {

    const heru = `<<<`


    let alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'
    ]

    const [showRecords, setShoeRecords] = useState(false)
    const siteName = "findTheWord"
    const navigate = useNavigate()
    const name = localStorage.getItem("name")
    const [wordList, setWordList] = useState([])
    const [record, setRecord] = useState(0)
    const [showPlay, setShowPlay] = useState(true)
    const [wordLimit, setWordLimit] = useState(20)
    const [definitionList, setDefinitionList] = useState([])
    const [wins, setWin] = useState(0)
    const [level, setLevel] = useState(1)
    const [notes, setNotes] = useState(20)
    const [arRandom, setAtRandom] = useState([])
    const [result, setResult] = useState({ word: "", definition: "" })
    const [word, setWord] = useState([])
    const [showWord, setShowWord] = useState(false)
    const play = () => {
        playSound(clickSound)
        setAtRandom(shuffle(alphabet))
        setShowPlay(false)
    }

    const buildWord = (x) => setWord([...word, x])

    const restart = () => {
        playSound(clickSound)
        document.querySelector("#id_h1").innerHTML = "";
        document.querySelector("#id_p1").innerHTML = "";
        setWord([]);
        setResult({ word: "", definition: "" })
        setWordList([])
        setShowWord(false)
        setNotes(20)
        setWordLimit(20)
        setShowPlay(true)
        setDefinitionList([])
        setLevel(1)
        setWin(0)
    }

    useEffect(() => {
        getRecord();
    }, [])
    const getRecord = async () => {
        let { data } = await axios.get(`https://moreservgame.herokuapp.com/findTheWord/${name}`)
        setRecord(data.record)
    }

    const sendWord = async () => {
        playSound(clickSound)
        setWord([]);
        let complatWord = word.join("")
        try {
            let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${complatWord}`)
            if (response.data[0].word) {
                setResult({
                    word: response.data[0].word,
                    definition: response.data[0].meanings[0].definitions[0].definition
                })
                if (!wordList.includes(response.data[0].word)) {

                    setWordList([...wordList, response.data[0].word,])
                    setDefinitionList([...definitionList, response.data[0].meanings[0].definitions[0].definition])
                    setWin(wins + 1)

                    document.querySelector("#id_p1").innerHTML = `correct! "${response.data[0].word}" is added to your list`
                    document.querySelector("#id_p1").style.color = 'blue';
                    playSound(goodResult)
                    if (wins == wordLimit - 1 && level === 1) {
                        setWordLimit(wordLimit - 5)
                        setLevel(level + 1)
                        setNotes(15)
                        setWin(0)
                        document.querySelector("#id_h1").innerHTML = "W-I-N";
                        document.querySelector("#id_h1").style.color = "green";
                        playSound(win)
                    }
                    else if (wins === wordLimit - 1 && level >= 2 && level <= 3) {
                        setWordLimit(wordLimit - 5)
                        setLevel(level + 1)
                        document.querySelector("#id_h1").innerHTML = "W-I-N";
                        document.querySelector("#id_h1").style.color = "green";
                        playSound(win)
                        setNotes(10)
                        setWin(0)
                    }
                    else if (wins === wordLimit - 1 && level >= 4) {
                        setWordLimit(wordLimit - 5)
                        setLevel(level + 1)
                        document.querySelector("#id_h1").innerHTML = "W-I-N";
                        document.querySelector("#id_h1").style.color = "green";
                        playSound(win)
                        setNotes(10)
                        setWin(0)
                    }
                    else {
                        if (wins === 10 && level >= 5) {
                            setLevel(level + 1)
                            document.querySelector("#id_h1").innerHTML = "W-I-N";
                            document.querySelector("#id_h1").style.color = "green";
                            playSound(win)

                            setNotes(10)
                            setWin(0)
                        }
                    }
                    if (level > record) {
                        (async () => {
                            let { data } = await axios.put(`https://moreservgame.herokuapp.com/findTheWord/${name}`, {
                                username: name,
                                record: record + 1
                            })
                            setRecord(data.record)
                        })();
                    }

                }

            }
        } catch (err) {
            document.querySelector("#id_p1").innerHTML = `uncorrect your word is not exsist...`
            document.querySelector("#id_p1").style.color = 'red';
            setResult({ word: "", definition: "" })
            playSound(loss)

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
                showPlay && <button onClick={play} className="btnPlay" >play</button>
            }
            {
                !showPlay && <button onClick={restart} className="btnReset" >reset</button>
            }

            <h4>level: {level} | word:{wins}/{wordLimit}</h4>
            <h1 id='id_h1'></h1>
            <br />
            {
                arRandom.map((x, i) => {
                    if (i < notes) return <button
                        className=' m-1 note shadow col-md-2'
                        key={i}
                        style={{ fontSize: 40 }}
                        onClick={() =>{
                            buildWord(x)
                            playSound(clickSound)
                        } }>
                        {x}
                    </button>
                })
            }
            <br />
            <strong className='bg-dark display-6' id='id_p1'></strong>

            {
                !showPlay && <div className="input-group m-3 w-50 mx-auto">
                    <div className="input-group-prepend">
                        <button onClick={() => setWord([])} className="btn btn-warning p-3">❌</button>
                    </div>
                    <input value={word.join("")} disabled={true} type="text" className="form-control" style={{ fontSize: 20 }} />
                </div>
            }
            {
                !showPlay && <div>
                    <button className='btnCheck' onClick={sendWord} >cheack</button>
                    <button className='btnList' onClick={() => {
                       setShowWord(!showWord)
                       playSound(clickSound)
                    }}>show your wordList ⬇️</button>

                </div>
            }

            {
                showWord && wordList.map((x, i) => <p key={i}><strong>{x}</strong> - "{definitionList[i]}" <hr /></p>)
            }
            <h1 className='display-4'>Level: {level} | Rcord: {record}</h1>
            <button className='btnRcords' onClick={() => setShoeRecords(!showRecords)}>records</button>
            {
                showRecords && <Records gameName={siteName} />
            }
            <br /><br />
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        </div>
    )
}

export default FindTheWord