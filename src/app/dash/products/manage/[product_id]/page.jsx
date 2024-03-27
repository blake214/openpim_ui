"use client"

import { useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { handleCreateProductChange } from '@/lib/action_user';
import { removeTypeNameGraphQl } from '@/lib/helpers';
import { keyDictionary_REVERSE_product_change_types } from '@/lib/key_dictionary';
import { gql } from '@apollo/client';
import SectionBlockMinimizer from '@/components/section_block_minimizer/section_block_minimizer';
import ContentBlock from '@/components/content_block/content_block';
import CustomTable from '@/components/custom_table/custom_table';
import Skeleton from '@/components/skeleton/skeleton';

const ManageProductPageGetProduct = gql`
query ManageProductPageGetProduct($GetProductInputObject: Id!) {
    getProduct(product_id: $GetProductInputObject) {
        _id
        family
        series
        codes {
            gtin
            hs
            bisac
            entity_code
        }
        names {
            name
            language_id
        }
        title {
            short
            long
        }
        primary_media {
            image_id {
                _id
            }
            video_id {
                _id
            }
        }
        description {
            short
            long
        }
        summary {
            short
            long
        }
        disclaimer {
            content
            external_url
            pdf_id {
                _id
            }
        }
        warranty {
            content
            external_url
            pdf_id {
                _id
            }
        }
        bullet_features {
            title
            content
            image_id {
                _id
            }
        }
        feature_groups {
            feature_category_id {
                _id
            }
            features {
                title
                content
                image_ids {
                    _id
                }
                animated_image_ids {
                    _id
                }
                threed_ids {
                    _id
                }
                video_ids {
                    _id
                }
            }
        }
        document_groups {
            document_category_id {
                _id
            }
            documents {
                title
                description
                unique_media_id {
                    _id
                }
            }
        }
        spec_groups {
            spec_category_id {
                _id
            }
            specs {
                spec_id {
                    _id
                }
                values
                primary_spec
            }
        }
        packaging {
            packaging_type
            width
            height
            depth
            weight
        }
        training {
            institution_name
            contact_no
            email
            website
            country
            state
            method_online
            method_onsite
        }
        instructions {
            content
            external_url
            pdf_ids {
                _id
            }
            video_ids {
                _id
            }
        }
        safety {
            content
            external_url
            pdf_ids {
                _id
            }
            video_ids {
                _id
            }
        }
        supporting_articles
        certificates
        related_products {
            _id
        }
        inclusive_products {
            _id
        }
        faqs {
            question
            answer
        }
        galleries {
            primary_gallery {
                image_ids {
                    _id
                }
                animated_image_ids {
                    _id
                }
                video_ids {
                    _id
                }
                threed_ids {
                    _id
                }
            }
            secondary_gallery {
                image_ids {
                    _id
                }
                animated_image_ids {
                    _id
                }
                video_ids {
                    _id
                }
                threed_ids {
                    _id
                }
            }
        }
        dates {
            date_released
            date_expired
            date_created
            date_updated
        }
    }
}`;

export default function ManageProductPage({ params }) {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= GraphQL
    const { loading: ManageProductPageGetProductLoading, error: ManageProductPageGetProductError, data: ManageProductPageGetProductData, refetch: ManageProductPageGetProductRefetch } = useQuery(ManageProductPageGetProduct, {
        variables:{ GetProductInputObject: params?.product_id },
        fetchPolicy: 'no-cache'
    });
    // ======= GraphQL

    // ======= States
    const [mounted, setMounted] = useState(false)
    // ======= States

    // ================================================= Handlers
    // ======= Title
    const handleEditProduct_title = (event) => {
        event.preventDefault();
        const new_object = {
            title: removeTypeNameGraphQl(ManageProductPageGetProductData.getProduct.title)
        }
        // Create an object
        const create_product_change_id = handleCreateProductChange(ManageProductPageGetProductData.getProduct._id, keyDictionary_REVERSE_product_change_types.title, new_object)
        // Route to edit that object
        router.push(`${location}/${create_product_change_id}`)
    }
    // ======= Title
    // ================================================= Handlers

    // ======= Effects
    useEffect(() => {
		setMounted(true)
	}, [])
    // ======= Effects

    return (
        <div>
            <h1>Manage Product</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            {ManageProductPageGetProductLoading ? (<>
                <Skeleton width='100'/>
                <Skeleton width='100'/>
                <Skeleton width='100'/>
            </>) : (
                <>
                    <h2>General Info</h2>
                    <hr className={`${"hr_surface_color_1"} ${"hr_margin"}`}/>
                    <SectionBlockMinimizer heading="Title" start_state="true">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                        <br/>
                        <ContentBlock
                            title="Current"
                            editClick={handleEditProduct_title}
                        >
                            <CustomTable
                                tableContent={[
                                    {
                                        items: [
                                            {
                                                title: "Short",
                                                content: [ManageProductPageGetProductData.getProduct.title.short]
                                            }
                                        ]
                                    },
                                    {
                                        items: [
                                            {
                                                title: "Long",
                                                content: [ManageProductPageGetProductData.getProduct.title.long]
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </ContentBlock>
                    </SectionBlockMinimizer>
                    <br/>
                </>
            )}
        </div>
    );
}
