const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

var dbName = "exam-portal"

 //var client = new MongoClient( 'mongodb://localhost:27017/examportal', {useNewUrlParser:true});
//var client = new MongoClient( 'mongodb+srv://admin:admin@cluster0-h4v6l.mongodb.net/dbname?retryWrites=true&w=majority', {useNewUrlParser:true});

var client =  new MongoClient('mongodb+srv://chakkiwala53:chakkiwala53@cluster0-pg0ue.mongodb.net/dbName?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});


var connection;
client.connect((err, con)=>{

        if(!err)
        {
                connection = con;
                console.log("database connected successfully");
        }
        else{
            console.log("database could not connect");
        }
})



const app = express();

app.use(cors());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept");
    next();
})

app.get('/', (req, res)=>{

    res.send({status:"ok", data:"this is a test api"});
})

// app.get('/save-test',(req,res)=>{
//     var name=req.body.subname;
//     res.send({satatus:"ok",data:name});
// })


app.get('/user', (req, res)=>{
    var id= req.query.id;
    res.send({status:"ok", data:[{name:"X", age:78, id:id},{name:"Y", age:67}]});
})

// app.get('/save-question',(req,res)=>{
//     var id=req.query.id;
//     res.send({status:"ok",data:[{name:"x"},{name:"y"}]});
// })


app.post('/sign-in', bodyParser.json() ,(req,res)=>{
                console.log(req.body);
        var collection = connection.db(dbName).collection('uauth');

        collection.find(req.body).toArray((err,docs)=>{
            if(!err && docs.length>0)
            {
                res.send({ status:"ok", data:docs });
            }
            else{
                res.send({status:"failed", data:err});
            }
        })
})



app.post('/sign-up', bodyParser.json() ,(req,res)=>{

 var collection = connection.db(dbName).collection('uauth');

collection.find({email:req.body.email}).toArray((err,docs)=>{
    if(!err && docs.length>0)
    {
       res.send({status:"failed", data:"email already Exist"})
    }
    else{
        
        collection.insert(req.body, (err,result)=>{
            if(!err)
            {
                res.send({ status:"ok", data:"signup success" });
            }
            else{
                res.send({status:"failed", data:err});
            }
        })

    }
    })
    
})

app.post('/save-question', bodyParser.json(),(req,res)=>{
    console.log(req.body.questionid[0]);
    console.log(req.body.subname);
    console.log(req.body.questionid[0].subname);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'subname':req.body.subname,'userid':req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
            collection.update({'subname':req.body.subname,'userid':req.body.userid},{
                "$push":{questionid:{"$each":[req.body.questionid[0]]}}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
           // res.send({status:"ok",data:"data stored in same table"});
        }else{
            collection.insert(req.body,(err,result)=>{
                if(!err){
                        res.send({status:"ok",data:"data successfully inserted"});
                }else{
                        res.send({status:"failed",data:"error occured"});
                }
            })
            // res.send({status:"ok",data:"data stored "});
        }
    })
   
})

app.post('/save-subjectinfo', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('subjectinfo');
    collection.find({subname:req.body.subname,userid:req.body.userid,examiner:req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"failed",data:"subject is already exist"})

        }else{
            collection.insert(req.body,(err,result)=>{
                if(!err){
                        res.send({status:"ok",data:"subject inserted"});
                }else{
                    res.send({status:"failed",data:"eror occured"});
                }
            })
        }
    })
   
})

app.post('/save-test', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('subject');
    collection.find({subname:req.body.subname,examiner:req.body.examiner,userid:req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"failed",data:"subnject is already exist"});

        }else{
            collection.insert(req.body,(err,document)=>{
                if(!err){
                        res.send({status:"ok",data:document});
                }else{
                    res.send({status:"failed",data:"eror occured"});
                }
            })
        }
    })
   
})


app.post('/save-submitlast', bodyParser.json(),(req,res)=>{
    console.log(req.body.questionid[0]);
    console.log(req.body.subname);
    console.log(req.body.questionid[0].subname);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'subname':req.body.subname,'userid':req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
            collection.update({'subname':req.body.subname,'userid':req.body.userid},{
                "$push":{questionid:{"$each":[req.body.questionid[0]]}}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
           
        }else{
            collection.insert(req.body,(err,result)=>{
                if(!err){
                        res.send({status:"ok",data:"data successfully inserted"});
                }else{
                        res.send({status:"failed",data:"error occured"});
                }
            })
            
        }
    })
   
})

