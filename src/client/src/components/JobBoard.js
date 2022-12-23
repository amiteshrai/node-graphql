import JobList from "./JobList";
import { getJobs } from "../services/queries";
import { useEffect, useState } from "react";

function JobBoard() {
	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(false);
	useEffect(() => {
		console.log("Component Mounted!");
		getJobs()
			.then(setJobs)
			.catch((err) => setError(true));
	}, []);

	if (error) {
		return (
			<p>
				<strong>Something went wrong. Please try again.</strong>
			</p>
		);
	}

	return (
		<div>
			<h1 className="title">Job Board</h1>
			<JobList jobs={jobs} />
		</div>
	);
}

export default JobBoard;
