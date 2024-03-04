import EntitySummary from "@/components/entity_summary/entity_summary";
import Skeleton from "@/components/skeleton/skeleton";
import { Suspense } from "react";

export const metadata = {
	title: "Product",
	title: {
		default:"Product",
		template:"Product : | %s"
	},
	description: "OpenPIM APP: Product",
};

const getProduct = async (product_id) => {
	// const res = await fetch("...", {cache: "force-cache"}) -> remember we can force-cache on the react server or "no-store", or cache for certain amount of time
	/** const res = await fetch("...", {cache: "force-cache"})
	 * we can set cache to "no-store", if we dont want the react server to cache the request data
	 * We can also do const res = await fetch("...", {next: {revalidate:3600}}), which will do a refresh in every 1 hour
	 */
	await new Promise(resolve => setTimeout(resolve, 5000));
	const res = {
		body: {
			data: {
				_id: `${product_id}`
			}
		}
	}
	if(!res.body.data) throw new Error(res.body.errors)
	return res.body.data
}

export default async function ProductPage({params}) {
	const product = await getProduct(params.product_id)
    return (
        <div>
            <>Product...</>
			<br></br>
			{JSON.stringify(product)}

			{/* We likely wont use suspense, as we using graph ql we will have all the data on the first load */}
			<Suspense fallback={<Skeleton/>}>
				<EntitySummary entity_id="some_id"/>
			</Suspense>
			
        </div>
    );
}
