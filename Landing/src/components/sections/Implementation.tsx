import {
  BuildingOffice2Icon,
  HomeIcon,
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const items = [
  { title: "Barrios Privados", icon: HomeIcon },
  { title: "Fábricas", icon: BuildingOffice2Icon },
  { title: "Bodegas", icon: BuildingStorefrontIcon },
  { title: "Obras Civiles", icon: WrenchScrewdriverIcon },
  { title: "Empresas", icon: BriefcaseIcon },
  { title: "Clubes deportivos", icon: UsersIcon },
];

export default function Implementation() {
  return (
    <section
      id="implementacion"
      className="px-4 py-16 bg-[#161617] font-poppins"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-white tracking-tight">
          ¿Dónde se puede implementar?
        </h2>
        <div
          className="rounded-2xl shadow-xl px-4 py-10 md:px-12 md:py-14 flex flex-col items-center"
          style={{
            background: "linear-gradient(135deg, #00205B 0%, #274472 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-8 gap-x-6 w-full max-w-5xl h-full items-end">
            {items.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col items-center justify-end min-h-[150px] h-full group cursor-pointer"
              >
                <Icon className="w-10 h-10 text-[#7fd1ff] mb-3 transition-all duration-200 group-hover:scale-110 group-hover:text-[#b2e6e0]" />
                <span className="text-lg font-semibold text-white text-center min-h-[56px] flex items-center justify-center">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
