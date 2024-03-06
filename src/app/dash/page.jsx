"use client"

import styles from "./style.module.css"
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import RowHorizontal from "@/components/table_horizontal/row_horizontal/row_horizontal";

export default function DashPage() {
    return (
        <div>
           <TableHorizontal
				title="Title"
				rows="horizontal"
				undoClick={()=>{}}
				editClick={()=>{}}
			>
				<RowHorizontal title="Title" number="1">Content</RowHorizontal>
				<RowHorizontal title="Title" number="2">Content</RowHorizontal>
			</TableHorizontal>
			
        </div>
        
    );
}
