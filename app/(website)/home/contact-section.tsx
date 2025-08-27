"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            primary: "+91 98765 43210",
            secondary: "+91 87654 32109",
            description: "Mon-Sat, 9 AM - 7 PM",
        },
        {
            icon: Mail,
            title: "Email Us",
            primary: "info@getsabacus.com",
            secondary: "support@getsabacus.com",
            description: "We reply within 2 hours",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            primary: "123 Education Street",
            secondary: "Mumbai, Maharashtra 400001",
            description: "India",
        },
    ];

    const renderContactIcon = (IconComponent: React.ElementType) => (
        <IconComponent className="w-6 h-6 text-[var(--primary-red)]" />
    );

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-8 h-8 border-2 border-[var(--primary-red)] rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-full text-primary-foreground font-semibold mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Get In Touch
                        <MessageSquare className="w-5 h-5 ml-2" />
                    </motion.div>

                    <motion.h2
                        className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Ready to{" "}
                        <span className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] bg-clip-text text-transparent">
                            Transform Your Child&apos;s Future?
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-xl text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Take the first step towards unlocking your child's mathematical potential.
                        Get in touch with us today for a free consultation and demo class.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                    {/* Contact Form + Emergency Contact (LEFT COLUMN) */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Contact Form */}
                        <div className="bg-card p-8 rounded-3xl shadow-card border border-border/50">
                            <motion.div
                                className="flex items-center mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-[var(--primary-red)]/10 rounded-xl flex items-center justify-center mr-4">
                                    <Send className="w-6 h-6 text-[var(--primary-red)]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
                                    <p className="text-muted-foreground">We'd love to hear from you</p>
                                </div>
                            </motion.div>

                            <form
                                action="#"
                                method="POST"
                                className="space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("Message sent successfully! 🎉");
                                }}
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Your Name *
                                        </label>
                                        <Input type="text" name="name" placeholder="Enter your full name" required className="h-12" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Phone Number *
                                        </label>
                                        <Input type="tel" name="phone" placeholder="Enter your phone number" required className="h-12" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                                    <Input type="email" name="email" placeholder="Enter your email address" required className="h-12" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                                    <Textarea
                                        name="message"
                                        placeholder="Tell us about your child's age, current math level, and any specific questions you have..."
                                        rows={4}
                                        className="resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] hover:opacity-90 text-primary-foreground font-semibold py-4 rounded-xl shadow-glow hover:shadow-float transition-all duration-300 group"
                                >
                                    <div className="flex items-center ">
                                        Send Message
                                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Button>
                            </form>
                        </div>

                        {/* Emergency Contact BELOW FORM */}
                        <motion.div
                            className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] border border-secondary/20 p-6 rounded-2xl text-center mt-17"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Phone className="w-8 h-8 text-secondary mx-auto mb-3 mt-5" />
                            <h4 className="font-semibold text-white mb-2">Need Immediate Assistance?</h4>
                            <p className="text-gray-50 mb-3">Call our helpline for instant support</p>
                            <a href="tel:+919876543210" className="text-xl font-bold text-secondary hover:underline">
                                +91 98765 43210
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Contact Info + Benefits (RIGHT COLUMN) */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    className="bg-white p-6 rounded-2xl shadow-card hover:shadow-float transition-all duration-300 border border-border/50 group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <motion.div
                                            className="w-14 h-14 bg-[var(--primary-red)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary-red)]/20 transition-colors duration-300"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {renderContactIcon(info.icon)}
                                        </motion.div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-foreground mb-2">{info.title}</h3>
                                            <p className="text-primary font-medium mb-1">{info.primary}</p>
                                            <p className="text-muted-foreground mb-1">{info.secondary}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Benefits */}
                        <motion.div
                            className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] p-8 rounded-3xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-white">What Happens Next?</h3>
                            <div className="space-y-4">
                                {[
                                    "Free 30-minute consultation with our expert",
                                    "Personalized assessment of your child's current level",
                                    "Customized learning plan recommendation",
                                    "Complimentary demo class to experience our method",
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                                        <span className="text-primary-foreground/90">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
