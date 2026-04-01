import Image from "next/image";
function Hero() {
  return (
    
  // <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 border gap-10 items-center">
     <section className="md:w-full  py-20 md:py-12 max-w-7xl mx-auto   sm:px-4 px-6">
      {" "}
      <div className="grid h-full  grid-cols-1 md:grid-cols-2">
        <div className="flex  flex-col justify-center">
          {/* <h1 className="  text-6xl  mb-3   font-bold">
            Launch Your <br />
            <span className=" text-[4rem]   text-blue-600">
              Developer Portfolio
            </span>{" "}
            <br />
            Faster
          </h1> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block">Launch Your</span>
            <span className="block text-blue-600">Developer Portfolio</span>
            <span className="block">Faster</span>
          </h1>
          <p className="text-gray-600 mt-4 mb-6 max-w-md">
            Build, manage and showcase your projects with a modern dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 w-full sm:w-auto px-6 py-3 rounded-md s text-white  font-medium hover:bg-blue-700 shadow-md transition">
              Get Started
            </button>
            <button className="border w-full sm:w-auto px-6 py-3 rounded-md border-gray-300 text-gray-700  font-medium hover:bg-gray-50 transition">
              Live Demo
            </button>
          </div>
        </div>
        <div className="relative hidden md:block  w-full h-[400px] lg:h-[500px]">
          <Image
            src="/assets/images/workspace.jpg"
            alt="Workspace setup with development tools"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
