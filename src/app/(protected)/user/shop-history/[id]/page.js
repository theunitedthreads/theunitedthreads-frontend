import OrderContainer from "./_components/OrderContainer";

export const metadata = {
  title: "Order Details",
  description: "Order details page",
};

export default function DynamicOrderPage({ params }) {
  return (
    <div className="px-5 md:px-10 lg:mx-auto lg:w-[85%] lg:px-0 2xl:w-3/4">
      <OrderContainer orderId={params?.id} />
    </div>
  );
}
