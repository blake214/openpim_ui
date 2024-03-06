import styles from "./navigation_links.module.css"
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import CustomLink from "@/components/custom_link/custom_link";
import CustomToggle from "@/components/custom_toggle/custom_toggle";

export default function NavigationLinks({updateMenuObj, updateUserObj}) {
	return (
		<div className={styles.container}>
			<CustomLink align="horizontal" item={{ title: "Dash", path: "/dash" }}>
				Dash
			</CustomLink>
			<CustomToggle align="horizontal" state={updateUserObj.state} toggleState={updateUserObj.updater}>
				<FaUser size={25} cursor="pointer"/>
			</CustomToggle>
			<CustomToggle align="horizontal" state={updateMenuObj.state} toggleState={updateMenuObj.updater}>
				<IoMdMenu size={25} cursor="pointer"/>
			</CustomToggle>
		</div>
	);
}