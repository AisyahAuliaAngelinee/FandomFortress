const request = require("supertest");
const app = require("../app");
const fs = require("fs").promises;
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const exp = require("constants");

//? Seeding User Data
let admin_access_token;
let staff_access_token;
beforeAll(async () => {
	const testUser = JSON.parse(await fs.readFile("./author.json", "utf-8")).map((el) => {
		el.createdAt = el.updatedAt = new Date();
		el.password = hashPassword(el.password);
		return el;
	});

	await sequelize.queryInterface.bulkInsert("Users", testUser, { returning: true });

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
});

//! Login Test
describe("POST /login", () => {
	describe("POST /login - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { email: "auliaangelinee@mail.com", password: "c3mun6ut", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("access_token", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { email: "auliaangelinee@mail.com", password: "c3mun6ut" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("access_token", expect.any(String));
			console.log(response.body);
		});
	});

	describe("POST /login - failed", () => {
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "", password: "c3mun6ut", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "auliaangelinee@mail.com", password: "", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "", password: "", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: null, password: "c3mun6ut", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "auliaangelinee@mail.com", password: null, role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: null, password: null, role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "auliaangelinee", password: "c3mun6ut", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "INVALID EMAIL / PASSWORD");
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { email: "auliaangelinee@mail.com", password: "123456", role: "admin" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", "INVALID EMAIL / PASSWORD");
			console.log(response.body);
		});
	});
});

describe("POST /add-user", () => {
	describe("POST /add-user - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { username: "angelineetest", email: "testangeline@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("POST /add-user - failed", () => {
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "", email: "testangeline@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangeline@mail.com", password: "", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "", email: "", password: "", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: null, email: "testangeline@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: null, password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: null, phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: null, email: null, password: null, phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: "123", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: "12345678910111213141516", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer KWOAKWOKAOWKOAKWOKAOWKOKAWOKAO`).send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		/**
		 * Case: This test running if Staff try to create new user
		 * Create new user only used for Admin, Staff can't add new user
		 * If the token with role staff = Forbidden
		 */
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { username: "angelineetest", email: "testangelinee@mail.com", password: "123456", phoneNumber: "081399999650", address: "BSD Green Office Park 1" };
			const response = await request(app).post("/add-user").set("Authorization", `Bearer ${staff_access_token}`).send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});
});
