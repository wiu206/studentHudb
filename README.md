# 專案名稱:StudentHub

### 專案簡介
MongoDB Compass, Docker, TypeScript, React, and Student Management Example 是一個用於展示如何使用 MongoDB Compass、Docker、TypeScript 和 React 管理數據庫和構建前端應用的範例專案。此專案包含一個名為 students 的集合，其中保存了學生的基本信息，如學號、姓名、系所、年級、班級和電子郵件。專案還展示了如何實現與數據庫交互的 TypeScript 服務層和控制器，以及前端應用和樣式的定義。

### 安裝與執行
#### 環境需求
操作系統：Windows, macOS, Linux

軟體要求：MongoDB, MongoDB Compass, Docker, Node.js, npm

安裝步驟
安裝 MongoDB：
# Windows
choco install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community@5.0

# Linux
sudo apt-get install -y mongodb

#### 安裝 MongoDB Compass：

前往 MongoDB Compass 下載頁面，選擇適合你操作系統的版本並安裝。

#### 安裝 Docker：

前往 Docker Desktop 下載頁面，選擇適合你操作系統的版本並安裝。

#### 安裝 Node.js和 npm：
Windows/macOS/Linux

nvm install --lts
#### 啟動 MongoDB 服務：
Windows

net start MongoDB

macOS/Linux

brew services start mongodb/brew/mongodb-community@5.0
#### 啟動 Docker Desktop 並運行 MongoDB 容器：
docker run -d --name mongodb -p 27017:27017 mongo
#### 安裝專案依賴：
git clone https://github.com/yourusername/MongoDBDockerExample.git
cd MongoDBDockerExample
npm install
#### 啟動專案：
npm start
API 規格
API 概覽
### 此專案包含以下 API，通過 Postman 進行測試：

#### GET /api/v1/user/findAll：
獲取所有用戶

#### API 測試
以下是使用 Postman 測試 API 的示例：

請求方法：GET

請求 URL：http://localhost:0206/api/v1/user/findAll

回應狀態碼：200 OK

#### 回應數據：
{
    "code": 200,
    "message": "find sucess",
    "body": [
        {
            "_id": "675a5689cc6a676250c5a6d",
            "userName": "tkuee0787",
            "sid": "1",
            "name": "張惠博",
            "department": "電機工程系",
            "grade": "四年級",
            "class": "A",
            "email": "tkuee0787@tkuim.com"
        },
        {
            "_id": "675a5689cc6a676250c5a6e",
            "userName": "tkubm9553",
            "sid": "2",
            "name": "王小明",
            "department": "資訊工程系",
            "grade": "三年級",
            "class": "B",
            "email": "tkubm9553@tkuim.com"
        }
    ]
}
#### TypeScript 服務層
UserService.ts 文件展示了如何使用 TypeScript 服務層進行數據操作：

export class UserService extends Service {
    public async updateNameByID(id: string, name: string) {
        const resp: { code: number, message: string } = { code: 500, message: "user not found" };
        resp.code = 404;
        return resp;
    }

    public async findByID(id: string) {
        const resp: { code: number, message: string, body?: any } = { code: 200, message: "", body: undefined };
        const user = await studentsModel.findById(id);
        if (user) {
            try {
                resp.body = user;
                resp.message = "find success";
            } catch (error) {
                resp.message = "server error";
                resp.code = 500;
            }
        } else {
            resp.message = "user not found";
            resp.code = 404;
        }
        return resp;
    }
}

#### TypeScript 控制器
UserController.ts 文件展示了如何使用 TypeScript 控制器進行 HTTP 請求和回應處理：

export class UserController extends Controller {
    public async findAll(Request: Request, Response: Response) {
        res.message = "find success";
        Response.send(res);
    }

    public async insertOne(Request: Request, Response: Response) {
        const resp = await this.service.insertOne(Request.body);
        Response.status(resp.code).send(resp);
    }

    public async deleteByID(Request: Request, Response: Response) {
        const resp = await this.service.deleteByID(Request.query.id as string);
        Response.status(resp.code).send(resp);
    }

    public async updateNameByID(Request: Request, Response: Response) {
        const resp = await this.service.updateNameByID(Request.body.id, Request.body.name);
        Response.status(resp.code).send(resp);
    }

    public async findByID(Request: Request, Response: Response) {
        const resp = await this.service.findByID(Request.query.id as string);
        Response.status(resp.code).send(resp);
    }
}

#### 前端樣式
App.css 文件展示了如何定義前端樣式：

:root {
  --max-width: 800px;
  --primary-color: #333;
  --secondary-color: #fff;
  --background-color: #f4f4f4;
  --font-family: 'Arial, sans-serif';
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.student {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-family: var(--font-family);
  display: flex;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  justify-content: space-between;
}

#### React 應用
App.tsx 文件展示了如何使用 React 鉤子和組件進行數據顯示：

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
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      })
    }
  }, [])

  const studentList = students ? students.map((student: Student) => {
    return (
      <div className='student' key={student._id}>
        <p>學號: {student.id}</p>
        <p>姓名: {student.name}</p>
        <p>系所: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>email: {student.email}</p>
        <p>缺席次數: {student.absences}</p>
      </div>
    )
  }) : null

  return (
    <div className='App'>
      {studentList}
    </div>
  )
}

export default App

#### 學生管理界面
下圖顯示了學生管理系統的網頁，展示了多個學生的詳細資料，每個學生的資料都包含學號、座號、姓名、系所、年級、班級和電子郵件。

貢獻指南
我們歡迎任何形式的貢獻。請遵循以下步驟：

#### Fork 本倉庫

#### 創建一個新分支 (git checkout -b feature/AmazingFeature)

提交更改 (git commit -m 'Add some AmazingFeature')

推送到分支 (git push origin feature/AmazingFeature)

創建一個新的 Pull Request

#### 聯絡方式
如有任何問題或建議，請通過以下方式聯絡我們：

#### 電子郵件：
support@mongodbdockerexample.com

GitHub Issues：提交問題或功能請求