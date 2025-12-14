import { Shape } from "./Shape";

export class Square extends Shape {
    size: number;

    constructor(x: number, y: number, color?: number) {
        super(x, y, color);

        this.size = 50;

        this.area = this.getArea();
    }

    draw() {
        const g = this.graphics;
        g.clear();
        g.fill(this.color);
        g.rect(0, 0, this.size, this.size);
        g.fill();
    }

    getArea(): number {
        return this.size * this.size;
    }
} 