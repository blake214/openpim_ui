"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { removeTypeNameGraphQl } from '@/lib/helpers';
import { DeleteTempProduct } from '@/lib/graphql_mutation';
import { handleCreateTempProduct } from '@/lib/action_user';
import { gql } from '@apollo/client';
import ContentBlock from "@/components/content_block/content_block";
import SectionBlockMinimizer from "@/components/section_block_minimizer/section_block_minimizer";
import CustomTable from "@/components/custom_table/custom_table";
import CustomButton from '@/components/custom_button/custom_button';
import Skeleton from '@/components/skeleton/skeleton';

const ManageProductsPageGetProducts = gql`
query ManageProductsPageGetProducts {
    getUser {
        temp_products {
            temp_product_id
            names {
                name
            }
            codes {
                entity_code
                gtin
            }
        }
    }
    getUserProducts {
        product_id {
            _id
            names {
                name
            }
            codes {
                entity_code
                gtin
            }
            changes {
                change_status
            }
            issues {
                issue_status
            }
            dates {
                date_created
            }
        }
    }
}`;

const ManageProductsPageGetTempProduct = gql`
query ManageProductsPageGetTempProduct($GetTempProductInputObject: Id!) {
    getTempProduct(temp_product_id: $GetTempProductInputObject) {
        temp_product_id
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
        specs {
            product_variants {
                variant_group_id {
                    _id
                }
                variant_upsell
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
        }
        entity_id {
            _id
        }
        categories {
            _id
        }
    }
}`;

