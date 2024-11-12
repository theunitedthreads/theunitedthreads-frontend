import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import Link from "next/link";
import { Tag } from "antd";
import pantoneToHex from "@/utils/pantoneToHex";
import { StarSvg } from "@/utils/svgContainer";
import truncatedText from "@/utils/textTruncate";

export default function ShopProductsCard({ product }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-primary-black/50 p-5 shadow transition-all duration-300 ease-in-out hover:shadow-lg">
      <div>
        <div className="relative">
          <Image
            src={product?.primaryImage}
            alt="product image"
            height={1200}
            width={1200}
            className="mx-auto block h-[200px] w-auto"
          />

          {/* Product Category */}
          <div className="absolute right-0 top-0">
            <Tag color="orange" className="rounded-full font-bold">
              {product?.category?.name}
            </Tag>
          </div>
        </div>

        {/* Name & Rating */}
        <div className="flex-center-between mb-2 mt-4">
          <div className="flex-center-between mt-5 text-xl font-bold">
            <h4>{truncatedText(product?.name, 50)}</h4>
          </div>

          {product?.averageRating > 0 && (
            <div className="flex-center-start gap-x-[2px]">
              <StarSvg />

              <p className="pt-1 font-medium">
                {product?.averageRating}({product?.ratingCount})
              </p>
            </div>
          )}
        </div>

        {/* Price */}
        <h4 className="font-medium">${Number(product?.price)?.toFixed(2)}</h4>
      </div>

      <div className="flex-center-between mt-3">
        {/* Product colors */}
        <div className="max-w-1/2 flex flex-wrap items-center gap-x-2">
          {product?.colorsPreferences?.slice(0, 3)?.map((color) => (
            <div
              key={color}
              className="rounded-full border border-slate-500 p-1"
            >
              <div
                style={{
                  backgroundColor: pantoneToHex(color),
                }}
                className="h-5 w-5 rounded-full"
              />
            </div>
          ))}
        </div>

        <Link href={`/shop/product/${product?._id}`} className="">
          <Button className="primary-button group rounded-full">
            Buy Now
            <AnimatedArrow />
          </Button>
        </Link>
      </div>
    </div>
  );
}
