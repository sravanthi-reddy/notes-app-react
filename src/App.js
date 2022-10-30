import { MdDeleteForever } from 'react-icons/md'
import { useState, useEffect } from 'react'
import NotesList from './components/NotesList'
import Search from './components/Search'
import Header from './components/Header'

const App = () => {
	const [notes, setNotes] = useState([])
	const [darkMode, setDarkMode] = useState(false)
	const api = process.env.REACT_APP_API || 'http://localhost:3001'

	useEffect(() => {
		fetchAll()
	}, [])

	useEffect(() => {
		console.log('should force update')
	}, [notes])

	const fetchAll = () => {
		fetch(`${api}/notes`)
			.then(res => res.json())
			.then(res => setNotes(res.notes))
		}

	const addNote = (text) => {
		const newNote = { text }
		console.log("new note", newNote)
		fetch(`${api}/note`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    })
    	.then(res => res.json())
    	.then(res =>  {
			console.log("results creae", res.newNote)
			setNotes([...notes, res.newNote])
		}
		)
	}

	const updateNote = (id, text) => {
		fetch(`${api}/note`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, text })
		})
			.then(res => res.json())
			.then(res => 
				{
				console.log("results update", res)
				setNotes(notes.map(note => 
				note.id === res.updatedNote.id ? res.updatedNote : note
				
			)
			)}
			)
	}

	const deleteNote = (id) => {
		fetch(`${api}/note`, {
			method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
		})
			.then(res => {
				console.log("results delete one", res)

				setNotes(notes.filter(note => note.id !== id))
			}
			)
	}

	const searchNotes = (searchKey) => {
		fetch(`${api}/notes/search/${searchKey}`, {
			method: 'GET',
      headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(res =>

				{ 
					console.log("results search", res)
					setNotes(res.notes)
				})
	}

	const deleteAllNotes = () => {
		fetch(`${api}/notes`, {
			method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
		})
			.then(res => 
				{
					console.log("results delete all", res)

				
				setNotes([])
			})
	}

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={searchNotes} fetchAll ={fetchAll} />
				<button onClick={deleteAllNotes} className='bulk-delete'>
					<MdDeleteForever
						className='delete-icon'
						style={{ marginBottom: '-3px', marginRight: '5px' }}
					/>
					Delete All Notes
				</button>
				<NotesList
					notes={notes}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleUpdateNote={updateNote}
				/>
			</div>
		</div>
	)
}

export default App
