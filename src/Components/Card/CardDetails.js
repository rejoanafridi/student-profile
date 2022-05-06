import React, { useEffect, useState } from "react";
import "./Card.css";
import { FaMinus, FaPlus } from "react-icons/fa";
const CardDetails = ({ student, allstudent, setStudent }) => {
	const [visible, setVisible] = useState(false);

	const { city, company, email, pic, skill, grades } = student;
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

			let newArray = [...allstudent];
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i].id === student.id) {
					if (newArray[i].tag) {
						newArray[i].tag = [...newArray[i].tag, event.target.value];
						break;
					} else {
						newArray[i].tag = [event.target.value];
						break;
					}
					// let updatedStudent = {...newArray[i]};
				}
			}
			localStorage.setItem("newArray", JSON.stringify(newArray));
			const localData = localStorage.getItem("newArray");
			const localStudentData = JSON.parse(localData);

			setStudent(localStudentData);

			// console.log(newArray);
			event.target.value = "";
		}
	};


	// console.log(localStudentData);

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
							{visible
								? grades.map((grade, idx) => (
										<p>
											Test {idx + 1}: {grade}%
										</p>
								  ))
								: ""}
							{student.tag ? student.tag.map(itm => <button className="tagbtn">{itm}</button>):""}

					

							<div className="new-tag">
								<input placeholder="enter a tag" onKeyPress={handleChange} />
							</div>
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
