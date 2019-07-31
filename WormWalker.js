import {RandomWalker, minX, minY} from "./main.js";

class WormWalker extends RandomWalker {
    move(walker, x, y) {
        return this.getNewPosition(x,y)
    }

    getNewPosition(x,y) {
        let newX = x;
        let newY = y;
        let xChanged = false;
        let yChanged = false;
        let startWith = Math.random() < 0.5 ? "i" : "j";

        if (startWith === "i" && this.haveNeighboarsNotVisitedForX(x,y)) {
            if (x >= this.rows && !this.isVisited(x - 1, y)) {
                newX--;
                xChanged = true;
            } else if (x <= minX && !this.isVisited(x + 1, y)) {
                newX++;
                xChanged = true;
            } else {
                if (Math.random() > 0.5) {
                    if (!this.isVisited(x + 1, y)) {
                        newX++;
                        xChanged = true;
                    }
                } else {
                    newX--;
                    xChanged = true;
                }
            }
        }
        if((startWith === "j" && this.haveNeighboarsNotVisitedForY(x,y)) || (startWith === "i" && xChanged == false)) {
            if (y >= this.columns && !this.isVisited(x,y-1)) {
                newY--;
                yChanged = true;
            } else if (y <= minY && !this.isVisited(x,y+1)) {
                newY++;
                yChanged = true;
            } else {
                if(Math.random() > 0.5) {
                    if(!this.isVisited(x,y+1)) {
                        newY++;
                        yChanged = true;
                    }
                }else {
                    newY--;
                    yChanged = true;
                }
            }
        }
        if(!xChanged && !yChanged){
            console.log("No where to go!");
            return [-1,-1];
        }

        return [newX,newY];
    }

    haveNeighboarsNotVisitedForX(x,y) {
        let previousX = x - 1;
        let nextX = x + 1;
        return !$('#' + previousX + '_' + y).hasClass('visited') || !$('#' + nextX + '_' + y).hasClass('visited');
    }

    haveNeighboarsNotVisitedForY(x,y) {
        let previousY = y - 1;
        let nextY = y + 1;
        return !$('#' + x + '_' + previousY).hasClass('visited') || !$('#' + x + '_' + nextY).hasClass('visited');
    }

    isVisited(x,y) {
        return $('#' + x + '_' + y).hasClass('visited');
    }
}

// let wormWalker = new WormWalker();
// wormWalker.addWalker(10,10,'black');
// wormWalker.start();