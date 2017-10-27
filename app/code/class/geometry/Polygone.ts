import {Segment} from "./Segment";
import {IDrawable} from "../interfaces";

export class Polygone implements IDrawable {
    update(): void {
        throw new Error("Method not implemented.");
    }

    isCollide: boolean;
    public dName: string = "Polygone";
    public segmentList: Segment[];
    public side: number;

    constructor(...segmentList: Segment[]) {
        this.side = segmentList.length;
        this.segmentList = segmentList;
    }
    collisionTo(object: IDrawable): void {
        throw new Error("Method not implemented.");
    }
    draw(ctx: CanvasRenderingContext2D): void {
        for (let seg in this.segmentList) {
            this.segmentList[seg].draw(ctx);
        }
    }
}
