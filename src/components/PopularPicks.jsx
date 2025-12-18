export default function PopularPicks() {
  return (
    <section className="w-full py-16 bg-[#FAF3F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-['Jua'] mb-2">
            🍬 Popular Picks
          </h2>
          <p className="text-gray-600 font-['Patrick_Hand'] text-lg">
            Sweet favorites everyone’s loving right now
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                p-4
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* Image Placeholder */}
              <div
                className="
                  w-full
                  aspect-square
                  bg-[#EAF9FF]
                  rounded-xl
                  mb-4
                  flex
                  items-center
                  justify-center
                  text-sm
                  text-gray-400
                "
              >
                Image
              </div>

              {/* Product Info */}
              <h3 className="font-['Jua'] text-lg mb-1">
                Candy Name
              </h3>

              <p className="text-sm text-gray-500 font-['Patrick_Hand'] mb-3">
                Short sweet description
              </p>

              {/* Action */}
              <button
                className="
                  w-full
                  py-2
                  rounded-full
                  bg-[#A6EAFF]
                  font-['Jua']
                  text-sm
                  hover:bg-[#8fdff7]
                  transition
                "
              >
                View
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
