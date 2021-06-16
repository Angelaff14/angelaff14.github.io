function renderBox(box) {
    var el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.backgroundColor = box.color || 'grey';
    el.style.display = 'inline-block';
    el.style.boxSizing = 'border-box';
    if (isSamePosition(box.position, [5, 3])) {
        el.style.backgroundColor = 'lightskyblue';
    }
    return el;
}
function isSamePosition(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}
function isLimit(v) {
    return v === 0 || v === 6;
}
function arrUnique(arr) {
    return arr.filter(function (el, i, arr) {
        return arr.indexOf(el, 0) === i;
    });
}
function arrCompare(arr1, arr2) {
    var flag = true;
    for (var i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        if (arr1[i] !== arr2[i]) {
            flag = false;
            break;
        }
    }
    return flag;
}
var Board = /** @class */ (function () {
    function Board() {
        this.matrix = [];
        for (var i = 0; i < 7; i++) {
            var boxArr = [];
            for (var j = 0; j < 7; j++) {
                var box = void 0;
                if (isLimit(i) || isLimit(j)) {
                    box = {
                        color: null,
                        canPlayerMove: false,
                        position: [i, j]
                    };
                }
                else {
                    box = {
                        color: (i + j) % 2 === 0 ? 'white' : 'black',
                        canPlayerMove: true,
                        position: [i, j]
                    };
                }
                boxArr.push(box);
            }
            this.matrix.push(boxArr);
        }
    }
    return Board;
}());
var Step = /** @class */ (function () {
    function Step() {
        this.amount = (Math.round(Math.random() * 2) + 5);
        switch (this.amount) {
            case 5:
                this.first = (Math.round(Math.random()) + 2);
                this.last = (this.amount - this.first);
                break;
            case 6:
                this.first = ((Math.round(Math.random()) + 1) * 2);
                this.last = (this.amount - this.first);
                break;
            default:
                this.first = (Math.round(Math.random()) + 3);
                this.last = (this.amount - this.first);
                break;
        }
        this.current = this.first;
    }
    Step.prototype.move = function (distance, part) {
        var c = part < 5 ? this.first : this.last;
        if (c >= distance) {
            return c - distance;
        }
        else {
            console.log('You already touch the limit');
        }
    };
    Step.prototype.partTransformation = function () {
        this.current = this.last;
    };
    return Step;
}());
var Player = /** @class */ (function () {
    function Player(pos) {
        this.position = pos || [5, 3];
        this.step = new Step();
    }
    Player.prototype.turnUp = function () {
        this.position[0] -= 1;
    };
    Player.prototype.turnDown = function () {
        this.position[0] += 1;
    };
    Player.prototype.turnLeft = function () {
        this.position[1] -= 1;
    };
    Player.prototype.turnRight = function () {
        this.position[1] += 1;
    };
    return Player;
}());
function renderPlayer(p, part) {
    var el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.display = 'flex';
    el.style.borderRadius = '40px';
    el.style.background = 'yellowgreen';
    el.style.color = 'yellow';
    el.style.lineHeight = '100px';
    el.style.fontSize = part === 1 ? '33px' : '100px';
    el.style.textAlign = 'center';
    el.style.justifyContent = 'center';
    el.innerText = part === 1 ? p.step.first + '' + ' + ' + p.step.last + '' : p.step.current + '';
    return el;
}
var GuardStartPositionX = [
    [
        [0, 2],
        [0, 4]
    ],
    [
        [6, 2],
        [6, 4]
    ]
];
var GuardStartPositionY = [
    [
        [2, 0],
        [4, 0]
    ],
    [
        [2, 6],
        [4, 6]
    ]
];
var Guard = /** @class */ (function () {
    function Guard(pos) {
        this.moved = false;
        this.step = (Math.round(Math.random() * 2) + 1);
        if (pos) {
            var res = this.checkPositon(pos);
            if (res) {
                this.position = pos;
                this.axis = res;
            }
        }
        else {
            this.initPosition();
        }
    }
    Guard.prototype.initPosition = function () {
        this.axis = Math.round(Math.random()) ? 'x' : 'y';
        if (this.axis === 'x') {
            this.position = GuardStartPositionX[Math.round(Math.random())][Math.round(Math.random())];
        }
        else {
            this.position = GuardStartPositionY[Math.round(Math.random())][Math.round(Math.random())];
        }
    };
    Guard.prototype.checkPositon = function (pos) {
        var xArr = GuardStartPositionX.flat();
        var yArr = GuardStartPositionY.flat();
        for (var i = 0; i < xArr.length; i++) {
            if (arrCompare(xArr[i], pos)) {
                return 'x';
            }
        }
        for (var i = 0; i < yArr.length; i++) {
            if (arrCompare(yArr[i], pos)) {
                return 'y';
            }
        }
        return false;
    };
    Guard.prototype.move = function () {
        if (!this.moved) {
            if (this.axis === 'x') {
                if (this.position[1] < 3) {
                    this.position[1] += this.step;
                }
                else {
                    this.position[1] -= this.step;
                }
            }
            else {
                if (this.position[0] < 3) {
                    this.position[0] += this.step;
                }
                else {
                    this.position[0] -= this.step;
                }
            }
        }
        else {
            console.log('This guard is already moved');
        }
        this.moved = true;
        return this;
    };
    return Guard;
}());
function renderGuard(g) {
    var el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.display = 'flex';
    el.style.borderRadius = '50px';
    el.style.background = 'red';
    el.style.color = 'yellow';
    el.style.lineHeight = '100px';
    el.style.fontSize = '100px';
    el.style.textAlign = 'center';
    el.style.justifyContent = 'center';
    el.innerText = g.step === 1 ? '·' : g.step === 2 ? '··' : '∴';
    return el;
}
var Part = {
    1: 'スタート地点を選んでください 　⇒【終わったら次へ】',
    2: "東西を回る敵が移動し、攻撃をしてきます　⇒【次へ】",
    3: '1回目の数字を処理してください　⇒【緑色の数字が０になったら次へ】',
    4: "東西を回る敵が移動し、攻撃をしてきます　⇒【次へ】",
    5: '2回目の数字を処理してください　⇒【数字が０になるよう安地へ移動してください】',
    6: 'プレイヤーの処理を確認します'
};
var Game = /** @class */ (function () {
    function Game(guardsPositions) {
        this.guards = {
            up: undefined,
            down: undefined,
            left: undefined,
            right: undefined
        };
        this.part = 1;
        this.standPosition = [5, 3];
        this.remainingStep = 1;
        this.debuff = 0;
        this.checkOrCreateGuardsPosition(guardsPositions);
        this.board = new Board();
    }
    Game.prototype.checkOrCreateGuardsPosition = function (gps) {
        var _this = this;
        if (gps) {
            var xArr = gps.map(function (p) {
                return p[0];
            });
            var yArr = gps.map(function (p) {
                return p[1];
            });
            if (arrUnique(xArr).length !== 4 || arrUnique(yArr).length !== 4) {
                console.log('There are two guards in one direction');
                return false;
            }
            var posFlag_1 = true;
            gps.flatMap(function (p) {
                posFlag_1 = p[0] !== p[1];
                return p.map(function (a) {
                    posFlag_1 = a % 2 === 0;
                    posFlag_1 = a >= 0 && a <= 6;
                    return a;
                });
            });
            if (!posFlag_1) {
                console.log('There have a guard in the wrong position');
                return false;
            }
            var guardFlag_1 = true;
            var guardXCount_1 = 0;
            var guardYCount_1 = 0;
            gps.forEach(function (p) {
                switch (p[0]) {
                    case 0:
                        if (p[1] !== 2 && p[1] !== 4) {
                            console.log('There have a guard in the wrong position');
                            guardFlag_1 = false;
                        }
                        else {
                            _this.guards.up = new Guard([0, p[1]]);
                            guardXCount_1++;
                        }
                        break;
                    case 6:
                        if (p[1] !== 2 && p[1] !== 4) {
                            console.log('There have a guard in the wrong position');
                            guardFlag_1 = false;
                        }
                        else {
                            _this.guards.down = new Guard([6, p[1]]);
                            guardXCount_1++;
                        }
                        break;
                    default:
                        break;
                }
                switch (p[1]) {
                    case 0:
                        if (p[0] !== 2 && p[0] !== 4) {
                            console.log('There have a guard in the wrong position');
                            guardFlag_1 = false;
                        }
                        else {
                            _this.guards.left = new Guard([p[0], 0]);
                            guardYCount_1++;
                        }
                        break;
                    case 6:
                        if (p[0] !== 2 && p[0] !== 4) {
                            console.log('There have a guard in the wrong position');
                            guardFlag_1 = false;
                        }
                        else {
                            _this.guards.right = new Guard([p[0], 6]);
                            guardYCount_1++;
                        }
                        break;
                    default:
                        break;
                }
            });
            if (!guardFlag_1 || guardXCount_1 + guardYCount_1 !== 4) {
                console.log('There have a guard in the wrong position');
                return false;
            }
        }
        else {
            var xGuardsStepToTree = false;
            var yGuardsStepToTree = false;
            var upY = ((Math.round(Math.random()) + 1) * 2);
            var upGuard = new Guard([0, upY]);
            if (upGuard.step === 3 && xGuardsStepToTree) {
                upGuard.step = (Math.round(Math.random()) + 1);
            }
            else {
                xGuardsStepToTree = true;
            }
            this.guards.up = upGuard;
            var downY = 6 - upY;
            var downGuard = new Guard([6, downY]);
            if (downGuard.step === 3 && xGuardsStepToTree) {
                downGuard.step = (Math.round(Math.random()) + 1);
            }
            else {
                xGuardsStepToTree = true;
            }
            this.guards.down = downGuard;
            var leftX = ((Math.round(Math.random()) + 1) * 2);
            var leftGuard = new Guard([leftX, 0]);
            if (leftGuard.step === 3 && yGuardsStepToTree) {
                leftGuard.step = (Math.round(Math.random()) + 1);
            }
            else {
                yGuardsStepToTree = true;
            }
            this.guards.left = leftGuard;
            var rightX = 6 - leftX;
            var rightGuard = new Guard([rightX, 6]);
            if (rightGuard.step === 3 && yGuardsStepToTree) {
                rightGuard.step = (Math.round(Math.random()) + 1);
            }
            else {
                yGuardsStepToTree = true;
            }
            this.guards.right = rightGuard;
        }
    };
    Game.prototype.start = function (playerPos) {
        this.player = new Player(playerPos);
        this.standPosition = [this.player.position[0], this.player.position[1]];
        return this;
    };
    Game.prototype.moveAndAttack = function (axis) {
        if (axis === 'y') {
            var left = this.guards.left.move().position;
            var right = this.guards.right.move().position;
            if (this.player.position[0] === left[0]) {
                this.debuff++;
            }
            if (this.player.position[0] === right[0]) {
                this.debuff++;
            }
        }
        else {
            var up = this.guards.up.move().position;
            var down = this.guards.down.move().position;
            if (this.player.position[1] === up[1]) {
                this.debuff++;
            }
            if (this.player.position[1] === down[1]) {
                this.debuff++;
            }
        }
    };
    Game.prototype.playerMove = function () {
        var startX = this.standPosition[0];
        var startY = this.standPosition[1];
        var endX = this.player.position[0];
        var endY = this.player.position[1];
        var distance = Math.abs(endX - startX) + Math.abs(endY - startY);
        this.remainingStep = this.player.step.move(distance, this.part);
        this.player.step.current = this.remainingStep;
    };
    Game.prototype.over = function () {
        if (this.player.position[0] !== 5 || this.player.position[1] !== 3) {
            this.debuff++;
        }
    };
    Game.prototype.turnUp = function () {
        if (this.lastTurn === 'down' || this.remainingStep !== 0) {
            this.lastTurn = 'up';
            if (!this.checkPlayerMove('up')) {
                return;
            }
            this.player.turnUp();
            this.playerMove();
        }
    };
    Game.prototype.turnDown = function () {
        if (this.lastTurn === 'up' || this.remainingStep !== 0) {
            this.lastTurn = 'down';
            if (!this.checkPlayerMove('down')) {
                return;
            }
            this.player.turnDown();
            this.playerMove();
        }
    };
    Game.prototype.turnLeft = function () {
        if (this.lastTurn === 'right' || this.remainingStep !== 0) {
            this.lastTurn = 'left';
            if (!this.checkPlayerMove('left')) {
                return;
            }
            this.player.turnLeft();
            this.playerMove();
        }
    };
    Game.prototype.turnRight = function () {
        if (this.lastTurn === 'left' || this.remainingStep !== 0) {
            this.lastTurn = 'right';
            if (!this.checkPlayerMove('right')) {
                return;
            }
            this.player.turnRight();
            this.playerMove();
        }
    };
    Game.prototype.partTransformation = function () {
        this.player.step.partTransformation();
        this.standPosition = [this.player.position[0], this.player.position[1]];
        this.remainingStep = 1;
    };
    Game.prototype.partToNext = function () {
        this.part += 1;
        if (this.part === 2) {
            this.moveAndAttack('y');
        }
        if (this.part === 4) {
            if (this.remainingStep !== 0) {
                this.debuff++;
            }
            this.moveAndAttack('x');
        }
        if (this.part === 5) {
            this.partTransformation();
        }
        if (this.part === 6) {
            if (this.remainingStep !== 0) {
                this.debuff++;
            }
            this.over();
        }
    };
    Game.prototype.checkPlayerMove = function (action) {
        switch (action) {
            case 'up':
                return this.player.position[0] > 1;
            case 'down':
                return this.player.position[0] < 5;
            case 'left':
                return this.player.position[1] > 1;
            case 'right':
                return this.player.position[1] < 5;
            default:
                return false;
        }
    };
    return Game;
}());
var game = new Game().start();
var ct = document.createElement('div');
ct.style.userSelect = 'none';
function reStart() {
    game = new Game().start();
    reDraw();
}
function reDraw() {
    ct.innerHTML = '';
    renderButton();
    renderText();
    renderBoardAndGuardsAndPlayer();
}
function renderButton() {
    var reStartBtn = document.createElement('button');
    reStartBtn.innerHTML = '別パターン';
    reStartBtn.addEventListener('click', function (e) {
        reStart();
    });
    ct.append(reStartBtn);
    var nextBtn = document.createElement('button');
    nextBtn.innerHTML = '次へ';
    nextBtn.addEventListener('click', function (e) {
        game.partToNext();
        reDraw();
    });
    ct.append(nextBtn);
    if (game.part === 3 || game.part === 5) {
        renderDirectionButton();
    }
}
function renderDirectionButton() {
    var upBtn = document.createElement('button');
    upBtn.innerHTML = '↑';
    upBtn.addEventListener('click', function (e) {
        game.turnUp();
        reDraw();
    });
    ct.append(upBtn);
    var downBtn = document.createElement('button');
    downBtn.innerHTML = '↓';
    downBtn.addEventListener('click', function (e) {
        game.turnDown();
        reDraw();
    });
    ct.append(downBtn);
    var leftBtn = document.createElement('button');
    leftBtn.innerHTML = '←';
    leftBtn.addEventListener('click', function (e) {
        game.turnLeft();
        reDraw();
    });
    ct.append(leftBtn);
    var rightBtn = document.createElement('button');
    rightBtn.innerHTML = '→';
    rightBtn.addEventListener('click', function (e) {
        game.turnRight();
        reDraw();
    });
    ct.append(rightBtn);
}
function renderText() {
    var textDiv = document.createElement('div');
    var tips = document.createElement('text');
    tips.innerHTML = game.part <= 6 ? game.part + ". " + Part[game.part] : 'ギミック終了【✓】被弾回数０ 【×】被弾回数≧１　▼【別パターン】でリスタート▼';
    textDiv.append(tips);
    var debuffs = document.createElement('text');
    debuffs.style.display = 'block';
    debuffs.innerHTML = "被弾回数: " + game.debuff;
    textDiv.append(debuffs);
    var setps = document.createElement('text');
    setps.style.display = 'block';
    setps.style.color = 'red';
    setps.innerHTML = "デバフ: " + game.player.step.first + ' + ' + game.player.step.last;
    textDiv.append(setps);
    ct.append(textDiv);
}
function renderBoardAndGuardsAndPlayer() {
    game.board.matrix.forEach(function (arr) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        arr.forEach(function (b) {
            var box = renderBox(b);
            if (game.part === 1 && b.canPlayerMove) {
                box.addEventListener('mouseover', function (e) {
                    box.style.borderStyle = 'dashed';
                    box.style.borderWidth = '3px';
                    box.style.borderColor = 'red';
                });
                box.addEventListener('mouseout', function (e) {
                    box.style.border = '';
                });
                box.addEventListener('click', function (e) {
                    game.player.position = [b.position[0], b.position[1]];
                    game.standPosition = [b.position[0], b.position[1]];
                    reDraw();
                });
            }
            for (var key in game.guards) {
                var guardEl = renderGuard(game.guards[key]);
                if (isSamePosition(b.position, game.guards[key].position)) {
                    box.append(guardEl);
                }
            }
            if (isSamePosition(b.position, game.player.position)) {
                box.append(renderPlayer(game.player, game.part));
            }
            if (game.part === 2) {
                var left = game.guards.left.position;
                var right = game.guards.right.position;
                if (b.position[0] === left[0] || b.position[0] === right[0]) {
                    box.style.background = 'darkred';
                }
            }
            if (game.part === 4) {
                var up = game.guards.up.position;
                var down = game.guards.down.position;
                if (b.position[1] === up[1] || b.position[1] === down[1]) {
                    box.style.background = 'darkred';
                }
            }
            row.append(box);
        });
        ct.append(row);
    });
}
reDraw();
document.body.append(ct);
var footer = document.createElement('div');
footer.style.color = 'grey';
footer.innerText = 'グンヒルド零式4ボス 女王の大勅令練習用ゲーム　開発： 烬@沃仙曦染・夜十六夜（CNサーバー）日本語版翻訳：あん（Discord)';
document.body.append(footer);