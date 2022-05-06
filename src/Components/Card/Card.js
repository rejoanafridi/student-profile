import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import "./Card.css";

const Card = () => {
	const [student, setStudent] = useState([]);

	const [searchType, setSearchType] = useState(true);

	const [search, setSearch] = useState("");
	// search by tag
	const [searchTag, setSearchTag] = useState("");
	// console.log(searchTag);

	useEffect(() => {
		const fetchData = async () => {
			const localData = localStorage.getItem("newArray");
			const localStudentData = JSON.parse(localData);
			if (localStudentData) {
				setStudent(localStudentData);
			} else {
				const result = await axios.get(
					"https://api.hatchways.io/assessment/students"
				);

				setStudent(result.data.students);
			}
		};
		fetchData();
	}, []);
	// search by tag
	const searchByTag = (e) => {
		setSearchType(false);
		setSearchTag(e.target.value);
	};
	// search by city name
	const searchByName = (e) => {
		setSearchType(true);
		setSearch(e.target.value);
	};

	// search by name function

	const searchName = student.filter((item) => {
		if (item.city.toLowerCase().includes(search.toLowerCase())) {
			return item;
		}
	});
	// search by tag function
	const searchTags = student.filter((item) => {
		if (searchTag === "") {
			return item;
		}
		if (item.tag) {
			for (let singleTag of item.tag) {
				if (singleTag.toLowerCase().includes(searchTag.toLowerCase())) {
					return item;
				}
			}
		}
	});

	return (
		<div className="card-container">
			<div className="search-sticky">
				<input
					onChange={searchByName}
					className="search"
					type="text"
					placeholder="Search by name..."
				/>
				<hr />

				<input
					onChange={searchByTag}
					className="search"
					type="text"
					placeholder="Search by tag..."
				/>
				<hr />
			</div>
			{searchType
				? searchName.map((item) => (
						<CardDetails
							key={item.id}
							student={item}
							allstudent={student}
							setStudent={setStudent}
						></CardDetails>
				  ))
				: searchTags.map((item) => (
						<CardDetails
							key={item.id}
							student={item}
							allstudent={student}
							setStudent={setStudent}
						></CardDetails>
				  ))}
		</div>
	);
};

export default Card;
