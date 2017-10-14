import {Point} from "./Point";
import {Drawable} from "./interfaces";

export class Segment implements Drawable{
    isCollide: boolean;
    public color: string = "red";
    public width: number = 3;
    constructor(public p1:Point, public p2:Point){

    }
    //todo make a good checkdraw
    checkDraw(){
        /*
        if(this.p1.checkDraw(ctx.canvas.width, ctx.canvas.height) ||
            this.p2.checkDraw(ctx.canvas.width, ctx.canvas.height)){
        }*/
    }
    public update(){
        this.p1.update();
        this.p2.update();
    }
    public draw(ctx: CanvasRenderingContext2D): void {
            ctx.moveTo(this.p1.x,this.p1.y);
            ctx.lineTo(this.p2.x,this.p2.y);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.stroke();
            this.update();
    }
    intersection(){

    }
    getLength():number {
        return this.p1.distanceTo(this.p2);
    }
    getAngle(atEnd : boolean){
        if(atEnd){
            return this.p2.angleTo(this.p1);
        }else{
            return this.p1.angleTo(this.p2);
        }
    }

}