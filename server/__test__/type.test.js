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
	try {
		// Seeding User
		const testUser = JSON.parse(await fs.readFile("./author.json", "utf-8")).map((el) => {
			el.createdAt = el.updatedAt = new Date();
			el.password = hashPassword(el.password);
			return el;
		});

		// Seeding Type
		const testType = JSON.parse(await fs.readFile("./type.json", "utf-8")).map((el) => {
			el.createdAt = el.updatedAt = new Date();
			return el;
		});

		await sequelize.queryInterface.bulkInsert("Users", testUser, { returning: true });
		await sequelize.queryInterface.bulkInsert("Types", testType, { returning: true });

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
	} catch (error) {
		console.log(error, "<<<< Errornya");
	}
});

afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
	await sequelize.queryInterface.bulkDelete("Types", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("/type/type-add", () => {
	describe("POST /type/type-add - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "VIP" };
			const response = await request(app).post("/type/type-add").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "VIP" };
			const response = await request(app).post("/type/type-add").set("Authorization", `Bearer ${staff_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("POST /type/type-add - failed", () => {
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "" };
			const response = await request(app).post("/type/type-add").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: null };
			const response = await request(app).post("/type/type-add").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "VIP" };
			const response = await request(app).post("/type/type-add").send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const body = { name: "VIP" };
			const response = await request(app).post("/type/type-add").set("Authorization", `Bearer WKWKWOKAOWKOAKWOKAWOKAOWKOWAK`).send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("GET /type/type - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/type/type").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).get("/type/type").set("Authorization", `Bearer ${staff_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			console.log(response.body);
		});
	});

	describe("GET /type/type - failed", () => {
		it("Mengembalikan suatu object dengan pesan error", async () => {
			const response = await request(app).get("/type/type");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			console.log(response.body);
		});

		it("Mengembalikan suatu object dengan pesan error", async () => {
			const response = await request(app).get("/type/type").set("Authorization", `Bearer WKAOKWOKAWOKAOWKOAKWOKWAOKAWOKAW`);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			console.log(response.body);
		});
	});

	describe("PUT /type/type/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite" };
			const response = await request(app).put("/type/type/1").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("PUT /type/type/:id - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite" };
			const response = await request(app).put("/type/type/1").set("Authorization", `Bearer ${staff_access_token}`).send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite" };
			const response = await request(app).put("/type/type/1000000000").set("Authorization", `Bearer ${admin_access_token}`).send(body);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const body = { name: "Suite" };
			const response = await request(app).put("/type/type/1").send(body);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("DELETE /type/type/:id - success", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).delete("/type/type/1").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});

	describe("DELETE /type/type/:id - failed", () => {
		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).put("/type/type/1").set("Authorization", `Bearer ${staff_access_token}`);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).put("/type/type/100000").set("Authorization", `Bearer ${admin_access_token}`);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});

		it("Mengembalikan suatu array of object instance data user", async () => {
			const response = await request(app).put("/type/type/1");

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
			console.log(response.body);
		});
	});
});
