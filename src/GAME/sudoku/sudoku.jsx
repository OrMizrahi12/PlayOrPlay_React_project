import { after, random, uniq, uniqBy } from 'lodash'
import '../sudoku/sudoku.css'
const Sudoku = () => {

    let arrSudokuBored = []
    let arrReview = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    for (let i = 0; i < 9 * 9; i++) {
        arrSudokuBored.push(i)
    }
  

    // ----------
    // for box arr
    let countJump = 0
    let arrbox = []
    let jumpController = 0
    let controllCount = 0
    let number = 0

    for (let i = 0; i < 9; i++) {
        let oneBoxArr = []
        for (let j = 0; j < 9; j++) {
            controllCount++
            oneBoxArr.push({ location: number, input: null })
            number += 1
            if (controllCount === 3) {
                controllCount = 0;
                number += 6
            }
        }
        countJump++
        if (countJump % 3 == 0) {
            jumpController += 21
        }
        else {
            jumpController += 3
        }
        arrbox.push(oneBoxArr)
        number = jumpController;
        controllCount = 0
    }


    // ----------

    // arr row --> 
    let arrRows = []
    let sumRow = 0;
    for (let i = 0; i < 9; i++) {
        let arrOneRow = []
        for (let j = 0; j < 9; j++) {
            arrOneRow.push({ location: sumRow, input: null })
            sumRow++
        }
        arrRows.push(arrOneRow)
    }

 
        
    // arr col --> 
    let arrCols = []
    let countColControll = 0
    for (let i = 0; i < 9; i++) {
        let arrOneCol = []
        for (let j = 0; j < 9; j++) {
            arrOneCol.push({ location: (i + countColControll), input: null })
            countColControll += 9
        }
        countColControll = 0
        arrCols.push(arrOneCol)
    }

    

    

    const getNum = (num, i) => {
        

        let duplicateRow = 0
        let duplicatCol = 0
        let duplicateBox = 0


        if (num == " " || num == "") {
            arrbox.forEach(x => { x.forEach(x => { if (x.location === i) x.input = "" }) })
            arrRows.forEach(x => { x.forEach(x => { if (x.location === i) x.input = "" }) })
            arrCols.forEach(x => { x.forEach(x => { if (x.location === i) x.input = "" }) })
        }
        if (arrReview.includes(+num)) {
            arrbox.forEach(x => { x.forEach(x => { if (x.location === i) x.input = num }) })
            arrRows.forEach(x => { x.forEach(x => { if (x.location === i) x.input = num }) })
            arrCols.forEach(x => { x.forEach(x => { if (x.location === i) x.input = num }) })
            let s = 0
        }


        // check row duplicarion -->
        duplicateRow = 0
        for (let i = 0; i < arrRows.length; i++) {
            for (let j = 0; j < arrRows[i].length; j++) {
                for (let y = 0; y < arrRows[i].length; y++) {
                    if (arrRows[i][j].input === arrRows[i][y].input &&
                        arrRows[i][j].input != null &&
                        arrRows[i][y].input != null &&
                        arrRows[i][j].input != "" &&
                        arrRows[i][y].input != ""
                    ) {
                        duplicateRow++;
                    }
                    if (duplicateRow <= 1 &&
                        document.querySelector(`#id_inp${arrRows[i][j].location}`).style.backgroundColor == 'rgb(255, 0, 0)'
                    ) {
                        document.querySelector(`#id_inp${arrRows[i][j].location}`).style.backgroundColor = ''
                    }
                }
                if (arrRows[i][j].input == "")
                    document.querySelector(`#id_inp${arrRows[i][j].location}`).style.backgroundColor = ''

                if (duplicateRow >= 2) {
                    // duplicateRow = 0
                    document.querySelector(`#id_inp${arrRows[i][j].location}`).style.backgroundColor = 'rgb(255, 0, 0)'
                    console.log(`ROW, num ${arrRows[i][j].input}`)
                    console.log(`location --> ${i}`)
                    
                }
                duplicateRow = 0
            }

        }


        // check col duplicarion -->
        for (let i = 0; i < arrCols.length; i++) {
            for (let j = 0; j < arrCols[i].length; j++) {
                for (let y = 0; y < arrCols[i].length; y++) {
                    if (arrCols[i][j].input === arrCols[i][y].input &&
                        arrCols[i][j].input != null &&
                        arrCols[i][y].input != null &&
                        arrCols[i][j].input != "" &&
                        arrCols[i][y].input != ""
                    ) {
                        duplicatCol++;
                    }
                    if (duplicatCol <= 1 &&
                        document.querySelector(`#id_inp${arrCols[i][j].location}`).style.backgroundColor == 'rgb(254.9, 0, 0)') {
                        document.querySelector(`#id_inp${arrCols[i][j].location}`).style.backgroundColor = ''
                    }
                }
                if (arrCols[i][j].input == "")
                    document.querySelector(`#id_inp${arrCols[i][j].location}`).style.backgroundColor = ''
                if (duplicatCol >= 2) {
                    document.querySelector(`#id_inp${arrCols[i][j].location}`).style.backgroundColor = 'rgb(254.9, 0, 0)'
                    console.log(`COL, num ${arrCols[i][j].input}`)
                    console.log(`location --> ${i}`)
                }
                duplicatCol = 0

            }

        }

        // check arr box -->
        for (let i = 0; i < arrbox.length; i++) {
            for (let j = 0; j < arrbox[i].length; j++) {
                for (let y = 0; y < arrbox[i].length; y++) {
                    if (arrbox[i][j].input === arrbox[i][y].input &&
                        arrbox[i][j].input != null &&
                        arrbox[i][y].input != null &&
                        arrbox[i][j].input != "" &&
                        arrbox[i][y].input != ""
                    ) {
                        duplicateBox++;

                    }
                    if (duplicateBox <= 1 &&
                        document.querySelector(`#id_inp${arrbox[i][j].location}`).style.backgroundColor == 'rgb(254.8, 0, 0)') {
                        document.querySelector(`#id_inp${arrbox[i][j].location}`).style.backgroundColor = ''
                    }


                }

                if (duplicateBox >= 2) {

                    document.querySelector(`#id_inp${arrbox[i][j].location}`).style.backgroundColor = 'rgb(254.8, 0, 0)'
                    console.log(`BOX, num ${arrbox[i][j].input}`)
                    console.log(`location --> ${i}`)
                }
                else if (arrbox[i][j].input == "")
                    document.querySelector(`#id_inp${arrbox[i][j].location}`).style.backgroundColor = ''
                duplicateBox = 0


            }

        }

    }
   
    const newGame = () => {
    }
    return (
        <div>
            <div  >
                <h1 className='display-4'>SUDOKU</h1>
                <div >
                    {
                        arrSudokuBored.map((x, i) => <> <input type="text"
                            id={`id_inp${x}`}
                            key={i}
                            maxLength={1}
                            className="border border-primary "
                            onChange={e => getNum(e.target.value, x)}
                            style={{

                                width: 34, height: 34,
                                marginLeft:
                                    (x) % 3 == 0 ||
                                        (x) % 6 == 0 ||
                                        (x) % 9 == 0 ? 10 : -4,
                                marginTop: (x) % 27 == 0 && 10

                            }}>

                        </input>
                            {(x + 1) % 9 == 0 && <br />}
                        </>
                        )
                    }

                </div>
                {/* <button className='btn btn-outline-primary m-3 p-3' onClick={checkReslt}>new game</button> */}
            </div>
        </div>
    )
}

export default Sudoku