import { Shape } from "./Shape";

export class Circle extends Shape {
    radius: number;

    constructor(x: number, y: number, color?: number) {
        super(x, y, color);

        this.radius = 25;

        this.area = this.getArea();
    }

    draw() {
        const g = this.graphics;
        g.clear();
        g.fill(this.color);
        g.ellipse(0, 0, this.radius, this.radius); 
        g.fill();
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}