const api_key = process.env.API_KEY;
const baseURL = "https://api.themoviedb.org/3/";
const searchMovieURl = `search/movie?api_key=${api_key}&query=vikram`;
const latestMoiesURL = `https://api.themoviedb.org/3/discover/movie?api_key=dd5cbd78e2487e3ca45c7b37c9e39e2a&language=en-US&region=in&&page=1&primary_release_date.gte=2022-06-10`;
'https://api.themoviedb.org/3/discover/movie?api_key=dd5cbd78e2487e3ca45c7b37c9e39e2a&language=en-us&region=in&primary_release_data.gte=2022-07-10&with_original_language=ta'
const searchMovies = async function () {
  try {
    const response = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=dd5cbd78e2487e3ca45c7b37c9e39e2a&language=en-US&region=in&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2022-07-10&with_original_language=ta&with_watch_monetization_types=flatrate
    `);
    if (!response.ok) throw new Error(`Fecthing failed`);
    const data = await response.json();
    for (const movieObj of data.results) {
      // console.log(movieObj.original_title);
      console.log(movieObj.original_title, movieObj.release_date);
      
    }
  } catch (err) {
    console.log(err);
  }
};
searchMovies();
