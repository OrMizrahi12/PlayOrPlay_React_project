import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import { arr } from './arrPage';
import '../GAME/game.css'


const Main_game = () => {

  
  const navigate = useNavigate()
  const [result, setResult] = useState("")

  return (
    <div className='container'>
      <br />

      <h1 className='display-4' >hello, {localStorage.getItem("name")}!</h1>
      <p> let's play a game</p>
      <hr />

      <br />
      <div className='mx-auto ' id='cards'>
        {

          arr.map((x) => {
            if (x.name.includes(result))
              return <span className='p-3'>
                <Card.Img
                onClick={() => navigate(x.link)}
                className='round'
                variant="top"
                src={x.img} />
                
              </span>
          })
        }
      </div>
    </div>



  )
}

export default Main_game