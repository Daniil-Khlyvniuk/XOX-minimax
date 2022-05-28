import { Board } from "./components/Board"
import { initFirework } from "./components/Firework"
import { Player } from "./components/Player"
import { AI } from "./components/ComputerPlayer"


export const cnv = document.querySelector("#gameAria")
export const ctx = cnv.getContext("2d")
export const FieldSize = cnv.width / 3
export const board = new Board([
	[ "", "", "" ],
	[ "", "", "" ],
	[ "", "", "" ]
])


export let currPlayer = "o"
export const hu = new Player("o")
export const AI_PLAYER = new AI("o")

export const setCurrPlayer = (val) => {
	currPlayer = val
}

const draw = () => {
	cnv.width = innerWidth
	cnv.height = innerHeight
	ctx.fillStyle = "#050505"
	ctx.fillRect(0, 0, cnv.width, cnv.height)
	ctx.fillStyle = "crimson"
	ctx.shadowColor = "crimson"
	ctx.shadowBlur = 7
	ctx.lineWidth = 10

	ctx.font = "100px Courier New, monospace"
	ctx.textAlign = "center"
	ctx.fillText(`The draw`, cnv.width / 2, cnv.height / 2)

	requestAnimationFrame(draw)
}
const win = (isWon, isDraw) => {
	cnv.removeEventListener("click", hu.move(board))
	cnv.style.cursor = "initial";

	// (isWon) && setTimeout(initFirework, 600);
	// (isDraw) && setTimeout(draw, 600)
}
const gameOver = () => {
}
const gamePlay = () => {
	switch (currPlayer) {
		case hu.symbol:
			cnv.addEventListener("click", AI_PLAYER.move(board))
			// cnv.addEventListener("click", hu.move(board))
			return
		case AI_PLAYER.symbol:
			// const [ i, j ] = AI_PLAYER.getBestMove(board)
			// cnv.addEventListener("MouseUp", AI_PLAYER.move(board, i, j))
			// currPlayer = hu.symbol
			// return
	}
}
requestAnimationFrame(board.draw)
gamePlay()
// cnv.addEventListener("click", hu.move(board))
