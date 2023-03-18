class resultsView {
    _parentElement=document.querySelector('#main');
    _data;
    
    render(data){
        this._data=data;
        this._clear();
        for(const movie of this._data){
            const markUp=this._generateMarkUp(movie);
            this._parentElement.insertAdjacentHTML("beforeend",markUp);
        }
       

    }
    _clear(){
        this._parentElement.innerHTML='';
    }

    _nomoviesMarkUp(){
        return `<div class="movie">No movies Ar</div>`;
    }
    _generateMarkUp(movie){
        return `
        <div class="movie">
        <img src="${movie.poster_Path}" alt="${movie.title}">

       <div class="movie-info">
           <h3>${movie.title}</h3>
           <span class="orange">${movie.popularity}</span>
       </div>

       <div class="overview">

           <h3>Overview</h3>
           ${movie.overview}
           <br> 
           <button class="know-more" id="${movie.id}">Know More</button>
   
   </div></div>`
    }
}
export default new resultsView();