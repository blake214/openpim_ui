import styles from "./style.module.css"
import DashNavbar from "@/app/components/dash_navbar/dash_navbar";

export const metadata = {
	title: "Dashboard",
	title: {
		default:"Dash",
		template:"Dash : | %s"
	},
	description: "OpenPIM APP: Dashboard",
};

export default function DashLayout({ children, test }) {
	return (
		<div className={styles.container}>
			<DashNavbar/>
			<main>
				{children}
			</main>
		</div>
	);
}
