import { getBackendBaseUrl } from "@/config/envConfig";
import ProductDetailsContainer from "./_components/ProductDetailsContainer";

export async function generateMetadata({ params }) {
  const { id } = params;

  const res = await fetch(
    `${getBackendBaseUrl()}/product/single-product/${id}`,
  ).then((res) => res.json());

  return {
    title: res?.data?.name,
    description: res?.data?.name + " product's detailed description page",
  };
}

export default function DynamicProductPage({ params }) {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <ProductDetailsContainer id={params?.id} />
    </div>
  );
}
