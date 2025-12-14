import { Shape } from "./Shape";

export class Triangle extends Shape {
    base!: number;
    height!: number;

    constructor(x: number, y: number, color?: number) {
        super(x, y, color);

        this.base = 50;   
        this.height = 50; 

        this.area = this.getArea();
    }

    draw() {
        const g = this.graphics;
        g.clear();
        g.fill(this.color);

        g.moveTo(0, 0);
        g.lineTo(this.base, 0);     
        g.lineTo(this.base / 2, this.height); 
        g.closePath();

        g.fill();
    }

     getArea(): number {
        return 0.5 * this.base * this.height;
    }
}