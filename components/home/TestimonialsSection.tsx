'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: 'RK Foundation made my loan process incredibly smooth. Got approved in just 30 minutes!',
    author: 'Rajesh Kumar',
    role: 'Small Business Owner',
    rating: 5,
  },
  {
    text: 'The AI prediction was spot on. No hidden charges, everything transparent from start to finish.',
    author: 'Priya Sharma',
    role: 'Marketing Professional',
    rating: 5,
  },
  {
    text: 'Customer support is outstanding. They helped me understand every step of the process.',
    author: 'Amit Patel',
    role: 'Entrepreneur',
    rating: 5,
  },
  {
    text: 'Best loan experience I\'ve had. Quick disbursement and friendly staff throughout.',
    author: 'Neha Singh',
    role: 'IT Professional',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold">CUSTOMER REVIEWS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            See what our satisfied customers have to say about their experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-foreground/5 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
              </div>

              {/* Text */}
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
