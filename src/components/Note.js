import { useState } from 'react'
import { MdDeleteForever, MdSave } from 'react-icons/md'

const Note = ({
	id,
	text,
	dateCreated,
	lastModified,
	handleDeleteNote,
	handleUpdateNote
}) => {
	const [noteText, setNoteText] = useState(text)
	const characterLimit = 200

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value)
		}
	}

	return (
		<div className='note'>
			<textarea
				rows='8'
				cols='10'
				value={noteText}
				onChange={handleChange}
			/>
			<div>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<div className='note-footer'>
					{
						dateCreated === lastModified ? 
							( <small>Created on: {dateCreated}</small> ) :
							( <small>Last modify: {lastModified}</small> )
					}
					<div className='note-icons'>
						<MdSave
							onClick={() => handleUpdateNote(id, noteText)}
							className='save-icon'
							size='1.3em'
						/>
						<MdDeleteForever
							onClick={() => handleDeleteNote(id)}
							className='delete-icon'
							size='1.3em'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Note