export default function ManageProductPage() {
    // ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

    // ======= States
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentTempProducts, setCurrentTempProducts] = useState([]);
    const [mounted, setMounted] = useState(false)
    const [tempProductId, setTempProductId] = useState();
    // ======= States

    // ======= GraphQL
    const { loading: ManageProductsPageGetProductsLoading, error: ManageProductsPageGetProductsError, data: ManageProductsPageGetProductsData, refetch: ManageProductsPageGetProductsRefetch } = useQuery(ManageProductsPageGetProducts);
    const { loading: ManageProductsPageGetTempProductLoading, error: ManageProductsPageGetTempProductError, data: ManageProductsPageGetTempProductData } = useQuery(ManageProductsPageGetTempProduct, {
        variables:{ GetTempProductInputObject: tempProductId },
        skip: !tempProductId,
        fetchPolicy: 'no-cache'
    });
    const [deleteTempProduct, { data: DeleteTempProductData, loading: DeleteTempProductLoading, error: DeleteTempProductError }] = useMutation(DeleteTempProduct);
    // ======= GraphQL

    // ================================================= Event Handlers
    // ======= Temp Products
    const handleDeleteFormData_temp_products = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentTempProducts.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Get the id of the element
        const temp_product_id = ManageProductsPageGetProductsData.getUser.temp_products[selected_indicies]?.temp_product_id
        if(!temp_product_id) return alert('Cant find the element')
        // Confirm delete
        /** Confirm and Perform request */
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if(isConfirmed) {
            // Perform
            deleteTempProduct({
                variables: {
                    DeleteTempProductInputObject: {
                        temp_product_id: temp_product_id
                    }
                }
            })
        }
    }
    const handleEditFormData_temp_products = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentTempProducts.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Get the id of the element
        const temp_product_id = ManageProductsPageGetProductsData.getUser.temp_products[selected_indicies]?.temp_product_id
        if(!temp_product_id) return alert('Cant find the element')
        /** Perform route */
        setTempProductId(temp_product_id)
    }
    const handlePreviewFormData_temp_products = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentTempProducts.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Get the id of the element
        const temp_product_id = ManageProductsPageGetProductsData.getUser.temp_products[selected_indicies]?.temp_product_id
        if(!temp_product_id) return alert('Cant find the element')
        /** Perform redirect */
        router.push(`/product/${temp_product_id}?preview=true`)
    }
    // ======= Temp Products

    // ======= Products
    const handleManageFormData_products = (event) => {
        event.preventDefault();
        // Inlitialise
        let selected_indicies = null
        // Check which values are checked
        currentProducts.forEach((element, index) => {
            if(element.checked) {
                if(!selected_indicies) selected_indicies = index
                else return alert('Can only move one element at a time')
            }
        });
        // Make sure there is only one entry selected (0 is a index also so we match for null)
        if(selected_indicies == null) return alert('Need to select an element')
        // Get the id of the element
        const product_id = ManageProductsPageGetProductsData.getUserProducts[selected_indicies]?.product_id?._id
        if(!product_id) return alert('Cant find the element')
        /** Perform route */
        router.push(`${location}/${product_id}`)
    }
    // ======= Products
    // ================================================= Event Handlers

    // ======= Effects
    useEffect(() => {
		setMounted(true)
	}, [])
    useEffect(() => {
        if(mounted) ManageProductsPageGetProductsRefetch()
	}, [mounted, DeleteTempProductData])
    useEffect(() => {
        if(ManageProductsPageGetProductsData) {
            setCurrentProducts(ManageProductsPageGetProductsData.getUserProducts.map(element => ({
                checked: false,
                items: [
                    {
                        title: "Id",
                        content: [element.product_id._id]
                    },
                    {
                        title: "Name",
                        content: [element.product_id.names[0].name]
                    }
                ]
            })))
            setCurrentTempProducts(ManageProductsPageGetProductsData.getUser.temp_products.map(element => ({
                checked: false,
                items: [
                    {
                        title: "Id",
                        content: [element.temp_product_id]
                    },
                    {
                        title: "Name",
                        content: [element.names[0].name]
                    }
                ]
            })))
        }
	}, [ManageProductsPageGetProductsData])
    useEffect(() => {
        if(ManageProductsPageGetTempProductData?.getTempProduct) {
            const cleaned_response = removeTypeNameGraphQl(ManageProductsPageGetTempProductData?.getTempProduct)
            const temp_product_id = handleCreateTempProduct(cleaned_response)
            router.push(`/dash/products/create/${temp_product_id}`)
        }
	}, [ManageProductsPageGetTempProductData])
    // ======= Effects

    return (
        <div>
            <h1>Manage Products</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
            <br/>
            <SectionBlockMinimizer heading="Products" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    menuComponents={
                        <>
                            <CustomButton component_type="vertical" onClick={()=>{}}>Delete</CustomButton>
                            <CustomButton component_type="vertical" onClick={handleManageFormData_products}>Manage</CustomButton>
                        </>
                    }
                >
                    {ManageProductsPageGetProductsLoading ? (<>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                    </>) : (
                        <CustomTable
                            tableContentState={{
                                tableContent: currentProducts,
                                setTableContent:setCurrentProducts
                            }}
                            checks={true}
                            numbers={true}
                        />
                    )}


                </ContentBlock>
            </SectionBlockMinimizer>
            <br/>
            <SectionBlockMinimizer heading="Products Pending Review" start_state="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</p>
                <br/>
                <ContentBlock
                    title="Current"
                    menuComponents={
                        <>
                            <CustomButton component_type="vertical" onClick={handleDeleteFormData_temp_products}>Delete</CustomButton>
                            <CustomButton component_type="vertical" onClick={handleEditFormData_temp_products}>Edit</CustomButton>
                            <CustomButton component_type="vertical" onClick={handlePreviewFormData_temp_products}>Preview</CustomButton>
                        </>
                    }
                >
                    {ManageProductsPageGetTempProductLoading || ManageProductsPageGetProductsLoading || DeleteTempProductLoading ? (<>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                        <Skeleton width='100'/>
                    </>) : (
                        <CustomTable
                            tableContentState={{
                                tableContent: currentTempProducts,
                                setTableContent:setCurrentTempProducts
                            }}
                            checks={true}
                            numbers={true}
                        />
                    )}
                </ContentBlock>
            </SectionBlockMinimizer>
        </div>
    );
}
