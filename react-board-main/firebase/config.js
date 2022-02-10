var mongoose = require("mongoose"); // MongoDB를 사용하기위해 mongoose 모듈 호출​

 var Schema = mongoose.Schema; // Data의 구조를 잡기위해 Schema 객체 설정​

 var dataSchema = new Schema({ // Data 구조 설정​

    title: String, orgFileName: String, saveFileName: String

 });

 // dataSchema를 기반으로하는 DBData 모델을 모듈화함.  ​​

 module.exports = mongoose.model("DBData", dataSchema); 
