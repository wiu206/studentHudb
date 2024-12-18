import { useState } from "react";
import { api } from "../enum/api";
import { asyncPut } from "../utils/fetch";

export default function Update() {
    const [inputID, setInputID] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");

    async function handleUpdate() {
        try {
            const response = await asyncPut(api.updateByID, {
                "id": inputID,
                "name": inputName
            });
            if(response.code == 200){
                alert("OK")
                setInputID("")
                setInputName("")
            }else if(response?.code == 404){
                alert("user not found")
            }else{
                alert(`server error: ${response?.message}`)
            }
        }catch(error){
            alert("server error")
        }
    }

    return(
        <div className="container1">
            <input type="text" placeholder="请输入ID" value={inputID} onChange={(e) => setInputID(e.target.value)} required/>
            <input type="text" placeholder="请输入修改后姓名" value={inputName} onChange={(e) => setInputName(e.target.value)} required/>
            <button onClick={handleUpdate}>更新</button>
            <a className="return" href="#">返回</a>
        </div>
    )
}
