import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import { arr } from './arrPage';


const Main_game = () => {

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
      <div className='row-md-6 m-3'>
        <div className='row mx-auto'>
          <h1 className='display-4 p-3'>Train your brain</h1>
          <hr />
          <p className='mx-auto border soild rounded p-3'>Did you know? <br />
            Playing a thinking game every day improves cognitive function,
            reduces the chance of getting dementia, and makes us calmer.</p>
          <br />
          {
            arr.map((x) => {
              if (x.name.includes(result))
                return <Card onClick={() => navigate(x.link)} key={x.link} style={{ width: '18rem' }} className='m-3 p-3 bg-dark'>
                  <Card.Img className='shadow rounded' variant="top" src={x.img} />
                  <Card.Body>    
                    <button onClick={() => navigate(x.link)} className="btn btn-outline-danger" >{x.name}</button>
                  </Card.Body>
                </Card>
            })
          }
        </div>
      </div>
      <button onClick={() => navigate(-1)} className='btn btn-dark'>back</button>
    </div>
  )
}

export default Main_game