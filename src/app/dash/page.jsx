"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import Skeleton from "@/components/skeleton/skeleton";
import ContentBlock from "@/components/content_block/content_block";
import CustomButton from "@/components/custom_button/custom_button";
import CustomTable from "@/components/custom_table/custom_table";
import BasicLink from "@/components/basic_link/basic_link";

const DashBoardGetAll = gql`
query DashBoardGetAll {
    getUserResolves {
        _id
        resolve_id {
            _id
            resolve_type
            resolve_data {
                product_change_id {
                    product_change_id
                }
            }
            dates {
                date_created
            }
        }
        verdict
    }
}`;

export default function DashPage() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= States
    const [currentResolves, setCurrentResolves] = useState([]);
    const [tableContent, setTableContent] = useState([]);
    // ======= States

    // ======= GraphQL
    const { loading: DashBoardGetAllLoading, error: DashBoardGetAllError, data: DashBoardGetAllData, refetch: DashBoardGetAllRefetch } = useQuery(DashBoardGetAll);
    // ======= GraphQL

    // ======= Effects
    useEffect(() => {
        if(DashBoardGetAllData) {
            setCurrentResolves(DashBoardGetAllData.getUserResolves.map(element => ({
                checked: false,
                items: [
                    {
                        title: "Resolve Id",
                        content: [
                            <BasicLink href={`${location}/${element.resolve_id._id}_user_resolve`}>{element.resolve_id._id}</BasicLink>
                        ]
                    },
                    {
                        title: "Verdict",
                        content: [element.verdict]
                    }
                ]
            })))
        }
	}, [DashBoardGetAllData])
    useEffect(() => {
        setTableContent([...currentResolves])
	}, [currentResolves])
    // ======= Effects

    return (
        <div>
            <ContentBlock
                title="Feed"
                menuComponents={
                    <>
                        <CustomButton component_type="vertical" onClick={()=>{}}>Delete</CustomButton>
                        <CustomButton component_type="vertical" onClick={()=>{}}>Edit</CustomButton>
                        <CustomButton component_type="vertical" onClick={()=>{}}>Preview</CustomButton>
                    </>
                }
            >
                {DashBoardGetAllLoading ? (<>
                    <Skeleton width='100'/>
                    <Skeleton width='100'/>
                    <Skeleton width='100'/>
                </>) : (
                    <CustomTable
                        tableContentState={{
                            tableContent: tableContent,
                            setTableContent: setTableContent
                        }}
                        checks={false}
                        numbers={false}
                    />
                )}
            </ContentBlock>
        </div>
    );
}
