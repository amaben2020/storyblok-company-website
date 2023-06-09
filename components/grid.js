import { StoryblokComponent, storyblokEditable } from "gatsby-source-storyblok";
import React from "react";

const Grid = ({ blok }) => (
  <ul {...storyblokEditable(blok)} key={blok._uid}>
    {blok.columns.map((blok) => (
      <li key={blok._uid}>
        <StoryblokComponent blok={blok} />
      </li>
    ))}
  </ul>
);

export default Grid;
