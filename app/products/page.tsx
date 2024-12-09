import Card from "@/components/card";
import { Product } from "@/app/types/product";
// Eğer bir type dosyası kullanıyorsanız
import React from "react";

// Sunucu tarafında veri çeken async fonksiyon
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Data/product.json`);
  
  if (!res.ok) {
    throw new Error("Veri çekilemedi");
  }
  
  const data = await res.json();
  
  if (!Array.isArray(data)) {
    throw new Error("Geçersiz veri formatı");
  }
  
  return data;
}

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
    return <div className="text-center mt-10 text-red-600">Hata: Veriler yüklenemedi</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Card products={products} />
    </div>
  );
}
