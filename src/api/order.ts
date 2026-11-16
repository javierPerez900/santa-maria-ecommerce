import { ENV, authFetch } from "@/utils";

async function createOrder(data: object) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders(page = 1, pageSize = 10) {
  try {
    const filters = `page=${page}&pageSize=${pageSize}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${filters}`;

    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const orderCtrl = {
  create: createOrder,
  getAll: getAllOrders,
};
