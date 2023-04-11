declare module "@storyblok/react";
declare module "gatsby-storyblok-image";

// type shims for CSS modules

type CSSModule = Record<string, string>;
declare module "*.module.scss" {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module "*.woff2";

declare module "*.png";
// SVG elements

declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
  const src: string;
  export default src;
}

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

type TemplateType = "website" | "article";
type LinkElementType = "internal" | "external";
type ListElementType = "ordered" | "unordered";

// Storyblok
type StoryblokStory = {
  content: string;
  slug: string;
  full_slug: string;
  path: string;
  uuid: string;
  id: string;
  is_startpage: boolean;
  name: string;
  created_at: Date;
};

type StoryblokStoryResolved<T> = {
  content: T;
  slug: string;
  full_slug: string;
  path: string;
  uuid: string;
  id: string;
  is_startpage: boolean;
  name: string;
  created_at: Date;
};

type ParsedStoryblokStory<T = unknown> = Omit<StoryblokStory, "content"> & {
  content: T extends
    | PageTemplate
    | ScientificUpdatePageTemplate
    | ScientificAuthorPageTemplate
    | ResearchGrantPageTemplate
    | EventPageTemplate
    ? T
    : string;
};

type StoryblokBlok<T> = {
  component: T;
  _uid: string;
};

type StoryblokAsset = {
  alt?: string;
  filename?: string;
};

type StoryblokGatsbyImageAsset = {
  alt_tag?: string;
  base64?: string;
  caption?: string;
  copyright_info?: string;
  dominantColor?: string;
  image?: string;
  plugin?: string;
  _uid?: string;
};

type StoryblokRichtext =
  import("storyblok-rich-text-react-renderer").StoryblokRichtext;

type StoryblokMetaData = {
  description?: string;
  og_description?: string;
  og_image?: string;
  og_title?: string;
  title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_title?: string;
};

//Storyblok Datasources
type DataSourceSlug = "labels" | "categories" | "resources";

type ResourcesDataType = "videos" | "infographics" | "books";

type LabelType =
  | "event"
  | "review"
  | "research"
  | "expert"
  | "grant"
  | "award"
  | "sustainability"
  | "afreport";

type CategoryType =
  | "planet"
  | "health"
  | "nutrients"
  | "dietary-patterns"
  | "dietary-behaviour"
  | "soya";

type CountryType = "it" | "uk" | "nl";

type LabelDataSource = {
  name: string;
  value: LabelType;
};

type CategoryDataSource = {
  name: string;
  value: CategoryType;
};

type DataSourceEntry<T> = {
  id: string;
  name: string;
  value: T;
  data_source?: DataSourceSlug;
};

// Storyblok Templates
type PageTemplate = StoryblokBlok<"template_page"> & {
  seo: StoryblokMetaData;
  body: MainHeroType[];
};

type ScientificUpdatePageTemplate =
  StoryblokBlok<"template_scientificUpdate"> & {
    seo: StoryblokMetaData;
    su_title: string;
    su_date_of_publication: string;
    su_categories: CategoryType[];
    su_excerpt?: string;
    su_hero_img?: StoryblokGatsbyImageAsset;
    su_labels?: LabelType[];
    su_content?: StoryblokRichtext;
    su_cta?: (DocumentElement | CtaLinkElement)[];
  };

type ScientificAuthorPageTemplate =
  StoryblokBlok<"template_scientificAuthor"> & {
    seo: StoryblokMetaData;
    sa_weight?: string;
    sa_name: string;
    sa_country?: string;
    sa_description?: string;
    sa_position: string;
    sa_author_image?: StoryblokGatsbyImageAsset;
    sa_testimonial?: StoryblokRichtext;
    sa_rg_link?: LinkElement[];
  };

