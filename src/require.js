const {MongClient,ObjectId}=require("mongodb")
const url="mongodb://localhost:27017";


function require(){
    //可导出模块，写内部逻辑
    class require{
        constructor(aname,cname){
            this.aname=aname;
            this.cname=cname;
        }
        connect(method){
            MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
                if(err){
                    return err
                }
                let col=client.db(this.aname).collection(this.cname)
                method&&method(col)
                client.close()
            })
        }

        
        find({query,sort={},limit=0,skip=0,cb}){
            this.connect(function(col){
                col.find(query).sort(sort).limit(limit).skip(skip).toArray((err,rs)=>{
                    if(err){
                        return err
                    }
                    cb&&cb(rs)
                })
            })
        }
    }

}
return require
function define(){
    //定义模块，写内部逻辑

}