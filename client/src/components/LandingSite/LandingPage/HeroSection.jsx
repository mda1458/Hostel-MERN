import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center  text-white text-center">
      {/* <img src={heroImg} alt='nust-hostel-img' className='opacity-[0.05] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] select-none' /> */}
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <HeroSVG />
      </div>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl">
          Hostel <span className="text-blue-500">Management</span> System
        </h1>
        <p className="py-10 text-2xl">
          One Solution For All Of The Hostel&apos;s Needs
        </p>
        <div className="py-20">
          <Link
            to="/auth/login"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            Login
          </Link>
          <p className="mt-6 mb-3">OR</p>
          <Link
            to="/auth/request"
            className="text-xl hover:underline hover:text-blue-500"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
