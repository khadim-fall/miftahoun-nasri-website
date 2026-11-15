import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      aria-label="Retour en haut de la page"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary-light",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0",
      )}
    >
      <ChevronUp size={24} aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
