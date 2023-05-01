import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

export const sidebar_routes = [
  {
    name: "Menu",
    id: 1,
    paths: [
      { title: "Home", url: "/", id: 1, Icon: HomeRoundedIcon },
      {
        title: "Discover",
        url: "/discover",
        id: 2,
        Icon: ExploreRoundedIcon,
      },
      {
        title: "Coming Soon",
        url: "/coming-soon",
        id: 3,
        Icon: AccessAlarmRoundedIcon,
      },
    ],
  },
  {
    name: "Library",
    id: 2,
    paths: [
      { title: "Recent", url: "/recent", id: 1, Icon: ScheduleRoundedIcon },
      {
        title: "Bookmarked",
        url: "/bookmarked",
        id: 2,
        Icon: BookmarkBorderOutlinedIcon,
      },
      // {
      //   title: "Top Rated",
      //   url: "/top-rated",
      //   id: 3,
      //   Icon: StarBorderOutlinedIcon,
      // },
      // {
      //   title: "Similar",
      //   url: "/similar",
      //   id: 4,
      //   Icon: CategoryOutlinedIcon,
      // },
    ],
  },
];
