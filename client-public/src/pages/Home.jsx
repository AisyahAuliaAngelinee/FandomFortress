import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<section className="home" id="home">
				<div className="swiper home-slider">
					<div className="swiper-wrapper">
						<div className="box swiper-slide">
							<img src="https://cdn.discordapp.com/attachments/712325980349530122/1181771271151816774/image0_0.jpg?ex=65824543&is=656fd043&hm=f7f9d1e8d5aada43d3588c8250a48c1bcb052d5aee5783483439ae53d8e09b0a&" alt="" />
							<div className="flex">
								<h3>Welcome to Fandom Fortress</h3>
								<p>
									Make Your Lodging Like <span>"ISEKAI"</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="bars">
				<marquee className="marq">ファンダム・フォートレス : 宿泊施設を "ISEKAI "のようにする</marquee>
			</div>
			<section class="type">
				<h1 class="title">Lodging's Type</h1>
				<div class="type-container">
					<Link href="#" class="type-box">
						<img src="https://cdn.discordapp.com/attachments/712325980349530122/1181771698765308008/image1_0_1.jpg?ex=658245a9&is=656fd0a9&hm=97274610ad4f2d773b5d8c4fa3ba816d271df8610b4da58339deb2f810ffdad3&" alt="" />
						<h3>Suite</h3>
					</Link>
					<Link href="#" class="type-box">
						<img src="https://cdn.discordapp.com/attachments/712325980349530122/1181771603722383482/image1_0.jpg?ex=65824592&is=656fd092&hm=9f12bf4cb787eef81ecc61918e907cf905640d21dca9b4752930b56e2bb4ab65&" alt="" />
						<h3>Studio</h3>
					</Link>
					<Link href="#" class="type-box">
						<img src="https://cdn.discordapp.com/attachments/712325980349530122/1181771802322685983/image0_0_1.jpg?ex=658245c1&is=656fd0c1&hm=a61916cdcce69cb57852dc70f07c4f266c4044084da86e92b12317ee026831df&" alt="" />
						<h3>Regular</h3>
					</Link>
				</div>
			</section>
		</>
	);
};

export default Home;
