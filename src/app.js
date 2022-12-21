const GRAPHQL_URL = "http://localhost:9999/";

async function fetchGreeting() {
	const resp = await fetch(GRAPHQL_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `
				query {
					greeting
				}
			`,
		}),
	});

	return await resp.json();
}

const element = document.getElementById("greeting");
element.textContent = "Loading...";

setTimeout(
	() =>
		fetchGreeting().then(({ data }) => {
			element.textContent = data.greeting;
		}),
	1000
);
