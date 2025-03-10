import { useState } from "react";
import Image from "next/image";

interface MobileMenuProps {
  user?: {
    name?: string;
    email?: string;
  };
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden menubar">
      <div className="bg-[var(--primary)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/gobudget-icon.svg"
            alt="GoBudget Logo"
            width={30}
            height={30}
            style={{ width: "auto", height: "30px" }}
          />
          <span className="ml-2 text-lg font-semibold text-[var(--foreground)]">
            GoBudget
          </span>
        </div>
        <button
          type="button"
          className="text-[var(--foreground)] hover:text-[var(--primary-light)] focus:outline-none transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="bg-[var(--card-bg)] shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {["Dashboard", "Expenses", "Budgets", "Reports", "Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[var(--foreground)] hover:bg-[var(--primary-light)] block px-3 py-2 text-base font-medium transition-all"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[var(--border-color)]">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-black font-semibold text-lg">
                  {user?.name ? user.name[0] : "G"}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-[var(--foreground)]">
                  {user?.name || "Guest"}
                </div>
                <div className="text-sm font-medium text-[var(--border-color)]">
                  {user?.email || "user@example.com"}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-[var(--foreground)] 
                           hover:bg-[var(--primary-light)] rounded-md transition-all"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
