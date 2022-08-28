import * as actionTypes from '../redux/ActionTypes';

export default function CreationDuck(setName: any, setColor: any, dispatch: any, name: string, color: string) {
    return <div className="new-duck">
        <input type="text" placeholder="name..." onChange={(event) => { setName(event.target.value); } } />
        <input type="text" placeholder="color..." onChange={(event) => { setColor(event.target.value.toLowerCase()); } } />
        <button
            onClick={() => {
                dispatch({
                    type: actionTypes.DUCK_ADDED_EPIC,
                    payload: {
                        name,
                        color,
                    }
                });
            } }
        >Create duck
        </button>
    </div>;
}