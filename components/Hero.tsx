import Image from "next/image";
function Hero() {
  return (
    <section className="w-full  [height:calc(100vh-80px)] py-7 md:px-8 sm:px-4 px-2">
      {" "}
      <div className="grid h-full  grid-cols-1 md:grid-cols-2">
        <div className="flex  flex-col justify-center">
          <h1 className="  text-6xl  mb-3   font-bold">
            Launch Your <br />
            <span className=" text-[4rem]   text-blue-600">
              Developer Portfolio
            </span>{" "}
            <br />
            Faster
          </h1>
          <p className="text-gray-600 mb-6">
            Build, manage and showcase your projects with a modern dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600  sm:w-auto text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md transition">
              Get Started
            </button>
            <button className="border sm:w-auto border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
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
