"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function AboutPageContainer() {
  const { data: aboutContentRes } = useGetContentQuery({
    label: "aboutUs",
  });
  const aboutContent = aboutContentRes?.data?.content || "";

  return <ContentWrapper content={aboutContent} />;
}
