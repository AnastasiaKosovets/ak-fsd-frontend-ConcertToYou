import React, { useEffect } from "react";
import { Body } from "./pages/Body/Body";
import WebFont from "webfontloader";
import { Header } from "./common/Navbar/Navbar";
import { Footer } from "./common/Footer/Footer";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Great Vibes"],
      },
    });
  }, []);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