app.post('/open-file', bodyParser.json(),(req,res)=>{
    console.log(req.body.userid);
    var collection=connection.db(dbName).collection('subjectinfo');
    collection.find({userid:req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/show-question', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'userid':req.body.userid,'subname':req.body.subname}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})


app.post('/save-paper', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    
    collection.insert(req.body,(err,docs)=>{
        if(!err){
                res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"eror occured"});
        }
    })
})


app.post('/save-paper-last', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    console.log(req.body.subname);
            collection.update({examsubject:req.body.subname,examiner:req.body.examiner,userid:req.body.userid},{
                "$set":{resultsetting:req.body.resultsetting,privacysetting:req.body.privacysetting,timersetting:req.body.timersetting}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
   
})


app.post('/open-paper', bodyParser.json(),(req,res)=>{
    console.log(req.body.userid);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({userid:req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/show-paper-detail', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({'userid':req.body.userid,'examsubject':req.body.examsubject,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/delete-paper-detail', bodyParser.json(),(req,res)=>{
    console.log(req.body.paperid);
    console.log(req.body.question);
    var collection=connection.db(dbName).collection('savepaper');
    //collection.find({_id:req.body.paperid,'paper.question':req.body.question}).toArray((err,docs)=>{
    collection.updateOne({_id:ObjectId(req.body.paperid),'paper.question':req.body.question},{
        $pull:{'paper':{question:req.body.question}}},{multi:false}
    ,(err,docs)=>{  
    if(!err && docs.length>0){
            res.send({status:"ok",data:"deleted"});
        }else{
            res.send({status:"failed",data:JSON.stringify(err)});
        }
    })
   
})


app.post('/update-paper-last', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    console.log(req.body.paper.question);
    var collection=connection.db(dbName).collection('savepaper');
    console.log(req.body.subname);
            collection.update({examsubject:req.body.examsubject,_id:ObjectId(req.body.userid)},{
                "$push":{paper:{question:req.body.paper.question,answer:req.body.paper.answer,tf:req.body.paper.tf,option:req.body.paper.option}}}
                ,(err,result)=>{
                        if(!err){
                            res.send({status:"ok",data:"data stored in same table"});
                        }else{
                            res.send({status:"ok",data:JSON.stringify(err)});
                        }
            })
   
})

app.post('/delete-paper',bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({'userid':req.body.userid,'examsubject':req.body.examsubject,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //res.send({status:"ok",data:docs[0]._id});
            collection.remove({_id:ObjectId(docs[0]._id)},(err,result)=>{
                if(!err && docs.length>0){
                   // res.send({status:"ok",data:"deleted"});
                   var collection=connection.db(dbName).collection('subject');
                   collection.remove({'userid':req.body.userid,'subname':req.body.examsubject,'examiner':req.body.examiner},(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"deleted"});
                    }else{
                        res.send({status:"failed",data:"error occured"});
                    } 
                })

                }else{
                    res.send({status:"failed",data:"error occured"});
                } 
            })
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
})


app.post('/open-join-paper',bodyParser.json(),(req,res)=>{
    console.log(req.body.privacysetting);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({privacysetting:req.body.privacysetting}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //console.log(docs);
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/join-test-detail',bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({_id:ObjectId(req.body.paperid)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //console.log(docs);
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/delete-q-bank',bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'userid':req.body.userid,'subname':req.body.subname,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //res.send({status:"ok",data:docs[0]._id});
            collection.remove({_id:ObjectId(docs[0]._id)},(err,result)=>{
                if(!err && docs.length>0){
                   // res.send({status:"ok",data:"deleted"});
                   var collection=connection.db(dbName).collection('subjectinfo');
                   collection.remove({'userid':req.body.userid,'subname':req.body.subname,'examiner':req.body.examiner},(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"deleted"});
                    }else{
                        res.send({status:"failed",data:"error occured"});
                    } 
                })

                }else{
                    res.send({status:"failed",data:"error occured"});
                } 
            })
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
})

app.post('/show-q-detail', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'userid':req.body.userid,'subname':req.body.subname,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})


app.post('/save-answer', bodyParser.json(),(req,res)=>{
    console.log(req.body.saveans[0]);
    console.log(req.body.examsubject);
    console.log(req.body.examiner);
    var collection=connection.db(dbName).collection('saveanswer');
    collection.find({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner,'examinerid':req.body.examinerid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
            collection.update({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner,'examinerid':req.body.examinerid},{
                "$push":{saveans:{"$each":[req.body.saveans[0]]}},'$set':{wronganswer:req.body.wronganswer,rightanswer:req.body.rightanswer}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
        //    res.send({status:"ok",})
        }else{
            collection.insert(req.body,(err,result)=>{
                if(!err){
                        res.send({status:"ok",data:"data successfully inserted"});
                }else{
                        res.send({status:"failed",data:"error occured"});
                }
            })
            
        }
    })
   
})


app.post('/show-result', bodyParser.json(),(req,res)=>{
    console.log(req.body.userid);
    var collection=connection.db(dbName).collection('saveanswer');
    collection.find({'userid':req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})


app.listen(3000, ()=>{console.log("server is listining on port 3000")});

