export interface Drawable {
    isCollide: boolean;
    dName : string;
    draw(ctx: CanvasRenderingContext2D): void;
    collisionTo(object: Drawable): void;
}

export interface DrawList {
    item: Drawable;
    id: string;
}