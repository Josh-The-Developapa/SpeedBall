import hero from '../../assets/WhatsApp Image 2025-05-22 at 22.36.00.jpeg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function AboutPage() {
  return (
    <div className="about min-h-screen bg-black text-white font-sans flex flex-col">
      <Header />

      <section className="flex flex-col xl:flex-row w-full flex-grow">
        <div className="w-full xl:w-[60%] h-[50vh] xl:h-full relative">
          <img
            src={hero}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />

          {/* Mobile/tablet: bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent xl:hidden pointer-events-none" />

          {/* Desktop (≥1370px): right fade */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent hidden xl:block pointer-events-none" />
        </div>

        <div className="w-full xl:w-[40%] px-6 py-12 xl:py-24 xl:px-12 text-base xl:text-lg leading-relaxed overflow-y-auto text-left">
          <p className="mb-6">
            Speedball is a contemporary fashion house rooted in Kampala's
            underground, where sound, sweat, and subversion converge. Born at
            the intersection of street culture and postcolonial expression, our
            garments are more than attire. They are urban artifacts shaped by
            the chaos and clarity of the modern African metropolis. Every
            collection emerges from a deep cultural dialogue, merging tailored
            rebellion with regional nuance to articulate a new language of
            style.
          </p>

          <p className="mb-6">
            Each drop is a study in contrast. Raw materials meet refined
            craftsmanship, while traditional silhouettes are deconstructed into
            statements of identity. From limited-edition denim programs to
            interdisciplinary collaborations with East African artists,
            Speedball reimagines streetwear as an evolving medium. We design for
            those who shape culture from the margins: boundary-pushers,
            nightlife architects, and city-dwellers who treat movement as
            performance.
          </p>

          <p className="mb-6">
            Beyond the garment, Speedball functions as a cultural engine. We
            curate events, incubate local talent, and redefine how African
            cities express themselves through fashion. We are not building a
            brand. We are shaping a visual vocabulary for a generation that
            refuses to be framed. In every thread, conviction. In every
            silhouette, a manifesto.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
