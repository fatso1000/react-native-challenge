import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  updateUser: (user: IUser) => void;
  updateAccessToken: (accessToken: string) => void;
  updateRefreshToken: (refreshToken: string) => void;
  logoutUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      accessToken: null,
      refreshToken: null,
      updateUser: (user: IUser) => set(() => ({ user })),
      updateAccessToken: (accessToken: string) => set(() => ({ accessToken })),
      updateRefreshToken: (refreshToken: string) =>
        set(() => ({ refreshToken })),
      logoutUser: () =>
        set(() => ({
          accessToken: null,
          user: null,
          refreshToken: null,
        })),
    }),
    {
      name: "storage-key", // unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
      // Optional: control which parts of state get persisted
      partialize: (state: UserStore) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
