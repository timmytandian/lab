/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
	  /**
	   * Example someHost at URL is set up to respond with HTML
	   * Replace URL with the host you wish to send requests to
	   */
	  const someHost = 'https://www.cloudflare.com';
	  const url = someHost + '/ja-jp/';
  
	  /**
	   * gatherResponse awaits and returns a response body as a string.
	   * Use await gatherResponse(..) in an async function to get the response body
	   * @param {Response} response
	   */
	  async function gatherResponse(response) {
		const { headers } = response;
		const contentType = headers.get('content-type') || '';
		if (contentType.includes('application/json')) {
		  return JSON.stringify(await response.json());
		} else if (contentType.includes('application/text')) {
		  return response.text();
		} else if (contentType.includes('text/html')) {
		  return response.text();
		} else {
		  return response.text();
		}
	  }
  
	  const init = {
		headers: {
		  'content-type': 'text/html;charset=UTF-8',
		},
	  };
  
	  const response = await fetch(url, init);
	  const results = await gatherResponse(response);
	  const results2 = results.replace(/クラウド/g, "cloud");
	  return new Response(results2, init);
	},
  };