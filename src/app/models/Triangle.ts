import { Shape } from "./Shape";

export class Triangle extends Shape {
    
    draw() {
        const g = this.graphics;
        g.fill(this.color);

        // draw the shape
        g.moveTo(0, 0);
        g.lineTo(50, 0);
        g.lineTo(25, 50);
        g.closePath();
    }
}