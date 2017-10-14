import {Drawable} from "./interfaces";
import {Vector} from "./Vector";

export class Point implements Drawable {

    public isCollide: boolean;
    public targetPos: Point;
    public size: number = 10;
    public color: string = "red";
    public velocity: Vector = new Vector();
    public gravity: Vector = new Vector(0, 2);
    public checkBox: boolean = true;
    public bounce: number = -0.8;
    public isGround: boolean = false;
    private isTargeting: boolean = false;
    private distanceTemp: number = 0;
    private moveSpeed: number = 1;


    constructor(public x: number = 0, public y: number = 0, public clear?: boolean) {

    }

    private bounceOnBox(w: number, h: number) {
        this.isGround = false;

        let posXmax = this.x + this.size;
        let posXmin = this.x - this.size;

        let posYmax = this.y + this.size;
        let posYmin = this.y - this.size;

        if (posXmax > w) {
            this.x =  w - this.size + 1;
            this.velocity.setX(this.velocity.getX() * this.bounce);
        }
        if (posXmin < 0) {
            this.x = this.size + 1;
            this.velocity.setX(this.velocity.getX() * this.bounce);
        }
        if (posYmax > h) {
            this.y = h - this.size + 1;
            this.velocity.setY(this.velocity.getY() * this.bounce);
            this.isGround = true;
        }
        if (posYmin < 0) {
            this.y = this.size +1 ;
            this.velocity.setY(this.velocity.getY() * this.bounce);

        }
    }

    public update(): void {
        if (!this.isGround) this.velocity.add(this.gravity);
        this.translate(this.velocity.x, this.velocity.y);
        this.travel();
    }

    public checkDraw(w: number, h: number): boolean {
        let posXmax = this.x + this.size;
        let posYmax = this.y + this.size;
        let posXmin = this.x - this.size;
        let posYmin = this.y - this.size;
        let seeX = w > posXmin && 0 < posXmax;
        let seeY = h > posYmin && 0 < posYmax;
        return seeX && seeY;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.checkDraw(ctx.canvas.width, ctx.canvas.height)) {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if (this.checkBox) {
            this.bounceOnBox(ctx.canvas.width, ctx.canvas.height);
        }
        this.update();
    }

    setTarget(p: Point) {
        this.targetPos = p;
        this.isTargeting = true;
        let v: Vector = new Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
        this.distanceTemp = v.getLength();
    }

    private travel() {
        if (this.isTargeting) {
            let vec = new Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
            if (vec.getLength() > this.moveSpeed) {
                vec.setLength(this.moveSpeed);
                this.translate(vec.x, vec.y);
            } else {
                this.isTargeting = false;
            }
        }
    }

    public translate(x: number, y: number): Point {
        this.x += x;
        this.y += y;
        return this;
    }

    public add(p: Point): Point {
        this.translate(p.x, p.y);
        return this;
    }

    public soustract(p: Point): Point {
        this.translate(-p.x, -p.y);
        return this;
    }

    public divide(p: Point): Point {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    }

    public multiply(p: Point): Point {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    }

    public angleTo(p: Point): number {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }

    public distanceTo(p: Point): number {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public signTo(p1: Point, p2: Point): number {
        return (this.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (this.y - p2.y);
    }

    public inTriangle(p1: Point, p2: Point, p3: Point, strict: boolean): boolean {
        let b1, b2, b3;
        if (strict) {
            b1 = this.signTo(p1, p2) < 0;
            b2 = this.signTo(p2, p3) < 0;
            b3 = this.signTo(p3, p1) < 0;
        } else {
            b1 = this.signTo(p1, p2) <= 0;
            b2 = this.signTo(p2, p3) <= 0;
            b3 = this.signTo(p3, p1) <= 0;
        }
        return ((b1 == b2) && (b2 == b3));
    }

}