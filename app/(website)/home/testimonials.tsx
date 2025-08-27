"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        role: "Mother of Arjun (Age 8)",
        content:
            "GETS Abacus has transformed my son's approach to mathematics. His confidence has soared, and he now solves complex problems in seconds. The Rhythmic Method™ is truly revolutionary!",
        rating: 5,
        location: "Mumbai",
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        role: "Father of Ananya (Age 10)",
        content:
            "We've seen remarkable improvement in our daughter's concentration and memory. She's not just better at math, but excelling in all subjects. Thank you GETS Abacus!",
        rating: 5,
        location: "Delhi",
    },
    {
        id: 3,
        name: "Meera Patel",
        role: "Mother of Rohan (Age 9)",
        content:
            "The personalized attention and expert guidance at GETS Abacus is exceptional. My child looks forward to every class and has developed a genuine love for learning.",
        rating: 5,
        location: "Bangalore",
    },
    {
        id: 4,
        name: "Amit Singh",
        role: "Father of Kavya (Age 7)",
        content:
            "Amazing results in just 6 months! Our daughter's mental calculation speed has increased dramatically. The teachers are incredibly patient and skilled.",
        rating: 5,
        location: "Pune",
    },
    {
        id: 5,
        name: "Sunita Gupta",
        role: "Mother of Aditya (Age 11)",
        content:
            "GETS Abacus doesn't just teach math - it develops the whole brain. We've noticed improvements in creativity, problem-solving, and overall academic performance.",
        rating: 5,
        location: "Chennai",
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setIsAutoPlaying(false)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setIsAutoPlaying(false)
    }

    const getVisibleTestimonials = () => {
        const visible = []
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length
            visible.push(testimonials[index])
        }
        return visible
    }

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-[var(--primary-red)] bg-pink-700 to-[var(--primary-black)]/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-[var(--primary-white)] mb-6">
                        What Parents Say About <span className="bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] bg-clip-text text-transparent">GETS Abacus</span>
                    </h2>
                    <p className="text-lg text-[var(--primary-white)] max-w-3xl mx-auto">
                        Discover how GETS Abacus has transformed thousands of children&apos;s lives through the voices of satisfied
                        parents across India.
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {getVisibleTestimonials().map((testimonial, index) => (
                                <Card
                                    key={`${testimonial.id}-${currentIndex}`}
                                    className={`h-full transition-all duration-300 p-4 ${index === 1 ? "md:scale-105 border-primary/30 shadow-lg" : "border-border/50"
                                        } bg-card/80 backdrop-blur-sm`}
                                >
                                    <CardContent className="p-8">
                                        {/* Quote icon */}
                                        <Quote className="w-8 h-8 text-[var(--primary-red)] mb-4" />

                                        {/* Rating */}
                                        <div className="flex items-center mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <p className="text-muted-foreground leading-relaxed mb-6 italic">&quot;{testimonial.content}&quot;</p>

                                        {/* Author */}
                                        <div className="border-t border-border/50 pt-4">
                                            <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            <p className="text-xs text-[var(--primary-red)] font-medium mt-1">{testimonial.location}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center space-x-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevTestimonial}
                            className="rounded-full border-[var(--primary-white)]/30 hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </Button>

                        {/* Dots indicator */}
                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index)
                                        setIsAutoPlaying(false)
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30"
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextTestimonial}
                            className="rounded-full border-[var(--primary-white)]/70 hover:bg-primary hover:text-[var(--primary-white)] bg-transparent"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </Button>
                    </div>

                    {/* Auto-play indicator */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className="text-sm text-[var(--primary-white)] hover:text-[var(--primary-white)]/70 transition-colors"
                        >
                            {isAutoPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
