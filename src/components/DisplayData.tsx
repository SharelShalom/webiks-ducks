import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { duck } from "../Interfaces/duckInterface";
import * as actionTypes from '../redux/ActionTypes';

function DisplayData() {

    const ducks = useSelector((state: {ducks: duck[]}) => state.ducks)

    const dispatch = useDispatch();

    //Create duck
    const [name, setName] = useState("")
    const [color, setColor] = useState("")

    //Edit duck
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");

    useEffect(() => {
        dispatch({
            type: actionTypes.DUCKS_FETCHED_EPIC,
        })
    }, [])

    const onDelete = (id: string) => {
        dispatch({
            type: actionTypes.DUCK_DELETED_EPIC,
            payload: {
                id
            }
        })
    }

    const onEdit = (currentDuck: duck) => {
        setEdit(true)
        setEditId(currentDuck._id)
        setEditName(currentDuck.name)
        setEditColor(currentDuck.color)
    }


    return (
    <div>
        <h1>Ducks play</h1>
        <div className="new-duck">
            <input type="text" placeholder="name..." onChange={(event) => {setName(event.target.value)}}/>
            <input type="text" placeholder="color..." onChange={(event) => {setColor(event.target.value.toLowerCase())}}/>
            <button 
                onClick={async () => {
                    dispatch({
                        type: actionTypes.DUCK_ADDED_EPIC,
                        payload: {
                            name,
                            color,
                        }
                    })
                    }}
                >Create duck
            </button>
        </div>
        {edit && <div className="new-duck">
            <input type="text" placeholder={editName} onChange={(event) => {setEditName(event.target.value)}}/>
            <input type="text" placeholder={editColor} onChange={(event) => {setEditColor(event.target.value.toLowerCase())}}/>
            <button 
                onClick={async () => {
                    dispatch({
                        type: actionTypes.DUCK_UPDATED_EPIC,
                        payload: {
                            _id: editId,
                            name: editName,
                            color: editColor,
                        }
                    })
                    setEdit(false)
                    }}
                >Edit duck
            </button>
        </div>}
        {ducks &&
        <ul>
            {ducks.map((item: duck) => 
                (<div className="duck-cel" key={item._id}>
                    <li>{item.name}</li>
                    <li>{item.color}</li>
                    <button className="bt" onClick={() => onEdit(item)}>EDIT</button>
                    <button className="bt" onClick={() => onDelete(item._id)}>DEL</button>
                </div>
                )
                )
            }
        </ul>
        }
    </div>)
    ; 
}

export default DisplayData;