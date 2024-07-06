import "./list.scss";
import React, { useState, useEffect } from "react";
import Card from "../Card/card.jsx";
import axios from "axios";
function List(props) {
    const { listPost, type, handleShowPost, handleHiddenPost } = props;
    return (
        <div className="list">
            {listPost.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    type={type}
                    handleShowPost={handleShowPost}
                    handleHiddenPost={handleHiddenPost}
                ></Card>
            ))}
        </div>
    );
}

export default List;
