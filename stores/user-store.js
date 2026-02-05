import { onSignin, onSignup } from "@/actions/auth_actions";
import {
  deleteSession,
  updateSession,
  createSession,
  getSession,
} from "@/lib/session";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      updateUser: (data) => {
        set({ user: { ...get().user, favoriteCount: data } });
      },
      signin: async (credentials) => {
        const res = await onSignin(credentials);
        if (res?.status === 200) {
          const user = {
            ...res?.data,
            favoriteCount: res?.total_favorites,
          };
          // setToken(res?.token);
          set({ user });

          // Check if a session exists before updating it
          const existingSession = await getSession();
          if (existingSession) {
            await updateSession({ userId: res?.data?.id, token: res?.token });
          } else {
            await createSession({ userId: res?.data?.id, token: res?.token });
          }
          return res;
        } else {
          return res;
          throw new Error("Signin failed");
        }
      },
      signup: async (userData) => {
        const response = await onSignup(userData);
        return response;
      },
      logout: async (router) => {
        set({ user: null });
        get().clearStorage();
        // removeToken();
        await updateSession({ userId: null, token: null });
        deleteSession();
        router.push("/");
      },
      clearStorage: () => {
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          updateSession({ userId: state.user.id }); // Restore session after rehydration
        }
      },
    }
  )
);

export default useUserStore;
