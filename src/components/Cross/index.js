import { ctx, FieldSize } from "../../App.js"


export class Cross {
	constructor(x, y, size = FieldSize, gap = 40) {
		this.x = x
		this.y = y
		this.size = size
		this.gap = gap
		this.curPerc = 0
		this.curPerc1 = 0
		this.firstLine = []
	}

	render = this.drawFirstLine.bind(this)
	secLine = this.secondLine.bind(this)

	lineStyles() {
		ctx.lineWidth = 40
		ctx.strokeStyle = "#55D8C1"
		ctx.shadowColor = "#55D8C1"
		ctx.lineCap = "butt"
		ctx.shadowBlur = 10
	}

	secondLine() {
		const { x, y, size, gap, lineStyles, secLine } = this

		ctx.save()
		lineStyles()
		ctx.clearRect(x + 5, y + 5, FieldSize - 10, FieldSize - 10)


		ctx.beginPath()
		ctx.moveTo(x + gap, y + gap)
		ctx.lineTo(this.firstLine[0], this.firstLine[1])
		ctx.stroke()


		ctx.beginPath()
		ctx.moveTo(x + gap, y + size - gap)
		ctx.lineTo(x + this.curPerc1 + gap, (y + size - gap) - this.curPerc1)
		ctx.stroke()
		ctx.restore()

		this.curPerc1 += 20;
		(this.curPerc1 < size - 80) && requestAnimationFrame(secLine)
		if (this.curPerc1 === size - 80) {
			this.curPerc = 0
			this.curPerc1 = 0
			this.firstLine = []
		}
	}

	drawFirstLine() {
		const { x, y, size, gap, lineStyles, secLine, render } = this

		ctx.save()
		lineStyles()
		ctx.clearRect(x + 5, y + 5, FieldSize - 10, FieldSize - 10)
		ctx.beginPath()
		ctx.moveTo(x + gap, y + gap)
		ctx.lineTo((x + this.curPerc) + gap, ((y + this.curPerc) + gap))
		ctx.stroke()
		ctx.restore()
		this.curPerc += 20;
		(this.curPerc < size - 80) && requestAnimationFrame(render)
		if (this.curPerc === size - 80) {
			this.firstLine.push((x + this.curPerc - 10) + gap)
			this.firstLine.push((y + this.curPerc - 10) + gap)
			return requestAnimationFrame(secLine)
		}

	}
}


// let curPerc = 0
// let curPerc1 = 0
// let firstLine = []


// export const Cross = (x, y, size = FieldSize, gap = 40) => () => {
// 	ctx.save()
// 	lineStyles()
//
// 	ctx.clearRect(x + 5, y + 5, FieldSize - 10, FieldSize - 10)
// 	ctx.beginPath()
// 	ctx.moveTo(x + gap, y + gap)
// 	ctx.lineTo((x + curPerc) + gap, ((y + curPerc) + gap))
// 	ctx.stroke()
// 	ctx.restore()
//
//
// 	curPerc += 10;
// 	(curPerc < size - 80) && requestAnimationFrame(Cross(x, y, size))
// 	if (curPerc === size - 80) {
// 		firstLine.push((x + curPerc - 10) + gap)
// 		firstLine.push((y + curPerc - 10) + gap)
// 		return requestAnimationFrame(secondLine(x, y, size, gap))
// 	}
// }
//
// const secondLine = (x, y, size, gap) => () => {
// 	ctx.save()
// 	lineStyles()
// 	ctx.clearRect(x + 5, y + 5, FieldSize - 10, FieldSize - 10)
//
//
// 	ctx.beginPath()
// 	ctx.moveTo(x + gap, y + gap)
// 	ctx.lineTo(firstLine[0], firstLine[1])
// 	ctx.stroke()
//
//
// 	ctx.beginPath()
// 	ctx.moveTo(x + gap, y + size - gap)
// 	ctx.lineTo(x + curPerc1 + gap, (y + size - gap) - curPerc1)
// 	ctx.stroke()
// 	ctx.restore()
//
// 	curPerc1 += 10;
// 	(curPerc1 < size - 80) && requestAnimationFrame(secondLine(x, y, size,
// gap)) if (curPerc1 === size - 80) { curPerc = 0 curPerc1 = 0 firstLine = []
// } }