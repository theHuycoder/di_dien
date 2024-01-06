// @ts-nocheck
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import "./index.css";

import { Circ, TweenLite } from "gsap";

const Square = ({ pos, size }) => {
  const draw = (ctx, active) => {
    if (!active) return;
    ctx.fillStyle = `rgba(255,255,255,${active})`;
    ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size);
  };

  return {
    draw,
  };
};

const SnakeGame = () => {
  let width: number,
    height: number,
    points:
      | { x: number; originX: number; y: number; originY: number }[]
      | { square: { draw: (ctx: any, active: any) => void } }[],
    target: { x: any; y: any },
    // eslint-disable-next-line prefer-const
    animateHeader = true;

  useEffect(() => {
    const canvas = document.getElementById("snake-canvas");
    // @ts-ignore
    const ctx = canvas.getContext("2d");

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const drawLines = (p) => {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = `rgba(157,105,249,${Math.min(
          p.active,
          p.closest[i].active,
        )})`;
        ctx.stroke();
      }
    };

    const initHeader = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      canvas.width = width;
      canvas.height = height;

      points = [];
      const density = 25; // Increase this value for more squares
      for (let x = 0; x < width; x += width / density) {
        for (let y = 0; y < height; y += height / density) {
          const px = x + (Math.random() * width) / density;
          const py = y + (Math.random() * height) / density;
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for (let i = 0; i < points.length; i++) {
      //   const closest = [];
      //   const p1 = points[i];
      //   for (let j = 0; j < points.length; j++) {
      //     const p2 = points[j];
      //     if (!(p1 === p2)) {
      //       const distance = getDistance(p1, p2);
      //       closest.push({ point: p2, distance });
      //     }
      //   }
      //
      //   // Sort closest points by distance
      //   closest.sort((a, b) => a.distance - b.distance);
      //
      //   // Get the 5 closest points
      //   p1.closest = closest.slice(0, 5).map((item) => item.point);
      // }

      for (let i = 0; i < points.length; i++) {
        points[i].square = Square({
          pos: points[i],
          size: 15,
          color: "rgba(157 105 249,0.5)",
        });
      }
    };

    const mouseMove = (e) => {
      let posx = 0,
        posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      // Adjust the position based on page offset
      const adjustedPosx = posx - window.pageXOffset;
      const adjustedPosy = posy - window.pageYOffset;

      target.x = adjustedPosx;
      target.y = adjustedPosy;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const initAnimation = () => {
      animate();
      points.forEach((p) => shiftPoint(p));
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((p) => {
          if (Math.abs(getDistance(target, p)) < 4000) {
            p.active = 0.8;
            p.square.draw(ctx, p.active);
            drawLines(p); // Draw lines between points
          } else if (Math.abs(getDistance(target, p)) < 10000) {
            p.active = 0.3;
            p.square.draw(ctx, p.active);
            drawLines(p); // Draw lines between points
          } else if (Math.abs(getDistance(target, p)) < 20000) {
            p.active = 0.09;
            p.square.draw(ctx, p.active);
            drawLines(p); // Draw lines between points
          } else {
            p.active = 0;
            p.square.draw(ctx, p.active);
          }
        });
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => shiftPoint(p),
      });
    };

    initHeader();
    initAnimation();

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []); // useEffect runs only once on component mount

  return (
    <canvas
      id="snake-canvas"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default SnakeGame;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <SnakeGame />
  </React.StrictMode>,
);
