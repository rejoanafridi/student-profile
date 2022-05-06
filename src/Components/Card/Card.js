import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import "./Card.css";
import Search from "../Search/Search";

const Card = () => {
	const [student, setStudent] = useState([]);
	console.log(student);
	// local storage da
	const localData = localStorage.getItem("newArray");
	const localStudentData = JSON.parse(localData);

	const [searchType, setSearchType] = useState(true);

	const [search, setSearch] = useState("");
	// search by tag
	const [searchTag, setSearchTag] = useState("");
	// console.log(searchTag);
	// search by tag
	const searchByTag = (e) => {
		setSearchType(false);
		setSearchTag(e.target.value);
	};

	// console.log(student);
	const searchByName = (e) => {
		setSearchType(true);
		setSearch(e.target.value);
	};

	const searchName = localStudentData.filter((item) => {
		if (item.city.toLowerCase().includes(search.toLowerCase())) {
			return item;
		}
	});

	const searchTags = localStudentData.filter((item) => {
		if(searchTag === ''){
			return item
		}
		if(item.tag){
			for (let singleTag of item.tag) {
				if (singleTag.toLowerCase().includes(searchTag.toLowerCase())) {
					return item;
				}
			}
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
				{}
			</div>
		</div>
	);
};

export default Card;
