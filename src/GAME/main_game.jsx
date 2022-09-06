import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import { arr } from './arrPage';
import '../GAME/game.css'


const Main_game = () => {

  const heru = `<<<`
  const navigate = useNavigate()
  const [result, setResult] = useState("")

  return (
    <div className='container'>
          <br />
          <input
            type='text'
            onChange={e => setResult(e.target.value)}
            placeholder='search by name...'
            className='form-control w-50 mx-auto  border border-dark  '
          />

        <h1>hello {localStorage.getItem("name")}!</h1>
        <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
          <hr />

          <br />
          <div  className='mx-auto ' id='cards'>
          {
            
            arr.map((x) => {
              if (x.name.includes(result))
                return  <Card.Img  onClick={() => navigate(x.link)} className='p-3' variant="top" src={x.img} />
                
            })
          }
          </div>
        </div>
   
      

  )
}

export default Main_game