const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices:
        [
            {
                value: '1',
                name: `${'1.'.green.green} Crear tarea`
            }, 
            {
                value: '2',
                name:  `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log("=======================".green);
    console.log("Seleccione una opcion".white);
    console.log("=======================".green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pause = async () => {

    const question = [
        {
            type:'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.green} para continuar`
        } 
    ];

    console.log('\n')
    await inquirer.prompt(question);
}

const readInput = async (message) => {

    const question = [
        {
            type:'input',
            name: 'opcion',
            message,
            validate(value){
                if(value.length === 0)
                {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        } 
    ];

    console.log('\n')
    const {opcion} = await inquirer.prompt(question);
    return opcion
}

const listDeleteTask = async(tasks = [])=> {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`

    })

    const question = {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }

    const {id} = await inquirer.prompt(question);

    return id
}

const confirm = async(message) => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message

    };

    const {ok} = await inquirer.prompt(question);

    return ok;
}

const listCheckTask = async(tasks = [])=> {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completed_at)? true: false
        }
    })

    const question = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }

    const {ids} = await inquirer.prompt(question);

    return ids
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listDeleteTask,
    confirm,
    listCheckTask
}