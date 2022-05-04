import React from "react";
import "./Card.css";
const CardDetails = ({ student }) => {
	const { city, company, email, pic, skill, grades } = student;
	const avg = (grades) => {
		let sum = 0;

		for (let i = 0; i < grades.length; i++) {
			sum += parseInt(grades[i]);
		}
		return sum / grades.length;
	};
	return (
		<div>
			<div className="card">
				<div className="card-img">
					<img src={pic} alt="" />
				</div>
				<div className="card-contents">
					<div className="card-contents-titles">
						<h1> {city} </h1>
					</div>
					<div className="card-contents-text">
						<p>Email: {email} </p>
						<p> {company} </p>
						<p>Skill: {skill} </p>
						<p> Average : {avg(grades)}%</p>
					</div>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default CardDetails;
