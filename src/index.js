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
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		const host = url.host;
		const pathParts = url.pathname.split('/').filter(Boolean);

		const githubAccount = "https://github.com/thejolman";
		if (pathParts.length === 0) {
			return Response.redirect(githubAccount, 302);
		}

		const repoName = pathParts[0];
		const vanityPath = `${host}/${repoName}`;
		const repoUrl = `${githubAccount}/${repoName}`;
		const vcs = "git";

		if (url.searchParams.get("go-get") === "1") {
			const html = `
<!DOCTYPE html>
<html>
<head>
	<meta name="go-import" content="${vanityPath} ${vcs} ${repoUrl}">
</head>
<body>
	go get ${vanityPath}
</body>
</html>
`;
			return new Response(html, {
				headers: { "content-type": "text/html;charset=UTF-8" },
			});
		}

		return Response.redirect(repoUrl, 302);
	},
};
