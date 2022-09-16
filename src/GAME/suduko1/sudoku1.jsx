import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './sudoku1.css'


const Sudoku1 = () => {

    const heru = "<<<"
    const navigate = useNavigate()
    let initialEsey = [
        [-1, -1, 4, 9, -1, -1, -1, -1, -1],
        [8, -1, -1, -1, 4, -1, 3, -1, 7],
        [-1, -1, -1, 2, 8, -1, 1, 9, -1],
        [5, 3, 8, 6, -1, 7, 9, 4, -1],
        [-1, 2, -1, 3, -1, 1, -1, -1, -1],
        [1, -1, 9, 8, -1, 4, 6, 2, 3],
        [9, -1, 7, 4, -1, -1, -1, -1, -1],
        [-1, 4, 5, -1, -1, -1, 2, -1, 9],
        [-1, -1, -1, -1, 3, -1, -1, 7, -1]
    ]
    let initialMedium = [
        [-1, -1, 4, -1, 3, -1, -1, 7, -1],
        [2, -1, 7, -1, -1, -1, 8, -1, 1],
        [-1, -1, 3, -1, -1, 8, -1, 4, -1],
        [-1, -1, 6, -1, -1, 7, 2, 8, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, 6],
        [-1, 3, 2, 6, 9, -1, 1, -1, -1],
        [3, -1, -1, -1, -1, 9, 4, 1, -1],
        [5, 6, -1, -1, -1, -1, -1, 2, -1],
        [-1, 2, 9, 5, -1, -1, -1, -1, -1]
    ]
    let evil = [
        [-1, -1, -1, -1, -1, 7, -1, -1, 4],
        [9, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 8, 2, 6, -1, -1, 1, -1, -1],
        [-1, -1, -1, -1, 2, -1, -1, 1, -1],
        [-1, 3, 6, 8, -1, -1, 2, -1, -1],
        [-1, -1, 5, -1, -1, -1, -1, -1, -1],
        [5, -1, -1, -1, -1, -1, 3, -1, -1],
        [1, -1, -1, 9, -1, -1, -1, -1, -1],
        [-1, 9, 3, -1, -1, 6, -1, 7, -1]
    ]

    const [dificult, setDificult] = useState(initialEsey)
    const [sudokuArr, setSudokuArr] = useState(getDeepCopy(dificult))

    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr))
    }

    function onInputChange(e, row, col) {
        let value = +e || -1, grid = getDeepCopy(sudokuArr)

        if (value === -1 || value >= 1 && value <= 9) {
            grid[row][col] = value
        }
        setSudokuArr(grid)
    }

    function compareSudoku(currentSudoku, solvedSudoku) {

        let res = {
            isComplate: true,
            isSolved: true
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentSudoku[i][j] != solvedSudoku[i][j]) {
                    if (currentSudoku[i][j] != -1) {
                        res.isSolved = false
                    }
                    res.isComplate = false
                }

            }

        }

        return res;
    }

    // #1 all start here.. 
    function checkSudoku() {
        let sudoku = getDeepCopy(sudokuArr)
        solver(sudoku)
        let compare = compareSudoku(sudokuArr, sudoku)
        if (compare.isComplate === true) {
            document.querySelector(`#id_h1`).innerHTML = "Win"
        } else if (compare.isSolved === true) {
            document.querySelector(`#id_h1`).innerHTML = "finish the game"
        } else {
            document.querySelector(`#id_h1`).innerHTML = "loss"
        }
    }

    function checkRow(grid, row, nun) {
        return grid[row].indexOf(nun) === -1
    }

    function checkCol(grid, col, nun) {
        return grid.map(row => row[col]).indexOf(nun) === -1;
    }

    function checkBox(grid, row, col, num) {
        let boxArr = [],
            rowStart = row - (row % 3),
            colStart = col - (col % 3)

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxArr.push(grid[rowStart + i][colStart + j]);

            }
        }

        return boxArr.indexOf(num) === -1
    }


    function checkValid(grid, row, col, nun) {
        if (checkRow(grid, row, nun) && checkCol(grid, col, nun) && checkBox(grid, row, col, nun)) {
            return true
        }
        return false
    }

    function getNext(row, col) {
        return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0]
    }

    function solver(grid, row = 0, col = 0) {

        if (grid[row][col] !== -1) {
            let isLast = row >= 8 && col >= 8
            if (!isLast) {
                let [newRow, newCol] = getNext(row, col)
                return solver(grid, newRow, newCol);
            }
        }


        for (let num = 1; num <= 9; num++) {

            if (checkValid(grid, row, col, num)) {
                grid[row][col] = num

                let [newRow, newCol] = getNext(row, col)

                if (!newRow && !newCol) {
                    return true
                }

                if (solver(grid, newRow, newCol)) {
                    return true
                }
                
            }

        }

        grid[row][col] = -1
        return false

    }
    function solvSudoku() {
        let sudoku = getDeepCopy(dificult);
        solver(sudoku)
        setSudokuArr(sudoku)
    }
    const resetSudoku = () => {
        setSudokuArr(dificult)
        document.querySelector('#id_h1').innerHTML = ""
    }




    return (

        <div className='bored'>
            <div className='app-bored'>
                <h3 className='display-4'>sudoku</h3>
                <br />
                <table>
                    <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                                return <tr key={rIndex}
                                    className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                                >

                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                                        return <td
                                            className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                                            key={rIndex + cIndex}>
                                            <input
                                                onChange={e => onInputChange(e.target.value, row, col)}
                                                value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]}
                                                className='cellInput'
                                                disabled={dificult[row][col] !== -1}
                                            />

                                        </td>
                                    })}

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
            {/* <button className='checkBtn' onClick={checkSudoku} >check</button> */}
            <button
                onClick={resetSudoku}
                className='resetBtn'>reset
            </button>
            <button className='solvedBtn' onClick={solvSudoku} >solve</button>
            <h1 id='id_h1' ></h1>

            <br /> 
            <button onClick={() => navigate(-1)} className='btn btn-dark'>{heru}</button>
        


        </div>
    )
}

export default Sudoku1