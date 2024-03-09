"use client"

import styles from "./style.module.css"
import { buildContent } from '@/lib/helpers';
import { usePathname, useRouter } from 'next/navigation'
import CustomButton from '@/components/custom_button/custom_button';
import EditableBlock from '@/components/edititable_block/editable_block';
import KeyValueBlock from '@/components/key_value_block/key_value_block';
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";

export default function ChangeUserPage({stored_element}) {
    // ======= Hooks
    const location = usePathname()
    const router = useRouter()
    // ======= Hooks

    // ======= General
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const new_content = buildContent(stored_element_temp, "new_content")
    const existing_content = buildContent(stored_element_temp, "existing_content")
    // ======= General

    return (
        <div>
            <h1>Change</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            
                <SectionBlockMinimizer heading="Current" start_state="false">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <br/>
                    <div className={styles.existing_content}>
                        <EditableBlock title="Current">
                            <KeyValueBlock title="First Name">{existing_content.fname}</KeyValueBlock>
                        </EditableBlock>
                    </div>
                </SectionBlockMinimizer>
            
                <SectionBlockMinimizer heading="New" start_state="true">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <br/>
                    <div className={styles.new_content}>
                        <EditableBlock title="New" onClick={() => {
                            router.push(`${location}/${stored_element.new_content.fname}`)
                        }}>
                            <KeyValueBlock title="First Name">{new_content.fname}</KeyValueBlock>
                        </EditableBlock>
                    </div>
                </SectionBlockMinimizer>
            
            <br/>
            <hr className="hr_surface_color_1"/>
            <div className="button_fixed_width align_right">
                <CustomButton align="vertical" onClick={()=>{}}>Update</CustomButton>
            </div>
        </div>
    );
}
