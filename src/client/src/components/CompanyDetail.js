import { useParams } from "react-router";
import { getCompany } from "../services/queries";
import { useState, useEffect } from "react";
import JobList from "./JobList";

function CompanyDetail() {
	const { companyId } = useParams();
	const [company, setCompany] = useState(null);
	useEffect(() => {
		getCompany(companyId).then(setCompany);
	}, [companyId]);
	console.log("Company Details: ", company);
	if (!company) {
		return <p>Loading Company Details ...</p>;
	}

	return (
		<div>
			<div>
				<h1 className="title">{company.name}</h1>
				<div className="box">{company.description}</div>
			</div>
			<br />
			<h5 className="title is-5">Open Positions At {company.name}</h5>
			<JobList jobs={company.jobs} />
		</div>
	);
}

export default CompanyDetail;
