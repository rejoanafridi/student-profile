import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import "./Card.css";

const Card = () => {
	const [student, setStudent] = useState([]);
	const [search, setSearch] = useState("");
	// console.log(student);
	const searchByName = (e) => {
		setSearch(e.target.value);
	};
	const searchName = student.filter((item) => {
		if (item.city.toLowerCase().startsWith(search)) {
			return item;
		}
	});
	
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				"https://api.hatchways.io/assessment/students"
			);

			setStudent(result.data.students);
		};
		fetchData();
	}, []);

	return (
		<div>
			<div className="card-container">
				{/* <Search props={student} setStudent={setStudent}></Search>
				 */}
				<div>
					<input
						onChange={searchByName}
						className="search"
						type="text"
						placeholder="Search by name..."
					/>
					<hr />
				</div>
				{searchName.map((item) => (
					<CardDetails student={item}></CardDetails>
				))}
			</div>
		</div>
	);
};

export default Card;
