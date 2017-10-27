class QueueQuery{
    constructor(){
        this.STUDENT_ID = "student_id";
    }
    
    getByStudentIdStatus(student_id,status){
        return `select * from in_queues q where q.student_id = ${student_id} and q.status like '%${status}%' `;
    }
}

module.exports = new QueueQuery();


