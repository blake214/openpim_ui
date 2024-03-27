"use client"

import { useMutation } from '@apollo/client';
import { ApproveTempProduct } from '@/lib/graphql_mutation';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomButton from "../custom_button/custom_button";


export default function ApproveTempProductComponent({ temp_product_id }) {
	// ======= Hooks
    const location = usePathname()
	const router = useRouter()
    // ======= Hooks

	// ======= GraphQL
	const [approveTempProduct, { data: approveTempProductData, loading: approveTempProductLoading, error: approveTempProductError }] = useMutation(ApproveTempProduct);
	// ======= GraphQL

	// ======= Event Handlers
    const handleApproveTempProduct = (event) => {
        event.preventDefault();
        /** Perform the request */
        approveTempProduct({
			variables: {
				ApproveTempProductInputObject: {
					temp_product_id: temp_product_id
				}
			}
		})
    }
    // ======= Event Handlers

	// ======= Effects
    useEffect(() => {
        if(approveTempProductData) {
            // Go back back without the query, so to the product page
			router.push(location)
        }
    }, [approveTempProductData]);
    // ======= Effects

	return (
		<CustomButton component_type="horizontal" onClick={handleApproveTempProduct} disabled={approveTempProductLoading} busy={approveTempProductLoading}>Approve Product</CustomButton>
	);
}
