import React, { useState } from "react";
import "./Card.css";
import { FaMinus, FaPlus } from "react-icons/fa";
const CardDetails = ({ student }) => {
	// const data = {
	// 	tag: "tag 1",
	// };
	// const misle = { ...student, ...data };
	// console.log(misle);
	const [visible, setVisible] = useState(false);

	const [tag, setTag] = useState({...student});
	console.log(tag);

	const [tagbtn, setTagBtn] = useState(false);

	const { id, city, company, email, pic, skill, grades } = student;
	const avg = (grades) => {
		let sum = 0;

		for (let i = 0; i < grades.length; i++) {
			sum += parseInt(grades[i]);
		}
		return sum / grades.length;
	};
	const handlePlusIcon = (e) => {
		e.preventDefault();
		setVisible(true);
	};
	const handleMinusIcon = (e) => {
		e.preventDefault();
		setVisible(false);
	};

	const handleChange = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setTagBtn(true);
			setTag(event.target.value)
			event.target.value = "";
		}
	};

	return (
		<div>
			<div className="card">
				<div className="card-contents">
					<div className="card-img">
						<img src={pic} alt="" />
					</div>
					<div className="card-items">
						<div className="card-contents-titles">
							<h1> {city} </h1>
						</div>
						<div className="card-contents-text">
							<p>Email: {email} </p>
							<p> {company} </p>
							<p>Skill: {skill} </p>
							<p> Average : {avg(grades)}%</p>
							{tagbtn ? <button className="tagbtn">{tag}</button> : ""}

							<div className="new-tag">
								<input placeholder="enter a tag" onKeyPress={handleChange} />
							</div>
							{visible
								? grades.map((grade, idx) => (
										<p>
											Test {idx + 1}: {grade}%
										</p>
								  ))
								: ""}
						</div>
					</div>
				</div>
				<div className="plus-minus-icons">
					{visible ? (
						<a href="#" onClick={handleMinusIcon}>
							<FaMinus />
						</a>
					) : (
						<a onClick={handlePlusIcon} href="#">
							<FaPlus />
						</a>
					)}
				</div>
			</div>
			<hr />
		</div>
	);
};

export default CardDetails;
