import { create } from "zustand";

interface MonthState {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export const useMonthStore = create<MonthState>((set) => ({
  selectedMonth: "",
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
