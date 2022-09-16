import { arr_color } from './color_arr'
import { setWith, shuffle } from 'lodash'
import { useState } from 'react'
import '../game.css'
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import flipCard from './memoryCardsSounds/flipCard.mp3'
import correctCards from './memoryCardsSounds/correctCards.mp3'
import winSound from './memoryCardsSounds/win.mp3'
import clickToPlay from '../clickToPlay.mp3'


const MemoryCards = () => {
 
  let timer;
  let col;
  let arrInput = [];
  const [screenGame, setScreenGame] = useState(false)
  const navigate = useNavigate()
  const [sum, setSum] = useState(0)
  const [score, setScore] = useState(0)
  const [mistake, setMistake] = useState(0)
  const [arr, setArr] = useState([]);
  const [win, setWin] = useState(false)

  const shuffleColor = () => {
    playSound(clickToPlay)
    setScreenGame(true)
    setWin(false)
    setMistake(0)
    setScore(0)
    setSum(sum + 1)
    clearInterval(timer)
    setArr(shuffle(arr_color))
    for (let i = 0; i < arr.length; i++) {
      document.querySelector(`#id_div${i}`).style.backgroundColor = 'black'
    }
  }


  const cheakResult = (color, index) => {
    playSound(flipCard)
    arrInput.push({ color: color, index: index })
    document.querySelector(`#id_div${index}`).style.backgroundColor = color


    if (arrInput.length === 2) {
      col = arrInput
      if (arrInput[0].color !== arrInput[1].color || arrInput[0].index === arrInput[1].index) {
        if (arrInput[0].index !== arrInput[1].index) {
          setMistake(mistake + 1)
        }
        clearInterval(timer)
        timer = setInterval(showColor, 750)
        arrInput = []
      }
      else {
        playSound(correctCards)
        setScore(score + 1)
        arrInput = []
        if (score === 7) {
          playSound(winSound)
          setWin(true)

        }
      }
    }
  }
  let count = 0
  const showColor = () => {
    count++
    console.log(col)
    for (let i = 0; i < col.length; i++) {
      document.querySelector(`#id_div${col[i].index}`).style.backgroundColor = col[i].color
    }
    if (count == 1) {
      for (let i = 0; i < col.length; i++) {
        document.querySelector(`#id_div${col[i].index}`).style.backgroundColor = 'black'
      }
      count = 0
      clearInterval(timer)
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
    <div className="body rounded col-md-6 container">
      <button
        className='btnPlay'
        onClick={shuffleColor}>
        {sum === 0 ? "play" : "play again"}
      </button>
      {
        win === true && <h1 className='memoryCard-txt-win' >win!</h1>
      }
      <hr />
      <div className='col-md-6 mx-auto' >
        <div className='row'>
          {
            arr.map((x, index) => <div
              key={index}
              id={`id_div${index}`}
              className='m-3 rounded memoryCard-cards '
              onClick={() => cheakResult(x, index)}
              style={{ backgroundColor: 'black', width: 60, height: 60 }}>
            </div>)
          }
        </div>
      </div>

      {
        screenGame ? <div>
          <h2 className='memoryCard-txt-Score'>Score: {score}</h2>
          <h2 className='memoryCard-txt-Mistake'>Mistake: {mistake}</h2>
        </div> : <div>
        <h1 className='memoryCard-txt-title'>memory cards</h1>
          <p>Try to remember the tabs in pairs {">>>"}</p>
        </div> 
      }


      <button className='btn btn-dark m-3' onClick={() => navigate(-1)}>{"<<<"}</button>
    </div >

  )
}

export default MemoryCards