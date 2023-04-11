import { graphql } from "gatsby";
import * as React from "react";

import {
  StoryblokComponent,
  storyblokEditable,
  useStoryblokState,
} from "gatsby-source-storyblok";

import Layout from "./../../components/layout";

const IndexPage = ({ data }) => {
  // story is just the root content
  let story = data.storyblokEntry;
  story = useStoryblokState(story);

  // StoryblokComponent to handle loading dynamic components.
  const components = story.content.body.map((blok) => (
    <StoryblokComponent blok={blok} key={blok._uid} />
  ));

  return (
    <Layout>
      <main {...storyblokEditable(story.content)}>
        <h1>{story.name}</h1>
        {components}
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: { eq: "home" }) {
      content
      name
      full_slug
      uuid
      id
      internalId
    }
  }
`;
