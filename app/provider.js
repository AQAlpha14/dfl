import { Toaster } from "sonner";
import { DrawerProvider } from "@/context/drawer-context";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Provider({ children }) {
  return (
    <LanguageProvider>
      <DrawerProvider>
        {children}
        <Toaster richColors closeButton expand={true} position="top-center" />
      </DrawerProvider>
    </LanguageProvider>
  );
}
