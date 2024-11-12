import Image from "next/image";
import bgFlowers from "/public/images/home/bg-flowers.png";

export default function UserDashboardLayout({ children }) {
  return (
    <div className="relative max-h-max overflow-y-hidden">
      {children}

      {/* --------- Background Flowers ------------- */}
      <div>
        <Image
          src={bgFlowers}
          alt="background flower image"
          className="absolute right-10 top-0 -z-10 opacity-40"
        />
      </div>
      {/* ------------------------------------------ */}
    </div>
  );
}
