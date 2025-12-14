import * as PIXI from 'pixi.js';
import { Point } from 'pixi.js';

export abstract class Shape {
    public graphics!: PIXI.Graphics;
    public position!: Point;
    public color!: number;
    public static gravity: number = 1; // default gravity
    public area: number = 0;

    constructor(x: number, y: number, color?: number) {
        this.position = new Point(x, y);
        // generate random color if not given
        this.color = color ?? Math.floor(0x1000000 * Math.random()); 
        this.graphics = new PIXI.Graphics();

        // initial position
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;

        this.area = this.getArea();
    }

    // abstract methods
    abstract draw(): void;

    abstract getArea(): number;

    public update() {
        // update the y position with the gravity value
        this.position.y += Shape.gravity;
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }

    public isOutOfBounds(canvasWidth: number, canvasHeight: number, offset: number = 50): boolean {
        return (
            this.position.y > canvasHeight + offset ||   
            this.position.y < -offset ||                
            this.position.x > canvasWidth + offset ||  
            this.position.x < -offset                  
        );
    }

    // other methods
}