"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Monitor, ArrowRight } from "lucide-react";

const services = [
  "Web Landing Page",
  "Mobile App",
  "Pitch Deck",
  "Rock Development",
  "Branding Page",
];

const pricingPlans = [
  {
    title: "Landing Page Design Or Renesap",
    description: "Professional landing page design with modern UI/UX",
    price: "$457",
    features: [
      "Full Landing Page",
      "1-2 Week Turnaround",
      "Desktop, Tablet and Mobile Version",
      "Design System Included",
      "Unlimited Revisions",
    ],
  },
  {
    title: "Full Website Design Or Renesap",
    description: "Complete website design with scalable architecture",
    price: "$3597",
    features: [
      "Scalable Design Guideline",
      "4-7 Week Turnaround",
      "Responsive for Every Device",
      "Complete Design System",
      "Ongoing Support",
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.6 },
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(0);

  return (
    <motion.section id="services" className="py-16 md:py-24" {...fadeInUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
        What Can I Serve You!
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={() => setSelectedService(index)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedService === index
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {service}
            {selectedService === index && (
              <ArrowRight className="w-4 h-4 inline-block ml-2" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Monitor className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {plan.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {plan.description}
            </p>
            <div className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              {plan.price}
            </div>
            <button className="w-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors mb-6">
              Let&apos;s Get Started
            </button>
            <ul className="space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                >
                  <span className="text-gray-800 dark:text-gray-200">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Services;
