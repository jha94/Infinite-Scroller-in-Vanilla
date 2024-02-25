
const div = document.getElementById('main');
let page = 0

function handleIntersection(entries) {
    if(entries[entries.length-1].isIntersecting){
        page+=1;
        fetch(`https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=20`)
        .then(response => response.json())
        .then(json =>{
            renderTitle(json)
        })
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

fetch(`https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=20`)
.then(response => response.json())
.then(todos =>{
    renderTitle(todos)
})

