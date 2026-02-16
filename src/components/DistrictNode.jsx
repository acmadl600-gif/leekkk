import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { Fish, Settings, Building, Scroll, HeartPulse, Wallet, ShoppingBag, Landmark, Castle, Plane, Leaf, Palmtree, Home, Video, Briefcase, Stethoscope, Palette, Zap } from 'lucide-react';

const iconMap = {
    "🐟": Fish, "⚙️": Settings, "🏢": Building, "📜": Scroll, "🏥": HeartPulse, "💰": Wallet,
    "🛍️": ShoppingBag, "🏮": Landmark, "🏰": Castle, "✈️": Plane, "🌿": Leaf, "🏖️": Palmtree,
    "🏘️": Home, "📹": Video, "💼": Briefcase, "🩺": Stethoscope, "🎨": Palette, "⚡": Zap
};

export const DistrictNode = ({ district, x, y, isFiltered, onClick, isSelected, isMobile }) => {
    const Icon = iconMap[district.icon] || Building;
    const nodeRef = useRef(null);

    // Randomize float
    const floatDuration = 4 + Math.random() * 4;
    const floatDelay = Math.random() * 2;

    // Magnetic Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (isMobile || isSelected) return;
        const rect = nodeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const xSpring = useSpring(useTransform(mouseX, [-200, 200], [-30, 30]), springConfig);
    const ySpring = useTransform(mouseY, [-200, 200], [-30, 30]);

    // If selected, we don't render the small node here if we use a separate overlay. 
    // BUT proper layout animation requires the item to remain in the DOM or share layoutId.
    // Strategy: If isSelected is true, this node becomes invisible or acts as the placeholder, 
    // while the "ExpandedCard" renders on top. 
    // However, the User wants the node *itself* to expand.

    return (
        <motion.div
            ref={nodeRef}
            layoutId={`node-${district.id}`}
            className={clsx(
                "flex flex-col items-center justify-center p-4 rounded-full backdrop-blur-md border shadow-lg transition-colors duration-500 cursor-pointer",
                !isMobile && "absolute",
                isMobile && "relative w-full aspect-square",
                "w-24 h-24 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40",
                isFiltered && "ring-2 ring-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.5)] bg-democratic-blue/40"
            )}
            style={!isMobile ? {
                left: x,
                top: y,
                x: xSpring,
                y: ySpring,
            } : {}}
            animate={!isMobile ? {
                y: [0, -15, 0],
            } : {}}
            transition={{
                y: { duration: floatDuration, repeat: Infinity, delay: floatDelay },
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(district)}
        >
            <motion.div layoutId={`icon-${district.id}`} className="flex flex-col items-center">
                <Icon className={clsx("w-8 h-8 mb-1 transition-colors", isFiltered ? "text-neon-blue" : "text-white/80")} />
                <span className="text-xs font-medium text-white/90 text-center whitespace-pre-wrap leading-tight">{district.name}</span>
            </motion.div>
        </motion.div>
    );
};
