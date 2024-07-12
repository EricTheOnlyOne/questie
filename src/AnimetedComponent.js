import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedComponent = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        anime({
            targets: containerRef.current.children,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 3000,
            delay: anime.stagger(100, { start: 200 }), // Delay each child element
            easing: 'easeOutExpo',
        });
    }, []);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};

export default AnimatedComponent;