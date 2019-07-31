import {RandomWalker, minX, minY} from "./main.js";

class CanvasWalker extends RandomWalker {

    constructor(pixelSize = 10, rows = 500, columns = 500, speed = 10, particleStepMax = 20) {
        super(pixelSize, rows, columns, speed);
        this.particleStepMax = particleStepMax;
        this.particleStep = Math.floor(1 + Math.random() * this.particleStepMax);

    }
    generateGrid() {

    }

    addWalker(startingX, startingY, color) {
        let walker = super.addWalker(startingX, startingY, color);
        $('#canvasContainer').append("<canvas height='500' width='500' style='border: 1px solid black; position: absolute; top:0; left:0;'></canvas>");
        walker.context = $('canvas:last')[0].getContext('2d');
        walker.context.moveTo(startingX, startingY);
        walker.context.strokeStyle = walker.color;
    }

    move(walker, x, y) {
        walker.context.moveTo(x,y);
        let newX = x;
        let newY = y;

        if (newX > this.rows) {
            newX = this.rows;
        } else if(newX < minX) {
            newX = minX;
        } else {
            if(Math.random() > 0.5) {
                newX += Math.floor(Math.random() * this.particleStep);
            }else {
                newX -= Math.floor(Math.random() * this.particleStep);
            }
        }

        if (newY > this.columns) {
            newY = this.columns;
        } else if (y < minY) {
            newY = minY;
        } else {
            if(Math.random() > 0.5) {
                newY += Math.floor(Math.random() * this.particleStep);
            }else {
                newY -= Math.floor(Math.random() * this.particleStep);
            }
        }

        return [newX,newY];
    }

    setAsVisited(walker, x, y) {
        walker.context.lineTo(x,y);
        walker.context.stroke();
    }
}

// let wormWalker = new CanvasWalker();
// wormWalker.addWalker(1,1,'black');
// wormWalker.addWalker(250,250, 'red');
// wormWalker.addWalker(450,450, 'blue');
// wormWalker.start();