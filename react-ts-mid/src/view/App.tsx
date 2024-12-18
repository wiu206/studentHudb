import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import '../style/Add.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {

  const [students, setStudents] = useState<Array<Student>>([])

  const cache = useRef<boolean>(false)

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      });
    }
  }, [])

  const studentList = students ? students.map((student: Student) => {
    return (
      <div className='student' key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>email: {student.email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
      </div>
    )
  }) : "loading"

  return (
    <>
      <div className="button-container">
        <a href='#/add' className='button'>新增</a>
        <a href='#/delete' className='button'>刪除</a>
        <a href='#/find' className='button'>找尋</a>
        <a href='#/update' className='button'>更新</a>
      </div>
      <div className="container">
        {studentList}
      </div>
    </>
  )
  
}

export default App
