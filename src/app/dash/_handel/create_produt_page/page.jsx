"use client"

import { buildObject } from '@/lib/helpers';
import { usePathname, useRouter } from 'next/navigation'
import CustomButton from '@/components/custom_button/custom_button';
import EditableBlock from '@/components/edititable_block/editable_block';
import KeyValueBlock from '@/components/key_value_block/key_value_block';

export default function CreateProductPage({stored_element}) {
    const location = usePathname()
    const router = useRouter()
    const stored_element_temp = JSON.parse(JSON.stringify(stored_element))
    const built = buildObject(stored_element_temp)

    return (
        <div>
            <h1>Create new product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <EditableBlock title="Current" onClick={() => {
                router.push(`${location}/${stored_element.content.series}`)
            }}>
                <KeyValueBlock title="Series">{built.series}</KeyValueBlock>
            </EditableBlock>
            <br/>
            <EditableBlock title="Current" onClick={() => {
                router.push(`${location}/${stored_element.content.title}`)
            }}>
                <KeyValueBlock title="Short">{built.title.short}</KeyValueBlock>
                <KeyValueBlock title="Long">{built.title.long}</KeyValueBlock>
            </EditableBlock>
            <br/>
            <div className={"button_fixed_width"}>
                <CustomButton align="vertical" onClick={()=>{}}>Create product from template</CustomButton>
            </div>
        </div>
    );
}
