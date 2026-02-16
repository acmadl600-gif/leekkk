import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bus } from 'lucide-react';

export const AIBus = ({ waypoints }) => {
    // We need to construct a path string from waypoints
    // waypoints is array of {x, y} relative to container percentage or pixels
    // Assuming waypoints are simple X, Y numbers

    if (!waypoints || waypoints.length < 2) return null;

    // Simple path: connect dots in order
    const pathData = waypoints.reduce((acc, point, i) => {
        return acc + `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
    }, "") + "Z"; // Close loop

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible">
                <path
                    d={pathData}
                    fill="none"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                />
            </svg>
            <motion.div
                className="absolute top-0 left-0"
                animate={{
                    offsetDistance: "100%",
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    offsetPath: `path("${pathData}")`,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="relative group cursor-pointer pointer-events-auto">
                    <div className="absolute -inset-2 bg-neon-blue/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-democratic-blue p-1.5 rounded-full border border-neon-blue">
                        <Bus className="w-4 h-4 text-white" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-black/80 text-neon-blue text-xs rounded border border-neon-blue/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        찾아가는 구청이 옵니다!
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
