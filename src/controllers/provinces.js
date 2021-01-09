const knex=require('../config/db');
const {v4} = require('uuid');

const getAllProvinces=async(req,res)=>{
    try{
        const data=await knex('provinces').select('name','recovered','death','positive','url').where({'deleted':0})
        const response={
            status: true,
            totalData: data.length,
            message:'Fetching data success',
            data
        }
        res.status(200).send(response);
    }catch(err){
        res.status(404).send({
            status: false,
            message:'Fetching data failed'
        })
    }
}

const insertProvince=async(req,res)=>{
    const id=v4();
    const{name,recovered,death,positive}=req.body;
    const url=`/api/v1/provinces/${id}`;
    try{
        if(!name || !recovered || !death || !positive || name.length===0 || isNaN(recovered) 
        || isNaN(death) || isNaN(positive)) throw 'missing or invalid input';
        const parsedRecovered=parseInt(recovered);
        const parsedDeath=parseInt(death);
        const parsedPositive=parseInt(positive);
        
        await knex('provinces').insert({id,name,recovered: parsedRecovered,death: parsedDeath,positive: parsedPositive,url});
        const response={
            status: true,
            message: 'Storing data success',
            stored: {
                name,
                recovered: parsedRecovered,
                death: parsedDeath,
                positive: parsedPositive
            }
        };
        res.status(200).send(response);
    }catch(err){ 
        res.status(400).send({
            status: false,
            message: 'Storing data failed',
        });
    }
}

const updateProvince=async(req,res)=>{
    const {id,name,recovered,death,positive}=req.body;
    try{
        if(!id || !name || !recovered || !death || !positive || id.length===0 || name.length===0 || isNaN(recovered) 
        || isNaN(death) || isNaN(positive)) throw 'Invalid or missing input';
        const search=await knex('provinces').select('name','recovered','death','positive').where({id: id,deleted: 0});
        if(search.length===0) throw 'not found';
        const parsedRecovered=parseInt(recovered);
        const parsedDeath=parseInt(death);
        const parsedPositive=parseInt(positive);

        const before={
            name: search[0].name,
            recovered: search[0].recovered,
            death: search[0].death,
            positive: search[0].positive
        }

        const after={
            name,
            recovered: parsedRecovered,
            death: parsedDeath,
            positive:parsedPositive
        }
        await knex('provinces').where({id: id,deleted:0})
        .update({name,recovered: parsedRecovered,death: parsedDeath,positive: parsedPositive})
        res.status(200).send({
            status: true,
            message: 'Updating data success',
            before,
            after
        });

    }catch(err){
        if(err==='not found'){
            res.status(404).send({
                status: false,
                message: 'Id not found'
            })
        }else{
            res.status(400).send({
                status: false,
                message: 'Updating data failed'
            })
        }
    }
}

const deleteProvince=async(req,res)=>{
    const {id}=req.body;
    try{
        if(!id || id.length===0) throw 'invalid or missing input';
        const search=await knex('provinces').select('name','recovered','death','positive').where({id: id,deleted: 0});
        if(search.length===0) throw 'not found';
        const {name,recovered,death,positive}=search[0];
        await knex('provinces').where({id: id,deleted:0})
        .update({deleted: 1})
        res.status(200).send({
            status: true,
            message:"Destroy data success",
            stored:{name,recovered,death,positive},
        });
    }catch(err){
        if(err==='not found'){
            res.status(404).send({
                status: false,
                message: 'Id not found'
            })
        }else{
            res.status(403).send({
                status: false,
                message: 'Destroy data failed'
            })
        }
    }
}

const getProvince=async(req,res)=>{
    const id=req.params.id;
    try{
        const search=await knex('provinces').select('name','recovered','death','positive').where({id: id,deleted: 0});
        if(search.length===0) throw 'not found';
        res.status(200).send({
            status: true,
            stored: search[0]
        })
    }catch(err){
        res.status(404).send({
            status: false,
            message: 'Id not found'
        })
    }
}

module.exports={getAllProvinces,insertProvince,updateProvince,deleteProvince,getProvince}