type EventPageTemplate = StoryblokBlok<"template_event"> & {
  seo: StoryblokMetaData;
  event_title: string;
  event_description?: string;
  event_date: string;
  event_labels?: LabelType[];
  event_categories?: CategoryType[];
  event_thumbnail?: StoryblokGatsbyImageAsset;
  event_register_url?: string;
  event_video_url?: string;
  event_video_type: "link" | "video";
  event_video_time?: string;
  event_materials_url: Array<EventAssetComponent | EventAssetUrlComponent>;
  event_is_finished?: boolean;
  body: (NewsletterSectionType | EventSummaryType | EventAgendaType)[];
};

type ResearchGrantPageTemplate = StoryblokBlok<"template_grant"> & {
  seo: StoryblokMetaData;
  gr_title: string;
  gr_description?: string;
  gr_document?: Required<StoryblokAsset>;
  gr_date?: string;
  gr_finished?: boolean;
  gr_card_image?: StoryblokGatsbyImageAsset;
  gr_categories?: CategoryType[];
  gr_labels?: LabelType[];
  gr_content: StoryblokRichtext;
  body: (FeaturedScientificBoardType | RecentPublishedGrantsType)[];
};

type HeaderTemplate = StoryblokBlok<"template_header"> & {
  logo: StoryblokAsset;
  main_menu?: (LinkElement | MegaMenuHolderComponent)[];
  socials_menu?: SocialLinkElement[];
  info_bar?: string;
};

type FooterTemplate = StoryblokBlok<"template_footer"> & {
  logo?: StoryblokAsset;
  main_menu?: LinkElement[];
  group_menu?: DropdownElement[];
  copyrights_menu?: LinkElement[];
  copyrights_title?: string;
  contact_info?: string;
  location_info?: string;
  numbers_info?: string;
  description?: string;
};

type MainCookieTemplate = StoryblokBlok<"template_mainCookie"> & {
  content?: string;
  readMore_cta?: LinkElement[];
};

//Storyblok Sections
type MainHeroType = StoryblokBlok<"section_mainHero"> & {
  label?: string;
  content?: StoryblokRichtext;
  actions?: LinkElement[];
  left_image: StoryblokGatsbyImageAsset;
  right_image: StoryblokGatsbyImageAsset;
  mobile_image: StoryblokGatsbyImageAsset;
};

type ContactHeroType = StoryblokBlok<"section_contactHero"> & {
  label?: string;
  title?: StoryblokRichtext;
  email_label?: string;
  organisation_label?: string;
  organisation_details?: string;
  social_media_label?: string;
  social_media_links?: SocialLinkElement[];
  email?: LinkElement[];
  contact_image?: StoryblokAsset;
};

type RecentScientificUpdateType =
  StoryblokBlok<"section_recentScientificUpdates"> & {
    heading?: string;
    link_label?: string;
    subheading?: string;
  };

type TextContentType = StoryblokBlok<"section_textContent"> & {
  content: StoryblokRichtext;
};

type ScientificUpdateListType =
  StoryblokBlok<"section_scientificUpdatesList"> & {
    heading?: string;
    subheading?: string;
  };

type RecentEventsType = StoryblokBlok<"section_recentEvents"> & {
  heading: string;
  btn_label?: string;
};

type NewsletterSectionType = StoryblokBlok<"section_newsletter"> & {
  heading?: string;
  subheading?: string;
  actions?: Array<LinkElement>;
};

type ScientificBoardListType = StoryblokBlok<"section_scientificBoardList"> & {
  label?: string;
  heading?: string;
  subheading?: string;
  list_title?: string;
};

type FeaturedScientificBoardType =
  StoryblokBlok<"section_featuredScientificBoard"> & {
    heading?: string;
    subheading?: string;
    btn_label?: string;
    list?: {
      content: ScientificAuthorPageTemplate;
      full_slug: string;
    }[];
  };

type PlantBasedEatingType = StoryblokBlok<"section_plantBasedEating"> & {
  content: StoryblokRichtext;
  cta: (DocumentElement | CtaLinkElement)[];
};

type ResearchGrantsType = StoryblokBlok<"section_researchGrantsHero"> & {
  title?: string;
  description?: string;
  box_title?: string;
  box_description?: string;
  hero_image?: StoryblokGatsbyImageAsset;
  open_grant?: StoryblokStoryResolved<ResearchGrantPageTemplate>;
};

