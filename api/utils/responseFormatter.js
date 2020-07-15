
module.exports={

    successResponse: function(pramCode,paramMessage,paramData){
       let status   =  "success";
       let code     =  pramCode;
       let message  =  paramMessage;
       let data     =  paramData
        
       return {status,code,message,data}
    },
 

    errorResponse: function (errCode,errMessage,errData){
      let status   =  "error";
      let code     =  errCode;
      let message  =  errMessage;
      let error    =  errData
        
       return {status,code,message,error}
    }

}