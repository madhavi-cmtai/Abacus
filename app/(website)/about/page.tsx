"use client";

import HeroSection from "@/components/(website)/common-hero";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Target,
  Trophy,
  Heart,
  CheckCircle2,
  Calendar,
  Timer,
  Users,
  GraduationCap,
  Brain,
  Sparkles,
  Award,
  School,
} from "lucide-react";

const abacusImage ='/images/abacus1.jpg'

const curriculumModules = [
  {
    title: "Junior Module",
    subtitle: "Ages 6-8 (Class 1st or 2nd)",
    duration: "3 months (12 Sundays)",
    session: "120 minutes weekly",
    maxSize: "15 students",
    icon: Heart,
    color: "primary",
    description: "Perfect introduction to abacus learning for young minds",
  },
  {
    title: "Foundation Module",
    subtitle: "Class 3rd & above",
    duration: "6 months total",
    session: "120 minutes weekly",
    levels: ["Level 1 Beginners: 3 months", "Level 2 Improvers: 3 months"],
    icon: BookOpen,
    color: "secondary",
    description: "Building essential foundation for abacus mastery",
  },
  {
    title: "Intermediate Module",
    subtitle: "Advancing Skills",
    duration: "6 months total",
    session: "120 minutes weekly",
    levels: ["Level 3 Risers: 3 months", "Level 4 Sprinters: 3 months"],
    icon: TrendingUp,
    color: "primary",
    description: "Enhancing mental calculation abilities",
  },
  {
    title: "Higher Module",
    subtitle: "Complex Calculations",
    duration: "6 months total",
    session: "120-160 minutes weekly",
    levels: ["Level 5 Flyers: 3 months", "Level 6 Achievers: 3 months"],
    icon: Target,
    color: "secondary",
    description: "Mastering complex calculations and mental arithmetic",
  },
  {
    title: "Advanced Module",
    subtitle: "Peak Performance",
    duration: "6 months total",
    session: "160 minutes weekly",
    levels: ["Level 7 Stars: 3 months", "Level 8 Scholars: 3 months"],
    icon: Trophy,
    color: "primary",
    description: "Extraordinary mental calculation skills",
  },
];

const benefitsCategories = [
  {
    category: "Cognitive Skills",
    icon: Brain,
    benefits: [
      "Faster and accurate calculation",
      "Enhanced memory power and recall",
      "Greater attention span",
      "Stronger mental visualization",
    ],
    color: "primary",
  },
  {
    category: "Character Development",
    icon: Heart,
    benefits: [
      "Improved focus and perseverance",
      "Enhanced self-confidence",
      "Disciplined thinking habits",
      "Growth mindset development",
    ],
    color: "secondary",
  },
  {
    category: "Academic Advantages",
    icon: GraduationCap,
    benefits: [
      "Sharpened analytical thinking",
      "Increased creativity",
      "Better comprehension skills",
      "Higher academic performance",
    ],
    color: "primary",
  },
];

const learningExperienceSections = [
  {
    title: "Interactive Learning Games",
    features: [
      "Speed Challenges: Timed exercises for quick calculations",
      "Pattern Recognition Games: Visual memory strengthening",
      "Team Competitions: Collaborative learning experiences",
      "Digital Learning Apps: Home reinforcement tools",
    ],
    icon: Sparkles,
    color: "primary",
  },
  {
    title: "Progress Tracking & Celebration",
    features: [
      "Regular Assessments: 18 structured evaluations",
      "Achievement Certificates: Level completion recognition",
      "Progress Charts: Visual improvement tracking",
      "Competitive Opportunities: National championships",
    ],
    icon: Award,
    color: "secondary",
  },
];

