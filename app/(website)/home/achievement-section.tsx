"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Crown, Award } from "lucide-react";
import Image from "next/image";

const championshipImage = "/images/trophy.jpg";

const stats = [
    { number: "10K+", label: "Participants", icon: Trophy },
    { number: "50+", label: "Cities", icon: Medal },
    { number: "5", label: "Years Running", icon: Crown },
];

const ChampionshipSection = () => {
    return (
        <section className="py-20 bg-[linear-gradient(135deg,#000000,#e63946)] relative overflow-hidden">
            {/* 3D Stage Lights & Geometry */}
            <div className="absolute inset-0">
                {/* Spotlight Effects */}
                <motion.div
                    className="absolute top-0 left-1/4 w-40 h-40 bg-[var(--primary-orange)] rounded-full blur-3xl"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                    className="absolute bottom-0 right-1/4 w-60 h-60 bg-[var(--primary)]/20 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />

                {/* Floating Trophy Elements */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }}
                        animate={{
                            y: [0, -25, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 6 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                        }}
                    >
                        {i % 4 === 0 ? (
                            <Trophy className="w-8 h-8 text-[var(--primary-orange)]" />
                        ) : i % 4 === 1 ? (
                            <Medal className="w-8 h-8 text-[var(--primary-red)]/30" />
                        ) : i % 4 === 2 ? (
                            <Crown className="w-8 h-8 text-[var(--primary-orange)]/30" />
                        ) : (
                            <Award className="w-8 h-8 text-[var(--primary-red)]/30" />
                        )}
                    </motion.div>
                ))}

                {/* Stage Light Beams */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-[var(--primary-orange)]/40 to-transparent transform rotate-12"></div>
                    <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[var(--primary-red)]/40 to-transparent transform -rotate-12"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Content */}
                    <motion.div
                        className="text-[var(--primary-white)] space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center px-6 py-3 bg-[var(--primary-orange)]/20 backdrop-blur-sm rounded-full border border-[var(--primary-orange)]/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Crown className="w-5 h-5 mr-2 text-[var(--primary-orange)]" />
                            <span className="font-semibold text-[var(--primary-orange)]">National Championship</span>
                            <Crown className="w-5 h-5 ml-2 text-[var(--primary-orange)]" />
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl lg:text-6xl text-[var(--primary-white)] font-bold mb-6 leading-tight">
                                GETS National <span className="text-[var(--primary-orange)]">Championship</span>
                            </h2>

                            <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed mb-8">
                                Where young minds showcase their mathematical brilliance and compete for glory
                                on the national stage. Every participant becomes a champion!
                            </p>
                        </motion.div>

                        {/* Championship Features */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    icon: Trophy,
                                    title: "National Competition",
                                    description:
                                        "Annual championship bringing together the brightest mathematical minds from across the country.",
                                },
                                {
                                    icon: Medal,
                                    title: "Recognition for All",
                                    description:
                                        "Every participant receives recognition and certificates, celebrating their journey and achievements.",
                                },
                                {
                                    icon: Star,
                                    title: "Champion Series",
                                    description:
                                        "Multiple categories ensuring every age group has the opportunity to shine and excel.",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="flex items-start space-x-4 p-6 bg-[var(--primary-white)]/10 backdrop-blur-sm rounded-2xl border border-[var(--primary-white)]/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-12 h-12 bg-[var(--primary-orange)]/20 rounded-xl flex items-center justify-center flex-shrink-0"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-[var(--primary-orange)]" />
                                    </motion.div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--primary-white)] mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[var(--primary-white)]/80 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Championship Stats - moved to right side below image */}
                        {/* (Removed from here) */}
                    </motion.div>

                    {/* Right Side - Championship Visual + Stats below image */}
                    <motion.div
                        className="relative flex flex-col"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <motion.div
                                className="relative z-10 rounded-3xl overflow-hidden "
                                whileHover={{ scale: 1.02, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-[500px]">
                                    {/* Orange Glow */}
                                    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                                        <div
                                            className="w-full h-full rounded-3xl"
                                            style={{
                                                boxShadow:
                                                    "0 0 80px 40px var(--primary-orange)",
                                                opacity: 0.7,
                                            }}
                                        ></div>
                                    </div>
                                    <Image
                                        src={championshipImage}
                                        alt="GETS National Championship Trophy"
                                        fill
                                        priority
                                        className="object-cover rounded-3xl shadow-glow"
                                    />
                                </div>

                                {/* Overlay Effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-red)]/20 to-transparent rounded-3xl"></div>
                            </motion.div>

                            {/* Floating Achievement Badges */}
                            <motion.div
                                className="absolute -top-8 -left-8 bg-[var(--primary-orange)] p-4 rounded-full shadow-glow"
                                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Trophy className="w-10 h-10 text-[var(--primary-white)]" />
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-8 -right-8 bg-p[var(--primary-white)] p-4 rounded-full shadow-float"
                                animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            >
                                <Medal className="w-10 h-10 text-[var(--primary-red)]" />
                            </motion.div>

                            <motion.div
                                className="absolute top-1/2 -right-12 bg-gradient-hero p-3 rounded-xl shadow-glow"
                                animate={{ x: [0, 15, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                            >
                                <Crown className="w-8 h-8 text-[var(--primary-white)]" />
                            </motion.div>

                            {/* Glowing Orbs */}
                            <motion.div
                                className="absolute top-20 -left-6 w-16 h-16 bg-[var(--primary-orange)]/30 rounded-full blur-xl"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            <motion.div
                                className="absolute bottom-20 -right-6 w-20 h-20 bg-[var(--primary-red)]/30 rounded-full blur-xl"
                                animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                            />

                            {/* Background Glow */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[var(--primary-orange)]/20 to-[var(--primary-red)]/20 rounded-3xl blur-3xl -z-10 scale-110"></div>
                        </div>

                        {/* Championship Stats - moved here */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--primary-white)]/20 mt-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center group"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="w-12 h-12 bg-[var(--primary-orange)]/20 rounded-full flex items-center justify-center mx-auto mb-3"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <stat.icon className="w-6 h-6 text-[var(--primary-orange)]" />
                                    </motion.div>
                                    <div className="text-2xl lg:text-3xl font-bold text-[var(--primary-orange)] mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-[var(--primary-white)]/80">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ChampionshipSection;
