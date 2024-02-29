import { FaBookOpen } from "react-icons/fa";

import styles from "./navbar.module.css"
import NavigationLinks from "./navigation_links/navigation_links";
import CustomLink from "../custom_link/custom_link";

export default function Navbar() {
	return (
		<div className={styles.container}>
			<CustomLink item={{ title: "Home", path: "/" }}>
				<FaBookOpen size={25} cursor="pointer"/>
			</CustomLink>
			<NavigationLinks/>
		</div>
	);
}