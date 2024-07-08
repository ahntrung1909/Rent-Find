import "./list.scss";
import React, { useState, useEffect } from "react";
import Card from "../Card/card.jsx";
import axios from "axios";
import { Pagination } from "antd";
const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};

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
            <Pagination
                style={{ textAlign: "center", marginTop: 24 }}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                total={500}
            />
        </div>
    );
}

export default List;
