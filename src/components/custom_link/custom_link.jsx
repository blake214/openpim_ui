import Link from "next/link";
import general_styles from "@/components/style.module.css"
import { usePathname } from "next/navigation";

export default function CustomLink({ align, children, item }) {
	const pathName = usePathname();
	return (
		<Link
			href={item.path}
			className={`
				${general_styles.container_button}
				${pathName === item.path && general_styles.container_button_active}
				${align === "horizontal" ? (general_styles.container_button_horizontal) : (general_styles.container_button_vertical)}
			`}
		>
			{children}
		</Link>
	);
}