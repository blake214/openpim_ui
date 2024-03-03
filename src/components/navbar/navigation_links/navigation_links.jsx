import styles from "./style.module.css"
import CustomLink from "../../custom_link/custom_link";
import { FaUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import CustomToggle from "../../custom_toggle/custom_toggle";

export default function NavigationLinks({updateMenuObj, updateUserObj}) {
	return (
		<div className={styles.container}>
			<CustomLink align_type="horizontal" item={{ title: "Dash", path: "/dash" }}>
				<MdSpaceDashboard size={25} cursor="pointer"/>
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