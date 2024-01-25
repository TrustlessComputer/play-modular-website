export const HEADER_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.154.0/build/three.module.js"
        }
      }
    </script>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      .container {
        margin: 0 auto;
      }
      canvas {
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <div class="container"></div>
    <script type="module">
      import * as THREE from "three";
`
// BEGIN CONCAT STRING

// const viewType = "Isometric";
// const traits = [
//   {
//     id: "1",
//     shape: "S1x1",
//     patterns: ["Btc", ["#cececece", "#cececece", "#cececece"]],
//     positions: [
//       { x: 12.5, y: 50, z: 12.5 },
//       { x: 12.5, y: 50 + 33.333333333, z: 12.5 },
//     ],
//   },
//   {
//     id: "2",
//     shape: "S2x2",
//     patterns: ["Sol", ["#cececece", "#cececece", "#cececece"]],
//     positions: [{ x: 25, y: -16.666666666666668, z: 25 }],
//   },
//   {
//     id: "3",
//     shape: "S3x1",
//     patterns: ["Sol", ["#cececece", "#cececece", "#cececece"]],
//     positions: [{ x: 62.5, y: 50, z: 12.5 }],
//   },
// ];

// END CONCAT STRING

export const FOOTER_HTML = `
      const scene = new THREE.Scene();
      const aspect = window.innerWidth / window.innerHeight;
      const frustum = 500;
      const left = -aspect * frustum;
      const right = aspect * frustum;
      const top = frustum;
      const bottom = -frustum;
      const cameraConfig = {
        Isometric: {
          position: {
            x: 500,
            y: 500,
            z: 500,
          },
        },
        TopDown: {
          position: {
            x: 0,
            y: 1000,
            z: 0,
          },
        },
      };
      const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 100000);
      camera.position.x = cameraConfig[viewType].position.x;
      camera.position.y = cameraConfig[viewType].position.y;
      camera.position.z = cameraConfig[viewType].position.z;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      const lightColor = 0xffffff;
      const hemisphereLight = new THREE.HemisphereLight(lightColor, 0x444444, 0.1);
      const directionalLight = new THREE.DirectionalLight(lightColor, 1);
      const directionalLight2 = new THREE.DirectionalLight(lightColor, 0.5);
      directionalLight.position.set(0, 100, 0);
      directionalLight2.lookAt(0, 0, 0);
      directionalLight2.position.set(0, 0, 100);
      directionalLight2.lookAt(0, 0, 0);
      scene.add(hemisphereLight);
      scene.add(directionalLight);
      scene.add(directionalLight2);
      scene.add(camera);
      const baseCubeSize = 25;
      const baseKnobSize = 7;
      const baseCubeHeight = (baseCubeSize * 2) / 1.5;
      const baseCubeGeometry = new THREE.BoxGeometry(baseCubeSize, baseCubeHeight, baseCubeSize);
      const baseKnobGeometry = new THREE.CylinderGeometry(baseKnobSize, baseKnobSize, baseKnobSize, 36);
      traits.forEach((trait) => {
        const sizeString = trait.shape.slice(1);
        const sizeArray = sizeString.split("x");
        const size = {
          scaleX: parseInt(sizeArray[0]),
          scaleY: parseInt(sizeArray[2]) || 1,
          scaleZ: parseInt(sizeArray[1]),
        };
        const mainColor = trait.patterns[1][0];
        const brick = createBrick(size);
        const brickGroup = new THREE.Group();
        brick.forEach((cube, index) => {
          const cubeMesh = new THREE.Mesh(cube.cube, new THREE.MeshPhysicalMaterial({ color: mainColor }));
          const knobMesh = new THREE.Mesh(cube.knob, new THREE.MeshPhysicalMaterial({ color: mainColor }));
          brickGroup.add(cubeMesh);
          brickGroup.add(knobMesh);
        });
        trait.positions.forEach((position) => {
          const brickClone = brickGroup.clone();
          brickClone.position.set(position.x, Math.abs(position.y), position.z);
          scene.add(brickClone);
        });
      });
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        },
        linear: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      animate();
      function createBrick(dimensions) {
        let objects = [];
        for (let i = 0; i < dimensions.scaleX; i++) {
          for (let j = 0; j < dimensions.scaleZ; j++) {
            const cloneCube = baseCubeGeometry.clone();
            const xCube = i * baseCubeSize - (dimensions.scaleX * baseCubeSize) / 2 + baseCubeSize / 2;
            const zCube = j * baseCubeSize - (dimensions.scaleZ * baseCubeSize) / 2 + baseCubeSize / 2;
            const cloneKnob = baseKnobGeometry.clone();
            const yKnob = baseCubeHeight / 2 + baseKnobSize / 2;
            cloneCube.translate(xCube, 0, zCube);
            cloneKnob.translate(xCube, yKnob, zCube);
            objects.push({
              cube: cloneCube,
              knob: cloneKnob,
            });
          }
        }
        return objects;
      }
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    </script>
  </body>
</html>
`
