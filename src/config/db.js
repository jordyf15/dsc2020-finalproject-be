const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        port: '3336',
        user: 'root',
        password:'',
        database:'dsc-backend-fe'
    }
})

module.exports=knex;