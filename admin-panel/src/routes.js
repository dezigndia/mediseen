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
import Dashboard from "views/Dashboard.js"
import Icons from "views/Icons.js"
import Map from "views/Map.js"
import Notifications from "views/Notifications.js"
// import Rtl from "views/Rtl.js"
// import TableList from "views/TableList.js"
// import Typography from "views/Typography.js"
// import UserProfile from "views/UserProfile.js"
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle"
import HomeIcon from "@material-ui/icons/Home"
import ListAltIcon from "@material-ui/icons/ListAlt"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"

var routes = [
	{
		path: "/",
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
		component: Icons,
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
	{
		path: "/support",
		name: "Support Center",
		rtlName: "إخطارات",
		icon: ChatBubbleIcon,
		component: Notifications,
		layout: "/admin",
	},
	// {
	// 	path: "/user-profile",
	// 	name: "User Profile",
	// 	rtlName: "ملف تعريفي للمستخدم",
	// 	icon: "tim-icons icon-single-02",
	// 	component: UserProfile,
	// 	layout: "/admin",
	// },
	// {
	// 	path: "/tables",
	// 	name: "Table List",
	// 	rtlName: "قائمة الجدول",
	// 	icon: "tim-icons icon-puzzle-10",
	// 	component: TableList,
	// 	layout: "/admin",
	// },
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
]
export default routes
