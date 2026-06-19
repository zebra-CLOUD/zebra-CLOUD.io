const galleryList=document.querySelector("#galleryList");
const filterButtons=document.querySelectorAll(".filter-buttons button");
const modal=document.querySelector("#modal");
const modalClose=document.querySelector("#modalClose");
const modalImage=document.querySelector("#modalImage");
const modalTitle=document.querySelector("#modalTitle");
const modalDesc=document.querySelector("#modalDesc");

function renderGallery(filter="all"){
  const data=filter==="all"?galleryData:galleryData.filter(item=>item.category===filter);
  galleryList.innerHTML=data.map(item=>`
    <article class="gallery-card" data-id="${item.id}">
      <img class="gallery-thumb" src="${item.image}" alt="${item.title}">
      <div class="gallery-info">
        <span class="gallery-category">${item.categoryName}</span>
        <h3>${item.title}</h3>
        <p class="gallery-date">${item.date}</p>
        <p class="gallery-desc">${item.desc}</p>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".gallery-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const item=galleryData.find(data=>data.id===Number(card.dataset.id));
      openModal(item);
    });
  });
}

function openModal(item){
  modalImage.src=item.image;
  modalImage.alt=item.title;
  modalTitle.textContent=item.title;
  modalDesc.textContent=item.desc;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  modalImage.src="";
}

filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    filterButtons.forEach(btn=>btn.classList.remove("active"));
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});

modalClose.addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
renderGallery();
