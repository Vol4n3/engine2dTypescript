///<reference path="../../../typings/globals/three/index.d.ts"/>
import {Scene} from "../class/Scene";
import {Point} from "../class/Point";
import {Segment} from "../class/Segment";
import {Polygone} from "../class/Polygone";
let scene = new Scene('scene');

let player = new Point();
player.size = 20;
player.isCollide = true;
scene.add(player);
player.moveSpeed = 1;
player.masse = 1;
player.color = "green"
for(let i= 0; i< 1; i++){
    let p = new Point(200,200);
    p.color = 'hsla('+Math.round(Math.random()*360)+',50%,60%,0.8)';
    p.size = 20;
    //p.velocity.setX(Math.random()*20-10);
    p.velocity.setY(Math.random()*20-10)
    p.gravity.setY(0);
    p.isCollide = true;
    scene.add(p);
    p.setTarget(new Point(500,500));
    p.moveSpeed = 0.5;
}
window.addEventListener('mousemove',(ev)=>{
    player.setTarget(new Point(ev.clientX,ev.clientY));
});