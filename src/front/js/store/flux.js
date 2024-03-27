

const getState = ({ getStore, getActions, setStore }) => {

	return {

		store: {

			message: null,
			token: JSON.parse(localStorage.getItem("token")) || null,
			user: [],
			users: [],
			profile: [],
			services: [],
			products: [],
			appointments: [],
			productlist: [],
			filterProducts: [],
		},


		actions: {


			// -----------------------------------------------------------------------------------------------------------------------------------------------	
			// Register / Login:


			makeLogin: async (userData) => {

				console.log(userData);

				try {

					const requestConfig = {

						method: "POST",
						headers: {
							"Content-type": "application/json"
						},

						body: JSON.stringify(userData)
					}

					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestConfig);

					if (response.status != 200) {

						console.log(response)

						return false
					}

					const data = await response.json()

					setStore({ token: data.token, user: data.user })

					localStorage.setItem("token", JSON.stringify(data.token));

					return true
				}

				catch (error) {

					console.log(error);
				}
			},


			logOut: () => {

				try {

					setStore({ token: null });
					localStorage.removeItem("token") 

					console.log("You have been logged out");
					return true;

				} catch (error) {

					console.error("Error closing session:", error);
					return false;
				}
			},

			newUser: async (newContactData) => {

				console.log(newContactData);

				try {

					const requestConfig = {

						method: "POST",
						headers: {
							"Content-type": "application/json"
						},

						body: JSON.stringify(newContactData)
					}

					const response = await fetch(process.env.BACKEND_URL + "/api/register", requestConfig);

					if (response.status != 201) {

						console.log("Error requesting. Code: ", response.status)

						return false
					}

					const body = await response.json()

					return body

				} catch (error) {

					console.log(error)
				}
			},


			getUsers: () => {

				fetch(process.env.BACKEND_URL + "/api/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
					.then(response => response.json())
					.then(response => {
						setStore({ users: response.data })

						console.log(response)
					})
					.catch(error => {

						console.error("Error:", error);
					});
			},


			getToken: () => {

				const store = getStore()

				if (localStorage.getItem("token")) {

					return localStorage.getItem("token");
				}
				return store.token;
			},



			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Services / Products:



			getServices: async () => {

				const response = await fetch(process.env.BACKEND_URL + "/api/categories")

				const data = await response.json();

				setStore({

					services: data.categories
				})

			},


			getProducts: async (categoryId) => {

				const response = await fetch(process.env.BACKEND_URL + `/api/serviceCategories/${categoryId}`);

				const data = await response.json();

				return data;

			},


			getFairies: async (products) => {

				const productsId = products.map((product) => {

					return product.id

				});

				const response = await fetch(process.env.BACKEND_URL + "/api/users_with_all_products/", {

					method: "POST",
					headers: {

						"Content-type": "application/json"
					},

					body: JSON.stringify({
						ids: productsId
					})
				});

				const data = await response.json()

				return data.users
			},


			getUsers: async (fairyId) => {

				const response = await fetch(process.env.BACKEND_URL + "/api/get_user/" + fairyId)

				const data = await response.json()

				return data
			},


			createOrder: async (data, products) => {

				const response = await fetch(process.env.BACKEND_URL + "/api/users_with_all_products/", {

					method: "POST",
					headers: {

						"Content-type": "application/json"
					},

					body: JSON.stringify({

						data: data,
						products: products
					})
				});

				const res = await response.json()

				console.log(res);
			},


			addProductToFairy: async (products) => {

				const store = getStore();

				const response = await fetch(process.env.BACKEND_URL + "/api/add_product_to_user/", {

					method: "POST",
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},

					body: JSON.stringify({

						products: products
					})
				});

				if (response.ok) {

					return true;
				}

				return false;
			},




			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Client Orders / Select Client / Fairy Appointment Cards:



			getClients: async () => {

				const store = getStore()

				const response = await fetch(process.env.BACKEND_URL + "/api/client/requests",

					{
						headers: {

							"Authorization": `Bearer ${store.token}`
						}
					})

				const data = await response.json()

				return data;
			},


			getClientAppointments: async () => {

				const store = getStore()

				const response = await fetch(process.env.BACKEND_URL + "/api/client/requests",

					{
						headers: {

							"Authorization": `Bearer ${store.token}`,
						}
					})

				const data = await response.json()

				console.log(data);

				setStore({ appointments: data })

				return data;

			},


			modifyOrder: async (order_id, bodyData) => {

				try {
					const store = getStore();

					const response = await fetch(`${process.env.BACKEND_URL}/api/order/${order_id}`, {

						method: 'PUT',
						headers: {

							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						},

						body: JSON.stringify(bodyData)
					});

					if (!response.ok) {

						throw new Error("Network response was not ok");
					}

					const data = await response.json();

					console.log('Success:', data);

					return data;

				} catch (error) {

					console.error('Error:', error);
					throw error;
				}
			},



			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Client Appointment Cards:


			getFairyAppointments: async () => {

				const store = getStore()

				const response = await fetch(process.env.BACKEND_URL + "/api/client/requests",

					{
						headers: {

							"Authorization": `Bearer ${store.token}`,
						}
					})

				const data = await response.json()

				console.log(data);

				setStore({ appointments: data })

				return data;

			},

		}
	}
};


export default getState;
