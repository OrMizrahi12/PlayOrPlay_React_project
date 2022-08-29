import React from 'react'

const Checkers = () => {

    let num = [{ num: 1, side: 'l' }, { num: 2, side: 'lc' }, { num: 3, side: 'c' }, { num: 4, side: 'rc' }, { num: 5, side: 'r' }]
    let num1 = [{ num: 6, side: 'l' }, { num: 7, side: 'lc' }, { num: 8, side: 'c' }, { num: 9, side: 'rc' }, { num: 10, side: 'r' },]
    let num2 = [{ num: 11, side: 'l' }, { num: 12, side: 'lc' }, { num: 13, side: 'c' }, { num: 14, side: 'rc' }, { num: 15, side: 'r' },]
    let num3 = [{ num: 16, side: 'l' }, { num: 17, side: 'lc' }, { num: 18, side: 'c' }, { num: 19, side: 'rc' }, { num: 20, side: 'r' },]
    let num4 = [{ num: 21, side: 'l' }, { num: 22, side: 'lc' }, { num: 23, side: 'c' }, { num: 24, side: 'rc' }, { num: 25, side: 'r' },]
    let num5 = [{ num: 26, side: 'l' }, { num: 27, side: 'lc' }, { num: 28, side: 'c' }, { num: 29, side: 'rc' }, { num: 30, side: 'r' },]
    let prev = 0;
    let temp;
    let tempSide;
    let current;
    let currentSide;
    let countPlayer =0;


    const move = (x) => {
        
            if (prev == 0) {
                temp = x.num
                tempSide = x.side
                document.querySelector(`#btn${temp}`).style.backgroundColor = 'orange';
            }
            if (prev == 1 && prev != temp  ) {
    
                current = x.num;
                currentSide = x.side
                // || temp - current == 4 ||temp - current == 6
                if (current - temp == 6 || current - temp == 4 || temp - current == 6 || temp - current == 4) {
                    document.querySelector(`#btn${current}`).style.backgroundColor = 'green'
                    document.querySelector(`#btn${temp}`).style.backgroundColor = 'black'
              
                         
                }
                if (temp - current == 6 || temp - current == 4 && temp > current   && countPlayer == 1 ) {
                    document.querySelector(`#btn${current}`).style.backgroundColor = 'green'
                    document.querySelector(`#btn${temp}`).style.backgroundColor = 'black'
                } 
                prev = -1
            }
            
        prev++
        console.log(`temp:${temp}, current:${current}`)
    }

    return (
        <div>
            {
                num.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }
            <br />
            {
                num1.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }
            <br />
            {
                num2.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }
            <br />
            {
                num3.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }
            <br />
            {
                num4.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }
            <br />
            {
                num5.map(x => <button className='p-3 m-1' onClick={() => move(x)} id={`btn${x.num}`} style={{ width: 50, height: 50, backgroundColor: 'black' }} ></button>)
            }

        </div>
    )
}

export default Checkers