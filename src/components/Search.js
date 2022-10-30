import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ handleSearchNote,fetchAll }) => {
	const [searchKey, setSearchKey] = useState('')

	const clearSearch = () => {
		var input = document.getElementById("searchkey");
		input.value = ''
		setSearchKey('');
		fetchAll();
	}
	return (
		<div className='search'>
			<div className='search-box'>
				<MdSearch className='search-icons' size='1.3em' />
				<input id='searchkey'
					onChange={e => setSearchKey(e.target.value)}
					type='text'
					placeholder='Search...'
				/>
			</div>
			<button
				className='search-btn'
				onClick={() => handleSearchNote(searchKey)}>
				Search
			</button>
			<button
				className='search-btn'
				onClick={() => clearSearch()}>
				Clear
			</button>
		</div>
	)
}

export default Search