type RecentPublishedGrantsType =
  StoryblokBlok<"section_recentPublishedGrants"> & {
    heading?: string;
    description?: string;
    btn_label?: string;
  };

type CurrentFundedResearchType =
  StoryblokBlok<"section_currentFundedResearch"> & {
    title?: string;
    description?: string;
  };

type AwardsType = StoryblokBlok<"section_awards"> & {
  hero_content?: StoryblokRichtext;
  hero_image?: StoryblokGatsbyImageAsset;
  promo_title?: string;
  promo_deadline?: string;
  promo_description?: string;
  promo_cta_url?: {
    cached_url?: string;
  };
  promo_cta_text?: string;
};

type EventsHeroType = StoryblokBlok<"section_eventsHero"> & {
  title?: string;
  description?: string;
  hero_image?: StoryblokGatsbyImageAsset;
  labels?: LabelType[];
};

type EventSummaryType = StoryblokBlok<"section_eventSummary"> & {
  title: string;
  content?: StoryblokRichtext;
  image?: StoryblokGatsbyImageAsset;
};

type EventAgendaType = StoryblokBlok<"section_eventAgenda"> & {
  heading: string;
  steps?: AgendaStepComponent[];
};

type PastEventsType = StoryblokBlok<"section_pastEvents"> & {
  title: string;
};

type FeaturedPastEventsType = StoryblokBlok<"section_featuredPastEvents"> & {
  title: string;
};

type NewsHeroType = StoryblokBlok<"section_newsHero"> & {
  title?: StoryblokRichtext;
};

type NewsCtaType = StoryblokBlok<"section_newsCta"> & {
  title?: string;
  description?: string;
  link?: LinkElement[];
};

type ResourcesHeroType = StoryblokBlok<"section_resourcesHero"> & {
  title?: string;
  description?: string;
};

type ResourcesType = StoryblokBlok<"section_resources"> & {
  books?: ResourceComponent[];
  videos?: ResourceComponent[];
  infographics?: ResourceComponent[];
  scientific_updates?: {
    content: ScientificUpdatePageTemplate;
    full_slug: string;
  }[];
};

type PaperFormEmbedType = StoryblokBlok<"section_paperformEmbed"> & {
  paperFormId: string;
};

// Storyblok Components
type MegaMenuComponent = {
  label?: string;
  content?: StoryblokRichtext;
};

type MegaMenuHolderComponent = StoryblokBlok<"component_megaMenuHolder"> & {
  label: string;
  options?: MegaMenuComponent[];
};

type AccordionComponent = StoryblokBlok<"component_accordion"> & {
  content: StoryblokRichtext;
  title?: string;
};

type SubscriberFormComponent = Omit<
  StoryblokBlok<"component_subscriber_form", "component" | "_uid">
> & {
  title: string;
  placeholder: string;
  heading?: StoryblokRichtext;
  variant?: string;
  Mtitle?: string;
  links: LinkElement;
};

type ImageInfographicComponent = StoryblokBlok<"component_imageInfographic"> & {
  document: StoryblokAsset;
  image: StoryblokGatsbyImageAsset;
};

type TableOfContentsComponent = StoryblokBlok<"component_tableOfContents"> & {
  title?: string;
};

type ReferencesListComponent = StoryblokBlok<"component_referencesList"> & {
  title?: string;
  list: Array<ReferenceElement>;
};

type EventSpeakerComponent = StoryblokBlok<"component_eventSpeaker"> & {
  name?: string;
  description?: string;
  image?: StoryblokAsset;
};

type EventAssetComponent = StoryblokBlok<"component_eventAsset"> & {
  title?: string;
  asset: StoryblokAsset;
};

type EventAssetUrlComponent = StoryblokBlok<"component_eventAssetUrl"> & {
  title?: string;
  link: string;
};

type AgendaPresentationButton =
  StoryblokBlok<"component_agendaPresentationButton"> & {
    title?: string;
    presentation_file?: StoryblokAsset;
  };

