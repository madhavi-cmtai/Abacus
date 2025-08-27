"use client"

import { motion } from "framer-motion"

export default function Home() {
    // Number of lines and gap size
    const verticalLines = 18; // adjust for density
    const horizontalLines = 14; // adjust for density
    const gap = 48; 

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] relative overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical lines */}
                {Array.from({ length: verticalLines }).map((_, i) => (
                    <div
                        key={`vline-${i}`}
                        className="absolute top-0 bottom-0"
                        style={{
                            left: `${i * gap}px`,
                            width: "1px",
                            background: "rgba(255,255,255,0.13)",
                            opacity: 0.5,
                        }}
                    />
                ))}
                {/* Horizontal lines */}
                {Array.from({ length: horizontalLines }).map((_, i) => (
                    <div
                        key={`hline-${i}`}
                        className="absolute left-0 right-0"
                        style={{
                            top: `${i * gap}px`,
                            height: "1px",
                            background: "rgba(255,255,255,0.13)",
                            opacity: 0.5,
                        }}
                    />
                ))}
            </div>
            {/* Background geometric shapes with subtle floating animations */}
            <div className="absolute inset-0 z-0">
                {/* Large red geometric shape top right */}
                <motion.div
                    className="absolute top-0 right-0 w-80 h-80 bg-red-600 transform rotate-45 translate-x-32 -translate-y-32"
                    animate={{ y: [0, 20, 0], rotate: [45, 50, 45] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>

                {/* Black geometric shape bottom left */}
                <motion.div
                    className="absolute bottom-0 left-0 w-60 h-110 bg-black transform rotate-12 -translate-x-48 translate-y-48"
                    animate={{ y: [0, -15, 0], rotate: [12, 18, 12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>

                {/* Coral/pink accent shapes */}
                <motion.div
                    className="absolute top-20 right-40 w-42 h-42 bg-pink-300 rounded-full opacity-60"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>

                <motion.div
                    className="absolute top-50 left-20 w-44 h-44 bg-red-300 transform rotate-45 opacity-40"
                    animate={{ scale: [1, 1.05, 1], rotate: [45, 50, 45] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>

                {/* Small decorative elements */}
                <motion.div
                    className="absolute top-16 right-16 text-white text-2xl font-bold"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    ×
                </motion.div>
                <motion.div
                    className="absolute top-32 right-8 text-white text-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    +
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-16 text-white text-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    ×
                </motion.div>
                <motion.div
                    className="absolute top-24 left-32 text-orange-300 text-lg"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    •
                </motion.div>
                <motion.div
                    className="absolute bottom-40 right-32 text-orange-300 text-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    •
                </motion.div>

                {/* Brain icons */}
                <motion.div
                    className="absolute top-80 left-12 w-8 h-8 border-2 border-white rounded-full opacity-60"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-4 h-4 bg-white rounded-full m-1 opacity-40"></div>
                </motion.div>
                <motion.div
                    className="absolute bottom-20 right-20 w-8 h-8 border-2 border-white rounded-full opacity-60"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-4 h-4 bg-white rounded-full m-1 opacity-40"></div>
                </motion.div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 py-12 flex items-center min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left content */}
                    <motion.div
                        className="space-y-6"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Title + Subtitle */}
                        <div className="space-y-3 -mt-50 -ml-6">
                            {/* Main Title */}
                            <h1 className="text-white font-black leading-tight">
                                <span className="text-2xl ml-4 text-yellow-200">GETS</span><br />
                                <span className="block lg:inline text-7xl">ABACUS EDUCATION</span>
                            </h1>

                            {/* Subtitle with gradient */}
                            <h2 className="text-4xl lg:text-3xl font-bold text-yellow-200 to-black-500 bg-clip-text">
                                Unlock Your Child&apos;s True Potential
                            </h2>
                        </div>

                        {/* Tagline */}
                        <p className="text-white text-lg lg:text-2xl leading-relaxed max-w-xl -ml-6">
                            Introducing the world&apos;s first <span className="font-semibold text-orange-200">Rhythmic Abacus Method </span>
                            helping children master mental math with speed, accuracy, and confidence.
                        </p>
                    </motion.div>

                    {/* Right content - Child with abacus in oval */}
                    <motion.div
                        className="relative flex justify-center lg:justify-end"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative flex justify-center items-center">
                            {/* White oval background with floating animation */}
                            <motion.div
                                className="w-[540px] h-[450px] bg-white rounded-[50%/40%] shadow-2xl flex items-center justify-center overflow-hidden"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img
                                    src="/images/hero1.png"
                                    alt="Happy child holding colorful abacus"
                                    className="w-full h-full object-cover object-center"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
