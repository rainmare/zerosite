"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import { supabaseBrowser } from "@/lib/supabase-browser";

export type Notification = {
  id: string;
  type: "booking_confirmed" | "session_reminder" | "session_soon";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  meta?: {
    date?: string;
    time?: string;
    platform?: string;
    tierName?: string;
  };
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notif: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
});

export function useNotifications() {
  return useContext(NotificationContext);
}

const STORAGE_KEY = "astro_notifications";

function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((n: Notification & { timestamp: string }) => ({
      ...n,
      timestamp: new Date(n.timestamp),
    }));
  } catch {
    return [];
  }
}

function saveNotifications(notifs: Notification[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(loadNotifications());
  }, []);

  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    if (!user?.email) return;

    const checkUpcoming = () => {
      const now = new Date();
      const stored = loadNotifications();

      stored.forEach((notif) => {
        if (notif.type !== "booking_confirmed" || !notif.meta?.date || !notif.meta?.time) return;

        const [hours, minutes] = notif.meta.time.split(":").map(Number);
        const sessionDate = new Date(notif.meta.date + "T00:00:00");
        sessionDate.setHours(hours, minutes, 0, 0);

        const diff = sessionDate.getTime() - now.getTime();
        const oneHour = 60 * 60 * 1000;
        const reminderId = `reminder-${notif.id}`;

        if (diff > 0 && diff <= oneHour) {
          const alreadyExists = stored.some((n) => n.id === reminderId);
          if (!alreadyExists) {
            addNotification({
              type: "session_soon",
              title: "Session Starting Soon",
              message: `Your ${notif.meta.tierName || "reading"} session starts in less than 1 hour on ${notif.meta.platform?.replace("-", " ") || "your chosen platform"}.`,
              meta: notif.meta,
            });
          }
        }
      });
    };

    checkUpcoming();
    const interval = setInterval(checkUpcoming, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const addNotification = useCallback(
    (notif: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotif: Notification = {
        ...notif,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function clearAll() {
    setNotifications([]);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
