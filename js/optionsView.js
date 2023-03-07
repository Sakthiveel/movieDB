class optionView{
    _parentElement=document.querySelector('#tags');
    _data;
   
    
    render(data){
        
        this._data=data;
        this._data.forEach((movie_genre,index)=>{
            const markUp=this._genrateMarkUp(index,movie_genre);
            
            this._parentElement.insertAdjacentHTML('afterbegin',markUp);
        })
    }
    _genrateMarkUp(idno,movie_genre){
        return `<div class='tag' data-genre=${idno}>${movie_genre}</div>`;
    }
    eventHandler(handler){
        this._parentElement.addEventListener('click',(e)=>{
            const currentElement=e.target;
            if(!currentElement.classList.contains('tag')) return;           
            
            handler(e.target.innerText);
        })
    }
}
export default new optionView();