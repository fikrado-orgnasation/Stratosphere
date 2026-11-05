/// <reference types="vite/client" />

interface Window {
  FB?: {
    XFBML: {
      parse: (node?: Element | null, callback?: () => void) => void;
    };
  };
}
