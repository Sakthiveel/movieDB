class searchView {
    _parentElement=document.querySelector('#form');
    _input=document.querySelector('#search');
    _data;
    formSubmitionHandler(hander){
        this._parentElement.addEventListener('submit',(e)=>{
            e.preventDefault();
            hander(this._input.value);
            this._input.value = "";
        })
    }
}
export default new searchView();