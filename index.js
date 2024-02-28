
const div = document.getElementById('main');
let page = 0;
let isLoading = true;

function addLoader(){
    isLoading?div.innerHTML+=`<p id="loading">loading...</p>`:document.getElementById('loading').remove();
}

window.addEventListener('load', ()=>addLoader())

function fetchData(){
    fetch(`https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=20`)
    .then(response => response.json())
    .then(json =>{
        isLoading = false;
        addLoader()
        renderTitle(json)
    })
}

function handleIntersection(entries) {
    if(entries[entries.length-1].isIntersecting){
        div.innerHTML+=`<p id="loading">loading...</p>`
        page+=1;
        fetchData();
    }
  }

const renderTitle = (todos) => {
    div.innerHTML+=todos.map(({title})=>`<p class="titles">${title}</p>`).join('')
    const titles = document.querySelectorAll('.titles');
    const observer = new IntersectionObserver(handleIntersection);
    titles.forEach((val, index) => {
        if(index===titles.length-1){
            observer.observe(val)
        }
    });
}

fetchData()

