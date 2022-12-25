import { Job, Company } from "./db.js";

const resolvers = {
	Query: {
		job: (root, args) => Job.findById(args.id),
		jobs: () => Job.findAll(),
		company: (root, args) => Company.findById(args.id),
	},
	Mutation: {
		createJob: (_root, { input }, context) => {
			console.log("Create Job Context: ", context);
			if (!context.auth) {
				throw new Error("Invalid authorization");
			}
			const { companyId } = context.user;
			return Job.create({ ...input, companyId });
		},
		deleteJob: (_root, { id }) => Job.delete(id),
		updateJob: (_root, { input }, context) => {
			console.log("Update Job Context: ", context);
			if (!context.auth) {
				throw new Error("Invalid authorization");
			}
			const { companyId } = context.user;
			return Job.update({ ...input, companyId });
		},
	},

	Job: {
		company: (job) => Company.findById(job.companyId),
	},
	Company: {
		jobs: (company) => Job.findAll((job) => job.companyId === company.id),
	},
};

export default resolvers;
