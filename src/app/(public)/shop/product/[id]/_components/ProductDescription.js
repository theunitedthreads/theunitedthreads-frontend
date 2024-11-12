/* eslint-disable react/no-unescaped-entities */
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ProductDescription({ description }) {
  return (
    <div>
      <h4 className="max-w-max rounded bg-primary-black px-5 py-2 text-2xl font-medium text-white">
        Description
      </h4>
      <Separator className="mb-10 mt-2 bg-primary-black" />

      <ContentWrapper key="productDescription" content={description} />
    </div>
  );
}
