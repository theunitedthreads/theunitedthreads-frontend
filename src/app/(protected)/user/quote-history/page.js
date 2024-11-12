import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShadeApprovedTable from "./_components/ShadeApprovedTable";
import { CheckCheck } from "lucide-react";
import ShadePendingTable from "./_components/ShadePendingTable";
import { Clock } from "lucide-react";

export const metadata = {
  title: "Quote History",
  description: "Quote history page",
};

export default function OrderHistoryPage() {
  return (
    <div>
      <CommonPageHeader
        pageTitle="Order History"
        previousPage={{
          pageTitle: "Home",
        }}
      />

      <div className="my-10 px-5 md:px-10 lg:mx-auto lg:w-[85%] lg:px-0 2xl:w-3/4">
        <Tabs defaultValue="shadeApprovalPending" className="w-full">
          <TabsList className="px-2 py-6 shadow">
            <TabsTrigger value="shadeApprovalPending" className="py-2 text-sm">
              <Clock size={18} className="mr-2 text-blue-700" /> Design Approval
              Pending...
            </TabsTrigger>
            <TabsTrigger value="shadeApproved" className="py-2 text-sm">
              <CheckCheck size={18} className="mr-2 text-success" /> Approved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shadeApprovalPending">
            <div
              className="my-8 rounded-xl p-6"
              style={{ boxShadow: "0px 0px 5px lightGray" }}
            >
              <ShadePendingTable />
            </div>
          </TabsContent>
          <TabsContent value="shadeApproved">
            <div
              className="my-8 rounded-xl p-6"
              style={{ boxShadow: "0px 0px 5px lightGray" }}
            >
              <ShadeApprovedTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
