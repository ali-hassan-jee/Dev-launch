// // Add metadata for SEO
// export const metadata = {
//   title: 'Features - My DevLaunch Project',
//   description: 'Explore powerful features...'

import { div } from "framer-motion/client";

// }
const FeaturesData=[
    {
        'title':'Fast Portfolio Setup',
        'description':'Fast Portfolio Setup'
    },
    {
        'title':'Modern Clean Design',
        'description':'Create your developer portfolio in minutes without complex setup.'
    },
    {
        'title':'One-Click Deployment',
        'description':'Deploy your portfolio instantly and share it with the world.'
    },
]
export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>

      <p className="text-gray-600 text-center mb-12">
        Everything you need to launch your developer portfolio
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {FeaturesData.map((feature) => (
  <div key={feature.title} className="p-6 border rounded-xl hover:shadow-md  hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">
             {feature.description}
            </p>
          </div>
))}
          
      </div>
    </section>
  );
}
