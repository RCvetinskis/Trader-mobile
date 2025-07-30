import { create } from "zustand";
import { MobileScreenTypes } from "../lib/types";


interface MessangerNavigationState {
  screen: MobileScreenTypes;
  setScreen: (screen: MobileScreenTypes) => void;
}
const useMessangerNavigationStore = create<MessangerNavigationState>((set) => ({
  screen: "chat",
  setScreen: (screen) => set({ screen }),
}));

export default useMessangerNavigationStore;
