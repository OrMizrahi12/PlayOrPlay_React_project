import axios from 'axios'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../memoryNum/memoryNum.css'
import Records from '../records'


const FlashMemory = () => {


    const siteName = 'flashMemory';
    const [showRecords,setShoeRecords] = useState(false)
    const name = localStorage.getItem("name")
    let arr_color = ['red', 'blue', 'green', 'brown', 'yellow']
    const [level, setLevel] = useState(1500)
    const [stage,setStage] = useState(1);
    const [record,setRecord]=useState(0)
    const navigate = useNavigate()
    let colors = []
    let timer;


    const shuffleColor = () => {
        document.querySelector("#id_div1").style.backgroundColor = 'black';
        document.querySelector("#id_h1").innerHTML = "";
        document.querySelector("#id_h1M").innerHTML = "";
        clearInterval(timer)
        colors = shuffle(arr_color)
        colors.push('black')
        console.log(colors)
        timer = setInterval(runColor, level)
    }
    let count = 0;
    const runColor = () => {

        document.querySelector("#id_div1").style.backgroundColor = colors[count]

        count++;
        if (count == colors.length) {
            count = 0
            clearInterval(timer)
        }

    }
    useEffect(() => {
        getRecord();
    },[])
    const getRecord = async() => {
        let {data} = await axios.get(`https://moreservgame.herokuapp.com/flashMemory/${name}`)  
       setRecord(data.record)
    }
    let i = 0;
    let arr_win = []
    const checkResult = (x) => {

        if (x == colors[i]) {
            arr_win.push(true);
            document.querySelector("#id_h1").innerHTML += " yes ";
        }
        else {
            arr_win.push(false);
            document.querySelector("#id_h1").innerHTML += " no ";
        }
        i++
        if (arr_win.length === colors.length - 1) {
            i = 0;
            if (arr_win.includes(false)) {
                document.querySelector("#id_h1M").innerHTML = " loss ";
                document.querySelector("#id_h1M").style.color = "red";
                document.querySelector("#id_h1").innerHTML = "";
                if (level < 1500) setLevel(level + 250)
                if (stage > 1) setStage(stage-1)


            }
            else {
                document.querySelector("#id_h1M").innerHTML = " win ";
                document.querySelector("#id_h1M").style.color = "green";
                document.querySelector("#id_h1").innerHTML = "";
                if (level > 250) setLevel(level - 250)
                setStage(stage+1)
                if(stage > record){
                    (async()=>{
                        let {data} = await axios.put(`https://moreservgame.herokuapp.com/flashMemory/${name}`,{
                            username:name,
                            record:record+1
                        })  
                       setRecord(data.record)
                    })();
                    
                }
            }
            arr_win = []
        }




    }

    return (
        <div>
            <button onClick={shuffleColor} >play</button>
            <h1 id="id_h1M" className='css-3d-text' ></h1>
            <h1 id="id_h1"></h1>
            <div style={{ width: 300, height: 300, backgroundColor: 'black' }} className='rounded-circle mx-auto m-2' id='id_div1'></div>



            <button
                style={{ backgroundColor: 'red', width: 50, height: 50 }}
                onClick={() => checkResult('red')}
                className='rounded-circle'>
            </button>
            <button

                style={{ backgroundColor: 'blue', width: 50, height: 50 }}
                onClick={() => checkResult('blue')}
                className='rounded-circle'>

            </button>
            <button
                style={{ backgroundColor: 'green', width: 50, height: 50 }}
                onClick={() => checkResult('green')}
                className='rounded-circle'>

            </button>
            <button
                style={{ backgroundColor: 'brown', width: 50, height: 50 }}
                onClick={() => checkResult('brown')}
                className='rounded-circle'>

            </button>
            <button
                style={{ backgroundColor: 'yellow', width: 50, height: 50 }}
                onClick={() => checkResult('yellow')}
                className='rounded-circle'>
            </button>
            <br />

            <h1 className='display-4'>Level: {stage} | Record :{record} </h1>
            
            <button className='btn btn-outline-dark bg-danger' onClick={()=> setShoeRecords(!showRecords)}>records</button>
            {
                showRecords && <Records gameName={siteName} />
            }
        </div>
    )
}

export default FlashMemory