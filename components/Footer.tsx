// components/Footer.js

export default function Footer() {
  return (
   <footer className="bg-gray-900 text-gray-400 py-10">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <p className="text-sm">
      © 2026 DevLaunch. All rights reserved.
    </p>

    <div className="mt-4 flex justify-center gap-6 text-sm">
      <a href="#" className="hover:text-white">Privacy Policy</a>
      <a href="#" className="hover:text-white">Terms of Service</a>
    </div>

  </div>
</footer>
  );
}