import Image from "next/image";
import forgotGraphic from "/public/images/forgot password/Group 14582639.png";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot password page",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex-center gap-x-20 rounded-xl border border-gray-200 p-10 py-16 shadow-[0px_0px_2px_lightGray]">
      <div className="lg:w-1/2">
        <Image
          src={forgotGraphic}
          alt="forgot password graphic"
          className="mx-auto block lg:w-3/4"
        />
      </div>

      <div className="lg:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold">Forgot Password?</h2>
        <p className="font-kumbh-sans mb-10 text-primary-black">
          Enter your details below to request an OTP for account password reset.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
