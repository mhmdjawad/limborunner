export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    multiply(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
    divide(v) {
        return new Vector2(this.x / v.x, this.y / v.y);
    }
    scale(s) {
        return new Vector2(this.x * s, this.y * s);
    }
    length() {
        return this.lengthSquared() ** .5;
    }
    lengthSquared() {
        return this.x ** 2 + this.y ** 2;
    }
    distance(v) {
        return this.distanceSquared(v) ** .5;
    }
    distanceSquared(v) {
        return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
    }
    normalize(length = 1) {
        const l = this.length();
        return l ? this.scale(length / l) : new Vector2(0, length);
    }
    clampLength(length = 1) {
        const l = this.length();
        return l > length ? this.scale(length / l) : this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    angle() {
        return Math.atan2(this.x, this.y);
    }
    setAngle(a = 0, length = 1) {
        this.x = length * Math.sin(a);
        this.y = length * Math.cos(a);
        return this;
    }
    rotate(a) {
        const c = Math.cos(a),
            s = Math.sin(a);
        return new Vector2(this.x * c - this.y * s, this.x * s + this.y * c);
    }
    direction() {
        return abs(this.x) > abs(this.y) ? this.x < 0 ? 3 : 1 : this.y < 0 ? 2 : 0;
    }
    invert() {
        return new Vector2(this.y, -this.x);
    }
    floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    area() {
        return abs(this.x * this.y);
    }
    lerp(v, p) {
        return this.add(v.subtract(this).scale(clamp(p)));
    }
    arrayCheck(arraySize) {
        return this.x >= 0 && this.y >= 0 && this.x < arraySize.x && this.y < arraySize.y;
    }
    toString(digits = 3) {
        return `(${(this.x<0?'':' ') + 
            this.x.toFixed(digits)
        },${(this.y<0?'':' ') + 
            this.y.toFixed(digits)
        } )`;

    }

}