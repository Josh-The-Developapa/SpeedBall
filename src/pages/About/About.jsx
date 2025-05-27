// import React from "react";
import hero from "../../assets/WhatsApp Image 2025-05-22 at 22.36.00.jpeg";
import Header from "../../components/Navbar/Header";
import Footer from "../../components/Footer/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />

      {/* Hero Section with Viewport Width and Fade Effect */}
      <section className="relative w-screen h-[60vh] max-h-[800px] overflow-hidden">
        {/* Hero Image */}
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />

        {/* Gradient Fade Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Text Section with Smooth Transition */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-base md:text-lg leading-relaxed -mt-4">
        <p className="mb-6">
          Born in the underground scenes of Kampala, Speedball redefines urban
          fashion through boundary-pushing designs. We're not just a clothing
          brand - we're a movement blending street culture, music, and
          contemporary African aesthetics.
        </p>

        <p className="mb-6">
          Each drop is a curated experience, from our limited-edition denim
          campaigns to collaborative artist collections. Our pieces are designed
          for the creators, the nightlife icons, and those who treat the city as
          their runway.
        </p>

        <p>
          Through exclusive events and community initiatives, we've built more
          than a brand - we've created a platform that elevates urban culture in
          East Africa. Every stitch carries our ethos: premium quality, radical
          self-expression, and undeniable edge.
        </p>
      </section>

      <Footer />
    </div>
  );
}
