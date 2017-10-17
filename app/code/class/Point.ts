import {Drawable} from "./interfaces";
import {Vector} from "./Vector";
import {Segment} from "./Segment";

export class Point implements Drawable {
    public dName: string = "Point";
    public isCollide: boolean = false;
    public targetPos: Point;
    public size: number = 10;
    public color: string = "red";
    public velocity: Vector = new Vector();
    public gravity: Vector = new Vector();
    public isCollisionToBox: boolean = true;
    public groundBounce: number = -0.85;
    public friction: Vector = new Vector(0.95, 0.95);
    public isGround: boolean = false;
    public forcesList: Vector[] = [];
    public moveSpeed: number = 0;
    public bounce: number = 0.90;
    public masse: number = 1;
    private isTargeting: boolean = false;
    private distanceTemp: number = 0;
    private groundForce: Vector = new Vector();

    constructor(public x: number = 0, public y: number = 0, public clear?: boolean) {

    }

    collisionTo(object: Drawable): void {
        if (object.dName === "Point") {
            if (this.intersectToPoint(<Point>object)) {
                this.collisionToPoint(<Point>object);
            }
        }
    }
    collisionToPoint(p: Point){
        let lineIntersect = new Segment(this,p);
        lineIntersect.setLength(this.size + p.size,true);
        this.giveForce(p);
    }
    public giveForce(object: any): void {
        if (object.dName === "Point") {
            let RatioMasse: number = this.masse / object.masse;

        }
    }

    private bounceOnBox(w: number, h: number) {
        this.groundForce = new Vector(0, 0);

        let posXmax = this.x + this.size;
        let posXmin = this.x - this.size;

        let posYmax = this.y + this.size;
        let posYmin = this.y - this.size;

        if (posXmax > w) {
            this.x = w - this.size + this.gravity.getX();
            this.velocity.setX(this.velocity.getX() * this.groundBounce);
            this.groundForce.setX(-this.gravity.getX());
        }
        if (posXmin < 0) {
            this.x = this.size + this.gravity.getX();
            this.velocity.setX(this.velocity.getX() * this.groundBounce);
            this.groundForce.setX(-this.gravity.getX());
        }
        if (posYmax > h) {
            this.y = h - this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
        }
        if (posYmin < 0) {
            this.y = this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
        }
    }

    public update(): void {
        this.addForce(this.gravity);
        this.addForce(this.groundForce);
        this.velocity.multiply(this.friction);
        this.travel();
        this.translate(this.velocity.x, this.velocity.y);
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
        if (this.isCollisionToBox) {
            this.bounceOnBox(ctx.canvas.width, ctx.canvas.height);
        }
        this.update();
    }

    public addForce(v: Vector) {
        this.velocity.add(v);
    }
    public removeForce(v: Vector){
        this.velocity.soustract(v);
    }

    public setTarget(p: Point): void {
        this.targetPos = p;
        this.isTargeting = true;
        let v: Vector = new Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
        this.distanceTemp = v.getLength();
    }

    private travel() {
        if (this.isTargeting) {
            let vec = new Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
            let distance = vec.getLength();
            if (distance > this.moveSpeed + this.size) {
                vec.setLength(this.moveSpeed * distance / this.distanceTemp);
                this.addForce(vec);
            } else {
                this.isTargeting = false;
                this.velocity.multiply(new Vector(0.2, 0.2))
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

    public intersectToPoint(p: Point) {
        return this.distanceTo(p) < this.size + p.size;
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