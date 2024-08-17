import * as Three from 'three';
import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function Backdrop() {
    useEffect(() => {
        const scene = new Three.Scene();
        scene.background = new Three.Color(0x000000);

        const canvas = document.getElementById('canvas');
        const renderer = new Three.WebGLRenderer({ antialias: true, canvas });
        const camera = new Three.PerspectiveCamera(2000, 2, 0.1, 500);
        
        camera.position.z = 2;

        // const geometry = new Three.BoxGeometry(1, 1, 1, 32, 32, 32);

        const sphereGeometry = new Three.SphereGeometry(1, 32, 32);

        const material = new Three.MeshBasicMaterial({ color: 0xd3d3d3 });

        // const cube = new Three.Mesh(geometry, material);

        const sphere = new Three.Mesh(sphereGeometry, material);

        renderer.setSize(window.screen.width, window.screen.height);
        scene.add(sphere);
        renderer.render(scene, camera);
      },[])

    return (
        <Box sx={{ zIndex: '-1', position: 'fixed', width: "100%", height: "100%", top: 0}}>
            <canvas id="canvas"></canvas>
        </Box>
    );
}