export class Easing {

    static linearTween(t: number, b: number, c: number, d: number): number {
        return c * t / d + b;
    };

    static easeInQuad(t: number, b: number, c: number, d: number): number {
        t /= d;
        return c * t * t + b;
    };

    static easeOutQuad(t: number, b: number, c: number, d: number): number {
        t /= d;
        return -c * t * (t - 2) + b;
    };

    static easeInOutQuad(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    static easeInCubic(t: number, b: number, c: number, d: number): number {
        t /= d;
        return c * t * t * t + b;
    };

    static easeOutCubic(t: number, b: number, c: number, d: number): number {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    };

    static easeInOutCubic(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    static easeInQuart(t: number, b: number, c: number, d: number): number {
        t /= d;
        return c * t * t * t * t + b;
    };

    static easeOutQuart(t: number, b: number, c: number, d: number): number {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    };

    static easeInOutQuart(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    };

    static easeInQuint(t: number, b: number, c: number, d: number): number {
        t /= d;
        return c * t * t * t * t * t + b;
    };

    static easeOutQuint(t: number, b: number, c: number, d: number): number {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    };

    static easeInOutQuint(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    };

    static easeInSine(t: number, b: number, c: number, d: number): number {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };

    static easeOutSine(t: number, b: number, c: number, d: number): number {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };

    static easeInOutSine(t: number, b: number, c: number, d: number): number {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    static easeInExpo(t: number, b: number, c: number, d: number): number {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    };

    static easeOutExpo(t: number, b: number, c: number, d: number): number {
        return c * ( -Math.pow(2, -10 * t / d) + 1 ) + b;
    };

    static easeInOutExpo(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * ( -Math.pow(2, -10 * t) + 2 ) + b;
    };

    static easeInCirc(t: number, b: number, c: number, d: number): number {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    };

    static easeOutCirc(t: number, b: number, c: number, d: number): number {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
    };

    static easeInOutCirc(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    };

    static easeInElastic(t: number, b: number, c: number, d: number): number {
        let s: number = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else{
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };

    static easeOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };

    static easeInOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };

    static easeInBack(t: number, b: number, c: number, d: number, s?: number): number {
        if (!s) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };

    static easeOutBack(t: number, b: number, c: number, d: number, s?: number): number {
        if (!s) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };

    static easeInOutBack(t: number, b: number, c: number, d: number, s?: number): number {
        if (!s) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };

    static easeInBounce(t: number, b: number, c: number, d: number): number {
        return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
    };

    static easeOutBounce(t: number, b: number, c: number, d: number): number {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };

    static easeInOutBounce(t: number, b: number, c: number, d: number): number {
        if (t < d / 2) return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
        return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }

}