(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rectangle_1 = require("./geometry/rectangle");
class DomElement extends rectangle_1.Rectangle {
    constructor(element) {
        let rect = element.getBoundingClientRect();
        super(rect.left, rect.top, rect.width, rect.height);
        this.element = element;
    }
    draw(ctx) {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        this.update();
    }
    update() {
        switch (this.pointMoving) {
            case "center":
                this.initAt(true);
                break;
            case "bound":
                this.initAt(false);
                break;
            default:
                this.init();
                break;
        }
        this.updateHTML();
    }
    updateHTML() {
        if (this.element) {
            this.element.style.left = this.x + 'px';
            this.element.style.width = this.width + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.height = this.height + 'px';
        }
    }
}
exports.DomElement = DomElement;

},{"./geometry/rectangle":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Easing {
    static linearTween(t, b, c, d) {
        return c * t / d + b;
    }
    ;
    static easeInQuad(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    }
    ;
    static easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }
    ;
    static easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    ;
    static easeInCubic(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    }
    ;
    static easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }
    ;
    static easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    ;
    static easeInQuart(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    }
    ;
    static easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }
    ;
    static easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
    ;
    static easeInQuint(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    }
    ;
    static easeOutQuint(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    }
    ;
    static easeInOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    }
    ;
    static easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    ;
    static easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    ;
    static easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    ;
    static easeInExpo(t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    ;
    static easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    ;
    static easeInOutExpo(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    }
    ;
    static easeInCirc(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    }
    ;
    static easeOutCirc(t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
    }
    ;
    static easeInOutCirc(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    }
    ;
    static easeInElastic(t, b, c, d) {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    ;
    static easeOutElastic(t, b, c, d) {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    ;
    static easeInOutElastic(t, b, c, d) {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
    ;
    static easeInBack(t, b, c, d, s) {
        if (!s)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    ;
    static easeOutBack(t, b, c, d, s) {
        if (!s)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    ;
    static easeInOutBack(t, b, c, d, s) {
        if (!s)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
    ;
    static easeInBounce(t, b, c, d) {
        return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
    }
    ;
    static easeOutBounce(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }
    ;
    static easeInOutBounce(t, b, c, d) {
        if (t < d / 2)
            return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
        return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}
exports.Easing = Easing;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scene {
    constructor(id, drawType) {
        this.drawType = drawType;
        this.clearFrame = true;
        this.drawList = [];
        this.bufferDraws = [];
        this.init(id);
    }
    init(id) {
        if (this.drawType === "canvas") {
            this.scene = document.getElementById(id);
            this.canvas = document.createElement('canvas');
            this.scene.addEventListener('resize', this.resize);
            this.resize();
            this.context = this.canvas.getContext('2d');
            this.scene.appendChild(this.canvas);
        }
        this.resume();
        requestAnimationFrame(this.draw.bind(this));
    }
    add(item, id) {
        this.drawList.push({
            item: item,
            id: id
        });
    }
    removeItem(id) {
        for (let i in this.drawList) {
            if (this.drawList[i].id === id) {
                delete this.drawList[i];
                break;
            }
        }
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
            if (this.clearFrame && this.drawType === "canvas")
                this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            for (let d = 0; d < this.drawList.length; d++) {
                let draw = this.drawList[d].item;
                if (this.drawType === "canvas") {
                    this.context.save();
                    this.context.beginPath();
                    draw.draw(this.context);
                    this.context.closePath();
                    this.context.restore();
                }
                else {
                    draw.update();
                }
                if (draw.isCollide)
                    this.checkCollision(draw, d);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }
    searchBufferDraws(a, b) {
        for (let i in this.bufferDraws) {
            if (this.bufferDraws[i] === a + "-" + b || this.bufferDraws[i] === b + "-" + a)
                return true;
        }
        return false;
    }
    checkCollision(item, i) {
        for (let d = i; d < this.drawList.length; d++) {
            let draw = this.drawList[d].item;
            if (d !== i && draw.isCollide) {
                item.collisionTo(draw);
            }
        }
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("./Vector");
const Segment_1 = require("./Segment");
class Point {
    constructor(x = 0, y = 0, clear) {
        this.x = x;
        this.y = y;
        this.clear = clear;
        this.dName = "Point";
        this.isCollide = false;
        this.size = 1;
        this.color = "red";
        this.velocity = new Vector_1.Vector();
        this.force = new Vector_1.Vector();
        this.gravity = new Vector_1.Vector();
        this.isCollisionToBox = false;
        this.groundBounce = -0.85;
        this.friction = new Vector_1.Vector(0.992, 0.992);
        this.isGround = false;
        this.moveSpeed = 0;
        this.targetTime = 0;
        this.timeCount = 0;
        this.bounce = 0.85;
        this.masse = 1;
        this.isTargeting = false;
        this.travelDistance = 0;
        this.groundForce = new Vector_1.Vector();
    }
    collisionTo(object) {
        if (object.dName === "Point") {
            if (this.intersectToPoint(object)) {
                this.collisionToPoint(object);
            }
        }
    }
    //https://github.com/tanx8/Billards/blob/master/src/com/shaw/pool/CollisionPhysics.java
    collisionToPoint(p) {
        let normal = new Segment_1.Segment(this, p);
        normal.setLength(this.size + p.size, true);
        let v1 = new Vector_1.Vector(p.x - this.x, p.y - this.y);
        v1.setLength(this.velocity.getLength() * Math.cos(this.velocity.getCorner(v1)));
        let v2 = new Vector_1.Vector(this.x - p.x, this.x - p.x);
        v2.setLength(p.velocity.getLength() * Math.cos(p.velocity.getCorner(v2)));
        this.addForce(v2.scalar(p.masse / this.masse * this.bounce));
        p.addForce(v1.scalar(this.masse / p.masse * p.bounce));
        this.addForce(v1.scalar(-1 * p.masse / this.masse * p.bounce));
        p.addForce(v2.scalar(-1 * this.masse / p.masse * this.bounce));
    }
    getKineticEnergy() {
        return 0.5 * this.masse * (this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    }
    getCollisionForce(p) {
        let ratioMasse = this.bounce * this.masse / p.masse;
        return new Vector_1.Vector(this.velocity.x * ratioMasse, this.velocity.y * ratioMasse);
    }
    bounceOnBox(w, h) {
        this.groundForce = new Vector_1.Vector(0, 0);
        let posXmax = this.x + this.size;
        let posXmin = this.x - this.size;
        let posYmax = this.y + this.size;
        let posYmin = this.y - this.size;
        if (posXmax > w) {
            this.x = w - this.size + this.gravity.getX();
            this.velocity.setX(this.velocity.getX() * this.groundBounce);
            this.groundForce.setX(-this.gravity.getX());
            if (this.force.x > 0) {
                this.groundForce.add(new Vector_1.Vector(-this.force.x, 0));
            }
        }
        if (posXmin < 0) {
            this.x = this.size + this.gravity.getX();
            this.velocity.setX(this.velocity.getX() * this.groundBounce);
            this.groundForce.setX(-this.gravity.getX());
            if (this.force.x < 0) {
                this.groundForce.add(new Vector_1.Vector(-this.force.x, 0));
            }
        }
        if (posYmax > h) {
            this.y = h - this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
            if (this.force.y > 0) {
                this.groundForce.add(new Vector_1.Vector(0, -this.force.y));
            }
        }
        if (posYmin < 0) {
            this.y = this.size + this.gravity.getY();
            this.velocity.setY(this.velocity.getY() * this.groundBounce);
            this.groundForce.setY(-this.gravity.getY());
            if (this.force.y < 0) {
                this.groundForce.add(new Vector_1.Vector(0, -this.force.y));
            }
        }
    }
    update() {
        this.velocity.add(this.gravity);
        this.velocity.add(this.force);
        this.velocity.add(this.groundForce);
        this.velocity.multiply(this.friction);
        this.force = new Vector_1.Vector();
        this.travel();
        this.translate(this.velocity.x, this.velocity.y);
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
        if (this.isCollisionToBox) {
            this.bounceOnBox(ctx.canvas.width, ctx.canvas.height);
        }
        this.update();
    }
    addForce(v) {
        this.force.add(v);
    }
    removeForce(v) {
        this.velocity.soustract(v);
    }
    setTarget(p) {
        this.targetPos = p;
        this._x = this.x;
        this._y = this.y;
        this.isTargeting = true;
        let v = new Vector_1.Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
        this.travelDistance = v.getLength();
        this.timeCount = 0;
    }
    travel() {
        if (this.isTargeting) {
            if (!this.travelMethod) {
                let vec = new Vector_1.Vector(this.targetPos.x - this.x, this.targetPos.y - this.y);
                let distance = vec.getLength();
                if (distance >= this.moveSpeed + this.size) {
                    vec.setLength(this.moveSpeed);
                    this.addForce(vec);
                }
                else {
                    this.isTargeting = false;
                    this.velocity.multiply(new Vector_1.Vector(0, 0));
                }
            }
            else {
                if (this.timeCount <= this.targetTime) {
                    this.x = this.travelMethod(this.timeCount, this._x, this.targetPos.x - this._x, this.targetTime);
                    this.y = this.travelMethod(this.timeCount, this._y, this.targetPos.y - this._y, this.targetTime);
                    this.timeCount++;
                }
                else {
                    this.isTargeting = false;
                }
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
        let dx = p.x - this.x, dy = p.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    intersectToPoint(p) {
        return this.distanceTo(p) < this.size + p.size;
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

},{"./Segment":5,"./Vector":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.dName = "Segment";
        this.color = "red";
        this.width = 5;
    }
    //todo make a good checkdraw
    checkDraw() {
        /*
        if(this.p1.checkDraw(ctx.canvas.width, ctx.canvas.height) ||
            this.p2.checkDraw(ctx.canvas.width, ctx.canvas.height)){
        }*/
    }
    collisionTo(object) {
        throw new Error("Method not implemented.");
    }
    update() {
        this.p1.update();
        this.p2.update();
    }
    draw(ctx) {
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineCap = "round";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
        this.update();
    }
    intersectionToSegment(segment) {
        if (segment && segment.dName == "Segment") {
            let A1 = this.p2.y - this.p1.y, B1 = this.p1.x - this.p2.x, C1 = A1 * this.p1.x + B1 * this.p1.y, A2 = segment.p2.y - segment.p1.y, B2 = segment.p1.x - segment.p2.x, C2 = A2 * segment.p1.x + B2 * segment.p1.y, denominator = A1 * B2 - A2 * B1;
            if (denominator != 0) {
                let x = (B2 * C1 - B1 * C2) / denominator, y = (A1 * C2 - A2 * C1) / denominator, rx0 = (x - this.p1.x) / (this.p2.x - this.p1.x), ry0 = (y - this.p1.y) / (this.p2.y - this.p1.y), rx1 = (x - segment.p1.x) / (segment.p2.x - segment.p1.x), ry1 = (y - segment.p1.y) / (segment.p2.y - segment.p1.y);
                if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
                    ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                    return new Point_1.Point(x, y);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    intersectLineTo(segment) {
        if (segment && segment.dName == "Segment") {
            let A1 = this.p2.y - this.p1.y, B1 = this.p1.x - this.p2.x, C1 = A1 * this.p1.x + B1 * this.p1.y, A2 = segment.p2.y - segment.p1.y, B2 = segment.p1.x - segment.p2.x, C2 = A2 * segment.p1.x + B2 * segment.p1.y, denominator = A1 * B2 - A2 * B1;
            if (denominator != 0) {
                let x = (B2 * C1 - B1 * C2) / denominator;
                let y = (A1 * C2 - A2 * C1) / denominator;
                return new Point_1.Point(x, y);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    setLength(length, atEnd) {
        if (atEnd) {
            let angle = this.getAngle(false);
            this.p2.x = this.p1.x + Math.cos(angle) * length;
            this.p2.y = this.p1.y + Math.sin(angle) * length;
        }
        else {
            let angle = this.getAngle(true);
            this.p1.x = this.p2.x + Math.cos(angle) * length;
            this.p1.y = this.p2.y + Math.sin(angle) * length;
        }
        return this;
    }
    getLength() {
        return this.p1.distanceTo(this.p2);
    }
    setAngle(angle, atEnd) {
        return this;
    }
    getAngle(atEnd) {
        if (atEnd) {
            return this.p2.angleTo(this.p1);
        }
        else {
            return this.p1.angleTo(this.p2);
        }
    }
}
exports.Segment = Segment;

},{"./Point":4}],6:[function(require,module,exports){
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
        let length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        this.update();
        return this;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    dot(v) {
        //Returns the scalar (dot) product of two vectors
        return (this.x * v.getX() + this.y * v.getY());
    }
    scalar(scalar) {
        let x = this.x * scalar;
        let y = this.y * scalar;
        return new Vector(x, y);
    }
    getCorner(v) {
        //Returns the angle between the vectors
        let cosa = this.dot(v) / (this.getLength() * v.getLength());
        //In case of infinity (undefined)
        if (cosa > 1.0)
            cosa = 1.0;
        else if (cosa < -1.0)
            cosa = -1.0;
        else if (isNaN(cosa))
            return 0;
        return (Math.acos(cosa));
    }
    setLength(length) {
        let angle = this.getAngle();
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dName = "Rectangle";
        this.centerPoint = new Point_1.Point();
        this.originPoint = new Point_1.Point();
        this.sizePoint = new Point_1.Point();
        this.pointMoving = "center";
        this.init();
    }
    init() {
        this.initCenterPoint();
        this.initBound();
    }
    initBound() {
        this.initOriginPoint();
        this.initSizePoint();
    }
    initAt(center) {
        if (center) {
            this.x = this.centerPoint.x - this.width * 0.5;
            this.y = this.centerPoint.y - this.height * 0.5;
            this.initBound();
        }
        else {
            this.x = this.originPoint.x;
            this.y = this.originPoint.y;
            this.width = this.sizePoint.x;
            this.height = this.sizePoint.y;
            this.initCenterPoint();
        }
    }
    update() {
        switch (this.pointMoving) {
            case "center":
                this.initAt(true);
                break;
            case "bound":
                this.initAt(false);
                break;
            default:
                this.init();
                break;
        }
    }
    draw(ctx) {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    initOriginPoint() {
        this.originPoint.x = this.x;
        this.originPoint.y = this.y;
    }
    initSizePoint() {
        this.sizePoint.x = this.width;
        this.sizePoint.y = this.height;
    }
    initCenterPoint() {
        this.centerPoint.x = (this.x * 2 + this.width) * 0.5;
        this.centerPoint.y = (this.y * 2 + this.height) * 0.5;
    }
    setCenterPoint(p) {
        this.centerPoint.x = p.x;
        this.centerPoint.y = p.y;
        this.x = p.x - this.width * 0.5;
        this.y = p.y - this.height * 0.5;
        return this;
    }
    getCenterPoint() {
        return this.centerPoint;
    }
    setX(x) {
        this.x = x;
        this.init();
        return this;
    }
    setWidth(width) {
        this.width = width;
        this.init();
        return this;
    }
    setY(y) {
        this.y = y;
        this.init();
        return this;
    }
    setHeight(height) {
        this.height = height;
        this.init();
        return this;
    }
    collisionTo(object) {
    }
}
exports.Rectangle = Rectangle;

},{"./Point":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../typings/globals/three/index.d.ts"/>
const Scene_1 = require("../class/Scene");
const Point_1 = require("../class/geometry/Point");
const DomElement_1 = require("../class/DomElement");
const Easing_1 = require("../class/Easing");
let scene = new Scene_1.Scene('scene');
/*
let player = new Point();
player.size = 20;
player.isCollide = true;
scene.add(player);
player.moveSpeed = 1;
player.masse = 1;
player.color = "green";
let lastPoint:Point ;
for(let i= 0; i< 20; i++){
    let p = new Point(Math.random()*scene.getWidth(),Math.random()*scene.getHeight());
    p.color = 'hsla('+Math.round(Math.random()*360)+',50%,60%,1)';
    p.size = 20;
    p.velocity.setX(100);
    p.gravity.setY(1);
    //p.gravity.setX(0.1);
    p.isCollide = true;
    scene.add(p);

    if(lastPoint){
        let s = new Segment(lastPoint,p);
        s.color = 'hsla('+Math.round(Math.random()*360)+',50%,60%,1)';
        scene.add(s);
    }
        lastPoint = p;

}
window.addEventListener('mousemove',(ev)=>{
    player.setTarget(new Point(ev.clientX,ev.clientY));
});
*/
let rect = new DomElement_1.DomElement(document.getElementById('element'));
scene.add(rect);
scene.add(rect.centerPoint);
scene.add(rect.originPoint);
//rect.sizePoint.velocity.setX(20);
rect.pointMoving = "bound";
setTimeout(() => {
    rect.originPoint.targetTime = 200;
    rect.originPoint.travelMethod = Easing_1.Easing.easeOutBounce;
    rect.originPoint.setTarget(new Point_1.Point(500, 500));
}, 2000);
setTimeout(() => {
    rect.originPoint.targetTime = 120;
    rect.originPoint.travelMethod = Easing_1.Easing.easeInOutBack;
    rect.originPoint.setTarget(new Point_1.Point(0, 0));
}, 6000);

},{"../class/DomElement":1,"../class/Easing":2,"../class/Scene":3,"../class/geometry/Point":4}]},{},[8]);
