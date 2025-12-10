import { Shape } from "./Shape";

export class Square extends Shape {
    draw() {
        const g = this.graphics;
        g.fill(this.color);
        g.roundRect(this.position.x, this.position.y, 1, 1);
    }
} 