import { storyblokEditable } from "gatsby-source-storyblok";
import React from "react";

const myHero = ({ blok }) => {
  return <div {...storyblokEditable(blok)}>{blok.title}</div>;
};

export default myHero;
