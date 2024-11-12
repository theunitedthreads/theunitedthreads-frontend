import React from "react";
import logo from "/public/logos/logo-normal.svg";
import Image from "next/image";
import { Image as AntImage } from "antd";
import TypingLottie from "@/components/TypingLottie/TypingLottie";
import { cn } from "@/lib/utils";
// import { showImage } from "@/utils/fileHelper";

export default function ReceiverMsgCard({
  message,
  isDifferentSender,
  isReceiverTyping,
}) {
  return (
    <div className="flex-center-start gap-x-2">
      {isDifferentSender ? (
        <Image
          src={logo}
          alt="united threads logo"
          height={40}
          width={40}
          className="aspect-square rounded-full border border-primary-black p-1"
        />
      ) : (
        <div className="w-10"></div>
      )}
      <div className="relative mt-2 max-w-max">
        {message?.file?.length > 0 && (
          <AntImage.PreviewGroup
            className={cn(
              "",
              message?.file?.length > 2 && "grid grid-cols-4 gap-4",
            )}
          >
            {message?.file?.map((img) => (
              <AntImage
                key={img}
                src={img}
                alt={img}
                height={200}
                width={200}
                className="!h-[100px] !w-[100px] rounded-xl border border-primary-black/50 md:!h-[150px] md:!w-[150px] lg:!h-[200px] lg:!w-[200px]"
              />
            ))}
          </AntImage.PreviewGroup>
        )}

        {message?.text && (
          <p className="rounded-3xl border bg-primary-black px-3 py-2 font-medium text-primary-white">
            {message?.text}
          </p>
        )}

        {isReceiverTyping && <TypingLottie />}
      </div>
    </div>
  );
}
