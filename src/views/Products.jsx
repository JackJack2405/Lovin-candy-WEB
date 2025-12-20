import ProductCard from "../components/ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Blue Raspberry Lollipop Bag",
    price: 159,
    image: "/Blue Raspberry Lollipop Bag.png",
  },
  {
    id: 2,
    name: "Orange Creamsicle Cream Swirl Lollipop Bag",
    price: 159,
    image: "/Orange Creamsicle Cream Swirl Lollipop Bag.png",
  },
  {
    id: 3,
    name: "Strawberry Shortcake Cream Swirl Lollipop Bag",
    price: 159,
    image: "/Strawberry Shortcake Cream Swirl Lollipop Bag.png",
  },
  {
    id: 4,
    name: "Cotton Candy Lollipop Bag",
    price: 159,
    image: "/Cotton Candy Lollipop Bag.png",
  },
  {
    id: 5,
    name: "Mini Sour Rainbow Belts",
    price: 159,
    image: "/Mini Sour Rainbow Belts.png",
  },
  {
    id: 6,
    name: "Jelly Belly UnBEARably Hot Cinnamon Bears",
    price: 159,
    image: "/Jelly Belly UnBEARably Hot Cinnamon Bears.png",
  },
  {
    id: 7,
    name: "Gummy Roses",
    price: 159,
    image: "/Gummy Roses.png",
  },
  {
    id: 8,
    name: "Heavenly Sours Gummy",
    price: 159,
    image: "/Heavenly Sours Gummy.png",
  },
];

export default function Products() {
  return (
    <section className="w-full">
    <div className="mx-auto w-full max-w-6xl px-4 py-10"></div>
    <div className="flex justify-center mb-10">
          <h1 className="w-full max-w-md text-4xl font-bold text-center bg-[#A6EAFF] py-6 rounded-full">
            Product
          </h1>
        </div>

       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
    </section>
  );
}
