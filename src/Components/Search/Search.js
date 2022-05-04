import React, { useEffect } from "react";
import "./Search.css";
const Search = ({props}, setStudent) => {
     console.log(typeof(props))
     const data = props;
	
     const searchByName = (e) =>{
          let searchValue = e.target.value;
          const filterd = data.filter(item => item.city === searchValue);
           
        

     }

	return (
		<div>
			<input
				onChange={searchByName}
				className="search"
				type="serach"
				placeholder="Search by name..."
			/>
			<hr />
		</div>
	);
};

export default Search;
