import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePerformanceTier } from "@/lib/performance";
import {
  noteFromMouseX,
  noteFromScrollIndex,
  playPianoNote,
  resumePianoContext,
  suspendPianoContext,
} from "./pianoEngine";

const STORAGE_KEY = "adrevnview-piano-music";

type MusicContextValue = {
  enabled: boolean;
  available: boolean;
  ready: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextValue>({
  enabled: false,
  available: false,
  ready: false,
  setEnabled: () => undefined,
  toggle: () => undefined,
});

function PianoInteractionLayer() {
  const lastMouseAt = useRef(0);
  const lastMouseX = useRef<number | null>(null);
  const lastScrollAt = useRef(0);
  const lastScrollY = useRef(0);
  const scrollNoteIndex = useRef(4);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseAt.current < 85) return;
      if (lastMouseX.current !== null && Math.abs(event.clientX - lastMouseX.current) < 28) return;

      lastMouseAt.current = now;
      lastMouseX.current = event.clientX;
      playPianoNote(noteFromMouseX(event.clientX));
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollAt.current < 110) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) < 4) return;

      lastScrollAt.current = now;
      lastScrollY.current = currentY;
      scrollNoteIndex.current += delta > 0 ? 1 : -1;
      playPianoNote(noteFromScrollIndex(scrollNoteIndex.current));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const { tier } = usePerformanceTier();
  const available = tier !== "basic";
  const [ready, setReady] = useState(false);
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setEnabledState(stored === "true" && available);
    setReady(true);
  }, [available]);

  const setEnabled = useCallback(
    async (value: boolean) => {
      if (!available) {
        setEnabledState(false);
        localStorage.setItem(STORAGE_KEY, "false");
        suspendPianoContext();
        return;
      }

      if (value) {
        await resumePianoContext();
      } else {
        suspendPianoContext();
      }

      setEnabledState(value);
      localStorage.setItem(STORAGE_KEY, String(value));
    },
    [available],
  );

  const toggle = useCallback(() => {
    void setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const value = useMemo(
    () => ({
      enabled: enabled && available,
      available,
      ready,
      setEnabled,
      toggle,
    }),
    [enabled, available, ready, setEnabled, toggle],
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {enabled && available ? <PianoInteractionLayer /> : null}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
