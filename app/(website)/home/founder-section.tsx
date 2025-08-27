"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Award, Users, Target } from "lucide-react"

// ✅ Animated Stat Component
function AnimatedStat({
    label,
    start,
    end,
    step,
    duration = 2000,
    colorClass = "text-[var(--primary-red)]",
    format = (n: number) => `${n}+`,
}: {
    label: string
    start: number
    end: number
    step: number
    duration?: number
    colorClass?: string
    format?: (n: number) => string
}) {
    const [value, setValue] = useState(start)

    useEffect(() => {
        const steps = Math.max(1, Math.ceil((end - start) / step))
        const interval = duration / steps

        let current = start
        const id = setInterval(() => {
            current = Math.min(end, current + step)
            setValue(current)
            if (current >= end) clearInterval(id)
        }, interval)

        return () => clearInterval(id)
    }, [start, end, step, duration])

    return (
        <div className="bg-gray-100/80 border border-gray-300 rounded-xl p-6 aspect-square flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-200/90 group">
            <div className={`text-3xl md:text-4xl font-extrabold ${colorClass} animate-pulse group-hover:animate-none group-hover:text-[var(--primary-black)] transition-colors`}>
                {format(value)}
            </div>
            <div className="mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">{label}</div>
        </div>
    )
}

function VisionCard({
    icon,
    iconBg,
    iconColor,
    title,
    message,
    gradientFrom,
    gradientTo,
}: {
    icon: React.ReactNode
    iconBg: string
    iconColor: string
    title: string
    message: string
    gradientFrom: string
    gradientTo: string
}) {
    return (
        <Card className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
            <CardContent className="flex flex-col items-center text-center p-6">
                <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${iconBg} shadow-md`}>
                    {icon}
                </div>
                <h4 className="font-bold text-white text-xl mb-2">{title}</h4>
                <p className="text-white/90 text-base">{message}</p>
            </CardContent>
        </Card>
    )
}

export default function FounderSection() {
    return (
        <section className="py-20 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-40 h-40 bg-[var(--primary-red)]/5 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--primary-orange)]/5 rounded-full animate-bounce-gentle"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[var(--primary-red)]/3 rounded-full animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Founder Image and Info */}
                        <div className="text-center lg:text-left space-y-6">
                            <div className="relative inline-block mb-8">
                                <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                                    <img
                                        src="/images/founder.jpg"
                                        alt="Kamlesh Nema - Founder & CEO"
                                        className="w-full h-full object-cover rounded-xl shadow-sm mt-14"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-[var(--primary-red)] rounded-full p-4 animate-pulse-glow">
                                    <Award className="h-8 w-8 text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-[var(--primary-red)]">Kamlesh Nema</h3>
                                <p className="text-xl font-medium text-[var(--primary-orange)]">Founder & CEO</p>
                                <p className="text-lg text-yellow-200">GETS Abacus OPC Pvt. Ltd.</p>

                                {/* ✅ Animated Stats in Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 ">
                                    <AnimatedStat
                                        label="Years Experience"
                                        start={0}
                                        end={20}
                                        step={2}
                                        colorClass="text-[var(--primary-red)] "
                                        format={(n) => `${n}+`}
                                    />
                                    <AnimatedStat
                                        label="Lives Touched"
                                        start={0}
                                        end={1_000_000}
                                        step={10_000}
                                        colorClass="text-[var(--primary-orange)]"
                                        format={(n) => {
                                            if (n >= 1_000_000) return "1M+"
                                            if (n >= 1000) return `${Math.round(n / 1000)}k+`
                                            return `${n}+`
                                        }}
                                    />
                                    <AnimatedStat
                                        label="Records Set"
                                        start={1}
                                        end={60}
                                        step={5}
                                        colorClass="text-[var(--primary-red)]"
                                        format={(n) => `${n}+`}
                                    />
                                </div>
                            </div>

                            {/* ✅ Final Message Card moved LEFT */}
                            <Card className="bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] border-0 mt-8">
                                <CardContent className="p-6">
                                    <p className="text-white font-medium text-lg leading-relaxed text-center">
                                        &ldquo;Let us build a future where no child is left behind — where every child can dream bigger, think
                                        faster, and shine brighter. That is the promise of GETS Abacus.&rdquo;
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Founder Message */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <Quote className="h-8 w-8 text-[var(--primary-red)] flex-shrink-0" />
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-black)] mb-4">
                                    A Message from the Founder
                                </h2>
                            </div>

                            <Card className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                                <CardContent className="p-8">
                                    <div className="space-y-6 text-gray-100">
                                        <p className="text-lg leading-relaxed italic">
                                            &ldquo;When I began my journey in the field of abacus and mental arithmetic nearly two decades ago, I
                                            carried one belief in my heart — every child has extraordinary potential waiting to be discovered.&rdquo;
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            Over the years, I have witnessed countless young learners transform from hesitant,
                                            under-confident students into champions of speed, accuracy, and focus. Each story is a reminder
                                            that the right guidance can truly reshape a child&apos;s future.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            With GETS Abacus, my mission has always been larger than teaching arithmetic. It is about creating
                                            a movement for whole brain development — a path where children don&apos;t just learn to calculate
                                            faster, but learn to think sharper, concentrate deeper, and believe stronger in themselves.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Vision Points - Redesigned Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                <VisionCard
                                    icon={<Users className="h-8 w-8" style={{ color: "#fff" }} />}
                                    iconBg="bg-[var(--primary-red)]"
                                    iconColor="text-white"
                                    title="To Parents"
                                    message="Your child already has the seeds of greatness."
                                    gradientFrom="from-[var(--primary-red)]/90"
                                    gradientTo="to-[var(--primary-orange)]/80"
                                />
                                <VisionCard
                                    icon={<Target className="h-8 w-8" style={{ color: "#fff" }} />}
                                    iconBg="bg-[var(--primary-orange)]"
                                    iconColor="text-white"
                                    title="To Educators"
                                    message="Together, let&apos;s water those seeds with whole brain development."
                                    gradientFrom="from-[var(--primary-orange)]/90"
                                    gradientTo="to-[var(--primary-red)]/80"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
