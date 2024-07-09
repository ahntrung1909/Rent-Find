import "./list.scss";
import React, { useState, useEffect } from "react";
import Card from "../Card/card.jsx";
import { Pagination } from "antd";

const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};

function List(props) {
    const {
        listPost,
        type,
        handlePageChange,
        handleShowPost,
        handleHiddenPost,
    } = props;

    return (
        <div className="list">
            {listPost.posts.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    type={type}
                    handleShowPost={handleShowPost}
                    handleHiddenPost={handleHiddenPost}
                ></Card>
            ))}
            <Pagination
                total={50}
                style={{ textAlign: "center", marginTop: 24 }}
                showSizeChanger
                onShowSizeChange={handlePageChange}
                onChange={handlePageChange}
                pageSize={5}
                current={listPost.currentPage}
            />
        </div>
    );
}

export default List;
