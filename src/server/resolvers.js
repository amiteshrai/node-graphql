import { Job, Company } from "./db.js";

const resolvers = {
	Query: {
		job: (root, args) => Job.findById(args.id),
		jobs: () => Job.findAll(),
		company: (root, args) => Company.findById(args.id),
	},
	Job: {
		company: (job) => Company.findById(job.companyId),
	},
	Company: {
		jobs: (company) => Job.findAll((job) => job.companyId === company.id),
	},
};

export default resolvers;
