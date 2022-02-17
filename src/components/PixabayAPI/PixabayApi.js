import axios from "axios";

export default function getPictures(pictureName, page = 1) {
  return axios.get(
    `https://pixabay.com/api/?q=${pictureName}&page=${page}&key=24616580-7493c42b046254b9d37eecdaa&image_type=photo&orientation=horizontal&per_page=12`
  );
}
