
class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(other: Point): Point {
        this.x += other.x
        this.y += other.y
        return this
    }

    mull(number: number) {
        this.x *= number
        this.y *= number
        return this
    }

    static createFromDirection(direction: number): Point {
        return new Point(Math.cos(direction), Math.sin(direction))
    }

    static createFromDirectionAndLength(direction: number, length: number): Point {
        return Point.createFromDirection(direction).mull(length)
    }

    copy( ): Point {
        return new Point(this.x, this.y)
    }
}
