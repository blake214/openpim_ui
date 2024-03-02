import styles from "./navigation_links.module.css"
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import CustomLink from "@/app/components/custom_link/custom_link";
import CustomToggle from "@/app/components/custom_toggle/custom_toggle";

export default function NavigationLinks({updateMenuObj, updateUserObj}) {
	return (
		<div className={styles.container}>
			<CustomLink align_type="horizontal" item={{ title: "Dash", path: "/dash" }}>
				Dash
			</CustomLink>
			<CustomToggle align_type="horizontal" state={updateUserObj.state} toggleState={updateUserObj.updater}>
				<FaUser size={25} cursor="pointer"/>
			</CustomToggle>
			<CustomToggle align_type="horizontal" state={updateMenuObj.state} toggleState={updateMenuObj.updater}>
				<IoMdMenu size={25} cursor="pointer"/>
			</CustomToggle>
		</div>
	);
}