
import { useState } from 'react';
import './App.css';
import Main_Comp from './components/basic/Main_Comp';
import { AppContext } from './context/context';

function App() {

  const [user,setUser] = useState({name:"",token: null})
  return (
    <div className="App">
      <AppContext.Provider value={{user,setUser}} >
      <Main_Comp />
      </AppContext.Provider>
    </div>
  );
}

export default App;
