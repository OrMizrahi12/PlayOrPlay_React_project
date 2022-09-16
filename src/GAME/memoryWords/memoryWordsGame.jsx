import { useState } from "react"
import { arr } from "./words"
import { shuffle } from "lodash"
import { useNavigate } from 'react-router-dom'
import '../game.css'
import { Howl } from "howler"
import goodResult from './whatTheWordSound/goodResult.mp3'
import clickSound from './whatTheWordSound/clickSound.mp3'
import loss from './whatTheWordSound/loss.mp3'
import winSound from './whatTheWordSound/win.mp3'


const MemoryWordsGame = () => {
  const navigate = useNavigate()

  let lengthAr = arr.length

  const [result, setResult] = useState("")
  const [inputResult, setInputResult] = useState([])
  const [word, setWord] = useState()
  const [inputWord, setInputWord] = useState()
  const [win, setWin] = useState(null)
  const [changeWord, setChangeWord] = useState(5)
  const [canPlay, setCanPlay] = useState(true)
  const [level, setLevel] = useState(1)
  const [losses, setLosses] = useState(0)
  const [canCheck, setCanCheck] = useState(false)

  const outputWord = () => {
    playSound(clickSound)
    setCanCheck(true)
    setCanPlay(false)
    let run = Math.floor(Math.random() * lengthAr)
    setWord(arr[run])
    setInputResult(shuffle([...arr[run]]))
    setWin(null)
  }

  const checkResult = () => {
    setCanCheck(false)
    setCanPlay(true)
    setInputWord(result)
    


    if (result.trim() === word) {
      setWin(true)
      setLevel(level + 1)
      playSound(winSound)

    }
    else {
      playSound(loss)
      setWin(false)
      setLosses(losses + 1)
      if (level > 1) {
        setLevel(level - 1)
      }
    }
  }

  const reset = () => {
    playSound(clickSound)
    setChangeWord(5)
    setCanPlay(true)
    setWin(null)
    setLevel(1)
    setLosses(0)
    setInputResult([])
  }

  const switchWord = () => {
    outputWord()
    setChangeWord(changeWord - 1)

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
    <div className=" body rounded col-md-6 col-lg-12 mx-auto container ">
      <h1 className='whatTheWord-title'>what the word ?</h1>
      <br />
      <hr />
      <div className="col-md-6 mx-auto">
        <h6 className="" >Word replacement: {changeWord}</h6>
        <h6 className="" >level: {level}</h6>
        <h6 className="" >losses: {losses}</h6>
      </div>
      <hr />
      <h1
        className="whatTheWord-word">
        <strong
          style={{ backgroundColor: 'balck' }}>
          {inputResult.map(x => x + " ")}
        </strong>
      </h1>
      {

        win === true && <div className="col-md-4 mx-auto">
          <h6
            className="display-5 mx-auto p-2 bg-light rounded"
          ><span className="text-success">✅{inputWord}={word}✅</span>
          </h6>
        </div>

      }

      {
        win === false && <div className="col-md-4 mx-auto">
          <h3
            className="display-5  mx-auto p-2 bg-light rounded"
          ><span className="text-danger">❌{inputWord}</span><span className="text-success" >---{word}✅</span></h3>
        </div>

      }
      <div className="col-md-6 mx-auto">
        <div className="col-md-6 mx-auto rounded m-4">
          <button
            disabled={!canPlay}
            onClick={outputWord}
            className="btnPlay">
            Play
          </button>
          <br />
          <button
            disabled={canCheck === false}
            onClick={checkResult}
            style={{ borderRadius: "20px", border: "solid black" }}
            className="btn btn-warning m-2">
            Check
          </button>

          <button
            disabled={changeWord === 0 || canPlay}
            style={{ borderRadius: "20px", border: "solid black" }}
            onClick={switchWord}
            className="btn btn-primary m-2">
            Switch
          </button>

          <button
            style={{ borderRadius: "20px", border: "solid black" }}
            onClick={reset}
            className="btn btn-secondary m-2">
            reset
          </button>
        </div>
        <br />
        <div className='col-md-4 mx-auto'>
          <input
            className="form-control border border-soild border-danger w-75 mx-auto mb-5"
            onChange={e => {
              setResult(e.target.value.toLowerCase())
              console.log(result)
            }}
            type={Text}
          />
        </div>


        <button className='btn btn-dark m-3' onClick={() => navigate(-1)}>{"<<<"}</button>
      </div>
    </div>
  )
}

export default MemoryWordsGame