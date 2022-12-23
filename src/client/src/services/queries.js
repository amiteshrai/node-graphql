import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJobs() {
	const query = gql`
		query {
			jobs {
				id
				title
				description
				company {
					name
				}
			}
		}
	`;

	const { jobs } = await request(GRAPHQL_URL, query);
	console.log("Jobs: ", jobs);
	return jobs;
}

export async function getJob(id) {
	const query = gql`
		query JobQuery($id: ID!) {
			job(id: $id) {
				id
				title
				description
				company {
					id
					name
				}
			}
		}
	`;
	const variables = { id };
	const { job } = await request(GRAPHQL_URL, query, variables);
	return job;
}

export async function getCompany(id) {
	const query = `
		query Company($companyId: ID!) {
			company(id: $companyId) {
				id
				name
				description
				jobs {
					id
					title
				}
			}
		}
	`;
	const variables = { companyId: id };
	const { company } = await request(GRAPHQL_URL, query, variables);
	return company;
}