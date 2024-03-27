"use client"
import ContentBlock from "@/components/content_block/content_block";
import CustomButton from "@/components/custom_button/custom_button";
import Skeleton from "@/components/skeleton/skeleton";
import CustomTable from "@/components/custom_table/custom_table";
import { gql } from '@apollo/client';
import { MessagesPageGetMessages } from "@/lib/graphql_query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const MessagesPageGetMessages = gql`
query MessagesPageGetMessages {
    getUser {
        _id
        messages {
            message_id
            message_read
            message
            dates {
                date_created
            }
        }
    }
}`;

export default function MessagesPage() {
	// ======= States
    const [currentMessages, setCurrentMessages] = useState([]);
    // ======= States

    // ======= GraphQL
    const { loading: MessagesPageGetMessagesLoading, error: MessagesPageGetMessagesError, data: MessagesPageGetMessagesData, refetch: MessagesPageGetMessagesRefetch } = useQuery(MessagesPageGetMessages);
    // ======= GraphQL

	// ======= Effects
    useEffect(() => {
        if(MessagesPageGetMessagesData) {
            setCurrentMessages(MessagesPageGetMessagesData.getUser.messages.map(element => ({
                checked: false,
                items: [
                    {
                        title: "Id",
                        content: [element.message_id]
                    },
                    {
                        title: "Message",
                        content: [element.message]
                    }
					,
                    {
                        title: "Date Created",
                        content: [element.dates.date_created]
                    }
                ]
            })))
        }
	}, [MessagesPageGetMessagesData])
    // ======= Effects
    
    return (
        <div>
			<h1>User Messages</h1>
            <br/>
				<ContentBlock
                    title="Current"
                    menuComponents={
                        <>
                            <CustomButton component_type="vertical" onClick={()=>{}}>Delete</CustomButton>
							<CustomButton component_type="vertical" onClick={()=>{}}>Mark as read</CustomButton>
							<CustomButton component_type="vertical" onClick={()=>{}}>Mark as unread</CustomButton>
                        </>
                    }
                >
                    {MessagesPageGetMessagesLoading ? (<>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                    </>) : (
                        <CustomTable
                            tableContentState={{
                                tableContent: currentMessages,
                                setTableContent: setCurrentMessages
                            }}
                            checks={true}
                            numbers={true}
                        />
                    )}
                </ContentBlock>
        </div>
    );
}
