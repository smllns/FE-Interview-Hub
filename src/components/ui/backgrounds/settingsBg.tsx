import React, { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useDarkMode } from '@/hooks/isDarkTheme';

const GradientBg = () => {
  const isDark = useDarkMode();
  const color1 = !isDark ? '#ff7a33' : '#5233ff';
  const color2 = !isDark ? '#33a0ff' : '#30803c';
  const color3 = !isDark ? '#ffc53d' : '#8f2f9c';

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ShaderGradientCanvas
        style={{
          width: '100%',
          height: '100%',
        }}
        lazyLoad={false}
        fov={45}
        pixelDensity={1}
        pointerEvents='none'
      >
        <ShaderGradient
          animate='on'
          type='waterPlane'
          uTime={0}
          uSpeed={0.3}
          uStrength={1.1}
          uDensity={2.4}
          uFrequency={2.9}
          uAmplitude={4}
          positionX={-1}
          positionY={0}
          positionZ={0}
          rotationX={5}
          rotationY={43}
          rotationZ={-6}
          color1={color1}
          color2={color2}
          color3={color3}
          reflection={0.1}
          cAzimuthAngle={50}
          cPolarAngle={94}
          cDistance={5}
          cameraZoom={15.3}
          brightness={1.5}
          grain='off'
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default GradientBg;
