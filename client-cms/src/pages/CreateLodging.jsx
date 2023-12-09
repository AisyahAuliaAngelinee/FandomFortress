import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateLodging = () => {
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

	const navigate = useNavigate();

	async function handleSubmit(e, name, facility, roomCapacity, imgUrl, location, price, typeId) {
		e.preventDefault();
		const access_token = localStorage.getItem("access_token");
		try {
			const dataAdded = { name, facility, roomCapacity: +roomCapacity, imgUrl, location, price: +price, typeId: +typeId };
			await axios.post(`https://vclrshna.online/fortress/add-fortress`, dataAdded, { headers: { Authorization: `Bearer ${access_token}` } });
			Toast.fire({
				icon: "success",
				title: "Success Add New Fortress",
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
			<Form handleSubmit={handleSubmit} />
		</>
	);
};

export default CreateLodging;
