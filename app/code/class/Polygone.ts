import {Point} from "./Point";
import {Segment} from "./Segment";
import {Drawable} from "./interfaces";

export class Polygone implements Drawable {
    isCollide: boolean;

    public segmentList: Segment[];
    public side: number;

    constructor(...segmentList: Segment[]) {
        this.side = segmentList.length;
        this.segmentList = segmentList;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for (let seg in this.segmentList) {
            this.segmentList[seg].draw(ctx);
        }
    }
}
