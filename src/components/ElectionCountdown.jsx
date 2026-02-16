import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ElectionCountdown = () => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        // Target: June 3, 2026 (8th Local Election or hypothetical next election)
        // Adjust year to 2026 as per user context
        const targetDate = new Date("2026-06-03T00:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft("D-DAY");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            setTimeLeft(`D-${days}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 right-6 z-50 flex flex-col items-end"
        >
            <div className="text-neon-blue font-bold tracking-widest text-xs uppercase mb-1 drop-shadow-md">
                2026.06.03 지방선거
            </div>
            <div className="bg-slate-900/80 border border-neon-blue/50 px-4 py-2 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <span className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {timeLeft}
                </span>
            </div>
        </motion.div>
    );
};
