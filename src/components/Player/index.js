import { cnv, FieldSize, player } from "../../App.js"


export class Player {
	constructor(sym = "X") {
		this.symbol = sym
	}

	move (board)  {
		return (ev) => {
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
	}
}