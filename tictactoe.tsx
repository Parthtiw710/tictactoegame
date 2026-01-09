import circle from "./assets/circle.png";
import cross from "./assets/cross.png";
import { useEffect, useState } from "react";

const Ticktactoe = () => {
    const [board, setBoard] = useState<(null | "O" | "X")[]>(Array(9).fill(null));
    const [isoTurn, setisoTurn] = useState(true);
    const [winner, setWinner] = useState<null | "O" | "X">(null);


    const handleClick = (index:number) => {
        if(board[index]) return;
        const newBoard = [...board];
        newBoard[index] = isoTurn? "O" : "X";
        setBoard(newBoard);
        setisoTurn(!isoTurn);
        const result = checkWinner(newBoard);
        if(result) {
            setWinner(result);
        } else {setisoTurn(!isoTurn);}
    }


    useEffect (() => {
        if (!winner) return;
        setTimeout(() => {
            setBoard(Array(9).fill(null));
            setisoTurn(true);
            setTimeout(() => {
            setWinner(null);
            }, 7000);        
        }, 1000);
    }, [winner]);

    const round = (i:number) => {
        if (i === 0) return "rounded-tl-xl";
        if (i === 2) return "rounded-tr-xl";
        if (i === 6) return "rounded-bl-xl";
        if (i === 8) return "rounded-br-xl";
        return "";

    }

    const checkWinner = (board:(null|"O"| "X")[]) => {
        const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

    for ( const [a,b,c] of winningCombos) {
        if( board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }  return null;
    }



    return(<div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center bg-gray-900">
        <h1 className="font-mono font-bold text-white text-2xl tracking-widest drop-shadow-lg">TIC TAC TOE</h1>
        <div className="grid grid-cols-3 gap-2">
            {board.map((cell, i) => (
                <div key={i} onClick={() => handleClick(i)} className={`h-40 w-40 bg-gray-800 border border-gray-600 flex items-center justify-center text-white text-2xl cursor-pointer ${round(i)}`}>
                    {cell === "O" && (<img src={circle} alt="O" className="h-20 w-20" />)}
                    {cell === "X" && (<img src={cross} alt="X" className="h-20 w-20" />)}
                </div>
            ))}
        </div>
        {winner && <h2 className="text-2xl text-white"> winner is {winner} </h2>}
    </div>);
}

export default Ticktactoe;
