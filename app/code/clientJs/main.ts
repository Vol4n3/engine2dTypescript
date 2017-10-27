///<reference path="../../../typings/globals/three/index.d.ts"/>
import {Scene} from "../class/Scene";
import {Point} from "../class/geometry/Point";
import {DomElement} from "../class/DomElement";
import {Easing} from "../class/Easing";
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
scene.add(rect);
scene.add(rect.centerPoint);
scene.add(rect.originPoint);
//rect.sizePoint.velocity.setX(20);
rect.pointMoving = "bound";

setTimeout(()=>{
    rect.originPoint.targetTime = 200;
    rect.originPoint.travelMethod = Easing.easeOutBounce;
    rect.originPoint.setTarget(new Point(500,500));
},2000);

setTimeout(()=>{
    rect.originPoint.targetTime = 120;
    rect.originPoint.travelMethod = Easing.easeInOutBack;
    rect.originPoint.setTarget(new Point(0,0));
},6000);