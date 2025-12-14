import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  
  numberOfShapes: number = 0;
  totalShapesArea: number = 0;

  get gravity(): number {
    return Shape.gravity;
  }
  numberOfShapesGeneratedPerSecond: number = 1;

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

      const clickedShape = this.getShapeAtPosition(x, y);
      if (clickedShape) {
        this.removeShape(clickedShape);
        return;
      }

      this.spawnRandomShape(x, y);
    });

    // generate random shapes at random position at 1 sec interval
    setInterval(() => {
      for (let i = 0; i < this.numberOfShapesGeneratedPerSecond; i += 1) {
        const randomX = Math.random() * this.pixiApp.renderer.width;
        this.spawnRandomShape(randomX);
      }
        
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
    this.totalShapesArea = 0;

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];

      shape.update();

      // check if shape is out of bounds => remove it from the array and from the canvas
      if (shape.isOutOfBounds(this.pixiApp.renderer.width, this.pixiApp.renderer.height)) {
        this.pixiApp.stage.removeChild(shape.graphics);
        this.shapes.splice(i, 1);
        continue;
      }

      this.totalShapesArea += this.shapes[i].area;
    }

    this.numberOfShapes = this.shapes.length;
  }

  getShapeAtPosition(x: number, y: number): Shape | null {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      const bounds = shape.graphics.getBounds();

      if (x >= bounds.x &&
          x <= bounds.x + bounds.width &&
          y >= bounds.y &&
          y <= bounds.y + bounds.height) {
          return shape;
      }
    }

    // no shape found
    return null; 
  }

  removeShape(shape: Shape) {
    this.pixiApp.stage.removeChild(shape.graphics);

    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  increaseGravity() {
    Shape.gravity += 1;
  }

  decreaseGravity() {
    // do not got lower than 0
    Shape.gravity = Math.max(0, Shape.gravity - 1);
  }

  increaseNumberOfShapesGeneratedPerSecond() {
    this.numberOfShapesGeneratedPerSecond += 1;
  }

  decreaseNumberOfShapesGeneratedPerSecond() {
    // do not go lower than 0
    this.numberOfShapesGeneratedPerSecond = Math.max(0, this.numberOfShapesGeneratedPerSecond - 1);
  }
} 
