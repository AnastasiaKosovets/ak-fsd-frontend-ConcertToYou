import React, { useEffect } from 'react';
import { Body } from './pages/Body/Body';
import WebFont from 'webfontloader';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Great Vibes']
      }
    });
  }, []);

  return (
    <>
      <Body />
    </>
  );
}

export default App;

