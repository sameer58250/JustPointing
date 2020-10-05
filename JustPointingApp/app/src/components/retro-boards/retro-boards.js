import "./retro-boards.css";
import React, {useState} from 'react';

const RetroBoards = (props) => {
    const [isCreateActive, setCreateBtnActive] = useState(false);
    var boards = ["board1", "board2", "board3", "board4", "board5"]
    const createBoard = (event) => {

    }
    return (
        <div className="retro-boards">
            {
                boards.map((board, idx) => {
                    return (
                        <button className="retro-board-title" key={idx}>{board}</button>
                    )
                })
            }
            {
                isCreateActive
                ?
                <div className="create-board">
                    <input type="text"></input>
                    <div>
                        <button onClick={createBoard}>Add</button>
                        <button onClick={()=>setCreateBtnActive(false)}>Cancel</button>
                    </div>
                </div>
                :
                <button onClick={()=>setCreateBtnActive(true)}>Create board</button>
            }
        </div>
    )
}

export default RetroBoards;