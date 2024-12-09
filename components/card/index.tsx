"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function Card() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Hepsi");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/Data/product.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veri yüklenemedi");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Geçersiz veri formatı");
        }
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const categories = ["Hepsi", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "Hepsi"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Hata: {error}</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-center mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mr-2 ${
              selectedCategory === category
                ? "bg-[#795757] text-white"
                : "bg-[#A79277]"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="w-[360px] h-[470px] rounded-sm shadow-md hover:bg-slate-50 cursor-pointer group"
          >
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={360}
                height={360}
                className="cursor-pointer w-[360px] h-[360px] object-cover object-center rounded-t-sm transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                loading="lazy"
              />
            </Link>

            <div className="flex flex-col justify-center items-center mt-4 px-2">
              <span className="text-lg">{product.name}</span>
              <span className="text-xs text-center">{product.description}</span>
              <span>₼{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
