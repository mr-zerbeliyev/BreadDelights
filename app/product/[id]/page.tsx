"use client";
import { useParams, useRouter } from "next/navigation"; // 'next/navigation' kullanıyoruz
import productData from "../../../public/data/product.json"; // Ürün verilerini import ediyoruz
import Image from "next/image";

export default function ProductId() {
  const router = useRouter();
  const { id } = useParams();

  const product = productData.find((item) => item.id === Number(id));

  if (!product) {
    return <div>Ürün bulunamadı!</div>;
  }



  return (
    <div className="relative">
      <Image src="/images/croissant.jpg" alt="alt" width={1920} height={500} className="h-screen" />
      <div className="flex absolute rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#D1BB9E]">
        <div className="bg-[#FFF2E1] shadow-lg rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">
            Fiyat: {product.price} AZN
          </p>
          <Image
            className="w-full max-h-[500px] rounded-lg mb-4"
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
