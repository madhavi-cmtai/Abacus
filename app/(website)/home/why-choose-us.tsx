"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Why Choose Data
const chooseReasons = [
    {
        title: "Expert Tutors",
        description:
            "Our specially trained teachers make learning fun, interactive, and effective through the revolutionary Rhythmic Abacus Method. Each instructor undergoes rigorous training to deliver a multisensory experience that activates both brain hemispheres simultaneously.",
        image: "/images/choose/tutors.png",
        isDark: true,
    },
    {
        title: "Updated Curriculum",
        description:
            "Our well-researched, modern course material builds sharp minds through a scientifically developed approach. The curriculum combines auditory, visual, and kinesthetic learning experiences to create true brain balance and enhance cognitive development.",
        image: "/images/choose/curriculum.png",
        isDark: true,
        forceWhiteText: true,
    },
    {
        title: "Personal Attention",
        description:
            "Small class sizes ensure every child receives focused guidance and personalized support. With a maximum of 15 students per class, our teachers can monitor individual progress and adapt teaching strategies to meet each child's unique learning needs.",
        image: "/images/choose/attention.png",
        isDark: true,
    },
    {
        title: "Strong Parent Connect",
        description:
            "We maintain honest, regular communication to keep parents involved and informed about their child's progress. Our dedicated Parent-Teacher Meetings after each assessment provide detailed insights into your child's strengths and areas for improvement.",
        image: "/images/choose/connect.png",
        isDark: true,
        forceWhiteText: true,
    },
    {
        title: "Proven Brain Development",
        description:
            "Our step-by-step guidance unlocks children's mental power and confidence through a structured approach. By engaging both hands, both eyes, and both ears, children activate both brain hemispheres, achieving true brain balance and enhanced cognitive functions.",
        image: "/images/choose/brain.png",
        isDark: true,
    },
];

// Card Component
const ChooseCard = ({
    title,
    description,
    image,
    isDark = false,
    index,
    forceWhiteText = false,
}: {
    title: string;
    description: string;
    image: string;
    isDark?: boolean;
    index: number;
    forceWhiteText?: boolean;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={cn(
                "group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                "min-h-[260px] flex flex-col"
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Removed white overlay */}
                {isDark && (
                    <div className="absolute inset-0 transition-opacity duration-300 bg-[rgba(0,0,0,0.7)] group-hover:bg-[rgba(220,38,38,0.6)]" />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full justify-center text-center">
                <motion.h3
                    className={cn(
                        "text-xl font-bold mb-3 transition-colors duration-300",
                        (isDark || forceWhiteText) ? "text-white" : "text-[#020652]"
                    )}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    {title}
                </motion.h3>
                <p
                    className={cn(
                        "text-sm leading-relaxed transition-colors duration-300",
                        (isDark || forceWhiteText) ? "text-white/90" : "text-gray-600"
                    )}
                >
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

// Section Component
const WhyChooseAbacus = () => {
    return (
        <section id="why-choose" className="py-16 px-4 bg-white">
            <div className="max-w-[80rem] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="relative inline-block text-5xl font-bold mb-6 p-1 group bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Why GETS Abacus Education?
                        <span className="absolute left-0 -bottom-4 w-1/2 h-[4.5px] rounded-2xl transition-all duration-500 group-hover:w-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] mt-1"></span>
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-600 max-w-5xl mx-auto mt-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        We&apos;re not just teaching math – we&apos;re developing minds. Our unique
                        approach combines traditional abacus techniques with modern
                        educational methods to create an unparalleled learning experience.
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chooseReasons.map((reason, index) => (
                        <ChooseCard
                            key={`${reason.title}-${index}`}
                            title={reason.title}
                            description={reason.description}
                            image={reason.image}
                            isDark={reason.isDark}
                            index={index}
                            forceWhiteText={reason.forceWhiteText}
                        />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <button className="px-8 py-3 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-semibold rounded-lg shadow-md hover:bg-[#a30c0c] transition-colors">
                        Join Thousands of Parents Who Trust GETS Abacus
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseAbacus;
