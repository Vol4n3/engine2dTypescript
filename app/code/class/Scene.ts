import {Drawable, DrawList} from "./interfaces";

export class Scene {

    public scene: HTMLElement;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public clearFrame: boolean = true;
    private drawList: DrawList[] = [];
    private isPlaying: boolean;
    private bufferDraws: string[] = [];

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

    public add(item: Drawable, id?: string) {
        this.drawList.push({
            item: item,
            id: id
        })
    }

    removeItem(id: string) {
        for (let i in this.drawList) {
            if (this.drawList[i].id === id) {
                delete this.drawList[i];
                break;
            }
        }
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
        if (this.isPlaying) {
            if (this.clearFrame) this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            for (let d: number = 0; d < this.drawList.length; d++) {
                let draw = this.drawList[d].item;
                this.context.save();
                this.context.beginPath();
                draw.draw(this.context);
                this.context.closePath();
                this.context.restore();
                if (draw.isCollide) this.checkCollision(draw, d);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    private searchBufferDraws(a: any, b: any): boolean {
        for (let i in this.bufferDraws) {
            if (this.bufferDraws[i] === a + "-" + b || this.bufferDraws[i] === b + "-" + a) return true;
        }
        return false;
    }

    private checkCollision(item: Drawable, i: number): void {
        for (let d: number = i; d < this.drawList.length; d++) {
            let draw = this.drawList[d].item;
            if (d !== i && draw.isCollide) {
                item.collisionTo(draw);
            }
        }
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
