

function getzeroshema() {
    let res = new Array(30).fill(0);
    for (let i = 0; i < 30; i++) {
        res[i] = new Array(30).fill(0);
    }
    return res;
}

function checkskala(r) {
    let n = Math.floor(Math.random() * 100);
    if (n >= (100 - r)) {
        return 1;
    } else {
        return 0;
    }
}

function getMaxRandom(max, x = 0) {
    let n = Math.floor(Math.random() * (max + 1));
    if (x > 0 && n == 0) {
        return getMaxRandom(max, 1);
    }
    return n;
}

function createRandomMap(table, density) {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {

            let r = checkskala(density);
            if (r) {
                table[i][j] = getMaxRandom(23);
            } else {
                table[i][j] = 0;
            }
        }
    }

    return table;

}

function fillBigCanva(table, type = 1) {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = 'white';

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            fillImage(ctx, table[i][j], i, j, type);

        }
    }
}

function clearRect() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = 'silver';
    ctx.clearRect(0, 0, 900, 900);
}

function fillImage(ctx, value, i, j, type) {
    if (value > 0) {
        let imgpath = getImg(type, value);
        if (imgpath) {
            let obrazek = new Image();
            obrazek.src = imgpath;
            ctx.drawImage(obrazek, 30 * i, 30 * j, 30, 30);
        }
    } else {
        ctx.fillRect(30 * i, 30 * j, 30, 30);
    }
}

function getPosPuzzles(nrpuzzles, mapa) {

    let table = [];

    for (i = 0; i < nrpuzzles; i++) {
        res = getMaxRandom(23, 1);
        if (checkPosiSGood(res, mapa)) {
            table.push(res);
        } else {
            i--;
        }
    }
    return table;
}

function movepos(pos) {
    let nr = pos.length;
    for (i = 0; i < nr - 1; i++) {
        pos[i] = pos[i + 1];
    }
    pos[nr - 1] = getMaxRandom(23, 1);
    return pos;
}

function checkPosiSGood(res, table) {
    let reso = 0;
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (table[i][j] == res) {
                reso = 1;
                break;
            }
        }
    }
    return reso;
}

function fillSmallCanva(pos, type = 1) {

    let nr = pos.length;

    for (i = 1; i <= nr; i++) {
        let c = document.getElementById("puzzle" + i);
        let ctx = c.getContext("2d");
        ctx.fillStyle = 'white';
        fillPuzzle(pos[i - 1], type, ctx);
    }
}

function fillPuzzle(pos, type, ctx) {

    let imgpath = getImg(type, pos, 2);

    if (imgpath) {
        let obrazek = new Image();
        obrazek.src = imgpath;
        ctx.drawImage(obrazek, 0, 0, 60, 60);
    }
}

function seeSolution(pos, table) {
    let nr = pos.length;
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 4;
    ctx.strokeStyle = "navy";
    ctx.lineJoin = "bevel";
    for (i = 0; i < nr; i++) {
        for (let k = 0; k < 30; k++) {
            for (let j = 0; j < 30; j++) {
                if (table[k][j] == pos[i]) {
                    ctx.strokeRect(k * 30, j * 30, 30, 30);
                }
            }
        }

    }
}

function getImg(type, nr, mini = 1) {

    path = "grafika/";
    switch (type) {
        case 1:
            path += nr;
            break;
        case 2:
            path += "a" + nr;
            break;
        case 3:
            path += "e" + nr;
            break;
    }
    if (mini == 1) {
        path += "_mini.jpg";
    } else {
        path += "_big.jpg";
    }
    return path;
}

function setGraphics(type) {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    for (let i = 1; i <= 23; i++) {
        let imgpath = getImg(type, i);
        if (imgpath) {
            let obrazek = new Image();
            obrazek.src = imgpath;
            ctx.drawImage(obrazek, 0, 0, 30, 30);
        }
    }
}

function checkposFit(pos, mousepos) {

    let diffX = Math.abs(pos[0] * 30 - mousepos[0]);
    let diffY = Math.abs(pos[1] * 30 - mousepos[1]);

    if (diffX < 10 && diffY < 10) {
        return 1;
    }
    return 0;
}



function changePlaceInBigCanva(pos, table, density) {
    let newTable = table;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            newTable[pos[0] + i][pos[1] + j] = 3;

            let r = checkskala(density);
            if (r) {
                newTable[pos[0] + i][pos[1] + j] = getMaxRandom(23);
            } else {
                newTable[pos[0] + i][pos[1] + j] = 0;
            }
        }
    }

    return newTable;
}

function setNewPosPuzzle(puzzlePos, nr) {
    let len = 30 - 6;
    let pos = [];
    for (i = 0; i < 1; i++) {
        let x = getMaxRandom(len);
        let y = getMaxRandom(len);
        if (checkPosiSGood(x, y, puzzlePos, nr)) {
            pos = [x, y];
        } else {
            i--;
        }
    }
    return pos;
}

function changeSmallPuzzle(pos, table, id, type) {
    let c = document.getElementById("puzzle" + id);
    let ctx = c.getContext("2d");
    ctx.fillStyle = 'white';
    fillPuzzle(table, pos, type, ctx);
}


