import { baseURL, key, imgNotFound, baseImgURL } from "./config.js";
export const state = {
  searchQuery: "",
  moviesList: {},
  currentPageNo: 1,
  totalNoOfPages: 0,
  currentVideoIndex:0
};
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "War",
  "Romance",
  "History",
];
const createObj = function (movie) {
  return {
    id: movie.id,
    overview: movie.overview,
    popularity: movie.popularity,
    title: movie.title,
    poster_Path: movie.poster_path
      ? `${baseImgURL}${movie.poster_path}`
      : imgNotFound,
  };
};
export const url = [
  "ironman",
  "batman",
  "vikram",
  "beast",
  "captain",
  "ship",
  "superman",
];
export const options = function () {
  return genres;
};

export const getMoviesList =async function (searchQuery, pageNo = 1) {
  try {
    console.log("getMovies called");
    console.log(searchQuery);
    const response = await fetch(`
        ${baseURL}search/movie?api_key=${key}&query=${searchQuery}&page=${pageNo}
        `);

    if (!response.ok) throw new Error(`Fecthing failed`);
    const data = await response.json();

    //Formatting the fetched resutls:
    
    data.results.forEach((result, index) => {
      data.results[index] = createObj(result);
    });
    state.totalNoOfPages = data.total_pages;
    console.log(data.results);
    return data.results;
  } catch (err) {
    throw err;
  }
};
export const getVideos=async function(movieID){
 try{
  console.log(movieID);
  console.log(typeof movieID);
  const response = await fetch(`${baseURL}movie/${movieID}/videos?api_key=${key}&language=en-US`);
  const data = await response.json();
  const arrayOfVideoIds=data.results.map(result=>result.key);  
  
  return arrayOfVideoIds;
 }
 catch(err){
  throw err;
 }
};


