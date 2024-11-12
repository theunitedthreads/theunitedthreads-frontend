import Image from "next/image";
import updatePassGraphic from "/public/images/update password/Group 14582640.png";
import UpdatePassForm from "./_components/UpdatePassForm";

export const metadata = {
  title: "Update Password",
  description: "Update Password page",
};

export default function UpdatePasswordPage() {
  return (
    <div className="flex-center w-full gap-x-20 rounded-xl border border-gray-200 p-10 shadow-[0px_0px_2px_lightGray]">
      <div className="w-full lg:w-1/2">
        <Image
          src={updatePassGraphic}
          alt="update password graphic"
          className="mx-auto block"
        />
      </div>

      <div className="w-full lg:w-1/2">
        <h2 className="mb-10 text-4xl font-semibold">Update Password</h2>
        <UpdatePassForm />
      </div>
    </div>
  );
}
