
        document.addEventListener("DOMContentLoaded", loadTasks);

        function addTask() {
            let taskInput = document.getElementById("task");
            let task = taskInput.value.trim();
            if (task === "") return;
            
            let li = document.createElement("li");
            li.innerHTML = `<input type='checkbox' class='custom-checkbox' onchange='toggleTask(this)'><span>${task}</span> <button class='delete' onclick='removeTask(this)'>X</button>`;
            document.getElementById("taskList").appendChild(li);
            
            saveTasks();
            taskInput.value = "";
        }

        function removeTask(button) {
            button.parentElement.remove();
            saveTasks();
        }

        function toggleTask(checkbox) {
            let taskText = checkbox.nextElementSibling;
            if (checkbox.checked) {
                taskText.classList.add("completed");
            } else {
                taskText.classList.remove("completed");
            }
            saveTasks();
        }

        function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                let taskText = li.querySelector("span").textContent.trim();
                let isChecked = li.querySelector(".custom-checkbox").checked;
                tasks.push({ text: taskText, completed: isChecked });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function loadTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `<input type='checkbox' class='custom-checkbox' ${task.completed ? "checked" : ""} onchange='toggleTask(this)'><span class='${task.completed ? "completed" : ""}'>${task.text}</span> <button class='delete' onclick='removeTask(this)'>X</button>`;
                document.getElementById("taskList").appendChild(li);
            });
        }
    