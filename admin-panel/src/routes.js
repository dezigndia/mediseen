/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Dashboard from "views/dashboard/Dashboard";
import Orders from "views/Orders";
import Users from "views/Users";
import Accounts from "views/Accounts";
import { AccountBalance, Person } from "@material-ui/icons";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: HomeIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    rtlName: "الرموز",
    icon: AirportShuttleIcon,
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/product-list",
    name: "Product List",
    rtlName: "خرائط",
    icon: ListAltIcon,
    component: Map,
    layout: "/admin",
  },
  // {
  //   path: "/support",
  //   name: "Support Center",
  //   rtlName: "إخطارات",
  //   icon: ChatBubbleIcon,
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "User Management",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/accounts",
    name: "Accounts",
    rtlName: "قائمة الجدول",
    icon: AccountBalance,
    component: Accounts,
    layout: "/admin",
  },
  // {
  // 	path: "/typography",
  // 	name: "Typography",
  // 	rtlName: "طباعة",
  // 	icon: "tim-icons icon-align-center",
  // 	component: Typography,
  // 	layout: "/admin",
  // },
  // {
  // 	path: "/rtl-support",
  // 	name: "RTL Support",
  // 	rtlName: "ار تي ال",
  // 	icon: "tim-icons icon-world",
  // 	component: Rtl,
  // 	layout: "/rtl",
  // },
];
export default routes;
