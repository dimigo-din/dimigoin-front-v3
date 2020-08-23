import { INavigationItem } from "./NavigationItem";
import brandImage from "../../assets/brand.svg";

const navigations: INavigationItem[] = [
  { image: brandImage, selected: true, route: "/" },
  { title: "인강실", route: "/ingangsil" },
  { title: "외출", route: "/outgo" },
  { title: "상담", route: "/council" },
  { title: "멘토링", route: "/mentoring" },
  { title: "방과후", route: "/afterschool" },
  { title: "DETS", route: "/dets" },
];

export default navigations;
