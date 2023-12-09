import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import image from "../assets/image2.jpg";

const CreateForm = ({ handleSubmit, lodging }) => {
	const [name, setName] = useState("");
	const [facility, setFacility] = useState("");
	const [roomCapacity, setRoomCapacity] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [location, setLocation] = useState("");
	const [price, setPrice] = useState("");
	const [typeId, setTypeId] = useState("");
	const [type, setType] = useState([]);

	useEffect(() => {
		setName(lodging?.name);
		setFacility(lodging?.facility);
		setRoomCapacity(lodging?.roomCapacity);
		setImgUrl(lodging?.imgUrl);
		setLocation(lodging?.location);
		setPrice(lodging?.price);
		setTypeId(lodging?.typeId);
	}, [lodging]);

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

	async function fetchType() {
		const access_token = localStorage.getItem("access_token");
		try {
			const { data } = await axios.get(`https://vclrshna.online/type/type`, { headers: { Authorization: `Bearer ${access_token}` } });
			setType(data);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		}
	}

	useEffect(() => {
		fetchType();
	}, []);

	return (
		<>
			<section className="book">
				<h1 className="heading">
					<span>F</span>
					<span>O</span>
					<span>R</span>
					<span>T</span>
					<span>R</span>
					<span>E</span>
					<span>S</span>
					<span>S</span>
					<span className="space"></span>
					<span>F</span>
					<span>O</span>
					<span>R</span>
					<span>M</span>
				</h1>
				<div className="row">
					<div className="image">
						<img src={image} alt="" />
					</div>
					<form onSubmit={(e) => handleSubmit(e, name, facility, roomCapacity, imgUrl, location, price, typeId)}>
						<div className="inputbox">
							<h3>Room Name</h3>
							<input
								type="text"
								name="name"
								placeholder="enter room name"
								onChange={(e) => {
									setName(e.target.value);
								}}
								value={name}
							/>
						</div>
						<div className="inputbox">
							<h3>Facility</h3>
							<input
								type="text"
								name="facility"
								placeholder="enter room facility"
								onChange={(e) => {
									setFacility(e.target.value);
								}}
								value={facility}
							/>
						</div>
						<div className="inputbox">
							<h3>Room Capacity</h3>
							<input
								type="number"
								name="roomCapacity"
								placeholder="room capacity"
								onChange={(e) => {
									setRoomCapacity(e.target.value);
								}}
								value={roomCapacity}
								min={0}
							/>
						</div>
						<div className="inputbox">
							<h3>Image Url</h3>
							<input
								type="text"
								name="imgUrl"
								placeholder="enter image url"
								onChange={(e) => {
									setImgUrl(e.target.value);
								}}
								value={imgUrl}
							/>
						</div>
						<input type="file" name="imgFile" id="" />
						<div className="inputbox">
							<h3>Location</h3>
							<input
								type="text"
								name="location"
								placeholder="enter location"
								onChange={(e) => {
									setLocation(e.target.value);
								}}
								value={location}
							/>
						</div>
						<div className="inputbox">
							<h3>Price</h3>
							<input
								type="text"
								name="price"
								placeholder="enter price"
								onChange={(e) => {
									setPrice(e.target.value);
								}}
								value={price}
								min={0}
							/>
						</div>
						<div className="inputbox">
							<h3>Room Type</h3>
							<select onChange={(e) => setTypeId(e.target.value)} className="py-[1rem]">
								<option selected="true" disabled="disabled">
									Choose Room Type
								</option>
								{type.map((el) => {
									return (
										<option key={el.id} value={el.id}>
											{el.name}
										</option>
									);
								})}
							</select>
						</div>
						<button type="submit" className="bg-[#085f63] hover:bg-[#49beb7] text-white hover:text-white font-bold py-2 px-4 rounded-full">
							Create
						</button>
						<Link to={"/"}>
							<button className="bg-[#085f63] hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded-full">Cancel</button>
						</Link>
					</form>
				</div>
			</section>
		</>
	);
};

export default CreateForm;
