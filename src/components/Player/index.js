import { cnv, FieldSize, setCurrPlayer } from "../../App.js"


export class Player {
	constructor(sym) {
		this.symbol = sym
		this.oponentSymbol = (this.symbol === "x") ? "o" : "x"
		this.scores = {
			[this.symbol]: 100,
			[this.oponentSymbol]: -100,
			"draw": 0
		}
	}


	move(board) {
		return (ev) => {
			const { x, y } = cnv.getBoundingClientRect()
			const mouthClickX = ev.x - x
			const mouthClickY = ev.y - y

			const i = Math.floor(mouthClickY / FieldSize)
			const j = Math.floor(mouthClickX / FieldSize)
			if (board.state[i][j]) return

			const X = Math.floor(mouthClickX / FieldSize) * FieldSize
			const Y = Math.floor(mouthClickY / FieldSize) * FieldSize

			board.insert(this.symbol, i, j)
			board.drawSymbol(this.symbol, i, j, X, Y)

			setCurrPlayer(this.oponentSymbol)
		}
	}
}