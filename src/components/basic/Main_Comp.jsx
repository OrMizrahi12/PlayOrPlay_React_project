import {Route,Routes} from 'react-router-dom'
import Checkers from '../../GAME/checkers/checkers'
import FindTheWord from '../../GAME/findTheWord/findTheWord'
import FlashBox from '../../GAME/flashBox/flashBox'
import FlashMemory from '../../GAME/flashMemory/flashMemory'
import LocationMemory from '../../GAME/locationMemory/locationMemory'
import Main_game from '../../GAME/main_game'
import MemoryNum from '../../GAME/memoryNum/memoryNum'
import Records from '../../GAME/records'
import Navbar1 from '../../navbar/navbar'
import Login from '../auth/Login'
import Register from '../auth/Register'
import RequireAuth from '../auth/RequireAuth'
import Home from './Home'
import Layout from './Layout'

const Main_Comp = () => {
  return (
    <>
    <Navbar1 />
    <Routes>
        <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth />} >
        <Route path='/games' element={<Main_game/>} />
        <Route path='/flashbox' element={<FlashBox/>} />
        <Route path='/memorynum' element={<MemoryNum/>} />
        <Route path='/flashmemory' element={<FlashMemory/>} /> 
        <Route path='/findTheWord' element={<FindTheWord/>} />
        <Route path='/locationMemory' element={<LocationMemory/>} /> 
        <Route path='/records/:gamename' element={<Records/>} /> 
        <Route path='/checkers' element={<Checkers/>} />
        </Route>
        </Route>
    </Routes>
    </>
  )
}

export default Main_Comp