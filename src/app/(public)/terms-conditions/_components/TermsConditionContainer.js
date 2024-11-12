"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function TermsConditionContainer() {
  const { data: termsRes } = useGetContentQuery({
    label: "terms",
  });
  const termsContent = termsRes?.data?.content || "";

  return <ContentWrapper content={termsContent} />;
}
