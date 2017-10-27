export class Vector {
    private length: number;
    private angle: number;

    constructor(public x: number = 0, public y: number = 0) {
        this.update();
    }

    update(): void {
        this.length = this.getLength();
        this.angle = this.getAngle();
    }

    setX(x: number): Vector {
        this.x = x;
        this.update();
        return this;
    }

    setY(y: number): Vector {
        this.y = y;
        this.update();
        return this;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getAngle(): number {
        return Math.atan2(this.y, this.x);
    }

    setAngle(angle: number): Vector {
        let length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        this.update();
        return this;
    }

    getLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    public dot(v: Vector):number {
        //Returns the scalar (dot) product of two vectors
        return (this.x * v.getX() + this.y * v.getY());

    }
    public scalar( scalar: number): Vector{

        let x:number = this.x * scalar;
        let y:number = this.y * scalar;

        return new Vector(x,y);
    }
    public getCorner(v: Vector): number {
        //Returns the angle between the vectors
        let cosa:number = this.dot(v) / (this.getLength() * v.getLength());

        //In case of infinity (undefined)
        if (cosa > 1.0)
        cosa = 1.0;
        else if(cosa < -1.0)
        cosa = -1.0;
        else if (isNaN(cosa))
        return 0;

        return (Math.acos(cosa));

    }
    setLength(length: number): Vector {
        let angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        this.update();
        return this;
    }

    public translate(x: number, y: number): Vector {
        this.x += x;
        this.y += y;
        this.update();
        return this;
    }

    public add(p: Vector): Vector {
        this.translate(p.x, p.y);
        this.update();
        return this;
    }

    public soustract(p: Vector): Vector {
        this.translate(-p.x, -p.y);
        this.update();
        return this;
    }

    public divide(p: Vector): Vector {
        this.x /= p.x;
        this.y /= p.y;
        this.update();
        return this;
    }

    public multiply(p: Vector): Vector {
        this.x *= p.x;
        this.y *= p.y;
        this.update();
        return this;
    }
}