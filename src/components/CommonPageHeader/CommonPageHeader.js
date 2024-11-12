import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CommonPageHeader({ pageTitle, previousPage }) {
  return (
    <div className="flex-center h-[110px] bg-lightGray">
      <div className="flex-center mx-auto flex h-full max-w-max flex-col gap-y-2 border-y border-primary-black/25 text-center lg:px-32">
        <h3 className="text-2xl font-bold lg:text-3xl 2xl:text-4xl">
          {pageTitle}
        </h3>

        {previousPage?.pageTitle && (
          <Breadcrumb>
            <BreadcrumbList className="font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={previousPage?.pageRoute ? previousPage.pageRoute : "/"}
                >
                  {previousPage?.pageTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </div>
  );
}
