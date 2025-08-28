"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    subtitle: string;
    backgroundImage: string;
    buttons?: {
        label: string;
        href: string;
        variant?: "default" | "outline";
    }[];
}

export default function HeroSection({
    title,
    highlight,
    subtitle,
    backgroundImage,
    buttons = [],
}: HeroSectionProps) {
    return (
        <section className="relative h-[620px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 z-0  bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                    {title}
                    {highlight && (
                        <span
                            className="block bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] bg-clip-text text-transparent"
                        >
                            {highlight}
                        </span>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl md:text-2xl mb-8 text-gray-200"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {buttons.map((btn, i) => (
                        <Link key={i} href={btn.href}>
                            <Button
                                size="lg"
                                variant={btn.variant || "default"}
                                className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 ${btn.variant === "outline"
                                        ? "border-white text-white hover:bg-white hover:text-black bg-transparent"
                                        : "bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] hover:from-[var(--primary-orange)] hover:to-[var(--primary-red)] text-white transform hover:scale-105"
                                    }`}
                            >
                                {btn.label}
                            </Button>
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="w-1 h-3 bg-white rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}
