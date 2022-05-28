import { AI } from "./components/AI"
import { Board } from "./components/Board"
import { initFirework, stopFirework } from "./components/Firework"
import { Modal } from "./components/Modal"
import { Player } from "./components/Player"


export const cnv = document.querySelector("#gameAria")
export const ctx = cnv.getContext("2d")
export const FieldSize = cnv.width / 3
export let currPlayer = "x"
export let AI_PLAYER = null
export let hu = null
export let board = null
export let drawAmim

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

	drawAmim = requestAnimationFrame(draw)
}

export const gameOver = ({ winner }) => {
	cnv.removeEventListener("click", hu.move(board))
	cnv.style.cursor = "initial"

	switch (winner) {
		case "x":
		case "o":
			return setTimeout(initFirework(winner), 600)
		default:
			return setTimeout(draw, 600)
	}
}

const startGame = (AI, HU, board) => {
	requestAnimationFrame(board.draw)

	if (AI.symbol === "x") {
		setTimeout(AI.move(board), 1000)
		setTimeout(() => {
			cnv.style.cursor = "pointer"
			cnv.addEventListener("click", HU.move(board, AI))
		}, 1500)

	} else {
		cnv.style.cursor = "pointer"
		cnv.addEventListener("click", HU.move(board, AI))
	}
}

export const newGame = (playerSymb) => {
	cnv.width = 600
	cnv.height = 600
	currPlayer = "x"
	cancelAnimationFrame(drawAmim)
	stopFirework()

	let aiSymb = playerSymb === "x" ? "o" : "x"
	AI_PLAYER = new AI(aiSymb)
	hu = new Player(playerSymb)
	board = new Board([
		[ "", "", "" ],
		[ "", "", "" ],
		[ "", "", "" ]
	])

	startGame(AI_PLAYER, hu, board)
}


new Modal