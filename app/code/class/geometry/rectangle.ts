import {IDrawable} from "../interfaces";
import {Point} from "./Point";

export class Rectangle implements IDrawable {
    isCollide: boolean;
    dName: string = "Rectangle";
    centerPoint: Point = new Point();
    originPoint: Point = new Point();
    sizePoint: Point = new Point();
    pointMoving: string = "center";

    constructor(public x?: number, public y?: number, public width?: number, public height?: number) {
        this.init();
    }

    init(): void {
        this.initCenterPoint();
        this.initBound();
    }

    initBound(): void {
        this.initOriginPoint();
        this.initSizePoint();
    }

    initAt(center?: boolean) {
        if (center) {
            this.x = this.centerPoint.x - this.width * 0.5;
            this.y = this.centerPoint.y - this.height * 0.5;
            this.initBound();
        } else {
            this.x = this.originPoint.x;
            this.y = this.originPoint.y;
            this.width = this.sizePoint.x;
            this.height = this.sizePoint.y;
            this.initCenterPoint();
        }
    }
    update(){
        switch (this.pointMoving) {
            case "center":
                this.initAt(true);
                break;
            case "bound":
                this.initAt(false);
                break;
            default:
                this.init();
                break;
        }
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    initOriginPoint(): void {
        this.originPoint.x = this.x;
        this.originPoint.y = this.y;
    }

    initSizePoint(): void {
        this.sizePoint.x = this.width;
        this.sizePoint.y = this.height;
    }

    initCenterPoint(): void {
        this.centerPoint.x = (this.x * 2 + this.width) * 0.5;
        this.centerPoint.y = (this.y * 2 + this.height) * 0.5;
    }

    setCenterPoint(p: Point): Rectangle {
        this.centerPoint.x = p.x;
        this.centerPoint.y = p.y;
        this.x = p.x - this.width * 0.5;
        this.y = p.y - this.height * 0.5;
        return this;
    }

    getCenterPoint(): Point {
        return this.centerPoint;
    }

    setX(x: number): Rectangle {
        this.x = x;
        this.init();
        return this;
    }

    setWidth(width: number): Rectangle {
        this.width = width;
        this.init();
        return this;
    }

    setY(y: number): Rectangle {
        this.y = y;
        this.init();
        return this;
    }

    setHeight(height: number): Rectangle {
        this.height = height;
        this.init();
        return this;
    }

    collisionTo(object: IDrawable): void {
    }
}