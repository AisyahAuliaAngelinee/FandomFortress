const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

beforeAll(async () => {
	try {
		await sequelize.queryInterface.bulkInsert(
			"Lodgings",
			[
				{
					name: "Fraser Residence Sudirman Jakarta",
					facility: "Swimming pool, AC, Restaurant, Wifi, Spa, Children facility, Fitness center, 24-hour front desk, Proof of covid-19 vaccination, Ticket CLEAN, Elevator",
					roomCapacity: 6,
					imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2020/10/31/41e48f3e-a16f-4280-a27f-a646918ea493-1604135331200-6656ddb5cb57f0b924dce325c158d88d.jpg",
					location: "Jl Setiabudi Raya no 9, Jakarta Pusat, Jakarta.",
					price: 6382166,
					typeId: 2,
					authorId: 3,
				},
				{
					name: "RedDoorz Plus near Soekarno Hatta Airport 2",
					facility: "Keamanan 24jam, Parkir dua roda, Lift, Wifi Gratis",
					roomCapacity: 1,
					imgUrl: "https://images.reddoorz.com/photos/164842/desktop_hotel_gallery_large_900x600__DDP5851.webp",
					location: "Jakarta",
					price: 174152,
					typeId: 3,
					authorId: 1,
				},
				{
					name: "Sans Hotel Puri Indah Jakarta",
					facility: "Kamar 1 AC, Kulkas, dan Kasur",
					roomCapacity: 3,
					imgUrl: "https://images.reddoorz.com/photos/238492/desktop_hotel_gallery_large_900x600_DSCF7067.webp",
					location: "Jakarta",
					price: 401890,
					typeId: 1,
					authorId: 1,
				},
				{
					name: "Sans Hotel Puri Indah Jakarta",
					facility: "Wifi Gratis, Perlengkapan Mandi, Resepsionis, Toilet, TV, 2 Kasur",
					roomCapacity: 2,
					imgUrl: "https://images.reddoorz.com/photos/238492/desktop_hotel_gallery_large_900x600_DSCF7067.webp",
					location: "Jakarta",
					price: 359100,
					typeId: 1,
					authorId: 2,
				},
			],
			{}
		);

		await sequelize.queryInterface.bulkInsert(
			"Types",
			[
				{
					name: "Suite",
				},
				{
					name: "Studio",
				},
				{
					name: "Regular",
				},
			],
			{}
		);
	} catch (error) {
		console.log(error, "ERROR");
	}
});

describe("GET /public/", () => {
	describe("GET /public/ - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/public/1");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/public/");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/public?filter=1");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/public?page=2");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /public/ - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/public/100");

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});
});

afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Lodgings", null, {});
	await sequelize.queryInterface.bulkDelete("Types", null, {});
});
