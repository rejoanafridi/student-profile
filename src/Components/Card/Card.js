import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import "./Card.css";
import Search from "../Search/Search";

const Card = () => {
	const [student, setStudent] = useState([]);
	const [search, setSearch] = useState("");
	// search by tag
	const [searchTag, setSearchTag] = useState("");
	console.log(searchTag);
	// search by tag
	const searchByTag = (e) => {
		setSearchTag(e.target.value);
	};

	// console.log(student);
	const searchByName = (e) => {
		setSearch(e.target.value);
	};
	const searchName = student.filter((item) => {
		// const obj = Object.assign({}, item.tag);
		// console.log(obj);
	
		if (item.city.toLowerCase().startsWith(search.toLowerCase())) {
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
				<div>
					<input
						onChange={searchByName}
						className="search"
						type="text"
						placeholder="Search by name..."
					/>
					<hr />
					{/* <Search></Search> */}
					<input
						onChange={searchByTag}
						className="search"
						type="text"
						placeholder="Search by tag..."
					/>
					<hr />
				</div>
				{searchName.map((item) => (
					<CardDetails
						key={item.id}
						student={item}
						allstudent={student}
						setStudent={setStudent}
					></CardDetails>
				))}
			</div>
		</div>
	);
};

export default Card;
