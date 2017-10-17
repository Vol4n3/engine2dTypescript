import {Drawable} from "./interfaces";

export class Tile implements Drawable{
    isCollide: boolean;

    constructor(public x?:number,public y?:number,public width?:number,public height?:number){

    }
    draw(ctx: CanvasRenderingContext2D): void {
    }
    loadImage(url: string):boolean{
        return false;
    }
}