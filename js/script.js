const dataLoad = async (searchText = 'iphone', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phone)
  displayPhone(phones, isShowAll)
}

function displayPhone(phones, isShowAll) {
  const phoneContainer = document.getElementById('div-container');
  const showAllButton = document.getElementById('show-more');
  if (phones.length > 12 && !isShowAll) {
    phones = phones.slice(0, 12);
    showAllButton.classList.remove('hidden');
  }
  else {
    showAllButton.classList.add('hidden');
  }

  phoneContainer.innerHTML = ''
  phones.forEach(phone => {
    // console.log(phone)



    const div = document.createElement('div');
    div.classList.add = "card bg-gray-100 shadow-xl";
    div.innerHTML = `
     <figure class='rounded-xl bg-gray-100 flex justify-center py-10'><img src="${phone.image}" /></figure>
     <div class="card-body rounded-xl">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>${phone.slug}</p>
       <div class="card-actions justify-center">
         <button onclick='showDetailsButton("${phone.slug}")' class="btn btn-primary">Show details</button>
       </div>
     </div>
     
     `
    phoneContainer.appendChild(div)



  });
  spinner(false)
}

function searchPhone(isShowAll) {
  spinner(true)
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  console.log(searchText);

  dataLoad(searchText, isShowAll);

}

const spinner = (isLoading)=>{
  const loader = document.getElementById('spinner-container');
  if(isLoading){
    loader.classList.remove('hidden');
  }
  else{
    loader.classList.add('hidden')
  }
}
function showAll() {
  searchPhone(true);
}

// function showDetailsButton(phone){

//   showModalDetails()

// }

const showDetailsButton = async (id) => {
  // console.log('clicked', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showModalDetails(phone)
}

function showModalDetails(phone) {
  console.log(phone)
  const title = document.getElementById('modal-title');
  title.innerText = phone.name;
  const divContainer = document.getElementById('div-modal-container');
  divContainer.innerHTML = `
  <img src="${phone.image}" alt="Shoes" class="rounded-xl text-center" /> <br>
  <p>${phone.slug}</p>
  <p> chipset: ${phone?.mainFeatures?.chipSet}</p>
  <p>Display: ${phone?.mainFeatures?.displaySize}</p>
  <p> Memory: ${phone?.mainFeatures?.memory}</p>
  <p>GPS:${phone?.others?.GPS}</p>
  <p>${phone.slug}</p>
 
  
  `
  modal.showModal()
}





dataLoad()