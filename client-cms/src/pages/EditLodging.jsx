import Form from "../components/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditLodging = () => {
	const [lodging, setLodging] = useState([]);
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 5000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	const access_token = localStorage.getItem("access_token");
	const navigate = useNavigate();
	const { id } = useParams();

	async function fetchLodging() {
		try {
			const { data } = await axios.get(`https://vclrshna.online/fortress/fortress/${id}`, { headers: { Authorization: `Bearer ${access_token}` } });
			console.log(data.findFortress);
			setLodging(data.findFortress);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		}
	}

	useEffect(() => {
		fetchLodging();
	}, []);

	async function handleSubmit(e, name, facility, roomCapacity, imgUrl, location, price, typeId) {
		e.preventDefault();
		try {
			const dataAdded = { name, facility, roomCapacity: +roomCapacity, imgUrl, location, price: +price, typeId: +typeId };
			await axios.put(`https://vclrshna.online/fortress/fortress/${id}`, dataAdded, { headers: { Authorization: `Bearer ${access_token}` } });
			Toast.fire({
				icon: "success",
				title: "Success Update Fortress",
			});
			navigate("/lodging");
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		}
	}

	return (
		<>
			<Form handleSubmit={handleSubmit} lodging={lodging} />
		</>
	);
};

export default EditLodging;
