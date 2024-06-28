import "./list.scss";
import Card from "../Card/card.jsx";
import { listData } from "../../lib/dummydata.js";

function List() {
    return (
        <div className="list">
            {listData.map((item) => (
                <Card key={item.id} item={item}></Card>
            ))}
        </div>
    );
}

export default List;
