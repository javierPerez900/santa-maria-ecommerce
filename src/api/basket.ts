import { ENV } from "@/utils";
import { forEach } from "lodash";

interface BasketProductType {
  id: number;
  quantity: number;
}

function getAll() {
  const response = localStorage.getItem(ENV.BASKET);

  if (!response) {
    return [];
  } else {
    return JSON.parse(response);
  }
}

function add(productId: number) {
  const products = getAll();
  const objIndex = products.findIndex(
    (product: BasketProductType) => product.id === productId,
  );

  if (objIndex < 0) {
    products.push({ id: productId, quantity: 1 });
  } else {
    const product = products[objIndex];
    products[objIndex].quantity = product.quantity + 1;
  }

  localStorage.setItem(ENV.BASKET, JSON.stringify(products));
}

function count() {
  const response = getAll();
  let countTemp = 0;

  forEach(response, (item) => {
    countTemp += item.quantity;
  });

  return countTemp;
}

function changeQuantity(productId: number, quantity: number) {
  const products = getAll();
  const objIndex = products.findIndex(
    (product: BasketProductType) => product.id === productId,
  );

  products[objIndex].quantity = quantity;

  localStorage.setItem(ENV.BASKET, JSON.stringify(products));
}

function deleteItem(productId: number) {
  const products = getAll();
  const updateProducts = products.filter(
    (product: BasketProductType) => product.id !== productId,
  );

  localStorage.setItem(ENV.BASKET, JSON.stringify(updateProducts));
}

function deleteAll() {
  localStorage.removeItem(ENV.BASKET);
}

export const basketCtrl = {
  getAll,
  add,
  count,
  changeQuantity,
  deleteItem,
  deleteAll,
};
