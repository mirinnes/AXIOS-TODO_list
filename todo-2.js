// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/users

//let randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 

const cargarTODO = (id) => {
    const ul = document.querySelector("#lista");
    axios.get(`https://jsonplaceholder.typicode.com/todos/`)
    .then(resp => resp.data.forEach(item => {
        if(item.userId === id) {
            let nuevoLi = document.createElement("li");
            nuevoLi.className = "list-item"
            nuevoLi.style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);
            nuevoLi.innerText = item.title;
            ul.appendChild(nuevoLi);
        }
    })
    ).catch(err => console.log(`El usuario no fue encontrado en los todos`));   
}

const botonVer = () => {
    //Me traigo el arreglo de items independientemente si existe o no
    const listaVieja = document.querySelectorAll(".list-item") // SelectorAll -> [<li>, <li>, <li>, <li>]
    listaVieja.forEach(item => item.remove()); //recorro el arreglo y borro los <li>

    //Lee el input que escribí
    const getUserName = document.querySelector("#userName").value;
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(resp => resp.data.forEach(item => {
        if(item.username===getUserName) {
            cargarTODO(item.id); //Llama a la funcion que carga los TODO del Username que leyó
        }
    }))
}


const load = () => {
    const boton = document.querySelector("button");
    boton.addEventListener("click", botonVer);


}