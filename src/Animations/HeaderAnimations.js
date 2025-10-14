 import gsap from "gsap";
 import React from 'react'
 
 const HeaderAnimations = (element) => {
  gsap.fromTo(
    element,
    {opacity:0,x:0,y:200},
    {opacity:1, x:0, y:0 , duration:1.5, ease:"power3.in"}
  )
 }