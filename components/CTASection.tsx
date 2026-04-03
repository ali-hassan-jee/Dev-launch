// components/CTASection.js

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-blue-600 text-white py-20">
  <div className="max-w-4xl mx-auto text-center px-6">

    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Start building your portfolio today
    </h2>

    <p className="text-blue-100 mb-8">
      Take your first step towards an impressive developer portfolio.
    </p>

    <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
      Get Started
    </button>

  </div>
</section>
  );
}