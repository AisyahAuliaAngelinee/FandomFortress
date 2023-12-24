import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Carousel } from "flowbite-react";

const Cards = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [room, setRoom] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const detailOnClick = (id) => {
		navigate(`/rooms/${id}`);
	};

	const nextPage = () => {
		if (currentPage < totalPage) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const pageHandler = (el) => {
		setCurrentPage(el);
	};

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 10000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	let pagesArray = [];
	for (let i = 1; i <= totalPage; i++) {
		pagesArray.push(i);
	}

	async function fetchRoom() {
		try {
			setLoading(true);
			const { data } = await axios.get(`https://localhost:3000/public?page=${currentPage}&limit=12&keyword=${search}&sortBy=id`);
			setRoom(data.result.data);
			setTotalPage(data.result.totalPage);
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	function searchOnChange(e) {
		let newSearch = e.target.value;
		setSearch(newSearch);
	}

	const onSearch = () => {
		fetchRoom();
	};

	useEffect(() => {
		fetchRoom();
	}, [currentPage]);

	if (loading) {
		return <h1 className="title">Loading</h1>;
	}

	if (error) {
		Toast.fire({
			icon: "error",
			title: error.message,
		});
	}

	return (
		<>
			<div className="heading">
				<p>
					<Link to={"/"}>Home</Link>
					<span> / Rooms</span>
				</p>
			</div>
			<div className="pt-[1.8rem] pl-[7rem] pr-[7rem] h-[33rem]">
				<Carousel className="caraousel-container">
					<div className="caraousel-img1">
						<h1 className="car-name">Suite</h1>
					</div>
					<div className="caraousel-img2">
						<h1 className="car-name">Studio</h1>
					</div>
					<div className="caraousel-img3">
						<h1 className="car-name">Regular</h1>
					</div>
				</Carousel>
			</div>
			<form className="pt-[1.8rem] pl-[7rem] pr-[7rem]">
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg className="w-4 h-4 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
						</svg>
					</div>
					<input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm font-bold text-white border border-[#085f63] rounded-lg bg-[#49beb7]" onChange={searchOnChange} />
					<button type="submit" className="text-white hover:text-black absolute end-2.5 bottom-2.5 bg-[#085f63] hover:bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#085f63] dark:hover:bg-white" onClick={onSearch}>
						Search
					</button>
				</div>
			</form>
			<section className="room-container">
				<h1 className="title">Our Lodgings</h1>
				<div className="box-container">
					{room.map((el) => {
						let rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(el.price);
						return (
							<div className="box" key={el.id}>
								<button type="button" className="text-white hover:duration-200 bg-[#49beb7] hover:text-white border  hover:bg-[#085f63] font-medium hover:rounded-2xl text-sm px-5 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={() => detailOnClick(el.id)}>
									Detail
								</button>
								<img src={el.imgUrl} alt="" />
								<div className="name">{el.name}</div>
								<div className="facility">FACILITY</div>
								<p>{el.facility}</p>
								<div className="flex">
									<div className="price">{rupiah}</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
			<nav className="flex !justify-center pb-[0.75rem]">
				<Link href="#" className="flex text-white hover:duration-200 bg-[#49beb7] hover:text-white border  hover:bg-[#085f63] font-medium hover:rounded-2xl text-sm px-5 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
					<button onClick={prevPage}>Previous</button>
				</Link>
				<Link href="#" className="flex text-white bg-[#49beb7] border font-medium text-sm px-5 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-white">
					{pagesArray.map((el) => (
						<button type="button" className="mx-1 bg-[#085f63] rounded-3xl px-2" onClick={() => pageHandler(el)}>
							{el}
						</button>
					))}
				</Link>
				<Link href="#" className="flex text-white hover:duration-200 bg-[#49beb7] hover:text-white border  hover:bg-[#085f63] font-medium hover:rounded-2xl text-sm px-5 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
					<button onClick={nextPage}>Next</button>
				</Link>
			</nav>
		</>
	);
};

export default Cards;
