import React, { useState, useEffect } from 'react';
import { LandingPage } from './LandingPage';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';

const getRoute = () => {
  const hash = window.location.hash;
  if (hash === '#/privacy') return 'privacy';
  if (hash === '#/terms') return 'terms';
  return 'home';
};

const App: React.FC = () => {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'privacy') return <PrivacyPolicy />;
  if (route === 'terms') return <TermsOfService />;
  return <LandingPage />;
};

export default App;