type AgendaStepComponent = StoryblokBlok<"component_agendaStep"> & {
  title?: string;
  time?: string;
  presentation_video?: string;
  presentation_buttons?: Array<AgendaPresentationButton>;
  speakers?: Array<EventSpeakerComponent>;
};

type VideoComponent = StoryblokBlok<"component_videoUrl"> & {
  video_url?: string;
};
type ResourceComponent = StoryblokBlok<"component_resource"> & {
  title?: string;
  description?: string;
  image?: StoryblokGatsbyImageAsset;
  resource_asset?: StoryblokAsset;
  resource_video_url?: string;
};

//Storyblok Elements

type LinkElement = StoryblokBlok<"element_link"> & {
  title?: string;
  type: LinkElementType;
  url: string;
  with_icon?: boolean;
};

type SocialLinkElement = StoryblokBlok<"element_socialLink"> & {
  type: "linkedin";
  url: string;
};

type DropdownElement = StoryblokBlok<"element_dropdown"> & {
  label: string;
  menu?: LinkElement[];
};

type TextElement = StoryblokBlok<"element_text"> & {
  text: string;
};

type ReferenceElement = StoryblokBlok<"element_reference"> & {
  anchor: text;
  element: Array<LinkElement | TextElement>;
};

type DocumentElement = StoryblokBlok<"element_document"> & {
  file: StoryblokAsset;
  label?: string;
  title?: string;
  description?: string;
  download_label?: string;
};

type CtaLinkElement = StoryblokBlok<"element_ctaLink"> & {
  link: LinkElement & LinkElement[];
  label?: string;
  title?: string;
  description?: string;
};

// Storyblock RichText

type TableComponent = StoryblokBlok<"element_table"> & {
  table?: {
    fieldtype: "table";
    tbody: StoryblokTableTBody[];
    thead: StoryblokTableTHead[];
  };
};

type ListComponent = StoryblokBlok<"element_list"> & {
  title?: string;
  list: Array<TextElement>;
  list_type: ListElementType;
};

type BlockquoteComponent = StoryblokBlok<"element_blockquote"> & {
  quote: StoryblokRichtext;
  name?: string;
  job?: string;
  author_image?: {
    filename: string;
    alt: string;
  };
};

type StoryblokTableCol = StoryblokBlok<"_table_col"> & {
  value: string;
};

type StoryblokTableTBody = StoryblokBlok<"_table_row"> & {
  body: StoryblokTableCol[];
};

type StoryblokTableTHead = StoryblokBlok<"_table_head"> & {
  value: string;
};

type CardDataType = {
  heroImage?: StoryblokGatsbyImageAsset;
  publishedDate?: string;
  title?: string;
  className?: string;
  excerpt?: string;
  categories?: CategoryType[];
  url?: string;
  badge?: string;
  labels?: LabelType[];
  getNameByValue?: (value: CategoryType) => string;
  ctaLabel?: string;
  videoUrl?: string;
};

type HorizontalCardDataType = CardDataType & {
  heroImage?: StoryblokGatsbyImageAsset | string;
};

type ResearchGrantCardDataType = Pick<
  CardDataType,
  "heroImage" | "title" | "className" | "excerpt"
> & {
  heroImage?: StoryblokGatsbyImageAsset | string;
  author?: string;
  university?: string;
};

// Search

type HitPageType = (
  | PageTemplate
  | ScientificUpdatePageTemplate
  | ScientificAuthorPageTemplate
  | ResearchGrantPageTemplate
  | EventPageTemplate
) & { id: string; slug: string };

type HitSUTemplate = ScientificUpdatePageTemplate & {
  id: string;
  slug: string;
};

type HitGrantTemplate = ResearchGrantPageTemplate & {
  id: string;
  slug: string;
};

type HitEventTemplate = EventPageTemplate & {
  id: string;
  slug: string;
};

type HitNews = HitSUTemplate | HitGrantTemplate | HitEventTemplate;
