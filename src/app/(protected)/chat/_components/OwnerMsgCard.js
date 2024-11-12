"use client";

import { cn } from "@/lib/utils";
import { downloadImage } from "@/utils/downloadImage";
// import { showImage } from "@/utils/fileHelper";
// import Image from "next/image";
import { Image } from "antd";
import { Download } from "lucide-react";
import React from "react";

export default function OwnerMsgCard({ message }) {
  const handleDownloadImage = (imgUrl) => {
    downloadImage(imgUrl);
  };

  return (
    <div className={"mt-4 grid"}>
      {message?.file?.length > 0 && (
        <div
          className={cn(
            "mb-2 grid-cols-2 gap-2 rounded-xl border p-2",
            message?.file?.length > 2 && "grid",
          )}
        >
          <Image.PreviewGroup>
            {message?.file?.map((img) => (
              <div className="relative" key={img}>
                <Image
                  src={img}
                  alt={img}
                  className="!h-[100px] !w-[100px] rounded-xl border border-primary-black/50 md:!h-[150px] md:!w-[150px] lg:!h-[200px] lg:!w-[200px]"
                />

                <button
                  className="flex-center absolute right-2 top-2"
                  onClick={() => handleDownloadImage(img)}
                >
                  <Download size={16} />
                </button>
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      )}

      {message?.text && (
        <p className="ml-auto w-max rounded-3xl bg-gray-200 px-3 py-2 font-medium text-primary-black">
          {message?.text}
        </p>
      )}
    </div>
  );
}
