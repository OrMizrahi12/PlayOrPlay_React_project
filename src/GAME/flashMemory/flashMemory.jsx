import axios from 'axios'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../memoryNum/memoryNum.css'
import Records from '../records'
import '../game.css'
import whileSound from './flashMemory/whileSound.mp3'
import clickSound from './flashMemory/clickSound.mp3'
import loss from './flashMemory/loss.mp3'
import win from './flashMemory/win.mp3'
import { Howl } from 'howler'

const FlashMemory = () => {


    const siteName = 'flashMemory';
    const [showRecords,setShoeRecords] = useState(false)
    const name = localStorage.getItem("name")
    let arr_color = ['red', 'blue', 'green', 'brown', 'yellow']
    const [level, setLevel] = useState(1500)
    const [stage,setStage] = useState(1);
    const [record,setRecord]=useState(0)
    const navigate = useNavigate()
    const heru = `<<<`
    
    let colors = []
    let timer;


    const shuffleColor = () => {
        playSound(clickSound)
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
        playSound(whileSound)

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
            playSound(whileSound)
        }
        else {
            arr_win.push(false);
            document.querySelector("#id_h1").innerHTML += " no ";
            playSound(clickSound)
        }
        i++
        if (arr_win.length === colors.length - 1) {
            i = 0;
            if (arr_win.includes(false)) {
                document.querySelector("#id_h1M").innerHTML = " loss ";
                document.querySelector("#id_h1M").style.color = "red";
                document.querySelector("#id_h1").innerHTML = "";
                playSound(loss)
                if (level < 1500) setLevel(level + 250)
                if (stage > 1) setStage(stage-1)


            }
            else {
                document.querySelector("#id_h1M").innerHTML = " win ";
                document.querySelector("#id_h1M").style.color = "green";
                document.querySelector("#id_h1").innerHTML = "";
                playSound(win)

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

    const playSound = (sound) => {

        let sfx = {
            push: new Howl({
                src: [
                    sound
                ],
                html5: true,
                volume: 1,
            })
        }

        sfx.push.play()
    }

    return (
        <div>
            <button className='btnPlay' onClick={shuffleColor} >play</button>
            <h1 id="id_h1M" className='css-3d-text' ></h1>
            <h1 id="id_h1"></h1>
            <div  className='flashMemory-main-cycle mx-auto m-2' id='id_div1'></div>



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
            
            <button className='btnRcords' onClick={()=> setShoeRecords(!showRecords)}>records</button>
            {
                showRecords && <Records gameName={siteName} />
            }
            <br/> <br /> 
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        </div>
    )
}

export default FlashMemory