import { Phone } from "lucide-react";
import { Clock } from "lucide-react";
import ContactForm from "./_components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "About us page",
};

export default function ContactUsPage() {
  return (
    <div className="flex-center 2xl:max-w-3/4 mx-auto mt-28 h-[75vh] lg:mt-32 lg:max-w-[85%] 2xl:mt-40">
      <div className="lg:w-1/2">
        <h1 className="text-center text-4xl font-extrabold text-primary-black lg:text-5xl 2xl:text-6xl">
          Get In Touch
        </h1>

        <div className="flex-center mb-10 mt-6 gap-x-4 md:gap-x-7 2xl:gap-x-10">
          <div className="flex-center-start gap-x-3">
            <Clock size={20} />
            <p className="text-sm lg:text-lg">We are available 24/7</p>
          </div>

          <div className="h-1 w-1 rounded-full bg-primary-black" />

          <div className="flex-center-start gap-x-3">
            <Phone size={20} />
            <p className="text-sm lg:text-lg">+1 (470) 286-4400</p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
