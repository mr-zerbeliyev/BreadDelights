"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function CardList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Hepsi");

  useEffect(() => {

    fetch("/Data/product.json")
      .then((response) => response.json())
      .then((data) => setProducts(data as Product[]))
      .catch((error) => console.error("Veri çekilirken hata oluştu:", error));
  }, []);
  
  const filteredProducts = selectedCategory === "Hepsi"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${selectedCategory === "Hepsi" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory("Hepsi")}
        >
          Hepsi
        </button>
        <button
          className={`px-4 py-2 mr-2 ${selectedCategory === "Salatlar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory("Salatlar")}
        >
          Salatlar
        </button>
        <button
          className={`px-4 py-2 mr-2 ${selectedCategory === "Çörək Sandviç" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory("Çörək Sandviç")}
        >
          Sandviçlər
        </button>
        {/* Diğer kategoriler için de aynı şekilde buton ekleyebilirsiniz */}
      </div>

      {/* Ürün Kartları */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-[360px] h-[470px] rounded-sm shadow-md hover:bg-slate-50 cursor-pointer group"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="cursor-pointer w-[360px] h-[360px] object-cover object-center rounded-t-sm transition-opacity duration-300 ease-in-out group-hover:opacity-70"
              width={360}
              height={360}
            />
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
