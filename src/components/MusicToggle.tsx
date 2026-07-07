import { Music2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { SpringButton } from "@/components/SpringButton";
import { useMusic } from "@/lib/audio";

export function MusicToggle() {
  const { enabled, available, ready, toggle } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !ready) {
    return <div className="w-9 h-9 rounded-full bg-secondary/50" aria-hidden />;
  }

  if (!available) return null;

  return (
    <SpringButton
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={`rounded-full border bg-card/80 hover:bg-secondary border-blink-once ${
        enabled ? "border-sky-500/50 text-sky-500" : "border-border text-muted-foreground"
      }`}
      aria-label={enabled ? "Turn piano sounds off" : "Turn piano sounds on"}
      aria-pressed={enabled}
    >
      {enabled ? <Music2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </SpringButton>
  );
}
