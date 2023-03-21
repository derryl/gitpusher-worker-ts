export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	KV: KVNamespace
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let initialValue = await env.KV.get("TEST") || '0';

		const newValue = parseInt(initialValue, 10) + 1;

		await env.KV.put("TEST", `${newValue}`);

		const responseText = `request method: ${request.method}, value: ${newValue}`;

		return new Response(responseText);
	},
};
