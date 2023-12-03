const request = require("supertest");
const app = require("../app");
const fs = require("fs").promises;
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

//? Seeding Data
let admin_access_token;
let staff_access_token;
beforeAll(async () => {
	// Seeding User
	const testUser = JSON.parse(await fs.readFile("./author.json", "utf-8")).map((el) => {
		el.createdAt = el.updatedAt = new Date();
		el.password = hashPassword(el.password);
		return el;
	});

	// Seeding Lodging
	const testLodging = JSON.parse(await fs.readFile("./lodging.json", "utf-8")).map((el) => {
		el.createdAt = el.updatedAt = new Date();
		return el;
	});

	// Seeding Type
	const testType = JSON.parse(await fs.readFile("./type.json", "utf-8")).map((el) => {
		el.createdAt = el.updatedAt = new Date();
		return el;
	});

	await sequelize.queryInterface.bulkInsert("Users", testUser, { returning: true });
	await sequelize.queryInterface.bulkInsert("Types", testType, { returning: true });
	await sequelize.queryInterface.bulkInsert("Lodgings", testLodging, { returning: true });

	const userAdminLogin = {
		id: 1,
		email: "auliaangelinee@mail.com",
		role: "admin",
	};
	admin_access_token = signToken(userAdminLogin);

	const userStaffLogin = {
		id: 2,
		email: "angelinee@mail.com",
		role: "staff",
	};
	staff_access_token = signToken(userStaffLogin);
});

afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
	await sequelize.queryInterface.bulkDelete("Lodgings", null, { truncate: true, cascade: true, restartIdentity: true });
	await sequelize.queryInterface.bulkDelete("Types", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("/fortress/add-fortress", () => {
	describe("POST /fortress/add-fortress - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${staff_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("POST /fortress/add-fortress - failed", () => {
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: "", imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: "", typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: "", authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: "" };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "", facility: "", roomCapacity: "", imgUrl: "", location: "", price: "", typeId: "", authorId: "" };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: null, facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: null, roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: null, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: null, location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: null, price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: null, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: null, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: null };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: null, facility: null, roomCapacity: null, imgUrl: null, location: null, price: null, typeId: null, authorId: null };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Ascott Kuningan Jakarta", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1, authorId: 1 };
			const response = await request(app).post("/fortress/add-fortress").set("Authorization", `Bearer KWOAKWOKAOWKOAWKOAKWOKAWOKWKOW`).send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /fortress/fortress - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress").set("Authorization", `Bearer ${staff_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /fortress/fortress - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress").set("Authorization", `Bearer KWOAKWOKAOWKOAWKOAKWOKAWOKWKOW`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /fortress/fortress/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/8").set("Authorization", `Bearer ${staff_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /fortress/fortress/:id - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/1");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/1").set("Authorization", `Bearer ${staff_access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/10000000").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/fortress/fortress/1").set("Authorization", `Bearer KWOAKWOAKOWKOAKWOKAOWKOAKWOKAWOKAOWKOWAK`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("PUT /fortress/fortress/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("PUT /fortress/fortress/:id - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: "", imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: "", typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: "" };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "", facility: "", roomCapacity: "", imgUrl: "", location: "", price: "", typeId: "" };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: null, facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: null, roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: null, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: null, location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: null, price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: null, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: null };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: null, facility: null, roomCapacity: null, imgUrl: null, location: null, price: null, typeId: null };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer WKOAWKOKAWOKOAWKOAWKOKWAOKWOKAWOKOAWK`).send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1").set("Authorization", `Bearer ${staff_access_token}`).send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite 3BR Kemang Village Apartment By Travelio", facility: "Swimming pool, 24-hour front desk, Kitchen, Wifi, Children facility, Bathtub, Ticket CLEAN, Pet-friendly, Refrigerator, AC, Luggage storage", roomCapacity: 5, imgUrl: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/09/16/f01f7271-2de1-47d0-9954-ec74845658e9-1631776584899-94b554999cae0becd253cb4daae02a39.jpg", location: "Ciputra World 1, Jalan Prof Dr Satrio Kav 3 5, 12940", price: 2808300, typeId: 1 };
			const response = await request(app).put("/fortress/fortress/1000000000").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("DELETE /fortress/fortress/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).delete("/fortress/fortress/2").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("DELETE /fortress/fortress/:id - failed", () => {
		// it("Mengembalikan suatu array of object instance data user", async () => {
		// 	const response = await request(app).delete("/fortress/fortress/1").set("Authorization", `Bearer ${staff_access_token}`);

		// 	expect(response.status).toBe(403);
		// 	expect(response.body).toBeInstanceOf(Object);
		// 	expect(response.body).toHaveProperty("message", expect.any(String));
		// 	console.log(response.body);
		// });

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).delete("/fortress/fortress/1000000000").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).delete("/fortress/fortress/1");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).delete("/fortress/fortress/1").set("Authorization", `Bearer KWOKAOWKOAKWOKAWOKOAWKOKAWOKOWAKOWKOAWK`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("PATCH /fortress/fortress/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).patch("/fortress/fortress/1").set("Authorization", `Bearer ${admin_access_token}`).attach("image", "../desktop_hotel_gallery_large_900x600_DSCF8690.webp");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("PATCH /fortress/fortress/:id - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).patch("/fortress/fortress/1").set("Authorization", `Bearer ${staff_access_token}`).attach("image", "../desktop_hotel_gallery_large_900x600_DSCF8690.webp");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).patch("/fortress/fortress/1").attach("image", "../desktop_hotel_gallery_large_900x600_DSCF8690.webp");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).patch("/fortress/fortress/1").set("Authorization", `Bearer WKAOWKOAKWOKOAWKOAWKOKWAOKOWAKOKWAOKAW`).attach("image", "../desktop_hotel_gallery_large_900x600_DSCF8690.webp");

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).patch("/fortress/fortress/100000").set("Authorization", `Bearer ${admin_access_token}`).attach("image", "../desktop_hotel_gallery_large_900x600_DSCF8690.webp");

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});
});
