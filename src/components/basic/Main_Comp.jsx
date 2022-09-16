import {Route,Routes} from 'react-router-dom'
import Checkers from '../../GAME/checkers/checkers'
import FindTheWord from '../../GAME/findTheWord/findTheWord'
import FlashBox from '../../GAME/flashBox/flashBox'
import FlashMemory from '../../GAME/flashMemory/flashMemory'
import LocationMemory from '../../GAME/locationMemory/locationMemory'
import Main_game from '../../GAME/main_game'
import MemoryCards from '../../GAME/memoryCards/memoryCards'
import MemoryNum from '../../GAME/memoryNum/memoryNum'
import MemorySound from '../../GAME/memorySound/memorySound'
import MemoryWordsGame from '../../GAME/memoryWords/memoryWordsGame'
import Records from '../../GAME/records'
import Sudoku1 from '../../GAME/suduko1/sudoku1'
import TicTacToe from '../../GAME/TicTacToe/TicTacToe'
import Navbar1 from '../../navbar/navbar'
import Login from '../auth/Login'
import Register from '../auth/Register'
import RequireAuth from '../auth/RequireAuth'
import Layout from './Layout'

const Main_Comp = () => {
  return (
    <>
    <Navbar1 />
    <Routes>
        <Route path='/' element={<Layout />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main_game/>} />
        <Route element={<RequireAuth />} >
        <Route path='/flashbox' element={<FlashBox/>} />
        <Route path='/memorynum' element={<MemoryNum/>} />
        <Route path='/flashmemory' element={<FlashMemory/>} /> 
        <Route path='/findTheWord' element={<FindTheWord/>} />
        <Route path='/locationMemory' element={<LocationMemory/>} /> 
        <Route path='/records/:gamename' element={<Records/>} /> 
        <Route path='/checkers' element={<Checkers/>} />
        <Route path='/ticTacToe' element={<TicTacToe/>} />
        <Route path='/sudoku' element={<Sudoku1/>} />
        <Route path='/memorySound' element={<MemorySound/>} />
        <Route path='/memoryWords' element={<MemoryWordsGame/>} />
        <Route path='/memoryCards' element={<MemoryCards/>} />


        </Route>
        </Route>
    </Routes>
    </>
  )
}

export default Main_Comp