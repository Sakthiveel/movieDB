class overLayView {
  _parentElement = document.querySelector("body");
  _overLayVideoContainer = document.querySelector(".overlay-content");
  _overLayElement = document.querySelector(".overlay");
  _closeBtn = document.querySelector(".closebtn");
  _knowBtn = document.getElementsByClassName("know-more");
  _leftArrow=document.querySelector('.left-arrow');
  _rightArrow=document.querySelector('.right-arrow');
  _dotsContainer=document.querySelector('.dots');
  _dots=document.getElementsByClassName('dot');
  _data;
  render() {
    this._overLayElement.style.width = "100%";
  }
  // renderVideoContent(data) {
  //   this._data = data;
  //   this._clearVideoContainer();
  //   console.log(this._overLayVideoContainer);
  //   console.log(this._data);
  //   for (const youtubeVideoID of this._data) {
  //     const markUp = this._generateMarkUpForVideoContent(youtubeVideoID);
  //     this._overLayVideoContainer.insertAdjacentHTML("beforeend", markUp);
  //   }
  // }
  renderVideoContent(data) {    
    this._data = data;
    console.log(this._dots);
    console.log(this._data);
    Array.from(this._data).forEach((id,index)=>{
      console.log("Dots construction called");
      const markUp=this._generateMarkUpForDots(index+1);
      this._dotsContainer.insertAdjacentHTML('beforeend',markUp);
    })
    this._settingDataSetValuesToBtns(this._data.length);     
    this._showOneiFrame(this._data[0]);
    //Initially rendering of dots:    
    
  }

  _generateMarkUpForVideoContent(id) {
    
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" 
              title="YouTube video player"  frameborder="0" allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`;
  }
  _generateMarkUpForDots(no){
    return `
    <span class="dot ">${no}</span> 
     `;
  }
  addEventHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      
      const currentEl = e.target;
      //Overlay element closing logic:
      if (currentEl === this._closeBtn) {
        this._overLayVideoContainer.innerHTML = "";
        this._dotsContainer.innerHTML="";
        return (this._overLayElement.style.width = "0%");
      }

      //checking whether the use is clicked the 'know-more' button or not !
      const isClicked = Array.from(this._knowBtn).some((knowbtn) => {
        return currentEl === knowbtn;
      });
      //rightArrow clicked:
      if(this._rightArrow === currentEl){
        
        console.log("Right Arrow clicked");
        let curElementIndex= +this._rightArrow.dataset.id;
        if(curElementIndex >= this._data.length){
          curElementIndex=0;
        }
        
        this._showOneiFrame(this._data[curElementIndex]);
        this._leftArrow.dataset.id=curElementIndex-1;
        curElementIndex++;
        this._rightArrow.dataset.id=curElementIndex;
        this._currentVideoDotsRepresentation();
       
      }
      //leftArrow clicked:
      if(this._leftArrow === currentEl){        
        console.log("Left Arrow clicked");
        let curElementIndex= +this._leftArrow.dataset.id;
        if(curElementIndex <  0 ){
          curElementIndex=this._data.length-1;
        }        
        this._showOneiFrame(this._data[curElementIndex]);
        this._rightArrow.dataset.id=curElementIndex+1;
        curElementIndex--;
        this._leftArrow.dataset.id=curElementIndex;   
        this._currentVideoDotsRepresentation();    
      }

      // }
      //If user is not clicked the 'know-more' btn then exit:
      if (!isClicked) return;
      //If user clicked the 'know-more' btn then run the function which was passessed as a paramter:

      handler(currentEl.id + "");
    });
  }
  _showOneiFrame(id){
    //Clearing the current iFrame:
    this._clearVideoContainer();       
    const markUp=this._generateMarkUpForVideoContent(id);
    this._overLayVideoContainer.insertAdjacentHTML('afterbegin',markUp);  


  }

  _clearVideoContainer() {
    this._overLayVideoContainer.innerHTML = "";
  }
  _settingDataSetValuesToBtns(noOfIframes){
    
    this._leftArrow.dataset.id=noOfIframes-1;
    this._rightArrow.dataset.id=1;

    
    this._currentVideoDotsRepresentation();
  }
  _currentVideoDotsRepresentation(){
    
    const currentDot= +this._rightArrow.dataset.id;
    console.log(`Current Dot is ${currentDot}`);
    Array.from(this._dots).forEach(dot=>dot.classList.remove('active'));
    this._dots[currentDot-1].classList.add('active');
  }
}
export default new overLayView();
