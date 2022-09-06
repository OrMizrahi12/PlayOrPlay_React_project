import { random, set } from 'lodash';
import { useEffect, useState } from 'react';
import '../TicTacToe/ticTacToe.css'
import { resetBtn } from '../TicTacToe/ticTacToeTools'

const TicTacToe = () => {

  const [bored, setBored] = useState()
  const [showReset, setShowReset] = useState(false)
  const [onePlayer, setOnePlayer] = useState(true)
  const empty = 0;
  const xPlayer = 1;
  const oPlayer = 2;

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
  const initalBored = () => {
    setBored(<div className='mx-auto m-4' id='bored'>
      {
        arrBored.map(
          (x, i) => <>
            <button
              id={`btn${i}`}
              style={{ width: 100, height: 100 }}
              onClick={() => getAct(arrBored[i].player, arrBored[i].num)}
              key={x}
              className='mx-auto btn btn-dark'>
              {
                arrBored[i].player == xPlayer ? <h1 className='display-1  text-danger'>X</h1> :
                  arrBored[i].player == oPlayer ? <h1 className='display-1 text-danger'>O</h1> : ""
              }
            </button>
          </>
        )
      }
    </div>)
  }
  let count = 0;
  let countClicks = 0
  const getAct = (player, num) => {
    console.log(player, num)
    if (count % 2 === 0 && player === empty) {
      arrBored[num].player = xPlayer
      count++
      countClicks++
      possibleWin.forEach(x => { x.forEach(x => { if (x.num === num) x.player = xPlayer }) })
      possibleWin.forEach(x => {
        if (x.every(x => x.player === xPlayer)) {
          console.log(x)
          document.querySelector("#id_h1").innerHTML = "X WIN"
          setShowReset(true)
          for (let i = 0; i <= 8; i++)
            document.querySelector(`#btn${i}`).disabled = true
           
          }
          
      }
      )

      if (onePlayer && count <= arrBored.length) {
        let ok = true, randomNum = 0;
        count++
        countClicks++
        if (count < arrBored.length)
          while (ok) {
            randomNum = random(0, 8)
            if (arrBored[randomNum].player === empty) {
              arrBored[randomNum].player = oPlayer
              ok = false
              possibleWin.forEach(x => { x.forEach(x => { if (x.num === randomNum) x.player = oPlayer }) })
            }
          }
       
        console.log(possibleWin)

        possibleWin.forEach(x => {
          
          if (x.every(x => x.player === oPlayer) === true) {
            document.querySelector("#id_h1").innerHTML = "O WIN"
            console.log(x,x.every(x => x.player === oPlayer))
            setShowReset(true)
            for (let i = 0; i <= 8; i++)
              document.querySelector(`#btn${i}`).disabled = true
          }
         
        }
        )
      }

    }
    else if (count % 2 !== 0 && player === empty && !onePlayer) {
      arrBored[num].player = oPlayer
      count++
      countClicks++
      possibleWin.forEach(x => { x.forEach(x => { if (x.num === num) x.player = oPlayer }) })
      possibleWin.forEach(x => {
        if (x.every(x => x.player === oPlayer)) {
          document.querySelector("#id_h1").innerHTML = "O WIN"
          setShowReset(true)
          for (let i = 0; i <= 8; i++)
            document.querySelector(`#btn${i}`).disabled = true
        }
      }
      )
    }


    if (countClicks === arrBored.length) {
      setShowReset(true)
      document.querySelector("#id_h1").innerHTML = "teko"
      for (let i = 0; i <= 8; i++)
        document.querySelector(`#btn${i}`).disabled = true
    }
    initalBored();
  }

  useEffect(() => {
    initalBored();
  }, [])

  const controllPlayer = (x) => {
    setOnePlayer(x)
    initalBored();
  }
  
  const reset = () => {
    document.querySelector("#id_h1").innerHTML = ""
    setShowReset(false)
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
    for (let i = 0; i <= 8; i++)
      document.querySelector(`#btn${i}`).disabled = false

    initalBored();
  }

  return (
    <div className='container'>
      <h1 id='id_h1' ></h1>
      <br /><br />
      {bored}
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-danger">
          <input type="radio" name="options" id="option1" checked={onePlayer} autocomplete="off" onClick={() => controllPlayer(true)} />
          one player
        </label>
        <label className="btn btn-warning">
          <input type="radio" name="options" id="option2" checked={!onePlayer}  autocomplete="off" onClick={() => controllPlayer(false)} />
          two player
        </label>

      </div>
      <br />
      <br />
      {
        showReset &&
        <button
          className='mx-auto btn btn-outline p-3'
          onClick={reset}>
          {resetBtn}
        </button>
      }
    </div>

  )
}

export default TicTacToe