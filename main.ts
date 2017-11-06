/// <reference path="point.ts"/>

class Main {
    canvasContext: CanvasRenderingContext2D
    point: Point
    direction: number

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext
        this.onResize( )
    }

    onStep(deltaTime: number): void {
        let prevPosition = this.point.copy( )
        this.direction += (Math.random( ) - 0.5) * 128 * deltaTime
        let move = Point.createFromDirectionAndLength(this.direction, deltaTime * 256)
        this.point.add(move)
        let invH = false
        let invV = false
        if (this.point.x < 0) {
            invH = true
            this.point.x = 0
        } else if (this.point.x > this.canvasContext.canvas.width) {
            invH = true
            this.point.x = this.canvasContext.canvas.width
        }
        if (this.point.y < 0) {
            invV = true
            this.point.y = 0
        } else if (this.point.y > this.canvasContext.canvas.height) {
            invV = true
            this.point.y = this.canvasContext.canvas.height
        }
        if (invH || invV) {
            this.direction = Math.atan2(move.y * (invH ? -1 : 1), move.x * (invV ? -1 : 1))
        }
        this.canvasContext.beginPath( )
        this.canvasContext.lineWidth = 2
        this.canvasContext.strokeStyle = "red"
        this.canvasContext.moveTo(prevPosition.x, prevPosition.y)
        this.canvasContext.lineTo(this.point.x, this.point.y)
        this.canvasContext.stroke( )
    }

    onResize( ): void {
        this.point = new Point(
            Math.random( ) * this.canvasContext.canvas.width,
            Math.random( ) * this.canvasContext.canvas.height)
        this.direction = Math.random( ) * Math.PI * 2
    }
}