const schoolMemberships = [
  {
    title: "Silver Membership",
    description: "Perfect for schools exploring abacus education as an optional subject",
    features: [
      "13 Rods Abacus Tool",
      "2 Course Books",
      "Assessment Papers",
      "Annual Certificate",
    ],
    recommended: false,
    color: "muted",
  },
  {
    title: "Gold Membership",
    description: "Comprehensive package for schools implementing abacus as compulsory subject",
    features: [
      "17 Rods Abacus Tool",
      "4 Course Books",
      "Daily Activity Planner",
      "Per Level Certificate",
      "Visual Learning Cards",
    ],
    recommended: true,
    color: "primary",
  },
  {
    title: "Diamond Membership",
    description: "Premium option for schools seeking maximum outcomes",
    features: [
      "Customized Implementation",
      "Premium Learning Materials",
      "Advanced Progress Tracking",
      "Dedicated Support",
    ],
    recommended: false,
    color: "secondary",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="About"
        highlight="Abacus Journey"
        subtitle="Empowering young minds with mental math skills, confidence, and lifelong learning."
        backgroundImage="/images/about.jpg"
        buttons={[
          { label: "Explore Courses", href: "/courses" },
          { label: "Join Now", href: "/contact", variant: "outline" },
        ]}
      />

      {/* About Section (Image only, no intro/benefits/Did You Know) */}
      <section id="about" className="py-20 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rotate-45"></div>
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
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary rounded-lg flex items-center justify-center shadow-card"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-secondary-foreground" />
                </motion.div>
              </div>
            </motion.div>
            {/* Right Side - intentionally left empty as per instructions */}
            <div />
          </div>
        </div>
      </section>

      {/* Comprehensive Curriculum Section */}
      <motion.section
        className="mt-32 container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comprehensive Curriculum{" "}
            <span className="gradient-text">Tailored for Ages 6 to 14</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our structured program progression ensures every child develops at their optimal pace through carefully designed modules
          </motion.p>
        </div>
        <div className="grid gap-8">
          {curriculumModules.map((module, index) => (
            <motion.div
              key={module.title}
              className="bg-card p-8 rounded-3xl shadow-card hover:shadow-float transition-all duration-500 border border-border/50"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className={`w-20 h-20 bg-${module.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <module.icon className={`w-10 h-10 text-${module.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold text-${module.color} mb-2`}>{module.title}</h3>
                  <p className="text-lg text-foreground mb-3">{module.subtitle}</p>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{module.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{module.session}</span>
                    </div>
                    {module.maxSize && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground">Max {module.maxSize}</span>
                      </div>
                    )}
                  </div>
                  {module.levels && (
                    <div className="mt-4 space-y-2">
                      {module.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{level}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="mt-32 container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Benefits of{" "}
            <span className="gradient-text">GETS ABACUS</span>
          </motion.h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {benefitsCategories.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-card p-8 rounded-3xl shadow-card hover:shadow-float transition-all duration-500 border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={`w-16 h-16 bg-${category.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                <category.icon className={`w-8 h-8 text-${category.color}`} />
              </div>
              <h3 className={`text-2xl font-bold text-${category.color} mb-6`}>{category.category}</h3>
              <div className="space-y-4">
                {category.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.2 + benefitIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className={`w-5 h-5 text-${category.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Engaging Learning Experience */}
      <motion.section
        className="mt-32 bg-gradient-achievement p-12 rounded-3xl container mx-auto px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Making Mathematics{" "}
            <span className="gradient-text">Fun and Exciting</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We transform learning from a mundane exercise into an exciting journey of discovery
          </motion.p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {learningExperienceSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-card/80 p-8 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 bg-${section.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                <section.icon className={`w-8 h-8 text-${section.color}`} />
              </div>
              <h3 className={`text-2xl font-bold text-${section.color} mb-6`}>{section.title}</h3>
              <div className="space-y-3">
                {section.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + featureIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className={`w-5 h-5 text-${section.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-foreground text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* School Program Section */}
      <motion.section
        className="mt-32 container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            India's First{" "}
            <span className="gradient-text">Membership-Based School Program</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            World's First Rhythmic Abacus Program specially designed for schools - transforming education since 2015
          </motion.p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {schoolMemberships.map((membership, index) => (
            <motion.div
              key={membership.title}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ${
                membership.recommended
                  ? "border-primary shadow-glow bg-primary/5"
                  : "border-border/50 bg-card hover:border-primary/30"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {membership.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-hero text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              <div className={`w-16 h-16 bg-${membership.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                <School className={`w-8 h-8 text-${membership.color === "muted" ? "foreground" : membership.color}`} />
              </div>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  membership.color === "muted" ? "text-foreground" : `text-${membership.color}`
                }`}
              >
                {membership.title}
              </h3>
              <p className="text-muted-foreground mb-6">{membership.description}</p>
              <div className="space-y-3">
                {membership.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        membership.color === "muted" ? "text-foreground" : `text-${membership.color}`
                      }`}
                    />
                    <span className="text-foreground text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
