document.addEventListener("DOMContentLoaded", () => {
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const formSubsection = document.querySelector(".form-subsection");
  const btnGroup = document.querySelector(".btn-group");
   const addStopBtn = document.getElementById("addStopBtn");
    const addStopbtnWrapper = document.getElementById("addStopbtnWrapper");
     const extraStopContainer = document.getElementById("extraStopContainer");


     const sameStopsCheckbox = document.getElementById("sameStops");
     const returnStopSection = document.getElementById("returnStopSection");
     
   const returnAddStopBtn = document.getElementById("returnAddStopBtn");
   const returnStopContainer = document.getElementById("returnStopContainer");

  // Initial State
  formSubsection.style.display = "none";
  btnNo.classList.add("active");
  btnNo.classList.remove("inactive");
  btnYes.classList.remove("active");
  btnYes.classList.add("inactive");
  btnGroup.style.marginBottom = "10rem"; // As per default state

  // YES click
  btnYes.addEventListener("click", () => {
    btnYes.classList.add("active");
    btnYes.classList.remove("inactive");

    btnNo.classList.remove("active");
    btnNo.classList.add("inactive");
   
    formSubsection.style.display = "block";
    btnGroup.style.marginBottom = "1rem"; // When yes selected
  });

  // NO click
  btnNo.addEventListener("click", () => {
    btnNo.classList.add("active");
    btnNo.classList.remove("inactive");

    btnYes.classList.remove("active");
    btnYes.classList.add("inactive");
     
    formSubsection.classList.remove('show');
    formSubsection.style.display = "none";
    btnGroup.style.marginBottom = "10rem"; // When no selected again
  });

   //add-stop-btn

  //add-stop-btn
addStopBtn.addEventListener("click", function () {
  const newRow = document.createElement("div");
  newRow.classList.add("row", "g-2", "mb-1", "align-items-end");
  newRow.innerHTML = `
    <div class="col-12 col-md-8">
     
      <div class="input-icon-wrapper mb-3">
        <input type="text" class="form-control with-icon" placeholder="Start typing an address or Eircode..." />
        <i class="bi bi-geo-alt-fill text-primary icon-inside open-map" style="cursor: pointer;"></i>
      </div>
    </div>
    <div class="col-6 col-md-3">
     
      <div class="input-icon-wrapper mb-3">
        <input type="text" class="form-control with-icon" />
        <i class="bi bi-clock-fill text-primary icon-inside"></i>
      </div>
    </div>
    <div class="col-1 col-md-1">
      <div class="form-control only-icon remove-stop-btn rounded-circle">
        <i class="fa fa-times"></i>
      </div>
    </div>
  `;

  // ✅ Insert above the add-stop-btn 
  extraStopContainer.insertBefore(newRow, addStopbtnWrapper);

  // Remove functionality
  const removeBtn = newRow.querySelector(".remove-stop-btn");
  removeBtn.addEventListener("click", function () {
    newRow.remove();
  });
});


sameStopsCheckbox.addEventListener("change",function(){
  if(this.checked){
    returnStopSection.style.display="none";
  }else{
    returnStopSection.style.display="block";
  }
})
returnAddStopBtn.addEventListener("click", function () {
  const returnRow = document.createElement("div");
  returnRow.classList.add("row", "g-2", "mb-1", "align-items-end");

  returnRow.innerHTML = `
    <div class="col-12 col-md-8">
      <div class="input-icon-wrapper mb-3">
        <input type="text" name="location[]"class="form-control with-icon" placeholder="Start typing an address or Eircode..." />
        <i class="bi bi-geo-alt-fill text-primary icon-inside open-map" style="cursor: pointer;"></i>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="input-icon-wrapper mb-3">
        <input type="text"name="duration[]" class="form-control with-icon" />
        <i class="bi bi-clock-fill text-primary icon-inside"></i>
      </div>
    </div>
    <div class="col-1 col-md-1">
      <div class="form-control only-icon remove-stop-btn rounded-circle">
        <i class="fa fa-times"></i>
      </div>
    </div>
  `;

  returnStopContainer.appendChild(returnRow);

  // Remove button logic
  const removeBtn = returnRow.querySelector(".remove-stop-btn");
  removeBtn.addEventListener("click", function () {
    returnRow.remove();
  });
});

});
