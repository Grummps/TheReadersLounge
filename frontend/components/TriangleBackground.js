import React, { useRef, useEffect } from 'react';

export default function TriangleBackground() {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const trianglesRef = useRef([]); // Array to hold triangle data such as points and activation

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Creates grid of triangles
        const initTriangles = () => {
            const triangles = [];
            const side = 100; // Length of each side of the triangle
            const height = side * (Math.sqrt(3) / 2); // Height of the triangle
            const cols = Math.ceil(canvas.width / side);
            const rows = Math.ceil(canvas.height / height);

            // Generate downward triangles (base at the top)
            for (let row = 0; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const x = col * side;
                    const y = row * height;
                    triangles.push({
                        points: [
                            { x: x + side / 2, y: y },
                            { x: x + (3 * side) / 2, y: y },
                            { x: x + side, y: y + height }
                        ],
                        activation: 0
                    });
                }
            }

            // Generate upward triangles (base at the bottom)
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * side;
                    const y = row * height;
                    triangles.push({
                        points: [
                            { x, y: y + height },
                            { x: x + side, y: y + height },
                            { x: x + side / 2, y }
                        ],
                        activation: 0
                    });
                }
            }
            trianglesRef.current = triangles;
        };

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initTriangles();
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Update canvas on mouse move
        const handleMouseMove = (event) => {
            mousePos.current = { x: event.clientX, y: event.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        function pointInTriangle(px, py, triangle) {
            const [p0, p1, p2] = triangle.points;
            const areaOrig = Math.abs(
                p0.x * (p1.y - p2.y) +
                p1.x * (p2.y - p0.y) +
                p2.x * (p0.y - p1.y)
            );
            const area1 = Math.abs(
                px * (p1.y - p2.y) +
                p1.x * (p2.y - py) +
                p2.x * (py - p1.y)
            );
            const area2 = Math.abs(
                p0.x * (py - p2.y) +
                px * (p2.y - p0.y) +
                p2.x * (p0.y - py)
            );
            const area3 = Math.abs(
                p0.x * (p1.y - py) +
                p1.x * (py - p0.y) +
                px * (p0.y - p1.y)
            );
            return Math.abs(area1 + area2 + area3 - areaOrig) < 0.1;
        }

        // Animation loop for drawing
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            trianglesRef.current.forEach((triangle) => {
                const isHovered = pointInTriangle(mousePos.current.x, mousePos.current.y, triangle);
                
                // If the mouse is over the triangle and hasn't been hovered over, set activation to 1 and hovered to true
                if (isHovered && !triangle.hovered) { 
                    triangle.activation = 1;
                    triangle.hovered = true;
                } // If the mouse is not over the triangle, set hovered to false
                else if (!isHovered) {
                    triangle.hovered = false;
                }

                triangle.activation = Math.max(0, triangle.activation - 0.04);

                ctx.beginPath();
                ctx.moveTo(triangle.points[0].x, triangle.points[0].y);
                ctx.lineTo(triangle.points[1].x, triangle.points[1].y);
                ctx.lineTo(triangle.points[2].x, triangle.points[2].y);
                ctx.closePath();
                ctx.fillStyle = 'rgba(100, 100, 100, 0.1)';
                ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = .5;
                ctx.stroke();
                

                if (triangle.activation > 0) {
                    ctx.fillStyle = `rgba(25, 25, 25, ${triangle.activation})`;
                    ctx.fill();
                };
            });

            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className='fixed top-0 left-0 w-full h-full pointer-events-none z-[1]'
        />
    );
}