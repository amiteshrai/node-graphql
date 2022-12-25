import { Job, Company } from "./db.js";

const resolvers = {
	Query: {
		job: (root, args) => Job.findById(args.id),
		jobs: () => Job.findAll(),
		company: (root, args) => Company.findById(args.id),
	},
	Mutation: {
		createJob: (_root, { input }) => Job.create(input),
		deleteJob: (_root, { id }) => Job.delete(id),
		updateJob: (_root, { input }) => Job.update(input),
	},

	Job: {
		company: (job) => Company.findById(job.companyId),
	},
	Company: {
		jobs: (company) => Job.findAll((job) => job.companyId === company.id),
	},
};

export default resolvers;
