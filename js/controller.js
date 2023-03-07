import resultsView from "./resultsView.js";
import searchView from "./searchView.js";
import * as modal from "./modal.js";
import optionsView from "./optionsView.js";
import paginationView from "./paginationView.js";
import overLayView from "../overLayView.js";



const controlresults = async function (movieObj) {
  try {
    //kepping the movieObj as the current movie List:
    modal.state.moviesList = movieObj;

    //Rendering in the page:
    resultsView.render(movieObj);
    //setting up the total no of pages:
    paginationView.totalNoOfPages = modal.state.totalNoOfPages;
    //If the total no of pages is one , then no need to show the nextBtn in the UI:
    if (paginationView.totalNoOfPages === 1) {
      paginationView.showNxtBtn();
      paginationView._currenDisplaytPage[0].classList.add("block");
    }
  } catch (err) {
    console.error(err.message);
  }
};
const controlSearch = async function (movieName) {
  try {
    //Resetting the pagination:
    resetPagination();
    //keeping the movieName as the current search Query:
    modal.state.searchQuery = movieName;

    //Getting the movies list from the api:
    
    const movieObj = await modal.getMoviesList(movieName);

    //Rendering in the page:
    controlresults(movieObj);

    //Rendering the pagination:
    // paginationView.render();
  } catch {}
};
const controlOptions = async function (searchQuery) {
  try {
    //Resetting the pagination:
    resetPagination();
    //keeping the movieName as the current search Query:
    // modal.state.searchQuery = modal.url[urlNo];
    modal.state.searchQuery = searchQuery;

    //Getting the genre of movie selected:
    //old method:
    // const movieObj = await modal.getMoviesList(modal.url[urlNo]);

    const movieObj = await modal.getMoviesList(searchQuery);
    
    controlresults(movieObj);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = async function (currentPageNo) {
  try {
    const movieObj = await modal.getMoviesList(
      modal.state.searchQuery,
      currentPageNo
    );

    controlresults(movieObj);
  } catch (err) {
    console.error(err);
  }
};
const resetPagination = function () {
  paginationView.Re_render();
};
const controloverlay = async function (movieID) {
  try {
    //Opening overlay container:
    overLayView.render();
    // Getting the videos for a specific movie:
    const videos = await modal.getVideos(movieID);
    //Rendering the vidoes:
    overLayView.renderVideoContent(videos);
  } catch (err) {
    console.error(err);
  }
};
const controlLeftAndRightButtons=function(curVideoIndex){
  //updating the current Video Index value:
  console.log( typeof curVideoIndex);
  modal.state.currentVideoIndex=curVideoIndex;
  console.log(` the current video is ${curVideoIndex}`);
}
const init = async function () {
  //Rendering the options :
  optionsView.render(modal.options());

  optionsView.eventHandler(controlOptions);
  searchView.formSubmitionHandler(controlSearch);

  // //Rendering the initial movies list:
  const movieObj = await modal.getMoviesList("vikram");
  controlresults(movieObj);
  // Ex::
  //Redering the paginatiio container:
  paginationView.eventHandler(controlPagination);

  //overlay content-showing:
  overLayView.addEventHandler(controloverlay);

  //Ex:
  //overlay left and right buton logic:
  // overLayView.leftAndRightBtnsHandler(modal.state.currentVideoIndex,controlLeftAndRightButtons);
};

init();

