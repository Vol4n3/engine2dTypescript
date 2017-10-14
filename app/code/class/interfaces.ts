export interface Drawable {
    isCollide: boolean;

    draw(ctx: CanvasRenderingContext2D): void;
}

export interface DrawList {
    item: Drawable;
    id: string;
}