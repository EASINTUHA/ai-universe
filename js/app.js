const load = async(searchText ,dataLimit) =>{ 
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit); 
}

const displayData = (a, dataLimit) =>{
    const phonesContainer = document.getElementById('container-1');
    const showAll = document.getElementById('show-all')
    if(dataLimit && a.length > 6){
        a = a.slice(0,6);
       
        showAll.classList.remove('d-none');
    }
    else{

        showAll.classList.add('d-none');

    }

    a.forEach(b => {

        const DataDivDiv = document.createElement('div');
        DataDivDiv.classList.add('col');
        DataDivDiv.innerHTML= `
        <div class="card p-4" style="height:440px;">
        <img src="${b.image}" style="height:180px;" class="card-img-top figure-img img-fluid rounded border border-danger border-3 p-1" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features:</h5>
            <p class="mb-5">${b.features}</p>
            
            <div class="d-flex justify-content-between">
                <div>
                    <h4 class="">${b.name}</h4>
                    <p class="">📄${b.published_in}</p>
                </div>

                <div>
                    <button onclick="loadFullDetails('${b.id}')" href="#" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">➜</button>
                </div>
            </div>
        </div>
      </div>
      
        `;
        phonesContainer.appendChild(DataDivDiv)

    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    const searchField = document.getElementById('start');
    const searchText = searchField.value;
    load(searchText, dataLimit);
}
processSearch(6)

document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch(); 
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
  
const loadFullDetails = async id =>{ 
   
    const url= `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAndDataDetails(data.data);
}

const displayAndDataDetails = c =>{
    const modalTitle = document.getElementById('DetailsModal1');
    modalTitle.innerText = c.tool_name;
    const phoneDetails = document.getElementById('details-detail');
    phoneDetails.innerHTML = `
        <p class="ps-5" style="background-color:red;">${(c.accuracy.score)*100 ? (c.accuracy.score)*100 : ''}% accuracy</p>
        <img style="height:180px;width:3500px;" src="${c.image_link}"  class="card-img-top figure-img img-fluid rounded border border-warning border-4 p-1" alt="...">
        <h5>${c.input_output_examples[0].input ? c.input_output_examples[0].input : 'Can you give any example?'}</h5>
        <p class="mb-4">${c.input_output_examples[0].output ? c.input_output_examples[0].output : 'No not yet, take a break'}</p>
        
        <div class="border rounded border-4 border-success p-2">
        <b><p>${c.description ? c.description : 'No description'}</p></b>

        <div class="d-flex justify-content-around mb-4">
            <div class="border rounded border-3 border-info p-2">
                <p>${c.pricing[0].price ? c.pricing[0].price : 'Free of cost'} </br>
                ${c.pricing[0].plan ? c.pricing[0].plan : ''}</p>
            </div>
            <div class="border rounded border-3 border-info p-2">
                <p>${c.pricing[1].price ? c.pricing[1].price : 'Free of cost'} </br>
                ${c.pricing[1].plan ? c.pricing[1].plan : ''}</p>
            </div>
            <div class="border rounded border-3 border-info p-2">
                <p>${c.pricing[2].price ? c.pricing[2].price : 'Free of cost'} </br>
                ${c.pricing[2].plan ? c.pricing[2].plan : ''}</p>
            </div>
        </div>
        <div class="d-flex justify-content-around">
            <div>
                <h5>Features</h5>
                <p>1. ${c.features[1].feature_name ? c.features[1].feature_name : 'No Integrations'} </br>
                    2. ${c.features[2].feature_name ? c.features[2].feature_name : 'No Integrations'} </br>
                    3. ${c.features[3].feature_name ? c.features[3].feature_name : 'No Integrations'} 
                </p>
            </div>

            <div>
                <h5>Integrations</h5>
                <p>1. ${c.integrations[0] ? c.integrations[0] : 'No Integrations'} </br>
                    2. ${c.integrations[1] ? c.integrations[1] : 'No Integrations'} </br>
                    3. ${c.integrations[2] ? c.integrations[2] : 'No Integrations'} 
                </p>
            </div>
            </div> 
        </div>
    `
}

