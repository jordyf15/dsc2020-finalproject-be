const provincesRouter=require('express').Router();
const {getAllProvinces,insertProvince,updateProvince,deleteProvince,getProvince}=require("../controllers/provinces");

provincesRouter.route('/api/v1/provinces')
.get(getAllProvinces)
.post(insertProvince)
.put(updateProvince)
.delete(deleteProvince);

provincesRouter.route('/api/v1/provinces/:id')
.get(getProvince);


module.exports=provincesRouter;