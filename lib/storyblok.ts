import { PageProps } from "gatsby";
import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";

export const Storyblok = new StoryblokClient({
  accessToken: process.env.GATSBY_STORYBLOK_API_KEY,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export function useStoryblok<T>(
  originalStory: StoryblokStory,
  location: PropType<PageProps, "location">,
): ParsedStoryblokStory<T> {
  const [story, setStory] = useState(originalStory);

  if (story && typeof story.content === "string") {
    story.content = JSON.parse(story.content);
  }

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  function initEventListeners() {
    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge !== "undefined") {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge();

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(["change", "published"], () =>
        window.location.reload(),
      );

      // live update the story on input events
      storyblokInstance.on("input", (event: any) => {
        // check if the ids of the event and the passed story match

        // change the story content through the setStory function
        setStory(event.story);
      });

      storyblokInstance.on("enterEditmode", (event: any) => {
        // loading the draft version on initial enter of editor
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: "draft",
          resolve_relations:
            "section_featuredScientificBoard.list,section_resources.scientific_updates,section_researchGrantsHero.open_grant",
        })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log("ERROR from Storyblok lib", error);
          });
      });
    }
  }

  function addBridge(callback: () => void) {
    // check if the script is already present
    const existingScript = document.getElementById("storyblokBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
      script.id = "storyblokBridge";
      document.body.appendChild(script);
      script.onload = () => {
        // once the scrip is loaded, init the event listeners
        callback();
      };
    } else {
      callback();
    }
  }

  useEffect(() => {
    // only load inside preview mode
    if (location.search.includes("_storyblok")) {
      // eslint-disable-next-line no-console
      console.log(1, "RESET live preview");
      // first load the bridge, then initialize the event listeners
      addBridge(initEventListeners);
    }
  }, []); // runs the effect only once & defines effect dependencies

  return story as ParsedStoryblokStory<T>;
}
