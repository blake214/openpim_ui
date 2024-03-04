const getEntitySummary = async (entity_id) => {
	// const res = await fetch("...", {cache: "force-cache"}) -> remember we can force-cache on the react server or "no-store", or cache for certain amount of time
	/** const res = await fetch("...", {cache: "force-cache"})
	 * we can set cache to "no-store", if we dont want the react server to cache the request data
	 * We can also do const res = await fetch("...", {next: {revalidate:3600}}), which will do a refresh in every 1 hour
	 */
	await new Promise(resolve => setTimeout(resolve, 5000));
	const res = {
		body: {
			data: {
				_id: `${entity_id}`
			}
		}
	}
	if(!res.body.data) throw new Error(res.body.errors)
	return res.body.data
}

export default async function EntitySummary({ entity_id }) {
	const entity_summary = await getEntitySummary(entity_id)
	return (
		<>{JSON.stringify(entity_summary)}</>
	);
}