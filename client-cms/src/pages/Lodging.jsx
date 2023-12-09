import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Lodging = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [fetchLodging, setFetchLodging] = useState([]);

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

	async function showLodging() {
		const access_token = localStorage.getItem("access_token");
		try {
			setLoading(true);
			const response = await axios.get(`https://vclrshna.online/fortress/fortress`, { headers: { Authorization: `Bearer ${access_token}` } });
			setFetchLodging(response.data.fetchData);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	const access_token = localStorage.getItem("access_token");

	async function deleteHandler(id) {
		try {
			await axios.delete(`https://vclrshna.online/fortress/fortress/${id}`, { headers: { Authorization: `Bearer ${access_token}` } });
			Toast.fire({
				icon: "success",
				title: `Success Delete ${id}`,
			});
			showLodging();
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		}
	}

	useEffect(() => {
		showLodging();
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
			<h1 className="title">Lodgings</h1>
			<div className="relative overflow-x-auto py-[2.5rem]">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Room name
							</th>
							<th scope="col" className="px-6 py-3">
								Facility
							</th>
							<th scope="col" className="px-6 py-3">
								RoomCap
							</th>
							<th scope="col" className="px-6 py-3">
								imgUrl
							</th>
							<th scope="col" className="px-6 py-3">
								Location
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								typeId
							</th>
							<th scope="col" className="px-6 py-3">
								authorId
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{fetchLodging.map((el) => {
							let rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(el.price);
							return (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={el.id}>
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{el.name}
									</th>
									<td className="px-6 py-4">{el.facility}</td>
									<td className="px-6 py-4">{el.roomCapacity}</td>
									<td className="px-6 py-4">{el.imgUrl}</td>
									<td className="px-6 py-4">{el.location}</td>
									<td className="px-6 py-4">{rupiah}</td>
									<td className="px-6 py-4">{el.typeId}</td>
									<td className="px-6 py-4">{el.authorId}</td>
									<td className="px-6 py-4">
										<Link className="bg-[#085f63] hover:bg-[#49beb7] text-white hover:text-white font-bold py-2 px-4 rounded-full" to={`/edit/${el.id}`}>
											Edit
										</Link>
										<Link onClick={() => deleteHandler(el.id)} className="bg-[#085f63] hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded-full">
											Delete
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<Outlet />
		</>
	);
};

export default Lodging;
