import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { LangContext, STRINGS, type Lang } from './i18n';
import './index.css';

function AppWithLang() {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      <App />
    </LangContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWithLang />
    </BrowserRouter>
  </StrictMode>,
);
