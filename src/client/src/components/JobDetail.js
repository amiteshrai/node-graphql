import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getJob } from "../services/queries";
import { useState, useEffect } from "react";

function JobDetail() {
	const { jobId } = useParams();
	const [job, setJob] = useState(null);
	useEffect(() => {
		getJob(jobId).then(setJob);
	}, [jobId]);

	console.log("Job Details: ", job);
	if (!job) {
		return <p>Loading Job Details ...</p>;
	}

	return (
		<div className="block">
			<div className="columns is-12">
				<h1 className="title">{job.title}</h1>
				<button className="delete is-medium">Delete</button>
			</div>
			<div className="a">
				<h2 className="subtitle">
					<Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
				</h2>
				<div className="box">{job.description}</div>
			</div>
		</div>
	);
}

export default JobDetail;
