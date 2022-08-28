import { duck } from "../Interfaces/duckInterface";

export default function DucksTable(ducks: duck[], onEdit: (currentDuck: duck) => void, onDelete: (id: string) => void) {
    return <ul>
        {ducks.map((item: duck) => (<div className="duck-cel" key={item._id}>
            <li>{item.name}</li>
            <li>{item.color}</li>
            <button className="bt" onClick={() => onEdit(item)}>EDIT</button>
            <button className="bt" onClick={() => onDelete(item._id)}>DEL</button>
        </div>
        )
        )}
    </ul>;
}