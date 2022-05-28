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
	cnv.removeEventListener("click", player.move(board))
	cnv.style.cursor = "initial";

	(isWon) && setTimeout(initFirework, 600);
	(isDraw) && setTimeout(draw, 600)
}


const gameOver = () => {

}

requestAnimationFrame(board.draw)
cnv.addEventListener("click", player.move(board))
