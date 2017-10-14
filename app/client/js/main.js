(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("./Vector");
class Point {
    constructor(x = 0, y = 0, clear) {
        this.x = x;
        this.y = y;
        this.clear = clear;
        this.size = 10;
        this.color = "red";
        this.velocity = new Vector_1.Vector();
        this.gravity = new Vector_1.Vector(0, 2);
        this.checkBox = true;
        this.bounce = -0.8;
        this.isGround = false;
        this.isTargeting = false;
        this.distanceTemp = 0;
        this.moveSpeed = 1;
    }
    bounceOnBox(w, h) {
        this.isGround = false;
        let posXmax = this.x + this.size;
        let posXmin = this.x - this.size;
        let posYmax = this.y + this.size;
        let posYmin = this.y - this.size;
        if (posXmax > w) {
            this.x = w - this.size + 1;
            this.velocity.setX(this.velocity.getX() * this.bounce);
        }
        if (posXmin < 0) {
            this.x = this.size + 1;
            this.velocity.setX(this.velocity.getX() * this.bounce);
        }
        if (posYmax > h) {
            this.y = h - this.size + 1;
            this.velocity.setY(this.velocity.getY() * this.bounce);
            this.isGround = true;
        }
        if (posYmin < 0) {
            this.y = this.size + 1;
            this.velocity.setY(this.velocity.getY() * this.bounce);
        }
    }
    update() {
        if (!this.isGround)
            this.velocity.add(this.gravity);
        this.translate(this.velocity.x, this.velocity.y);
        this.travel();
    }
    checkDraw(w, h) {
        let posXmax = this.x + this.size;
        let posYmax = this.y + this.size;
        let posXmin = this.x - this.size;
        let posYmin = this.y - this.size;
        let seeX = w > posXmin && 0 < posXmax;
        let seeY = h > posYmin && 0 < posYmax;
        return seeX && seeY;
    }
    draw(ctx) {
        if (this.checkDraw(ctx.canvas.width, ctx.canvas.height)) {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if (this.checkBox) {
            this.bounceOnBox(ctx.canvas.width, ctx.canvas.height);
        }
        this.update();
    }
    setTarget(p) {
        this.targetPos = p;
        this.isTargeting = true;
        let v = new Vector_1.Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
        this.distanceTemp = v.getLength();
    }
    travel() {
        if (this.isTargeting) {
            let vec = new Vector_1.Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
            if (vec.getLength() > this.moveSpeed) {
                vec.setLength(this.moveSpeed);
                this.translate(vec.x, vec.y);
            }
            else {
                this.isTargeting = false;
            }
        }
    }
    translate(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    add(p) {
        this.translate(p.x, p.y);
        return this;
    }
    soustract(p) {
        this.translate(-p.x, -p.y);
        return this;
    }
    divide(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    }
    multiply(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    }
    angleTo(p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }
    distanceTo(p) {
        var dx = p.x - this.x, dy = p.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    signTo(p1, p2) {
        return (this.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (this.y - p2.y);
    }
    inTriangle(p1, p2, p3, strict) {
        let b1, b2, b3;
        if (strict) {
            b1 = this.signTo(p1, p2) < 0;
            b2 = this.signTo(p2, p3) < 0;
            b3 = this.signTo(p3, p1) < 0;
        }
        else {
            b1 = this.signTo(p1, p2) <= 0;
            b2 = this.signTo(p2, p3) <= 0;
            b3 = this.signTo(p3, p1) <= 0;
        }
        return ((b1 == b2) && (b2 == b3));
    }
}
exports.Point = Point;

},{"./Vector":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scene {
    constructor(id) {
        this.drawList = [];
        this.clearFrame = true;
        this.init(id);
    }
    init(id) {
        this.scene = document.getElementById(id);
        this.canvas = document.createElement('canvas');
        this.scene.addEventListener('resize', this.resize);
        this.resize();
        this.context = this.canvas.getContext('2d');
        this.scene.appendChild(this.canvas);
        this.resume();
        requestAnimationFrame(this.draw.bind(this));
    }
    add(item, id) {
        this.drawList.push({
            item: item,
            id: id
        });
    }
    resume() {
        this.isPlaying = true;
    }
    pause() {
        this.isPlaying = false;
    }
    toggle() {
        this.isPlaying = !this.isPlaying;
    }
    draw() {
        if (this.isPlaying) {
            if (this.clearFrame)
                this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            for (let d in this.drawList) {
                let draw = this.drawList[d].item;
                this.context.save();
                this.context.beginPath();
                draw.draw(this.context);
                this.context.closePath();
                this.context.restore();
                if (draw.isCollide)
                    this.checkCollision(draw);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }
    checkCollision(item) {
    }
    resize() {
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();
    }
    getWidth() {
        return this.scene.clientWidth;
    }
    getHeight() {
        return this.scene.clientHeight;
    }
}
exports.Scene = Scene;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.update();
    }
    update() {
        this.length = this.getLength();
        this.angle = this.getAngle();
    }
    setX(x) {
        this.x = x;
        this.update();
        return this;
    }
    setY(y) {
        this.y = y;
        this.update();
        return this;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    setAngle(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        this.update();
        return this;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    setLength(length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        this.update();
        return this;
    }
    translate(x, y) {
        this.x += x;
        this.y += y;
        this.update();
        return this;
    }
    add(p) {
        this.translate(p.x, p.y);
        this.update();
        return this;
    }
    soustract(p) {
        this.translate(-p.x, -p.y);
        this.update();
        return this;
    }
    divide(p) {
        this.x /= p.x;
        this.y /= p.y;
        this.update();
        return this;
    }
    multiply(p) {
        this.x *= p.x;
        this.y *= p.y;
        this.update();
        return this;
    }
}
exports.Vector = Vector;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("../class/Scene");
const Point_1 = require("../class/Point");
let scene = new Scene_1.Scene('scene');
for (let i = 0; i < 200; i++) {
    let p = new Point_1.Point(200, 200);
    p.color = 'hsl(' + Math.round(Math.random() * 360) + ',50%,60%)';
    p.size = 20;
    p.velocity.setX(Math.random() * 20 - 10);
    p.velocity.setY(Math.random() * 20 - 10);
    p.gravity.setY(Math.random());
    scene.add(p);
}

},{"../class/Point":1,"../class/Scene":2}]},{},[4]);
