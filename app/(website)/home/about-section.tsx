"use client";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Target, Zap } from "lucide-react";


const abacusImage = "/images/abacus1.jpg";

const AboutSection = () => {
    return (
        <>
            <section id="about" className="py-20 bg-[var(--primary-white)]/10 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--primary-red)] rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-[var(--primary-orange)]/10 rotate-45"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Image */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <img
                                    src={abacusImage}
                                    alt="Traditional Abacus"
                                    className="w-full h-auto rounded-2xl shadow-card"
                                />

                                {/* Floating elements around image */}
                                <motion.div
                                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-[var(--primary-red)] rounded-full flex items-center justify-center shadow-glow"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Brain className="w-8 h-8 text-[var(--primary-white)]/10" />
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-[var(--primary-orange)] rounded-lg flex items-center justify-center shadow-card"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Zap className="w-6 h-6 text-[var(--primary-white)]" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Side - Content */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div>
                                <motion.h2
                                    className="text-4xl lg:text-5xl font-bold text-[var(--primary-black)] mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    The Power of{" "}
                                    <span className="bg-gradient-to-b from-[var(--primary-red)] to-[var(--primary-orange)] bg-clip-text text-transparent">Abacus Learning</span>
                                </motion.h2>

                                <motion.p
                                    className="text-lg text-[var(--primary-black)]/60 leading-relaxed"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    At GETS Abacus Education, we believe every child has unlimited potential waiting to be unlocked.
                                    Our revolutionary Rhythmic Abacus Method™ combines ancient wisdom with modern neuroscience to create
                                    a learning experience that's both fun and incredibly effective.
                                </motion.p>
                            </div>

                            {/* Key Benefits */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    {
                                        icon: Brain,
                                        title: "Whole Brain Development",
                                        desc: "Activates both left & right brain hemispheres"
                                    },
                                    {
                                        icon: Lightbulb,
                                        title: "Enhanced Creativity",
                                        desc: "Boosts imagination and problem-solving skills"
                                    },
                                    {
                                        icon: Target,
                                        title: "Improved Focus",
                                        desc: "Develops concentration and attention span"
                                    },
                                    {
                                        icon: Zap,
                                        title: "Lightning-Fast Calculations",
                                        desc: "Mental math faster than calculators"
                                    }
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={benefit.title}
                                        className="bg-[var(--primary-orange)]/10 p-6 rounded-xl shadow-card hover:shadow-float transition-all duration-300 border border-border/50"
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <benefit.icon className="w-8 h-8 text-[var(--primary-red)] mb-3" />
                                        <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-gradient-to-br from-[var(--primary-red)] bg-pink-700 to-[var(--primary-black)]/60 py-16">
                <motion.div
                    className=" bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] p-6 rounded-xl text-[var(--primary-black)] relative overflow-hidden max-w-5xl mx-auto flex items-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Subtle circular background element inside card */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gray-500/20 rounded-full -mr-24 -mt-24 pointer-events-none"></div>

                    {/* Left Content */}
                    <div className="relative z-10 w-3/5 pl-6 py-4">
                        <h3 className="text-3xl font-bold mb-3">Did You Know? 🧠</h3>
                        <p className="text-xl leading-relaxed">
                            Children who learn abacus show a 30% improvement in mathematical abilities
                            and 25% better concentration levels compared to traditional learning methods.
                            Our rhythmic approach makes it even more effective!
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="w-2/5 flex justify-end items-center pr-6">
                        <img
                            src="/images/abacus-learning.png"
                            alt="Child learning abacus"
                            className="rounded-lg shadow-sm max-h-[290px] object-cover"
                        />
                    </div>
                </motion.div>
            </section>

        </>
    );
};

export default AboutSection;