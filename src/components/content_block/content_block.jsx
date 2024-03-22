import ContentBlockHeader from "./content_block_header";
import ContentBlockBody from "./content_block_body";

export default function ContentBlock({
	title="",
	undoClick=null,
	editClick=null,
	menuComponents=null,
	children
}) {
	return (
		<>
			<ContentBlockHeader
				title={title}
				undoClick={undoClick}
				editClick={editClick}
				menuComponents={menuComponents}
			/>
			<ContentBlockBody>{children}</ContentBlockBody>
		</>
	);
}