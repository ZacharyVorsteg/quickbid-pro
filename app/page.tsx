import {
  Navbar,
  Hero,
  Features,
  ROICalculator,
  Pricing,
  Testimonials,
  Footer,
} from '@/components/landing';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <div id="calculator">
        <ROICalculator />
      </div>
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
