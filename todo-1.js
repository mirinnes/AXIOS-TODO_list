// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/users

let randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 




const load = () => {
    const ul = document.querySelector("#lista")
    axios.get("https://jsonplaceholder.typicode.com/todos").then(resp=> resp.data.forEach(item=>{
        //console.log(`El titulo es`, item.title)
        let nuevoLi = document.createElement("li");
        nuevoLi.className = "list-item"
        nuevoLi.style.backgroundColor = randomColor;
        nuevoLi.innerText = item.title;
        ul.appendChild(nuevoLi);
        }))


}