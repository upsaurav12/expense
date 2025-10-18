import Navbar from "@/components/Navbar"
import { Features } from "@/components/Features"
import { Hero } from "@/components/Hero"
// import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
        <section className="bg-background">
        <Hero />
      </section>
      <section className="bg-card">
        <Features />
      </section>
      <Footer />
    </main>
  )
}
