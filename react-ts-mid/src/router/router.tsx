import { createHashRouter } from "react-router";
import App from '../view/App';
import Add from '../view/Add';
import Delete from "../view/Delete";
import Update from "../view/Update";
import Find from "../view/Find";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/Add",
        element: <Add/>
    },
    {
        path: "/Delete",
        element: <Delete/>
    },
    {
        path: "/Update",
        element: <Update/>
    },
    {
        path: "/Find",
        element: <Find/>
    },

])