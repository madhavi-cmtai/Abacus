"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users, Globe, Award, TrendingUp } from "lucide-react"

export default function MissionVisionSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-[var(--primary-red)] bg-pink-700 to-[var(--primary-black)]/60 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--primary-red)]/10 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-[var(--primary-orange)]/10 rounded-full animate-bounce-gentle"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--primary-red)]/5 rounded-full animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 group">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 cursor-pointer">
                        Our Mission & Vision
                    </h2>
                    <div className="h-1 bg-[var(--primary-red)] mx-auto rounded-2xl transition-all duration-300 w-24 group-hover:w-40"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <Card className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                        <CardHeader className="text-center pb-6">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                                <Heart className="h-10 w-10 text-[var(--primary-red)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-white">Our Mission</CardTitle>
                            <p className="text-xl text-white/90 font-medium">Whole Brain Development is Every Child's Right</p>
                        </CardHeader>
                        <div className="flex flex-col space-y-6 max-w-xl mx-auto">
                            <Card className="bg-[var(--primary-white)]/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-102 transition-transform duration-300 w-full">
                                <CardContent className="text-white space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Users className="h-6 w-6 text-yellow-200 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold mb-2 text-yellow-200">Inclusive Education</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                At GETS Abacus, our core mission is to bring the gift of whole brain development to every child —
                                                from rural villages to urban cities, regardless of background or circumstance.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--primary-white)]/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-102 transition-transform duration-300 w-full">
                                <CardContent className="text-white space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Target className="h-6 w-6 text-yellow-200 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold mb-2 text-yellow-200">Customized Solutions</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                We are committed to designing and delivering unique, customized abacus solutions tailored to meet
                                                the diverse needs of children from every section of society.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--primary-white)]/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-102 transition-transform duration-300 w-full">
                                <CardContent className="text-white space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Globe className="h-6 w-6 text-yellow-200 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold mb-2 text-yellow-200">Educational Movement</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                GETS Abacus is not just a learning program — it is a movement for educational empowerment. Join us
                                                as we build a future where every child rises with the power of their whole brain.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </Card>

                    {/* Vision Card */}
                    <Card className="bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-red)] border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                        <CardHeader className="text-center pb-6">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                                <TrendingUp className="h-10 w-10 text-[var(--primary-orange)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-white">Our Vision for 2035</CardTitle>
                            <p className="text-xl text-white/90 font-medium">Transforming Education Nationwide</p>
                        </CardHeader>
                        <CardContent className="text-white space-y-6">
                            <p className="text-white/90 leading-relaxed mb-6">
                                By 2035, GETS ABACUS envisions a revolution in education where every child can unlock the full potential
                                of their brain through our scientifically structured abacus mental arithmetic program.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[var(--primary-white)]/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-102 transition-transform duration-300 w-full">
                                    <div className="text-3xl font-bold text-center mt-3 text-yellow-200 mb-2">10,000</div>
                                    <div className="text-sm text-center p-2 text-white/80 -mt-1">Trained Franchisees</div>
                                </div>
                                <div className="text-center p-4 bg-[var(--primary-white)]/10 rounded-lg backdrop-blur-sm border border-white/20 hover:scale-102 transition-transform duration-300 w-full">
                                    <div className="text-3xl font-bold text-yellow-200 mb-2">1M+</div>
                                    <div className="text-sm text-white/80">Students Mentored</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Award className="h-5 w-5 text-yellow-200" />
                                    <span className="text-white/90">Nationwide network of certified coaches</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="h-5 w-5 text-yellow-200" />
                                    <span className="text-white/90">Transforming intellectual culture across India</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Heart className="h-5 w-5 text-yellow-200" />
                                    <span className="text-white/90">Making brain development democratic and accessible</span>
                                </div>
                            </div>

                            <div className="bg-[var(--primary-white)]/10 p-4 rounded-lg backdrop-blur-sm border border-white/20 hover:scale-102 transition-transform duration-300 w-full">
                                <h4 className="font-bold mb-2 text-yellow-200">Our Core Values</h4>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Excellence in education, innovation in methodology, integrity in partnerships, and commitment to
                                    measurable student growth.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
