import TermsConditionContainer from "./_components/TermsConditionContainer";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service page",
};

export default function TermsConditionPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <h1 className="mb-10 text-5xl font-extrabold text-primary-black">
        Terms of Service
      </h1>

      <TermsConditionContainer />
    </div>
  );
}
