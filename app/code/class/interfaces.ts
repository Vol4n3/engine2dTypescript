export interface IDrawable {
    isCollide: boolean;
    dName : string;
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
    collisionTo(object: IDrawable): void;
}

export interface IDrawList {
    item: IDrawable;
    id: string;
}