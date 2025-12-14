import { Shape } from "./Shape";

export class Circle extends Shape {
    draw() {
        const g = this.graphics;
        g.clear();
        g.fill(this.color);
        g.ellipse(0, 0, 25, 25); 
        g.fill();
    }
}