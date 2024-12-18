import { useState } from "react";
import { api } from "../enum/api";
import { asyncPost } from "../utils/fetch";


export default function Add() {
    const [userName, setUserName] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [className, setClassName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    async function handleSubmit() {
        try {
            const response = await asyncPost(api.insertOne, {
                "userName": userName,
                "name": name,
                "department": department,
                "grade": grade,
                "class": className,
                "email": email
            });

            if (response.code === 200) {
                alert("OK");
                setUserName('');
                setName('');
                setDepartment('');
                setGrade('');
                setClassName('');
                setEmail('');
            } else if (response?.code === 404) {
                alert("user not found");
            } else {
                alert(`server error: ${response?.message}`);
            }
        } catch (error) {
            alert("error: error");
        }
    }

    return (
        <div className="container1">
          <input type="text" placeholder="帳號" value={userName} onChange={(e) => setUserName(e.target.value)} required />
          <input type="text" placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="院系" value={department} onChange={(e) => setDepartment(e.target.value)} required />
          <input type="text" placeholder="年級" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          <input type="text" placeholder="班級" value={className} onChange={(e) => setClassName(e.target.value)} required />
          <input type="email" placeholder="電子郵件" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={handleSubmit}>新增</button>
          <a className="return" href="#">返回</a>
        </div>
    );
}
