import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

const MyThreeJSComponent = () => {
  let isMouseDown = false;
  const emptySlot = 'emptySlot';
  const planeTop = 'planeTop';
  const planeBottom = 'planeBottom';
  
  const containerRef = useRef(null);
  
  let camera, scene, renderer;
  const mouse = { x: 0, y: 0 };
  const camPos = { x: 0, y: 0, z: 10 };
  
  const cols = 16;
  const rows = 8;
  const gap = 30;
  const size = {
    width: 100,
    height: 30,
    depth: 150,
  };
  const planeOffset = 400;
  
  let speedNormal = 2;
  const speedFast = 20;
  let speed = speedNormal;
  
  const boxes = {
    planeBottom: [],
    planeTop: [],
  };
  const boxes1d = [];
  
  const num = (min, max) => Math.random() * (max - min) + min;
  
  const draw = (props) => {
    const colours = {
      slow: {
        r: num(0.5, 0.8),
        g: num(0.0, 0.2),
        b: num(0.7, 0.9),
      },
      fast: {
        r: num(0.8, 0.9),
        g: num(0.1, 0.2),
        b: num(0.8, 0.9),
      },
    };
    
    const uniforms = {
      r: { type: 'f', value: colours.slow.r },
      g: { type: 'f', value: colours.slow.g },
      b: { type: 'f', value: colours.slow.b },
      distanceX: { type: 'f', value: 1.0 },
      distanceZ: { type: 'f', value: 1.0 },
      pulse: { type: 'f', value: 0 },
      speed: { type: 'f', value: speed },
    };
    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    
    const geometry = new THREE.BoxGeometry(props.width, props.height, props.depth);
    const object = new THREE.Mesh(geometry, material);
    object.colours = colours;
    return object;
  };
  
  const createBox = () => {
    const xi = Math.floor(Math.random() * cols),
      xai = xi;
    const yi = Math.random() > 0.5 ? 1 : -1,
      yai = yi === -1 ? planeBottom : planeTop;
    const zi = Math.floor(Math.random() * rows),
      zai = zi;
    
    const x = (xi - cols / 2) * (size.width + gap);
    const y = yi * planeOffset;
    const z = zi * (size.depth + gap);
    
    if (boxes[yai][zai][xi] === emptySlot) {
      const box = draw(size);
      box.position.y = y;
      box.isWarping = false;
      box.offset = { x: x, z: 0 };
      box.posZ = z;
      
      boxes[yai][zai][xi] = box;
      boxes1d.push(box);
      
      scene.add(box);
    }
  };
  
  const move = (x, y, z) => {
    let box = boxes[y][z][x];
    
    if (box !== emptySlot) {
      box.position.x = box.offset.x;
      box.position.z = box.offset.z + box.posZ;
      
      if (box.position.z > 0) {
        box.posZ -= rows * (size.depth + gap);
      }
      
      if (!box.isWarping && Math.random() > 0.999) {
        let dir = Math.floor(Math.random() * 5),
          xn = x,
          zn = z,
          yn = y,
          yi = 0,
          xo = 0,
          zo = 0;
        
        switch (dir) {
          case 0:
            xn++;
            xo = 1;
            break;
          case 1:
            xn--;
            xo = -1;
            break;
          case 2:
            zn++;
            zo = 1;
            break;
          case 3:
            zn--;
            zo = -1;
            break;
          case 4:
            yn = y === planeTop ? planeBottom : planeTop;
            yi = y === planeTop ? -1 : 1;
            break;
        }
        
        if (boxes[yn] && boxes[yn][zn] && boxes[yn][zn][xn] === emptySlot) {
          boxes[y][z][x] = emptySlot;
          
          box.isWarping = true;
          
          boxes[yn][zn][xn] = box;
          
          if (dir === 4) {
            TweenMax.to(box.position, 0.5, {
              y: yi * planeOffset,
            });
          } else {
            TweenMax.to(box.offset, 0.5, {
              x: box.offset.x + xo * (size.width + gap),
              z: box.offset.z + zo * (size.depth + gap),
            });
          }
          TweenMax.to(box.offset, 0.6, {
            onComplete: function () {
              box.isWarping = false;
            },
          });
        }
      }
    }
  };
  
  const render = (time) => {
    speed -= (speed - (isMouseDown ? speedFast : speedNormal)) * 0.05;
    
    let box;
    for (let b = 0, bl = boxes1d.length; b < bl; b++) {
      box = boxes1d[b];
      box.posZ += speed;
      
      const distanceZ = 1 - ((rows * (size.depth + gap) - box.posZ) / (rows * (size.depth + gap)) - 1);
      box.material.uniforms.distanceZ.value = distanceZ;
      
      const distanceX = 1 - (Math.abs(box.position.x)) / (cols * (size.depth + gap) / 3);
      box.material.uniforms.distanceX.value = distanceX;
      
      const colour = isMouseDown ? box.colours.fast : box.colours.slow;
      box.material.uniforms.r.value -= (box.material.uniforms.r.value - colour.r) * 0.1;
      box.material.uniforms.g.value -= (box.material.uniforms.g.value - colour.g) * 0.1;
      box.material.uniforms.b.value -= (box.material.uniforms.b.value - colour.b) * 0.1;
      
      const currentSpeed = (speed - speedNormal) / (speedFast - speedNormal);
      box.material.uniforms.speed.value = currentSpeed;
      
      if (Math.random() > (0.99995 - currentSpeed * 0.005)) {
        box.material.uniforms.pulse.value = 1;
      }
      box.material.uniforms.pulse.value -= box.material.uniforms.pulse.value * 0.1 / (currentSpeed + 1);
    }
    
    for (let j = 0, jl = rows; j < jl; j++) {
      for (let i = 0, il = cols; i < il; i++) {
        move(i, planeBottom, j);
        move(i, planeTop, j);
      }
    }
    
    camPos.x -= (camPos.x - mouse.x * 400) * 0.02;
    camPos.y -= (camPos.y - mouse.y * 150) * 0.05;
    camPos.z = -100;
    camera.position.set(camPos.x, camPos.y, camPos.z);
    
    camera.rotation.y = camPos.x / -1000;
    camera.rotation.x = camPos.y / 1000;
    camera.rotation.z = (camPos.x - mouse.x * 400) / 2000;
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  };
  
  const vertexShader = `
    varying vec2 vUv;
    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  
  const fragmentShader = `
    uniform float r;
    uniform float g;
    uniform float b;
    uniform float distanceZ;
    uniform float distanceX;
    uniform float pulse;
    uniform float speed;
    varying vec2 vUv;

    void main( void ) {
      vec2 position = abs(-1.0 + 2.0 * vUv);
      float edging = abs((pow(position.y, 5.0) + pow(position.x, 5.0)) / 2.0);
      float perc = (0.2 * pow(speed + 1.0, 2.0) + edging * 0.8) * distanceZ * distanceX;

      float red = r * perc + pulse;
      float green = g * perc + pulse;
      float blue = b * perc + pulse;
      gl_FragColor = vec4(red, green, blue, 1.0);
    }
  `;
  
  const handleMouseMove = (e) => {
    e.preventDefault();
    if (e.changedTouches && e.changedTouches[0]) e = e.changedTouches[0];
    mouse.x = (e.clientX / containerRef.current.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / containerRef.current.clientHeight) * 2 + 1;
  };
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    isMouseDown = true;
  };
  
  const handleMouseUp = (e) => {
    e.preventDefault();
    isMouseDown = false;
  };
  
  const handleScroll = () => {
    speed -= (speed - speedFast) * 0.05;
  };
  
  useEffect(() => {
    const container = containerRef.current;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, container.clientWidth / window.innerHeight, 1, 10000);
    scene.add(camera);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    for (let j = 0; j < rows; j++) {
      boxes.planeBottom[j] = [];
      boxes.planeTop[j] = [];
      for (let i = 0; i < cols; i++) {
        boxes.planeBottom[j][i] = emptySlot;
        boxes.planeTop[j][i] = emptySlot;
      }
    }
    
    for (let i = 0; i < rows * cols; i++) {
      createBox();
    }
    
    // Clear the container before appending the renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    container.appendChild(renderer.domElement);
    
    // document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    render(0);
    
    return () => {
      // document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return <div style={{ width: '100vw', height: 'inherit' }} ref={containerRef} />;
};

export default MyThreeJSComponent;
