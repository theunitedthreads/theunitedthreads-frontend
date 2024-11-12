import AboutPageContainer from "./_components/AboutPageContainer";

export const metadata = {
  title: "About Us",
  description: "About us page",
};

export default function AboutUsPage() {
  return (
    <div className="lg:mx-auto lg:w-[85%] px-5 md:px-10 2xl:w-3/4">
      <h1 className="mb-10 text-5xl font-extrabold text-primary-black">
        About Us
      </h1>

      <AboutPageContainer />
    </div>
  );
}
