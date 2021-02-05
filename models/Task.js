const { v4: uuid_v4} = require('uuid')

class Task {

    id = '';
    description = '';
    completed_at = null;

    constructor( description ){

        this.id = uuid_v4();
        this.description = description;
        this.completed_at = null

    }

}


module.exports = Task;