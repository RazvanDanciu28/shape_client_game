import { Shape } from "./Shape";

export class Square extends Shape {
    draw() {
        const g = this.graphics;
        g.clear();
        g.fill(this.color);
        g.rect(0, 0, 50, 50);
        g.fill();
    }
} 