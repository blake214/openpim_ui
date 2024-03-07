import styles from "./navigation_links.module.css"
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import CustomLink from "@/components/custom_link/custom_link";
import CustomToggle from "@/components/custom_toggle/custom_toggle";

export default function NavigationLinks({updateMenuObj, updateUserObj}) {
	return (
		<div className={styles.container}>
			<CustomLink href="/dash">
				Dash
			</CustomLink>
			<CustomToggle state={updateUserObj.state} toggleState={updateUserObj.updater}>
				<FaUser size={25} cursor="pointer"/>
			</CustomToggle>
			<CustomToggle state={updateMenuObj.state} toggleState={updateMenuObj.updater}>
				<IoMdMenu size={25} cursor="pointer"/>
			</CustomToggle>
		</div>
	);
}