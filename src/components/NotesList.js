import Note from './Note'
import AddNote from './AddNote'

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleUpdateNote,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.text}
					dateCreated={note.dateCreated}
					lastModified={note.lastModified}
					handleDeleteNote={handleDeleteNote}
					handleUpdateNote={handleUpdateNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote}/>
		</div>
	)
}

export default NotesList
