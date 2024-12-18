import { useState } from "react";
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import { Student } from "../interface/Student";

export default function Find() {
  const [ID, setID] = useState<string>("");
  const [student, setStudent] = useState<Student>();

  async function handleSubmit() {
    try {
      const response = await asyncGet(`${api.findByID}?id=${ID}`);
      if (response?.code == 200) {
        alert("找到了");
        setID("");
        setStudent(response.body);
      } else {
        alert("找不到");
      }
    } catch (error) {
      alert("server error");
    }
  }

  return (
    <div className="container1">
      <input type="text" placeholder="輸入ID" onChange={(e) => setID(e.target.value)} required />
      <button onClick={handleSubmit}>尋找</button>
      <div className="student">
        <p>帳號: {student?.userName}</p>
        <p>學號: {student?.sid}</p>
        <p>姓名: {student?.name}</p>
        <p>系所: {student?.department}</p>
        <p>年级: {student?.grade}</p>
        <p>班级: {student?.class}</p>
        <p>Email: {student?.email}</p>
      </div>
      <a className="return" href="#">返回</a>
    </div>
  );
}
