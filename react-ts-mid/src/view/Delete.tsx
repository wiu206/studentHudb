import { api } from "../enum/api";
import { useState } from "react";
import { asyncDelete } from "../utils/fetch";

export default function Delete() {
    const [inputValue, setInputValue] = useState<string>('');
    async function handleDelete() {
        const uri = `${api.deleteByID}?id=${inputValue}`;
        let response;
        try {
            response = await asyncDelete(uri);
            if (response?.code == 200) {
                alert("刪除成功");
                setInputValue("")
            } else {
                alert("無法找到學生ID");
            }
        } catch (error) {
            alert("server error");
        }
    }

    return (
        <div className="container1">
            <input type="text" placeholder="輸入ID" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleDelete}>刪除</button>
            <a className="return" href="#">返回</a>
        </div>
    );
}
