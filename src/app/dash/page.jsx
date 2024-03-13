"use client"

import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import { useState } from "react";
import TableVertical from "@/components/table_vertical/table_vertical";
import ContentBlockHeader from "@/components/content_block/content_block_header";
import ContentBlockBody from "@/components/content_block/content_block_body";
import CustomButton from "@/components/custom_button/custom_button";


export default function DashPage() {

	const [tableContent, setTableContent] = useState([
		{
			checked: true,
			items: [
				{
					title: "Title1",
					content: [
						<p>content1</p>,
						<p>content2</p>
					]
				},
				{
					title: "Title2",
					content: [
						<p>content1</p>
					]
				}
			]
		},
		{
			checked: true,
			items: [
				{
					title: "Title3",
					content: [
						<p>content1</p>
					]
				}
			]
		}
	]);

    return (
        <>
			<ContentBlockHeader
				title="Title"
				undoClick={()=>{}}
				editClick={()=>{}}
				menuComponents={
					<>
						<CustomButton component_type="vertical" onClick={()=>{}}>Delete</CustomButton>
					</>
				}
			/>
			<ContentBlockBody>
				<TableHorizontal
					tableContentState={{
						tableContent: tableContent,
						setTableContent: setTableContent
					}}
					checks={true}
					numbers={true}
				/>
			</ContentBlockBody>
			

			
			<br/>
			<br/>
			<TableVertical
				title="Title"
			>
				
			</TableVertical>
			
        </>
        
    );
}
