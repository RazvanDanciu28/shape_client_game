import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js'
import { Shape } from '../models/Shape';
import { ShapeTypeEnum } from '../enums/ShapeTypeEnum';
import { Triangle } from '../models/Triangle';
import { Square } from '../models/Square';
import { Circle } from '../models/Circle';

@Component({
  selector: 'app-canvas',
  standalone: false,
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnInit{
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  pixiApp!: PIXI.Application;
  shapes: Shape[] = [];

  async ngOnInit(): Promise<void> {
    // generate the canvas
    this.pixiApp = new PIXI.Application();

    await this.pixiApp.init({
      width: 500,
      height: 500,
      backgroundColor: 0xf0dfdf
    });

    this.pixiContainer.nativeElement.appendChild(this.pixiApp.canvas);

    // add click listener to generate a shape when the user clicks on the canvas
    this.pixiApp.canvas.addEventListener('pointerdown', (event: MouseEvent) => {
      const rect = this.pixiApp.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.spawnRandomShape(x, y);
    });

    // generate random shapes at random position at 1 sec interval
    setInterval(() => {
        const randomX = Math.random() * this.pixiApp.renderer.width;
        this.spawnRandomShape(randomX);
    }, 1000);

    this.pixiApp.ticker.add(() => this.updateShapes());
  }

  spawnRandomShape(x: number, y?: number) {
    if (!y) {
      y = -10;
    }

    // choose random shape between Circle, Triangle and Square
    const randomType = Math.floor(Math.random() * 3) + 1; // 1-3
    let shape!: Shape;

    switch(randomType) {
        case ShapeTypeEnum.Triangle:
            shape = new Triangle(x, y);
            break;
        case ShapeTypeEnum.Square:
            shape = new Square(x, y);
            break;
        case ShapeTypeEnum.Circle:
            shape = new Circle(x, y);
            break;
    }

    shape.draw();
    this.pixiApp.stage.addChild(shape.graphics);
    this.shapes.push(shape);

    console.log(this.shapes);
  }

  updateShapes(): void {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];

      shape.update();

      // check if shape is out of bounds => remove it from the array and from the canvas
      if (shape.isOutOfBounds(this.pixiApp.renderer.width, this.pixiApp.renderer.height)) {
        this.pixiApp.stage.removeChild(shape.graphics);
        this.shapes.splice(i, 1);
      }
    }
  }
}
