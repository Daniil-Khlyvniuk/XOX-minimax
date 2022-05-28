import { cnv, ctx } from "../../App.js"


let firework1
let firework2
const minStrength = 5
const maxStrength = 10
const minTrails = 20
const maxTrails = 35
const particleRadius = .5
const trailLength = 5
const delay = 0.3
const lifetime = 250
const g = 5e-2
const D = 1e-3


class Particle {
	constructor(x, y, vx, vy, ax, ay, colour) {
		this.x = x
		this.y = y
		this.vx = vx
		this.vy = vy
		this.ax = ax
		this.ay = ay
		this.lifetime = lifetime
		this.path = []
		this.colour = colour
		this.r = particleRadius
	}

	update() {
		this.lifetime--
		if (this.path.length >= trailLength) this.path.shift()
		this.path.push([ this.x, this.y ])

		this.vy += this.ay
		this.vx += this.ax
		this.x += this.vx
		this.y += this.vy
	}

	draw() {
		const opacity = ((this.lifetime * 100) / lifetime) / 100

		ctx.fillStyle = "rgba(" + this.colour + opacity * 0.6 + ")"
		if (this.lifetime > lifetime * 0.95) ctx.fillStyle = "#fff"
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.moveTo(this.x - this.r, this.y)
		ctx.lineTo(this.path[0][0], this.path[0][1])
		ctx.lineTo(this.x + this.r, this.y)
		ctx.closePath()
		ctx.fill()

		ctx.fillStyle = `rgba(${ this.colour }${ opacity }})`
		if (this.lifetime > lifetime * .95) ctx.fillStyle = "#fff"
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
	}
}

class Firework {
	constructor() {
		this.x = cnv.width * (Math.random() * 0.8 + 0.1)
		this.y = cnv.height * (Math.random() * 0.8 + 0.1)
		this.strength =
			Math.random() * (maxStrength - minStrength) + minStrength
		this.colour = `
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		`
		this.lifetime = 0
		this.particles = this.getParticles(this.x, this.y, this.strength, this.colour)
	}


	getParticles(x, y, strength, colour) {
		const p = []

		const n = Math.floor(Math.random() * (maxTrails - minTrails)) + minTrails
		const ay = g
		for (let i = n; i--;) {
			let ax = D
			const angle = (i * Math.PI * 2) / n
			if (angle < Math.PI) ax *= -1
			const vx = strength * Math.sin(angle)
			const vy = strength * Math.cos(angle)
			p.push(new Particle(x, y, vx, vy, ax, ay, colour))
		}
		return p
	}

	update() {
		console.log(this.colour)

		this.lifetime++
		if (this.lifetime < 0) return
		for (let i = this.particles.length; i--;) {
			this.particles[i].update()
			this.particles[i].draw()
		}
	}
}


function animation() {
	ctx.fillStyle = "#050505"
	ctx.fillRect(0, 0, cnv.width, cnv.height)
	const symb = "o".toUpperCase()

	firework1.update()
	firework2.update()

	if (symb === "O") {
		ctx.shadowColor = "#FCF69C"
		ctx.fillStyle = "#FCF69C"
	} else {
		ctx.shadowColor = "#55D8C1"
		ctx.fillStyle = "#55D8C1"
	}

	ctx.shadowBlur = 7
	ctx.lineWidth = 10

	ctx.font = "100px Courier New, monospace"
	ctx.textAlign = "center"
	ctx.fillText(`The "${ symb }" has won`, cnv.width / 2, cnv.height / 2)

	if (firework1.lifetime === lifetime * delay) firework2 = new Firework()
	if (firework2.lifetime === lifetime * delay) firework1 = new Firework()

	window.requestAnimationFrame(animation)
}

export function initFirework() {
	cnv.width = innerWidth
	cnv.height = innerHeight
	firework1 = new Firework()
	firework2 = new Firework()
	firework2.lifetime = -lifetime * delay
	animation()
}


