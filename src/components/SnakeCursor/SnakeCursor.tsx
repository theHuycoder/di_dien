// SnakeCursor.js
import React, { useState, useEffect } from 'react';
import { useTrail, animated, useSpring } from 'react-spring';
import styled from 'styled-components';

const SnakeCursorContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
`;

const Cube = styled(animated.div)`
  width: 80px;
  height: 80px;
  background-color: #ffffff; /* Red color */
  border-radius: 20px;
  position: absolute;
`;


var timeout;

const SnakeCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  
  
  const trail = useTrail(3, {
    from: { xy: [0, 0], opacity: 0 },
    to: { xy: [cursor.x, cursor.y], opacity: isMoving ? 1 : 0 },
    config: { mass: 4, tension: 200, friction: 40 },
    trailSpacing: 0,
  });
  
  const springProps = useSpring({
    from: { xy: [0, 0], opacity: 0 },
    to: async (next) => {
      while (isMoving) {
        await next({ xy: [cursor.x, cursor.y], opacity: 1 });
        await next({ xy: [cursor.x, cursor.y], opacity: 0 });
      }
    },
    config: { mass: 5, tension: 20, friction: 30},
  });
  
  const handleMouseMove = (e) => {
    if(timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      setIsMoving(false);
    },700)
    
    const { clientX, clientY } = e;
    setCursor({ x: clientX, y: clientY });
    setIsMoving(true);
    
  };
  
  const handleMouseStop = () => {
    setIsMoving(false);
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseStop);
    document.addEventListener('mouseenter', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseStop);
      document.removeEventListener('mouseenter', handleMouseMove);
    };
  }, []);
  
  return (
    <SnakeCursorContainer>
      {trail.map((props, index) => (
        <Cube
          key={index}
          style={{
            transform: props.xy.interpolate((x, y) => `translate(${x - 10}px, ${y - 10}px)`),
            opacity: !isMoving ? 0 : 1,
          }}
        />
      ))}
    </SnakeCursorContainer>
  );
};

export default SnakeCursor;
