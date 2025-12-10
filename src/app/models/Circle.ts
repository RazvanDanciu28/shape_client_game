import { Shape } from "./Shape";

export class Circle extends Shape {
    draw() {
        const g = this.graphics;
        g.fill(this.color);
        // radius 1 by default
        g.ellipse(this.position.x, this.position.y, 1, 1);
    }
}