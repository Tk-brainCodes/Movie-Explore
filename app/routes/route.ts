export const sidebar_routes = [
  {
    name: "Menu",
    id: 1,
    paths: [
      { title: "Home", url: "/", id: 1 },
      { title: "Discover", url: "/discover", id: 2 },
      {
        title: "Coming Soon",
        url: "/coming-soon",
        id: 3,
      },
    ],
  },
  {
    name: "Library",
    id: 2,
    paths: [
      { title: "Recent", url: "/recent", id: 1 },
      { title: "Bookmarked", url: "/bookmarked", id: 2 },
      { title: "Top Rated", url: "/top-rated", id: 3 },
      { title: "Similar", url: "/similar", id: 4 },
    ],
  },
];
