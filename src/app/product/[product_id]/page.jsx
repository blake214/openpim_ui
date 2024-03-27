import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation"
import { gql } from '@apollo/client';
import { request } from 'graphql-request';
import ApproveTempProductComponent from "@/components/products/approve_temp_product";
import EntitySummary from "@/components/entity_summary/entity_summary";
import Skeleton from "@/components/skeleton/skeleton";

export const metadata = {
	title: "Product",
	title: {
		default:"Product",
		template:"Product : | %s"
	},
	description: "OpenPIM APP: Product",
};

const getImage = async (image_id) => {
	// const res = await fetch("...", {cache: "force-cache"}) -> remember we can force-cache on the react server or "no-store", or cache for certain amount of time
	/** const res = await fetch("...", {cache: "force-cache"})
	 * we can set cache to "no-store", if we dont want the react server to cache the request data
	 * We can also do const res = await fetch("...", {next: {revalidate:3600}}), which will do a refresh in every 1 hour
	*/
}

const getProduct = async (product_id) => {
	const query = gql`
	query {
		getProduct(product_id: "${product_id}") {
			_id
			family
			series
		}
	}`;
	/** Notes: We cant cache a post really so yip */
	const response = await request(`${process.env.NEXT_PUBLIC_OPENPIM_API_URL}graphql`, query);
	if(response?.getProduct) return response.getProduct
	else return null
}

const getTempProduct = async (temp_product_id) => {
	const session = await auth()
	if(!session?.user?.openPimToken) return null
	const query = gql`
	query {
		getTempProduct(temp_product_id: "${temp_product_id}") {
			temp_product_id
			family
			series
		}
	}`;
	const headers = {
		"Authorization": session.user.openPimToken
	}
	const response = await request(`${process.env.NEXT_PUBLIC_OPENPIM_API_URL}graphql`, query, null, headers);
	if(response?.getTempProduct) return response.getTempProduct
	else return null
}

export default async function ProductPage({params, searchParams}) {
	const product_id = params?.product_id
	const is_preview = Boolean(searchParams?.preview || false)
	const product_data = is_preview ? await getTempProduct(product_id) : await getProduct(product_id)
	if(!product_data) notFound()
	
    return (
        <div>
            <>Product...</>
			<br></br>
			{JSON.stringify(product_data)}

			
			<br/>
			<br/>
			{product_data?.temp_product_id && (
				<ApproveTempProductComponent temp_product_id={product_data?.temp_product_id}/>
			)}
			

			{/* We likely wont use suspense, as we using graph ql we will have all the data on the first load
			But we will probably use it for images. Note we also need to look at the cusom nextjs image component and how it works*/}
			{/* <Suspense fallback={<Skeleton/>}>
				<EntitySummary entity_id="some_id"/>
			</Suspense> */}
			
        </div>
    );
}
