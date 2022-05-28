import { Board } from "./components/Board"
import { initFirework } from "./components/Firework"
import { Player } from "./components/Player"


export const cnv = document.querySelector("#gameAria")
export const ctx = cnv.getContext("2d")
export const FieldSize = cnv.width / 3
export const board = new Board([
	[ "", "", "" ],
	[ "", "", "" ],
	[ "", "", "" ]
])

export const player = new Player("o")

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
	cnv.removeEventListener("click", gamePlay)
	cnv.style.cursor = "initial";

	(isWon) && setTimeout(initFirework, 600);
	(isDraw) && setTimeout(draw, 600)
}


const gameOver = () => {

}


const gamePlay = (ev) => {
	const { x, y } = cnv.getBoundingClientRect()
	const mouthClickX = ev.x - x
	const mouthClickY = ev.y - y
	const i = Math.floor(mouthClickY / FieldSize)
	const j = Math.floor(mouthClickX / FieldSize)
	if (board.state[i][j]) return

	const X = Math.floor(mouthClickX / FieldSize) * FieldSize
	const Y = Math.floor(mouthClickY / FieldSize) * FieldSize

	board.insert(player.symbol, i, j, X, Y)
}

requestAnimationFrame(board.draw)
cnv.addEventListener("click", gamePlay)
