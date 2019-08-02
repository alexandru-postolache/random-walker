import {RandomWalker, minX, minY} from "./main.js";

class WormWalker extends RandomWalker {
    move(walker, x, y) {
        return this.getNewPosition(x,y)
    }

    getValueForXOutOfBounds(x,y) {
        if (x >= this.rows-1){
            if (this.isVisited(x - 1, y)) {
                return x;
            }else {
                return x--;
            }
        }else if (x <= minX) {
            if (this.isVisited(x + 1, y)) {
                // we cannot move here, we need to move on the y axis
                return x;
            }else {
                return x++;
            }
        }
    }

    getValueForYOutOfBounds(x,y) {
        if (y >= this.columns-1){
            if (this.isVisited(x, y - 1)) {
                return y;
            }else {
                return y--;
            }
        }else if (y <= minY) {
            if (this.isVisited(x, y + 1)) {
                // we cannot move here, we need to move on the x axis
                return y;
            }else {
                return y++;
            }
        }
    }

    isXOutOfBounds(x) {
        return x >= this.rows-1 || x <= minX;
    }

    isYOutOfBounds(y) {
        return y >= this.columns-1 || y <= minY;
    }


    moveOnXAxis(x,y) {
        let newX = x;

        if (this.isXOutOfBounds(x)) {
            newX = this.getValueForXOutOfBounds(x,y);
        } else {
            if (Math.random() < 0.5) {
                if (!this.isVisited(x + 1, y)) {
                    newX++;
                }else if(!this.isVisited(x - 1, y)){
                    newX--;
                }
            } else {
                if(!this.isVisited(x - 1, y)) {
                    newX--;
                }else if (!this.isVisited(x + 1, y)) {
                    newX++;
                }
            }
        }

        return newX;
    }

    moveOnYAxis(x,y) {
        let newY = y;

        if (this.isYOutOfBounds(y)) {
            newY = this.getValueForYOutOfBounds(x,y);
        } else {
            if(Math.random() < 0.5) {
                if(!this.isVisited(x,y+1)) {
                    newY++;
                }else if(!this.isVisited(x, y-1)) {
                    newY--;
                }
            }else {
                if (!this.isVisited(x, y-1)){
                    newY--;
                }else if(!this.isVisited(x,y+1)) {
                    newY++;
                }
            }
        }

        return newY;
    }

    getNewPosition(x,y) {
        let newX = x;
        let newY = y;

        let startWith = Math.random() < 0.5 ? "i" : "j";

        // starts with x axis and we have free neighbors there
        if (startWith === "i" && this.haveNeighboarsNotVisitedForX(x,y)) {
            newX = this.moveOnXAxis(x,y);
        }
        // if we cannot move on the x axis
        if(startWith === "i" && newX == x) {
            if(this.haveNeighboarsNotVisitedForY(x,y)) {
                newY = this.moveOnYAxis(x,y);
            }
        }

        // starts with y axis and we have free neighbors there
        if((startWith === "j" && this.haveNeighboarsNotVisitedForY(x,y))) {
            newY = this.moveOnYAxis(x,y);
        }
        // if we cannot move on the y axis
        if(startWith === "j" && newY == y) {
            if(this.haveNeighboarsNotVisitedForX(x,y)) {
                newX = this.moveOnXAxis(x,y);
            }
        }

        if(x == newX && y == newY){
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
// wormWalker.addWalker(25,25,'black');
// wormWalker.addWalker(25,25,'red');
// wormWalker.addWalker(25,25,'blue');
// wormWalker.start();