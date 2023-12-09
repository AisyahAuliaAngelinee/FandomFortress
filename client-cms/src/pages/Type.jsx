import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Type = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [fetchType, setFetchType] = useState([]);

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	async function showType() {
		try {
			setLoading(true);
			const { data } = await axios.get(`https://vclrshna.online/type/type`, { headers: { Authorization: `Bearer ${localStorage.access_token}` } });
			setFetchType(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		showType();
	}, []);

	if (loading) {
		return <h1 className="title">Loading</h1>;
	}

	if (error) {
		Toast.fire({
			icon: "error",
			title: error.response.data.message,
		});
	}

	return (
		<>
			<h1 class="title">Type</h1>
			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" class="px-6 py-3">
								ID
							</th>
							<th scope="col" class="px-6 py-3">
								Type Name
							</th>
							<th scope="col" class="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{fetchType.map((el) => {
							return (
								<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td class="px-6 py-4">{el.id}</td>
									<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{el.name}
									</th>
									<td class="px-6 py-4">
										<a class="bg-[#085f63] hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded-full">Add</a>
										<a class="bg-[#085f63] hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded-full">Delete</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Type;
