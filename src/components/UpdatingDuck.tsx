import * as actionTypes from '../redux/ActionTypes';

export default function UpdatingDuck(editName: string, setEditName: any, editColor: string, setEditColor: any, dispatch: any, editId: string, setEdit: any) {
    return <div className="new-duck">
        <input type="text" placeholder={editName} onChange={(event) => { setEditName(event.target.value); } } />
        <input type="text" placeholder={editColor} onChange={(event) => { setEditColor(event.target.value.toLowerCase()); } } />
        <button
            onClick={() => {
                dispatch({
                    type: actionTypes.DUCK_UPDATED_EPIC,
                    payload: {
                        _id: editId,
                        name: editName,
                        color: editColor,
                    }
                });
                setEdit(false);
            } }
        >Edit duck
        </button>
    </div>;
}