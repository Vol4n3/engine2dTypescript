
import {Drawable, DrawList} from "./interfaces";

export class Scene {

    public scene: HTMLElement;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private drawList: DrawList[] = [];
    private isPlaying: boolean;
    public clearFrame: boolean = true;
    constructor(id: string) {
        this.init(id);
    }

    init(id: string) {
        this.scene = document.getElementById(id);
        this.canvas = document.createElement('canvas');
        this.scene.addEventListener('resize', this.resize);
        this.resize();
        this.context = this.canvas.getContext('2d');
        this.scene.appendChild(this.canvas);
        this.resume();
        requestAnimationFrame(this.draw.bind(this));
    }
    public add(item: Drawable, id?: string){
        this.drawList.push({
            item : item,
            id : id
        })
    }
    public resume() {
        this.isPlaying = true;
    }

    public pause() {
        this.isPlaying = false;
    }

    public toggle() {
        this.isPlaying = !this.isPlaying;
    }

    private draw(): void {
        if(this.isPlaying){
            if(this.clearFrame) this.context.clearRect(0,0,this.getWidth(),this.getHeight());
            for (let d in this.drawList) {
                let draw = this.drawList[d].item;
                this.context.save();
                this.context.beginPath();
                draw.draw(this.context);
                this.context.closePath();
                this.context.restore();
                if(draw.isCollide) this.checkCollision(draw);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }
    private checkCollision(item: Drawable){

    }
    private resize() {
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();
    }

    public getWidth() {
        return this.scene.clientWidth;
    }

    public getHeight() {
        return this.scene.clientHeight;
    }
}
