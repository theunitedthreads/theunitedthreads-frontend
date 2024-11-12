"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userImg from "/public/images/user/Tom-Cruise-2013.webp";
import { Edit2 } from "lucide-react";
import { Edit } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import ChangePassForm from "./ChangePassForm";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  useDeleteAccountMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { transformNameInitials } from "@/utils/transformNameInitials";
import { useState } from "react";
import { Camera } from "lucide-react";
import { X } from "lucide-react";
import { Loader } from "lucide-react";
import { ConfirmModal, ErrorModal, SuccessModal } from "@/utils/customModal";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { errorToast } from "@/utils/customToast";

export default function ProfileContainer() {
  const [profilePicInput, setProfilePicInput] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: userRes } = useGetProfileQuery();
  const user = userRes?.data || {};

  // Change and show profile pic locally
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicInput(file);
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  // Change Profile Picture api handler
  const handleChangeProfilePic = async (e) => {
    e.preventDefault();

    if (!profilePicInput) {
      ErrorModal("Profile picture not found!");
      return;
    }

    const formData = new FormData();

    formData.append("profilePicture", profilePicInput);

    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        SuccessModal("Profile picture updated successfully");

        setProfilePicUrl(null);
        setProfilePicInput(null);
        document.getElementById("profilePicInput").value = null;
      }
    } catch (error) {
      ErrorModal(error?.data?.message);
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    ConfirmModal(
      "Are you sure?",
      "All of your account details will be removed!",
      "Yes, I confirm",
      "Cancel",
    ).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteAccount().unwrap;
          dispatch(logout());
          router.refresh();
          router.push("/");
        } catch (error) {
          errorToast(error?.data?.message || error?.error);
        }
      }
    });
  };

  return (
    <div className="lg:mx-auto lg:w-[60%]">
      {isDeleting && (
        <div>
          <div
            id="overlay"
            className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-all duration-300 ease-in-out"
          />

          {/* Page loader */}
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <Loader size={40} color="#f11a00" className="animate-spin" />
          </div>
        </div>
      )}

      {/* Profile Image */}
      <div className="flex-center-between">
        <div className="flex-center-start gap-x-3">
          <div className="group relative mx-auto block w-max">
            <div>
              {profilePicUrl ? (
                <div>
                  <Avatar className="h-[70px] w-[70px] lg:h-[80px] lg:w-[80px] 2xl:h-[90px] 2xl:w-[90px]">
                    <AvatarImage src={profilePicUrl} />
                  </Avatar>

                  {/* Update image button */}
                  <button
                    className="mx-auto mt-2 block w-full rounded bg-primary-black text-sm text-primary-white hover:bg-black"
                    onClick={handleChangeProfilePic}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader size={16} className="mx-auto animate-pulse" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              ) : user?.profilePicture ? (
                <Avatar className="h-[70px] w-[70px] border border-primary-black lg:h-[80px] lg:w-[80px] 2xl:h-[90px] 2xl:w-[90px]">
                  <AvatarImage src={user?.profilePicture} />
                </Avatar>
              ) : (
                <div className="text-foundation-orange-normal flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-800 text-2xl font-bold uppercase text-white lg:h-[80px] lg:w-[80px] 2xl:h-[90px] 2xl:w-[90px]">
                  <p>
                    {transformNameInitials("", user?.firstName, user?.lastName)}
                  </p>
                </div>
              )}
            </div>

            <div>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {!profilePicInput && (
                <button
                  className="hover:text-foundation-orange-normal invisible absolute bottom-0 right-0 rounded-full border border-primary-black bg-white p-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                  title="Change profile picture"
                >
                  <Camera size={16} />
                </button>
              )}

              {/* show remove button if image url is present */}
              {profilePicInput && (
                <button
                  className="absolute right-0 top-0 rounded-full bg-black p-[2px] text-danger"
                  onClick={() => {
                    document.getElementById("profilePicInput").value = null;
                    setProfilePicInput(null);
                    setProfilePicUrl(null);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <h4 className="text-xl font-semibold md:text-2xl">
            {user?.firstName} {user?.lastName}
          </h4>
        </div>

        <Button
          variant="destructive"
          className="rounded-full"
          onClick={handleDeleteAccount}
        >
          <Trash2 size={16} className="md:mr-2" />{" "}
          <span className="hidden md:block">Delete Account</span>
        </Button>
      </div>

      <div className="my-10 flex flex-col items-center gap-x-10 space-y-12">
        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Personal Information</h3>

          <PersonalInfoForm user={user} />
        </div>

        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Change Password</h3>

          <ChangePassForm />
        </div>
      </div>
    </div>
  );
}
