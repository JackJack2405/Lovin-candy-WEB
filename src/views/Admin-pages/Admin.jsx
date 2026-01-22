import { Link } from "react-router-dom";

export default function Admin() {
  const cards = [
    { title: "Product\nmanagement", to: "/admin/products" },
    { title: "Order", to: "/admin/orders" },
    { title: "Chat", to: "/admin/chat" },
    { title: "graph chart", to: "/admin/analytics" },
  ];

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#FAF3F3] px-6 py-10">
      <div className="flex justify-center mb-10">
        <h1 className="w-full max-w-md text-2xl md:text-4xl font-bold text-center bg-[#FFEB76] py-4 md:py-6 rounded-full">
          Admin
        </h1>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="w-full max-w-sm bg-[#A6EAFF] rounded-3xl shadow-md hover:shadow-lg hover:scale-[1.02] transition p-12 flex items-center justify-center"
            >
              <p className="text-center font-['Jua'] text-2xl  md:text-3xl text-pink-500 whitespace-pre-line text-shadow-xs">
                {c.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
