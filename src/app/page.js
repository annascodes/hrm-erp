import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/d8/84/23/d88423994bd590561fb0b67e290af9f0.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
