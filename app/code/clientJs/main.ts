///<reference path="../../../typings/globals/three/index.d.ts"/>
import {Scene} from "../class/Scene";
import {Point} from "../class/Point";
import {DomElement} from "../class/DomElement";
let scene = new Scene('scene');
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
let rect = new DomElement(document.getElementById('element'));
console.log(rect);
scene.add(rect);
scene.add(rect.centerPoint);
scene.add(rect.sizePoint);
rect.sizePoint.velocity.setX(20);
rect.pointMoving = "bound";
setTimeout(()=>{
    rect.sizePoint.moveSpeed = 1;
    rect.sizePoint.setTarget(new Point(200,200));
    console.log(rect)
},2000);