export default {
  host: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT || 3000,
  apiUrl: false,
  app: {
    htmlAttributes: { lang: "en" },
    title: "Loading ... ",
    titleTemplate: "React Handy Starter - %s",
    meta: [
      { name: "description", content: "Combination of best practices." },
      { charset: "utf-8" },
      { property: "og:site_name", content: "React Handy Starter" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "React Handy Starter" },
      { property: "og:description", content: "Combination of best practices." },
    ],
  },
};
