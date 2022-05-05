import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
const Search = () => {
	const [student, setStudent] = useState([]);
	// console.log(student)
	const [serachTag, setSearchTag] = useState("");
	// search by tag
	const searchByTag = (e) => {
		setSearchTag(e.target.value);
	};
	const searchByTags = student.filter((item) => {
		if (item.tag.toLowerCase().startsWith(serachTag.toLowerCase())) {
			return item;
		}
	});

	console.log(searchByTags);
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
			<input
				onChange={searchByTag}
				className="search"
				type="serach"
				placeholder="Search by Tag..."
			/>
			<hr />
		</div>
	);
};

export default Search;
