import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedButton = ({ children, className = '', id = '' }) => {
  const buttonRef = useRef(null);
  const spanRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const uniqueId = id || `button-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const button = buttonRef.current;
    const span = spanRef.current;
    const wrapper = buttonWrapperRef.current;

    if (!button || !span || !wrapper) return;

    const handleMouseEnter = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
    };

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const moveX = ((relX - wrapper.offsetWidth / 2) / wrapper.offsetWidth) * 80;
      const moveY = ((relY - wrapper.offsetHeight / 2) / wrapper.offsetHeight) * 80;

      gsap.to(button, {
        duration: 0.5,
        x: moveX,
        y: moveY,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseout', handleMouseEnter);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseout', handleMouseEnter);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={buttonWrapperRef} 
      className="cs_round_btn_wrap relative"
      key={`wrapper-${uniqueId}`}
    >
      <button 
        ref={buttonRef}
        className={`cs_hero_btn relative overflow-hidden ${className}`}
        key={`button-${uniqueId}`}
      >
        <span 
          ref={spanRef} 
          className="absolute w-0 h-0 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
          key={`span-${uniqueId}`}
        />
        {children}
      </button>
    </div>
  );
};

export default AnimatedButton;