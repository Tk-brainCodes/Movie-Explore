import {
  IconHome,
  IconBrandSafari,
  IconClock,
  IconAlarm,
  IconBookmark,
  IconStar,
  IconPlayerPlay,
} from "@tabler/icons-react";



export const sidebar_routes = [
  {
    name: "Menu",
    id: 1,
    paths: [
      { title: "Home", url: "/", id: 1, icon: IconHome },
      { title: "Discover", url: "/discover", id: 2, icon: IconBrandSafari },
      {
        title: "Coming Soon",
        url: "/coming-soon",
        id: 3,
        icon: IconAlarm,
      },
    ],
  },
  {
    name: "Library",
    id: 2,
    paths: [
      { title: "Recent", url: "/recent", id: 1, icon: IconClock },
      { title: "Bookmarked", url: "/bookmarked", id: 2, icon: IconBookmark },
      { title: "Top Rated", url: "/top-rated", id: 3, icon: IconStar },
      { title: "Similar", url: "/similar", id: 4, icon: IconPlayerPlay },
    ],
  },
];
