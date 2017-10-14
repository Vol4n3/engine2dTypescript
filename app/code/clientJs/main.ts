import {Scene} from "../class/Scene";
import {Point} from "../class/Point";
import {Segment} from "../class/Segment";
import {Polygone} from "../class/Polygone";

let scene = new Scene('scene');


for(let i= 0; i< 200; i++){
    let p = new Point(200,200);
    p.color = 'hsl('+Math.round(Math.random()*360)+',50%,60%)';
    p.size = 20;
    p.velocity.setX(Math.random()*20-10);
    p.velocity.setY(Math.random()*20-10)
    p.gravity.setY(Math.random())
    scene.add(p);
}
