import { ChangeEvent, FormEvent, useReducer, useState } from "react"

type Note = {
    id : number, 
    note : string 
}

type Action = {
    type : string, 
    payload ?: any
}
type ActionTypes = {
    ADD : 'ADD', 
    UPDATE : 'UPDATE', 
    DELETE : 'DELETE'
}

const actionTypes:ActionTypes = {
    ADD : 'ADD', 
    DELETE : 'DELETE', 
    UPDATE : 'UPDATE'
}
const intitialNotes : Note[] = [
    {id : 1, note : "Note 1"}, 
    {id : 2, note :"Note 2"}
]

const reducer = (state:Note[],action:Action) =>{
    switch(action.type){
        case actionTypes.ADD: 
            return [...state,action.payload]
        case actionTypes.DELETE:
            return state.filter(note=>note.id !== action.payload)
        case actionTypes.UPDATE:
            const updatedNote = action.payload
            return state.map((n:Note)=>n.id === updatedNote.id ? updatedNote : n)
        default: 
            return state
    }
}

const Notes = ()=>{
    const [notes,dispatch] = useReducer(reducer,intitialNotes) 
    const [note,setNote] = useState<string>("")
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const newNote = {
            id : Date.now(), 
            note
        }
        dispatch({type:actionTypes.ADD,payload:newNote})
    }

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {
                    notes.map((n:Note)=>(
                        <li key={n.id}>
                            {n.note}
                            <button onClick={()=>dispatch({type:actionTypes.DELETE,payload:n.id})}>X</button>
                            <button onClick={()=>dispatch({type:actionTypes.UPDATE,payload:{...n,note}})}>Update</button>

                        </li>
                    )
                )}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="New Note" value={note} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNote(e.target.value)} />
            </form>
        </div>
    )
}

export default Notes