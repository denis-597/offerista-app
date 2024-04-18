export const toggleFlyerToFav = (flyer) => {
  const currFavFlyers = localStorage.getItem("fav_flyers");
  const favFlyersArray = currFavFlyers ? JSON.parse(currFavFlyers) : [];

  const flyerExists = favFlyersArray.some((favFlyer) => favFlyer.id === flyer.id);

  if (flyerExists) {
    const updatedFavFlyers = favFlyersArray.filter((favFlyer) => favFlyer.id != flyer.id);
    localStorage.setItem("fav_flyers", JSON.stringify(updatedFavFlyers));
  } else {
    favFlyersArray.push({ id: flyer[0], name: flyer[1] });
    localStorage.setItem("fav_flyers", JSON.stringify(favFlyersArray));
  }
};

export const getFavFlyers = () => {
  const currFavFlyers = localStorage.getItem("fav_flyers");
  return currFavFlyers ? JSON.parse(currFavFlyers) : [];
}