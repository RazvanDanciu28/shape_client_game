import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js'

@Component({
  selector: 'app-canvas',
  standalone: false,
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnInit{
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  pixiApp!: PIXI.Application;

  async ngOnInit(): Promise<void> {
    this.pixiApp = new PIXI.Application();

    await this.pixiApp.init({
      width: 500,
      height: 500,
      backgroundColor: 0xf0dfdf
    });

    this.pixiContainer.nativeElement.appendChild(this.pixiApp.canvas);

    const graphics = new PIXI.Graphics();
    graphics.fill(0xff0000); 
    graphics.rect(50, 50, 100, 100);
    graphics.fill(); 
    this.pixiApp.stage.addChild(graphics);
  }
}
