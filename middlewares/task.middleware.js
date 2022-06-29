const { Task }= require ('../models/task.model');
const { AppError}= require ('../utils/appError');
const { catchAsync}= require ('../utils/catchAsync.util');

const validateStatus= catchAsync( async(req,res, next)=>{
  const valueStatus=[
      "active",
      "completed",
      "late",
      "cancelled"
  ];

  const indexStatus= valueStatus.indexOf(req.params.status);
  if (indexStatus === null) {
return next (new  AppError (`req.params.status`,401));      
  };
  req.status= valueStatus[indexStatus];
  next();


});


const validateTask= catchAsync(async(req, res, next)=>{
    const {id}=req.params;
    const task= await Task.findOne({
        where:{
            id,
            status:"active"
        }
    });
    next();
})

const comparateDate =catchAsync(async (req,res,next)=>{
    const {limitDate} = req.task;
    const{finishDate} = req.body;

    const finalDay = new Date(finishDate);
    if (Number(limitDate) > Number(finalDay)  ) {
        res.task.status ="completed"
    }else{
        req.task.status="late"
    };
    req.task.finishDate= finalDay;
    next();
});
module.exports ={validateStatus,validateTask,comparateDate}