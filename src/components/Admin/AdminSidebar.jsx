import { NavLink } from "react-router-dom";

const menus = [
  { to: "/admin", label: "Home", icon: "🏰", end: true },
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/users", label: "Users", icon: "👤" },
  { to: "/admin/products", label: "Products", icon: "🍭" },
  { to: "/admin/chat", label: "Chat", icon: "💬" },
];

export default function AdminSidebar({ isOpen }) {
  return (
    <aside
      className={[
        "h-[calc(100vh-64px)]", 
        
        "bg-gray-200/80",
        "transition-all duration-300",
        "border-r border-black/10",
        isOpen ? "w-64" : "w-16",
      ].join(" ")}
    >
      <div className="p-3">
        <div className="text-xs text-gray-600 mb-3">
          {isOpen ? "Menu" : " "}
        </div>

        <nav className="space-y-2">
          {menus.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition",
                  "hover:bg-white/70",
                  isActive ? "bg-white text-black font-semibold shadow" : "text-gray-700",
                  !isOpen ? "justify-center" : "",
                ].join(" ")
              }
              title={!isOpen ? m.label : undefined} 
            >
              <span className="text-lg">{m.icon}</span>
              {isOpen && <span className="text-sm">{m.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
