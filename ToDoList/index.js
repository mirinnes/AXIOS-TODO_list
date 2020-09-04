const onload = () => {
    const lista = document.querySelector("#todo-list");
    /*axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(res => {
            axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res2 => {
                res.data.forEach(todo => {
                    const li = document.createElement('li');
                    const title = document.createTextNode(todo.title);
                    const u = res2.data.find(user => user.id === todo.userId);
                    const user = document.createTextNode(u.name);
                    const separator = document.createTextNode(" - ");
                    li.appendChild(title);
                    li.appendChild(separator);
                    li.appendChild(user);
                    lista.appendChild(li);
                });
            })
        });*/


    const p1 = axios.get("https://jsonplaceholder.typicode.com/todos");
    const p2 = axios.get("https://jsonplaceholder.typicode.com/users");

    Promise.all([p1, p2]).then(res => {
        // res es un array [{data:}, {data:}]\
        const todos = res[0].data;
        const users = res[1].data;
        console.log(res[0].data);

        const listarToDo = (res) => {
            const li = document.createElement('li');
            const title = document.createTextNode(res.title);
            const checkbox = document.createElement("input");
            const separator = document.createTextNode(" - ");
            checkbox.type = "checkbox";
            checkbox.checked = res.completed;
            checkbox.addEventListener("change", async (event) => {
                const resCheck = await axios.put(`https://jsonplaceholder.typicode.com/todos/${res.id}`, {
                    completed: checkbox.checked,
                })
                console.log(resCheck.data)
            });

            const u = users.find(user => user.id === res.userId);
            const user = document.createTextNode(u.name);//users

            li.appendChild(title);
            li.appendChild(separator);
            li.appendChild(user);
            li.appendChild(checkbox);
            lista.appendChild(li);
        }

        todos.forEach(todo => {
            /* const li = document.createElement('li');
            const title = document.createTextNode(todo.title);
            const u = users.find(user => user.id === todo.userId);
            const user = document.createTextNode(u.name);
            const separator = document.createTextNode(" - ");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", event => {
                axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                    completed: checkbox.checked,
                }).then(res => {
                    console.log(res.data)
                })
                    .catch(err => console.log(err));
            });
            li.appendChild(title);
            li.appendChild(separator);
            li.appendChild(user);
            li.appendChild(checkbox);
            if (todo.completed) li.classList.add("completed");/// esto lo tacha
            lista.appendChild(li); */
            listarToDo(todo);
        });
        const agregarToDo = async () => {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                "userId": 1,
                "id": 1,
                "title": input.value,
                "completed": false
            })
            listarToDo(res.data);
        }
        const input = document.querySelector("#input");
        const btn = document.querySelector("#btn");

        btn.addEventListener("click", agregarToDo);
    })

};