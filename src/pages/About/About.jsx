import { useEffect } from 'react';
import hero from '../../assets/SpeedBall-Laptop.jpg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SBsig from '../../assets/sb-sig.svg';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#8A7345] text-white flex flex-col about-page">
      <Header />
      <section className="flex flex-col xl:flex-row flex-grow about-section ">
        {/* Image Section */}
        <div className="about-image-div relative xl:w-[75%] xl:h-[100vh] h-[400px]">
          <img
            src={hero}
            alt="Hero"
            className="w-full xl:h-[100vh] object-cover object-top h-[400px]"
          />
          {/* Mobile Fade */}
          {/* <div className="absolute inset-x-0 bottom-0 xl:h-1/2 bg-gradient-to-t from-black to-transparent xl:hidden pointer-events-none fade-overlay mobile-fade h-[500px]" /> */}
          {/* Desktop Fade */}
          {/* <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent hidden xl:block pointer-events-none fade-overlay desktop-fade" /> */}
        </div>

        {/* Text Section */}
        <div
          className="w-full xl:w-[40%] px-6 py-6 xl:py-8 xl:px-12 text-base xl:text-lg leading-relaxed space-y-4 overflow-y-auto text-content flex flex-col justify-center items-center"
          id="text-section"
        >
          <img
            src={SBsig}
            alt="SB-Sig"
            className="h-[95px] w-[126px] object-contain m-0 mb-[20px]"
          />
          <p className="text-[14px] font-400">
            Speedball is a contemporary fashion house rooted in Kampala's
            underground, where sound, sweat, and subversion converge. Born at
            the intersection of street culture and postcolonial expression, our
            garments are more than attire. They are urban artifacts shaped by
            the chaos and clarity of the modern African metropolis.
          </p>

          <p className="text-[14px] font-400 mb-0">
            Speedball reimagines streetwear as an evolving medium. We design for
            those who shape culture from the margins: boundary-pushers,
            nightlife architects, and city-dwellers who treat movement as
            performance.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
