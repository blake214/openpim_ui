import Link from "next/link";
import general_styles from "@/components/style.module.css"
import { usePathname } from "next/navigation";

export default function CustomLink({ children, href="/", align="left", type="horizontal" }) {
	const pathName = usePathname();
	return (
		<Link
			href={href}
			className={`
				${general_styles.container_button}
				${pathName === href && general_styles.container_button_active}
				${type === "horizontal" && general_styles.container_button_horizontal}
				${type === "vertical" && general_styles.container_button_vertical}
			`}
		>
			<div className={`
				${align === "left" && "align_left"}
				${align === "right" && "align_right"}
				${align === "center" && "align_center"}
			`}>
				{children}
			</div>
		</Link>
	);
}