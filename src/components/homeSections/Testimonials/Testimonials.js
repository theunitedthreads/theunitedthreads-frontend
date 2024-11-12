import React from "react";
import TestimonialsSlider from "./_components/TestimonialsSlider";

export default function Testimonials() {
  return (
    <section className="overflow-hidden text-primary-black">
      <div className="mb-4 space-y-3 text-center">
        <h2 className="text-4xl font-bold lg:text-5xl">
          What People Are Saying
        </h2>
        <p className="text-base text-secondary-2">
          See what our customers have to say about our products & services
        </p>
      </div>

      <TestimonialsSlider />
    </section>
  );
}
