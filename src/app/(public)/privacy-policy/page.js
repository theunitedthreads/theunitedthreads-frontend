import PrivacyPolicyContainer from "./_components/PrivacyPolicyContainer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy page",
};

export default function AboutUsPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <h1 className="mb-10 text-5xl font-extrabold text-primary-black">
        Privacy Policy
      </h1>

      <PrivacyPolicyContainer />
    </div>
  );
}
