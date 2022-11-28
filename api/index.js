import http from "@/utils/request.js";

const home = {
	carAdd: (data) => http.post('/api/b2c/cart/add', data),
}
export {
	home
}
