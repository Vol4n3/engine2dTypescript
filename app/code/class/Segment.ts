import {Point} from "./Point";
import {Drawable} from "./interfaces";

export class Segment implements Drawable {
    isCollide: boolean;
    dName: string = "Segment";
    public color: string = "red";
    public width: number = 5;

    constructor(public p1: Point, public p2: Point) {

    }

    //todo make a good checkdraw
    checkDraw() {
        /*
        if(this.p1.checkDraw(ctx.canvas.width, ctx.canvas.height) ||
            this.p2.checkDraw(ctx.canvas.width, ctx.canvas.height)){
        }*/
    }

    collisionTo(object: Drawable): void {
        throw new Error("Method not implemented.");
    }

    public update() {
        this.p1.update();
        this.p2.update();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineCap = "round";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
        this.update();
    }

    intersectionToSegment(segment: Segment): Point | boolean {
        if (segment && segment.dName == "Segment") {
            var A1 = this.p2.y - this.p1.y,
                B1 = this.p1.x - this.p2.x,
                C1 = A1 * this.p1.x + B1 * this.p1.y,
                A2 = segment.p2.y - segment.p1.y,
                B2 = segment.p1.x - segment.p2.x,
                C2 = A2 * segment.p1.x + B2 * segment.p1.y,
                denominator = A1 * B2 - A2 * B1;

            if (denominator != 0) {
                var x = (B2 * C1 - B1 * C2) / denominator,
                    y = (A1 * C2 - A2 * C1) / denominator,
                    rx0 = (x - this.p1.x) / (this.p2.x - this.p1.x),
                    ry0 = (y - this.p1.y) / (this.p2.y - this.p1.y),
                    rx1 = (x - segment.p1.x) / (segment.p2.x - segment.p1.x),
                    ry1 = (y - segment.p1.y) / (segment.p2.y - segment.p1.y);
                if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
                    ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                    return new Point(x, y);
                } else {
                    return false;
                }

            } else {
                return false;
            }
        }
    }

    intersectLineTo(segment: Segment): Point | boolean {
        if (segment && segment.dName == "Segment") {
            var A1 = this.p2.y - this.p1.y,
                B1 = this.p1.x - this.p2.x,
                C1 = A1 * this.p1.x + B1 * this.p1.y,
                A2 = segment.p2.y - segment.p1.y,
                B2 = segment.p1.x - segment.p2.x,
                C2 = A2 * segment.p1.x + B2 * segment.p1.y,
                denominator = A1 * B2 - A2 * B1;
            if (denominator != 0) {
                var x = (B2 * C1 - B1 * C2) / denominator;
                var y = (A1 * C2 - A2 * C1) / denominator;
                return new Point(x, y);
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    setLength(length: number, atEnd: boolean): Segment {
        if (atEnd) {
            let angle: number = this.getAngle(false);
            this.p2.x = this.p1.x + Math.cos(angle) * length;
            this.p2.y = this.p1.y + Math.sin(angle) * length;
        } else {
            let angle: number = this.getAngle(true);
            this.p1.x = this.p2.x + Math.cos(angle) * length;
            this.p1.y = this.p2.y + Math.sin(angle) * length;
        }
        return this;
    }

    getLength(): number {
        return this.p1.distanceTo(this.p2);
    }

    setAngle(angle: number, atEnd: boolean): Segment {

        return this;
    }

    getAngle(atEnd: boolean): number {
        if (atEnd) {
            return this.p2.angleTo(this.p1);
        } else {
            return this.p1.angleTo(this.p2);
        }
    }

}