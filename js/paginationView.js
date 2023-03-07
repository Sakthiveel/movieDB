class paginationView {
  _parentElement = document.querySelector(".pagination");
  _currenDisplaytPage = document.getElementsByClassName("current");
  _nextBtn = document.getElementsByClassName("next");
  _prevBtn = document.getElementsByClassName("prev");
  _currentPageNo = 1;
  totalNoOfPages = 1;
  _data;

  Re_render() {
    this.clear();
    const markUp=this._generateMarkUp();
    this._parentElement.insertAdjacentHTML('afterbegin',markUp);
    this._currentPageNo=1;    
    
  }
  _generateMarkUp() {           
    return `   <div class="page prev block " id="prev">Previous Page</div>
    <div class="current" id="current">1</div>
    <div class="page next  " id="next">Next Page</div>
    `;
  }
  eventHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const currentElement = e.target;
      if (!currentElement.classList.contains("page")) return;

      if (currentElement.id === "next") {
        this._currentPageNo = this._currentPageNo + 1;
      }
      if (currentElement.id === "prev") {
        this._currentPageNo = this._currentPageNo - 1;
      }

      console.log(`Current Page no ${this._currentPageNo}`);
      console.log(this._prevBtn);
      //Previous button visibility logic:
      this._currentPageNo === 1
        ? this._prevBtn[0].classList.add("block")
        : this._prevBtn[0].classList.remove("block");
      //next button visibility logic:
      this._currentPageNo === this.totalNoOfPages
        ? this._nextBtn[0].classList.add("block")
        : this._nextBtn[0].classList.remove("block");
        console.log(this._nextBtn);
        console.log(this._currenDisplaytPage);
      this._currenDisplaytPage[0].innerHTML = this._currentPageNo;
      handler(this._currentPageNo);
    });
  }
  // oldeventHandler(handler) {
  //   const nextPageBtn = document.querySelector(".next");
  //   const previousPageBtn = document.getElementsByClassName("prev");
  //   const currentPageDisplay = document.querySelector(".current");
  //   console.log(previousPageBtn)  ;
  //     this._parentElement.addEventListener("click", (e) => {
  //     const currentElement = e.target;
  //     if (!currentElement.classList.contains("page")) return;

  //     if (currentElement.id === "next") {
  //       this._currentPageNo = this._currentPageNo + 1;
  //     }
  //     if (currentElement.id === "prev") {
  //       this._currentPageNo = this._currentPageNo - 1;
  //     }
  //     //Previous button visibility logic:
  //     this._currentPageNo === 1
  //       ? previousPageBtn[0].classList.add("block")
  //       : previousPageBtn[0].classList.remove("block");
  //     //next button visibility logic:
  //     this._currentPageNo === this.totalNoOfPages
  //       ? nextPageBtn.classList.add("block")
  //       : nextPageBtn.classList.remove("block");
  //     console.log(`Current Page no ${this._currentPageNo}`);

  //     currentPageDisplay.innerHTML = this._currentPageNo;
  //     handler(this._currentPageNo);
  //     console.log(previousPageBtn);
  //   });
  // }
  showNxtBtn(){
    
    this._nextBtn[0].classList.add("block");
  }
  clear() {
    this._parentElement.innerHTML = "";
  }
  ResentTotalNoOfPages() {}
}
export default new paginationView();
