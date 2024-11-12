import CustomTShirtDesigner from "@/components/CustomTShirtDesigner/CustomTShirtDesigner";

export const metadata = {
  title: "Design Your Apparel",
  description: "Custom apparel designer  page",
};

export default function DynamicProductPage() {
  return (
    <div className="px-7 lg:mx-auto lg:w-3/4 lg:px-0">
      <CustomTShirtDesigner />
    </div>
  );
}
