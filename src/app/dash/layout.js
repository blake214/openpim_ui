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
		<>
			{children}
		</>
	);
}
