const Task = require("./Task");

class Tasks {

    _list = {};

    constructor(){

        this._list = {};
    }


    

    //getters

    get listArray(){
        const list = [];

        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }


    //functions
    createTask( description = ''){
        
        const task = new Task(description)
        this._list[task.id] = task

    }

    createTasksFromArray(tasks = []){
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    completeList(){

        console.log("\n");
        this.listArray.forEach((task, index) => {
            const status = (task.completed_at)
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            const idx = index + 1;

            console.log(`${(idx+".").green} ${task.description} :: ${status}`);
        })

        
    }

    listPendingCompletedTasks( complete = true){


        console.log("\n");
        let idx = 1;
        this.listArray.forEach((task) => {
           
            let taskToList;
            let status;

            if(complete){    

                if(task.completed_at) {
                    taskToList = task
                    status = 'Completado'.green;
                    console.log(`${(idx+".").green} ${taskToList.description} :: ${(task.completed_at).green}`);
                    idx++;
                }
                    
            }
            else{

                if(!task.completed_at){
                    taskToList = task
                    status = 'Pendiente'.red;
                    console.log(`${(idx+".").green} ${taskToList.description} :: ${status}`);
                    idx++;
                }
                    
            }
            


            

            
        })

    }

    deleteTask(id  = ''){
        if(this._list[id]){
            delete this._list[id]
        }
    }

    toggleCompleteTask( ids = [] ){
        
        ids.forEach(id => {
            const task = this._list[id] 
            
            if( !task.completed_at){
                task.completed_at = new Date().toISOString()
            }

        })

        this.listArray.forEach(task => {
            
            if(!ids.includes(task.id)){
                this._list[task.id].completed_at = null
            }

        })
    }

}

module.exports = Tasks;