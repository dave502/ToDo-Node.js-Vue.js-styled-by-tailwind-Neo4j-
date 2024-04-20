<template>
  <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
    <div class="flex flex-row justify-between items-center">
      <div class="w-full">
        <h1 class="text-3xl font-medium text-teal-900">Список задач</h1>
        <form @submit.prevent="addTask" class="pt-5">
          <div class="relative flex w-full">
            <div class="relative h-10 w-full min-w-[200px]">
              <input v-model="newTask" type="text"
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" " value="" />
              <label
                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Новая задача
              </label>
            </div>
            <button
              :disabled="!newTask"
              @click="addTask"
              class="!absolute right-1 top-1 select-none rounded bg-teal-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              Создать
            </button>
          </div>  
        </form>
        <!-- <p v-if="tasks.length"> -->
          <div id="tasks" class="my-5">
            <div v-for="(task, index) in tasks" :key="index">
              <div id="task" class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
                <div class="inline-flex items-center space-x-2">
                  <div class="w-fit" @click="toggleComplete(task.id, !task.completed)">
                    <div v-if="task.completed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>                          
                    </div>
                    <div v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>                                             
                    </div>
                  </div>
                  <div class="text-slate-500" v-bind:class = "(task.completed)?'line-through':''">{{task.title}}</div>
                </div>
                <div @click="deleteTask(task.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>                      
                </div>
              </div>
            </div>
          </div> 
        <!-- </p>
        <p v-else>
          Пока что нет ни одной задачи
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    }
  },
  computed: {
    nextId() {
        // it's not the best idea to get id by calculating maximum from array every time
        // but it used for simplicity
        const last_task = this.tasks.reduce((prev, current) => (prev && prev.id > current.id) ? prev:current, 1)
        return last_task ? (last_task.id ? last_task.id + 1 : 1) : 1
      }
  },
  methods: {
    
    async fetchTasks() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL + '/tasks');
        this.tasks = await response.json();
      } catch(error) {
        console.error(error);
      }
    },
    
    async addTask() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL + '/task', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id : this.nextId, title: this.newTask, completed: false })
        });
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        this.newTask = '';
        this.fetchTasks();
      } catch(error) {
        console.error(error);
      }
    },
    
    async toggleComplete(id, completed) {
      try {
        await fetch(process.env.VUE_APP_BACKEND_URL + `/task/${id}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: completed })
        });
        this.fetchTasks();
      } catch(error) {
        console.error(error);
      }
    },
    
    async deleteTask(id) {
      try {
        await fetch(process.env.VUE_APP_BACKEND_URL + `/task/${id}`, { method: 'DELETE' });
        this.fetchTasks();
      } catch(error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  }
}
</script>

<style>
ul { list-style-type: none; }
button { margin-left: 10px; }
</style>