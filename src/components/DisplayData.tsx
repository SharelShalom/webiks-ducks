import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { duck } from "../Interfaces/duckInterface";
import * as actionTypes from '../redux/ActionTypes';
import CreationDuck from "./CreationDuck";
import DucksTable from "./DucksTable";
import UpdatingDuck from "./UpdatingDuck";

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
        {CreationDuck(setName, setColor, dispatch, name, color)}
        {edit && UpdatingDuck(editName, setEditName, editColor, setEditColor, dispatch, editId, setEdit)}
        {ducks &&
        DucksTable(ducks, onEdit, onDelete)
        }
    </div>)
    ; 
}

export default DisplayData;
