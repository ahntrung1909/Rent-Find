import React, { useState, useEffect } from "react";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
    ProTable,
} from "@ant-design/pro-components";
import axios from "axios";
import "./adminList.scss";
import { Table, Button, message } from "antd";

export default function AdminList({ dataSource, columns }) {
    return <Table dataSource={dataSource} columns={columns} />;
}
