"use client";
import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import Image from "next/image";

interface AdminHeaderProps {
  user: {
    email?: string;
    profile: { full_name: string; avatar_url: string | null; role: string };
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
      <div>
        <p className="text-sm text-gray-400">Good {new Date().getHours() < 12 ? "morning" : "afternoon"}, {user.profile.full_name.split(" ")[0]}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="btn-ghost btn-icon" aria-label="Toggle theme">
          {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="btn-ghost btn-icon relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
          {user.profile.avatar_url ? (
            <Image src={user.profile.avatar_url} alt={user.profile.full_name} width={30} height={30} className="rounded-full" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user.profile.full_name[0]}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 dark:text-white">{user.profile.full_name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.profile.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
