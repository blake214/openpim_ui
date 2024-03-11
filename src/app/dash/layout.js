import DashTrailHeading from "@/components/dash_trail_heading/dash_trail_heading";
import DashNavbar from "@/components/dash_navbar/dash_navbar";

export const metadata = {
	title: "Dashboard",
	title: {
		default:"Dash",
		template:"Dash : | %s"
	},
	description: "OpenPIM APP: Dashboard",
};

export default function DashLayout({ children }) {
	return (
		<div className="flex">
			<DashNavbar/>
			<main>
				<DashTrailHeading/>
				<br/>
				{children}
			</main>
		</div>
	);
}
