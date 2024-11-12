import Image from "next/image";
import footerBg from "/public/images/footer/flowers.png";
import logo from "/public/images/footer/logo-black.png";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { LinkedinSvg, TwitterSvg } from "@/utils/svgContainer";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 overflow-hidden bg-footerBg pb-10 pt-20 text-primary-black">
      {/* Footer background flowers */}
      <Image
        src={footerBg}
        alt="footer background effect"
        className="absolute inset-0 -z-10 h-full opacity-45 lg:h-auto lg:opacity-100"
      />

      {/* Footer container */}
      <div className="mx-auto px-5 md:px-10 lg:w-3/4 lg:gap-x-12 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-y-8 lg:flex-row lg:items-center lg:gap-y-0">
          {/* Left */}
          <div className="space-y-8 pr-12 lg:w-1/2">
            <Image src={logo} alt="Logo" />

            <p className="text-base font-medium text-foundation-primary-white-darker">
              At UnitedThreads, we are dedicated to producing high-quality
              apparel sustainably and ethically. Our mission is to empower small
              and medium businesses by providing them with direct access to
              top-tier products from manufacturers.
            </p>
          </div>

          {/* Center */}
          <div className="space-y-6 lg:w-[30%]">
            <h5 className="text-lg font-semibold">
              Email us about your queries. <br />
              We&apos;ll get back to you!
            </h5>

            <div className="flex-center-start gap-x-2">
              <p className="flex rounded-lg bg-primary-black p-3 text-center text-sm text-primary-white">
                <Mail size={18} className="mr-2" /> hello@theunitedthreads.com
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-y-6 lg:w-[20%] lg:items-end lg:text-end">
            <div>
              <h4 className="text-lg font-bold">Follow Us</h4>

              <div className="flex-center-start mt-2 gap-x-3">
                <Link
                  href="#"
                  className="rounded-full bg-primary-black p-[6px] text-primary-white"
                >
                  <TwitterSvg size={18} />
                </Link>

                <Link
                  href="#"
                  className="rounded-full bg-primary-black p-[6px] text-primary-white"
                >
                  <LinkedinSvg />
                </Link>

                <Link
                  href="#"
                  className="rounded-full bg-primary-black p-[6px] text-primary-white"
                >
                  <Instagram size={18} />
                </Link>

                <Link
                  href="#"
                  className="rounded-full bg-primary-black p-[6px] text-primary-white"
                >
                  <Facebook size={18} />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold">Call Us</h4>
              <p className="mt-2 font-medium">+1 (470) 286-4400</p>
            </div>
          </div>
        </div>

        <Separator
          orientation="horizontal"
          className="mb-8 mt-8 bg-primary-black lg:mb-2"
        />

        <div className="flex flex-col items-center justify-between gap-y-4 text-primary-black lg:flex-row lg:gap-y-0">
          {/* left */}
          <div className="text-center font-medium">
            <p>&copy; 2024 UnitedThreads. All rights reserved</p>
          </div>

          {/* right */}
          <div className="flex items-center gap-x-5">
            <Link href="/privacy-policy" className="font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="font-medium">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
