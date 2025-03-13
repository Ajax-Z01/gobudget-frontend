import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  user?: {
    name?: string;
    email?: string;
  };
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, handleLogout }) => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col sidebar bg-[var(--background)] text-[var(--foreground)] border-r border-[var(--border-color)] dark:border-[var(--border-color)]">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto divide-y divide-[var(--border-color)]">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 pb-5">
          <Image 
            className="logo-sidebar"
            src="/gobudget-icon.svg"
            alt="GoBudget Logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "40px" }}
          />
          <span className="ml-2 text-xl font-semibold title-name">GoBudget</span>
        </div>

        {/* Menu Items */}
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {[
              { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
              { name: "Transactions", path: "/transactions", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { name: "Budgets", path: "/budgets", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { name: "Reports", path: "/reports", icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { name: "Settings", path: "/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
            ].map((item) => (
              <Link key={item.name} href={item.path} className="hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-300">
                <svg
                  className="mr-3 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--icon-color)"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="flex-shrink-0 flex border-t border-[var(--border-color)] dark:border-[var(--border-color)] p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-[var(--border-color)] dark:bg-[var(--border-color)] flex items-center justify-center font-semibold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.email || "Guest"}</p>
              <button
                onClick={handleLogout}
                className="text-xs font-medium hover:underline transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
