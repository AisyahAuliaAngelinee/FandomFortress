import { createBrowserRouter } from "react-router-dom";
import Parent from "../pages/Parent";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Detail from "../pages/Detail";

const router = createBrowserRouter([
	{
		element: <Parent />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/rooms",
				element: <Rooms />,
			},
			{
				path: "/rooms/:id",
				element: <Detail />,
			},
		],
	},
]);

export default router;
