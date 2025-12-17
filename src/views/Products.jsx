

const mockProducts = [
  {
    id: 1,
    name: "Cotton Candy Lollipop Bag",
    price: 199,
    image: "/lollipop1.png",
  },
  {
    id: 2,
    name: "Orange Creamsicle Swirl",
    price: 159,
    image: "/lollipop2.png",
  },
  {
    id: 3,
    name: "Orange Cream Lollipop Bag",
    price: 179,
    image: "/lollipop3.png",
  },
];

export default function Products() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center bg-sky-200 py-6 rounded-full mb-10">
        Product
      </h1>

      <div className="grid grid-cols-4 gap-8">
        {mockProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}