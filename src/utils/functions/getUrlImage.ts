import { ENV } from "../constants";

export function getUrlImage(imageName: number | string) {
  return `${ENV.MEDIA_URL}/${imageName}.jpg`;
}
