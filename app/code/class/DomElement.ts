import {Rectangle} from "./geometry/rectangle";

export class DomElement extends Rectangle {
    public element: HTMLElement;

    constructor(element: HTMLElement) {
        let rect = element.getBoundingClientRect();
        super(rect.left, rect.top, rect.width, rect.height);
        this.element = element;

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        this.update();
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
        this.updateHTML()
    }
    updateHTML(): void {
        if(this.element){
        this.element.style.left = this.x + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.height = this.height + 'px';
        }
    }

}