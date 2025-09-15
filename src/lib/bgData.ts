import Aurora from '@/components/ui/backgrounds/cssBg';
import Squares from '@/components/ui/backgrounds/htmlBg';
import LetterGlitch from '@/components/ui/backgrounds/jsBg';
import Lightning from '@/components/ui/backgrounds/reactBg';
import Orb from '@/components/ui/backgrounds/tailwindBg';
import Particles from '@/components/ui/backgrounds/tsBg';

type BackgroundConfig =
  | {
      key: 'javascript';
      component: typeof LetterGlitch;
      props: {
        glitchSpeed: number;
        centerVignette: boolean;
        outerVignette: boolean;
        smooth: boolean;
      };
    }
  | {
      key: 'tailwind';
      component: typeof Orb;
      props: {
        hoverIntensity: number;
        rotateOnHover: boolean;
        forceHoverState: boolean;
      };
    }
  | {
      key: 'react';
      component: typeof Lightning;
      props: {
        xOffset: number;
        speed: number;
        intensity: number;
        size: number;
      };
    }
  | {
      key: 'typescript';
      component: typeof Particles;
      props: {
        particleCount: number;
        particleSpread: number;
        speed: number;
        particleBaseSize: number;
        moveParticlesOnHover: boolean;
        alphaParticles: boolean;
        disableRotation: boolean;
      };
    }
  | {
      key: 'html';
      component: typeof Squares;
      props: {
        speed: number;
        squareSize: number;
        direction: 'left' | 'right' | 'diagonal' | 'up' | 'down' | undefined;
      };
    }
  | {
      key: 'visuals';
      component: typeof Aurora;
      props: { blend: number; amplitude: number; speed: number };
    };

export const BACKGROUNDS: BackgroundConfig[] = [
  {
    key: 'javascript',
    component: LetterGlitch,
    props: {
      glitchSpeed: 50,
      centerVignette: true,
      outerVignette: true,
      smooth: true,
    },
  },
  {
    key: 'tailwind',
    component: Orb,
    props: { hoverIntensity: 0.5, rotateOnHover: true, forceHoverState: true },
  },
  {
    key: 'react',
    component: Lightning,
    props: { xOffset: 0.2, speed: 1, intensity: 1, size: 1 },
  },
  {
    key: 'typescript',
    component: Particles,
    props: {
      particleCount: 200,
      particleSpread: 5,
      speed: 0.6,
      particleBaseSize: 200,
      moveParticlesOnHover: false,
      alphaParticles: false,
      disableRotation: false,
    },
  },
  {
    key: 'html',
    component: Squares,
    props: { speed: 0.5, squareSize: 80, direction: 'diagonal' },
  },
  {
    key: 'visuals',
    component: Aurora,
    props: { blend: 0.5, amplitude: 1.0, speed: 1 },
  },
];
