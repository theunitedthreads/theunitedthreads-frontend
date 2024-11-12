"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function PrivacyPolicyContainer() {
  const { data: privacyPolicyRes } = useGetContentQuery({
    label: "privacy",
  });
  const privacyPolicyContent = privacyPolicyRes?.data?.content || "";

  return <ContentWrapper content={privacyPolicyContent} />;
}
