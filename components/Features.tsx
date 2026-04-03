// // Add metadata for SEO
// export const metadata = {
//   title: 'Features - My DevLaunch Project',
//   description: 'Explore powerful features...'

import { div } from "framer-motion/client";

// }
const FeaturesData = [
  {
    title: "Fast Portfolio Setup",
    description: "Create your developer portfolio in minutes.",
    icon: "🚀",
  },
  {
    title: "Modern Clean Design",
    description: "Professional UI to showcase your projects.",
    icon: "🎨",
  },
  {
    title: "One-Click Deployment",
    description: "Deploy instantly and share with the world.",
    icon: "⚡",
  },
];
export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>

      <p className="text-gray-600 text-center mb-12">
        Everything you need to launch your developer portfolio
      </p>
      <div className="grid md:grid-cols-3 gap-6">
      {FeaturesData.map((feature) => (
  <div 
    key={feature.id || feature.title} 
    className="p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white"
  >
    {/* Icon with Background */}
    {feature.icon && (
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <span className="text-2xl">{feature.icon}</span>
      </div>
    )}
    
    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
      {feature.title}
    </h3>
    
    <p className="text-gray-600 leading-relaxed">
      {feature.description}
    </p>
  </div>
))}
          
      </div>
    </section>
  );
}
