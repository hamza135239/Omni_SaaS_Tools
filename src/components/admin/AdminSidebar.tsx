"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Tag, FolderOpen,
  MessageSquare, Mail, Users, Settings, Image,
  Home, ChevronRight, LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Tags", href: "/admin/tags", icon: Tag },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Comments", href: "/admin/comments", icon: MessageSquare },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { label: "Contacts", href: "/admin/contacts", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps { userRole: string; }

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0">
      {/* Brand */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">FT</span>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">FleetTechGuide</p>
            <p className="text-xs text-gray-400 capitalize">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
        <Link href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Home className="w-4 h-4" /> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
