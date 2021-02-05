
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pause, readInput,listDeleteTask, confirm, listCheckTask } = require('./helpers/inquirer');
const Tasks = require('./models/Tasks');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();
    
    const tasksDB = leerDB();

    if(tasksDB){
        tasks.createTasksFromArray(tasksDB)
    }

    do{

        opt = await inquirerMenu();
       
        switch(opt){

            case '1': 

                const description = await readInput('Descripcion:');
                tasks.createTask(description);

            break;

            case '2': 
                tasks.completeList();

            break;

            case '3': 
                tasks.listPendingCompletedTasks();

            break;

            case '4': 
                tasks.listPendingCompletedTasks(false);

            break;

            case '5': 
                const ids = await listCheckTask(tasks.listArray)
                tasks.toggleCompleteTask(ids)
                
            break;

            case '6': 
                const id = await listDeleteTask(tasks.listArray);

                if(id !== '0'){

                    const ok = await confirm('¿Esta seguro de eliminar?');
    
                    if(ok){
                        tasks.deleteTask(id)
                        console.log('Tarea eliminada correctamente.')
                    }
                }


            break;


        }

        guardarDB(tasks.listArray);

        await pause()

    }while(opt !== "0")

}


main();