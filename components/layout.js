import { apiPlugin, storyblokInit } from "gatsby-source-storyblok";
import PropTypes from "prop-types";
import * as React from "react";
import Feature from "./feature";
import Grid from "./grid";
import myHero from "./myHero";
import Teaser from "./teaser";

// components here must match with that in SB technical name

storyblokInit({
  accessToken: "STwrmKafkyPQE0pHGVEr5gtt",
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
    MyHero: myHero,
  },
});

const Layout = ({ children }) => {
  return (
    <div>
      Hola 👋🏾
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
