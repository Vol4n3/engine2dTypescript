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
    public force: Vector = new Vector();
    public gravity: Vector = new Vector();
    public isCollisionToBox: boolean = true;
    public groundBounce: number = -0.85;
    public friction: Vector = new Vector(0.992, 0.992);
    public isGround: boolean = false;
    public moveSpeed: number = 0;
    public bounce: number = 0.85;
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
    //https://github.com/tanx8/Billards/blob/master/src/com/shaw/pool/CollisionPhysics.java

    public collisionToPoint(p :Point): void {

        let normal = new Segment(this, p);
        normal.setLength(this.size + p.size, true);

        let v1: Vector = new Vector(p.x - this.x, p.y - this.y);
        v1.setLength(this.velocity.getLength() * Math.cos(this.velocity.getCorner(v1)));

        let v2: Vector = new Vector(this.x - p.x,this.x - p.x);
        v2.setLength(p.velocity.getLength() * Math.cos(p.velocity.getCorner(v2)));

        this.addForce(v2.scalar(p.masse/this.masse * this.bounce));
        p.addForce(v1.scalar(this.masse/p.masse * p.bounce));

        this.addForce(v1.scalar(-1 * p.masse/this.masse * p.bounce));
        p.addForce(v2.scalar(-1 * this.masse/p.masse * this.bounce));

    }
    public getKineticEnergy(): number {
        return 0.5 * this.masse * (this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    }

    public getCollisionForce(p: Point): Vector {
        let ratioMasse: number = this.bounce * this.masse / p.masse;
        return new Vector(this.velocity.x * ratioMasse, this.velocity.y * ratioMasse)
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
            if(this.force.x > 0){
                this.groundForce.add(new Vector(-this.force.x,0));
            }
        }
        if (posXmin < 0) {
            this.x = this.size + this.gravity.getX();
            this.velocity.setX(this.velocity.getX() * this.groundBounce);
            this.groundForce.setX(-this.gravity.getX());
            if(this.force.x < 0){
                this.groundForce.add(new Vector(-this.force.x,0));
            }
        }
        if (posYmax > h) {
            this.y = h - this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
            if(this.force.y > 0){
                this.groundForce.add(new Vector(0,-this.force.y));
            }
        }
        if (posYmin < 0) {
            this.y = this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
            if(this.force.y < 0){
                this.groundForce.add(new Vector(0,-this.force.y));
            }
        }
    }

    public update(): void {
        this.velocity.add(this.gravity);
        this.velocity.add(this.force);
        this.velocity.add(this.groundForce);
        this.velocity.multiply(this.friction);
        this.force = new Vector();
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
        this.force.add(v);
    }

    public removeForce(v: Vector) {
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