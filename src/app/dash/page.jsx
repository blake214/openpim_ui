"use client"

import styles from "./style.module.css"
import TableHorizontal from "@/components/table_horizontal/table_horizontal";
import RowHorizontal from "@/components/table_horizontal/row_primary/row";
import RowHorizontalContent from "@/components/table_horizontal/row_primary/content";
import RowHorizontalContentContent from "@/components/table_horizontal/row_primary/content_content";
import { useState } from "react";
import TableVertical from "@/components/table_vertical/table_vertical";
import RowVertical from "@/components/table_vertical/row_primary/row";
import RowVerticalContent from "@/components/table_vertical/row_primary/content";
import RowVerticalContentContent from "@/components/table_vertical/row_primary/content_content";

export default function DashPage() {
	const [isCheckedMain, setIsCheckedMain] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

    return (
        <div>
           <TableHorizontal
				title="Title"
				undoClick={()=>{}}
				editClick={()=>{}}
				check_box_state={{
					isChecked: isCheckedMain,
					setIsChecked: setIsCheckedMain,
				}}
				numbers={true}
			>
				<RowHorizontal number="1" check_box_state={{
					isChecked: isChecked,
					setIsChecked: setIsChecked,
				}}>
					<RowHorizontalContent title="Title">
						<RowHorizontalContentContent>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</RowHorizontalContentContent>
					</RowHorizontalContent>
					<RowHorizontalContent title="Title">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
					</RowHorizontalContent>
				</RowHorizontal>
				<RowHorizontal number="2">
					<RowHorizontalContent title="Title">
						<RowHorizontalContentContent>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</RowHorizontalContentContent>
					</RowHorizontalContent>
					<RowHorizontalContent title="Title">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
					</RowHorizontalContent>
				</RowHorizontal>
			</TableHorizontal>
			<br/>
			<br/>
			<TableVertical
				title="Title"
			>
				
			</TableVertical>
			
        </div>
        
    );
}
