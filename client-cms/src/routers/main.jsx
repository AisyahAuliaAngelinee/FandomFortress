import { createBrowserRouter, redirect } from "react-router-dom";
import Parent from "../pages/Parent";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lodging from "../pages/Lodging";
import CreateLodging from "../pages/CreateLodging";
import EditLodging from "../pages/EditLodging";
import Type from "../pages/Type";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		loader: () => {
			if (localStorage.access_token) {
				return redirect("/lodging");
			}

			return null;
		},
	},
	{
		path: "/register",
		element: <Register />,
		loader: () => {
			if (!localStorage.access_token) {
				return redirect("/");
			}

			return null;
		},
	},
	{
		element: <Parent />,
		children: [
			{
				path: "/lodging",
				element: <Lodging />,
				loader: () => {
					if (!localStorage.access_token) {
						return redirect("/");
					}

					return null;
				},
			},
			{
				path: "/create",
				element: <CreateLodging />,
				loader: () => {
					if (!localStorage.access_token) {
						return redirect("/");
					}

					return null;
				},
			},
			{
				path: "/edit/:id",
				element: <EditLodging />,
				loader: () => {
					if (!localStorage.access_token) {
						return redirect("/");
					}

					return null;
				},
			},
			{
				path: "/type",
				element: <Type />,
				loader: () => {
					if (!localStorage.access_token) {
						return redirect("/");
					}

					return null;
				},
			},
		],
	},
]);

export default router;
