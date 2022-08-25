import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/context'

const Home = () => {

  return (
    <div>
        {
            localStorage.getItem("token") ? <h1>hello {localStorage.getItem("name")}</h1> : <h1>hello!!!!</h1>
        }
      
    
    </div>
  )
}

export default Home