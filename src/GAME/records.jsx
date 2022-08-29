import axios from 'axios'
import { sortBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Records = ({ gameName }) => {
  const params = useParams()
  const [records, setRecords] = useState([])
  const getRecords = async () => {
    let { data } = await axios.get(`https://moreservgame.herokuapp.com/${gameName}`)
    setRecords(data.sort((a, b) => b.record-a.record))

  }

  useEffect(() => {
    getRecords();
  }, [])
  return (
    <div className='col-md-6 mx-auto container'>
      <h1 className='display-3'>{gameName} recoeds</h1>
      <table className="table table-dark ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">record</th>
          </tr>
        </thead>
        {
        records.map((x,i)  => x.record > 0 && <tbody>
          <tr>
            <th scope="row">{i+1}</th>
            <td>{x.username}</td>
            <td>{x.record}</td>
          </tr>
        </tbody>
        )}
      </table>
    </div>
  )
}

export default Records