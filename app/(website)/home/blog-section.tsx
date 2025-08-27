'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BlogsPreview = () => {
    // ✅ Hardcoded blogs
    const blogs = [
        {
            id: '1',
            title: 'Mastering Yoga for Mental Health',
            summary:
                'Discover how yoga can improve mental well-being, reduce stress, and boost mindfulness with simple daily practices.',
            image:
                '/images/abacus1.jpg',
        },
        {
            id: '2',
            title: 'The Science Behind Balanced Nutrition',
            summary:
                'Learn the fundamentals of a balanced diet and how it fuels your body for energy, immunity, and longevity.',
            image:
                '/images/hero1.png',
        },
    ];

    return (
        <section id="blogs" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Our <span className="bg-gradient-to-r from-[var(--primary-red)] to-orange-400 bg-clip-text text-transparent">Blogs</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore insights, tips, and knowledge to grow your lifestyle.
                    </p>
                </motion.div>

                {/* Blog Cards */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="w-full lg:w-[60%] group rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                        >
                            {/* Blog Image */}
                            <div className="relative h-[55vh]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${blog.image})` }}
                                />
                            </div>

                            {/* Blog Content */}
                            <div className="bg-black p-6 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                        {blog.summary}
                                    </p>
                                    <Link href={`/blogs/${encodeURIComponent(blog.title.trim())}`}>
                                        <Button
                                            variant="outline"
                                            className="text-sm font-semibold px-6 py-2 border-border hover:bg-gray-300 hover:text-accent-foreground transition-all"
                                        >
                                            Read More →
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* More Blogs Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-[var(--primary-red)] to-orange-400 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-hover transition-all duration-300 hover:scale-105"
                    >
                        View All Blogs
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogsPreview;
