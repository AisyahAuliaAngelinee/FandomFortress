import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Detail = () => {
	const [roomDetail, setRoomDetail] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { id } = useParams();
	async function fetchRoom() {
		try {
			setLoading(true);
			const { data } = await axios.get(`https://vclrshna.online/public/${id}`);
			setRoomDetail(data.findFortress);
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	const backOnClick = () => {
		navigate(-1);
	};

	useEffect(() => {
		fetchRoom();
	}, [id]);

	let rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(roomDetail.price);
	return (
		<>
			<section>
				<div className="container flex">
					<div className="left">
						<div className="main-image">
							<img src={roomDetail.imgUrl} alt="" className="slide" />
						</div>
					</div>
					<div className="right">
						<h3>{roomDetail.name}</h3>
						<h4>{rupiah}</h4>
						<h5>FACILITY</h5>
						<p>{roomDetail.facility}</p>
						<Link>
							<button type="button" className="hover:duration-200 bg-[#49beb7] text-white hover:text-white border hover:bg-red-600 font-medium hover:rounded-2xl text-sm px-5 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-white dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-green-800" onClick={backOnClick}>
								Back
							</button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Detail;
