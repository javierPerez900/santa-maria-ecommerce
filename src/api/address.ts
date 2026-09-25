import { ENV, authFetch } from "@/utils";

async function getAllAddresses() {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;

    const response = await authFetch(url);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

async function createAddress(data: object) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
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

async function updateAddress(data: object, addressId: number) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = {
      method: "PUT",
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

async function deleteAddress(addressId: number) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = { method: "DELETE" };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

async function getAddressById(addressId: number) {
  try {
    const filters = `addId=${addressId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

    const response = await authFetch(url);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result[0] || null;
  } catch (error) {
    throw error;
  }
}

export const addressCtrl = {
  getAll: getAllAddresses,
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress,
  getById: getAddressById,
};
