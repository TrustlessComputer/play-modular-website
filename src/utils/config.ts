import * as THREE from 'three';

export const previewCanvasConfig = {
  gl: {
    alpha: false,
    antialias: true,
    powerPreference: 'high-performance',
    toneMapping: THREE.LinearToneMapping,
  },
  dpr: Math.min(2, window.devicePixelRatio),
  shadows: true,
  linear: true,
  colormanagement: 'true',
};
