const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const soc=require('socket.io');
const path=require('path');

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
const server=app.listen(80, ()=>{console.log("server is listining on port 80")});

const io=soc.listen(server);
app.use(cors());
app.use(express.static(path.join(__dirname,'mypro')));

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


// app.get('/user', (req, res)=>{
//     var id= req.query.id;
//     res.send({status:"ok", data:[{name:"X", age:78, id:id},{name:"Y", age:67}]});
// })

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

// app.get('/save-question',(req,res)=>{
//     var id=req.query.id;
//     res.send({status:"ok",data:[{name:"x"},{name:"y"}]});
// })


app.post('/sign-in', bodyParser.json() ,(req,res)=>{
                console.log(req.body);
        var collection = connection.db(dbName).collection('uauth');

        collection.find({email:req.body.email,password:req.body.password}).toArray((err,docs)=>{
            if(!err && docs.length>0)
            {
                res.send({ status:"ok", data:docs });
            }
            else{
                res.send({status:"failed", data:'username or password are invalid'});
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
  //  console.log(req.body.que[0]);
    console.log(req.body.subname);
    //console.log(req.body.questionid[0].subname);
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

//var arraydoc=[];
app.post('/save-submitlast', bodyParser.json(),(req,res)=>{
    console.log(req.body.questionid[0]);
    console.log(req.body.subname);
    console.log(req.body.questionid[0].subname);
    var collection=connection.db(dbName).collection('savequestion');
    var collection2=connection.db(dbName).collection('subjectinfo');
    collection.find({'subname':req.body.subname,'userid':req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
           // var arraydoc=docs;
            collection.update({'subname':req.body.subname,'userid':req.body.userid},{
                "$push":{questionid:{"$each":[req.body.questionid[0]]}},"$set":{privacysetting:req.body.privacysetting,privacy2setting:req.body.privacy2setting}}
                ,(err,result)=>{
                        if(!err){
                            console.log(docs[0]._id);
                            var paper_id=docs[0]._id;
                            console.log(paper_id);
                            collection2.update({'subname':req.body.subname,'userid':req.body.userid,'examiner':req.body.examiner},{
                                "$set":{paperid:paper_id}} ,(err,result)=>{
                                    if(!err){
                                        res.send({status:"ok",data:docs});
                                    }else{
                                        res.send({status:"ok",data:JSON.stringify(err)});
                                    }
                            
                                })
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
           
        }else{
            collection.insert(req.body,(err,docs)=>{
                if(!err ){
                    // console.log("updated");
                    // // collection.update({'subname':req.body.subname,'userid':req.body.userid},{
                    // //     "$push":{questionid:{"$each":[req.body.questionid[0]]}},"$set":{privacysetting:req.body.privacysetting,privacy2setting:req.body.privacy2setting}}
                    // //     ,(err,result)=>{
                    // //             if(!err){
                    //                 console.log(docs[0]._id);
                    //                 var paper_id=docs[0]._id;
                    //                 console.log(paper_id);
                    //                 collection2.update({'subname':req.body.subname,'userid':req.body.userid,'examiner':req.body.examiner},{
                    //                     "$set":{paperid:paper_id}} ,(err,result)=>{
                    //                         if(!err){
                    //                             res.send({status:"ok",data:docs});
                    //                         }else{
                    //                             res.send({status:"ok",data:JSON.stringify(err)});
                    //                         }
                                    
                    //                     })
                    // //         }else{
                    // //             res.send({status:"ok",data:JSON.stringify(err)});
                    // //         }
                    // // })
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
    console.log(req.body.subname);
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

app.post('/show-all-questionpaper', bodyParser.json(),(req,res)=>{
    //console.log(req.body.subname);
    console.log(req.body);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'_id':ObjectId(req.body.paperid)}).toArray((err,docs)=>{
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
    var collection2=connection.db(dbName).collection('subject');
    collection.insert(req.body,(err,result)=>{
        if(!err){
            collection.find({'examsubject':req.body.examsubject,'examiner':req.body.examiner,'userid':req.body.userid,'questionid':req.body.questionid}).toArray((err,docs)=>{
                if(!err && docs.length>0){
                    console.log("299");
                    console.log(docs[0]._id)
                    collection2.update({'subname':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                        "$set":{paperid:docs[0]._id}} ,(err,result)=>{
                            if(!err){
                                res.send({status:"ok",data:docs});
                            }else{
                                res.send({status:"ok",data:JSON.stringify(err)});
                            }
                    
                        })
        
                }else{
                    console.log("302");
                    res.send({status:"failed",data:"error occured"});
                }
            })
              
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
                "$set":{timer:req.body.timer,privacysetting:req.body.privacysetting,timersetting:req.body.timersetting}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
   
})

var count;
app.post('/open-paper', bodyParser.json(),(req,res)=>{
    console.log(req.body.userid);
    var collection=connection.db(dbName).collection('subject');
    collection.find({userid:req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            var count=docs.length;
            var array=[];
            var countone=1;
            collection.find({userid:req.body.userid}).forEach(function(doc){  
                console.log(count);
               // console.log(doc);
                if(doc.paperid){                   
                    console.log("351");
                    console.log(doc._id);
                    array.push(doc);
                }else{
                    console.log("356");
                    console.log(doc._id);
                    collection.deleteOne({_id:ObjectId(doc._id)},(err,result)=>{
                        if(!err){
                    console.log("357");
                        }else{
                            console.log("359");
                        }
                    })
                } 
                if(countone>=count){
             console.log("363");
            console.log(array);
            res.send({status:"ok",data:array});
                }else{
                countone++;
            }
            })

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/show-paper-detail', bodyParser.json(),(req,res)=>{
    console.log("384");
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({'_id':ObjectId(req.body.paperid)}).toArray((err,docs)=>{
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
    ,(err,result)=>{  
    if(!err){
            res.send({status:"ok",data:"deleted"});
        }else{
            res.send({status:"failed",data:err});
        }
    })
   
})


app.post('/update-paper-last', bodyParser.json(),(req,res)=>{
    console.log("379");
    console.log(req.body);
    console.log(req.body.paper);
    console.log(req.body.paper[0]);
    var collection=connection.db(dbName).collection('savepaper');
    console.log(req.body.subname);
            collection.update({_id:ObjectId(req.body.paperid)},{
                "$push":{paper:req.body.paper}}
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
    var collection2=connection.db(dbName).collection('subject');
    collection.find({_id:ObjectId(req.body.paperid)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //res.send({status:"ok",data:docs[0]._id});
            console.log("440");
            collection.remove({_id:ObjectId(req.body.paperid)},(err,result)=>{
                if(!err){
                   // res.send({status:"ok",data:"deleted"});
                 console.log("445");
                   collection2.remove({_id:ObjectId(req.body.id)},(err,result)=>{
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
//const http=require('http').Server;

io.on('connection',(client)=>{
    console.log('hello everyone');
    client.on('join',()=>{
        
        client.username='kutte';
//console.log(client.username);
    });
    // function userinfo(data){
    //     io.sockets.emit('new data',a);
    // }
});
var currentdate=new Date();
let filter;
var b=[];
var a=[];
app.post('/open-join-paper',bodyParser.json(),(req,res)=>{
    console.log(req.body.privacysetting);
    var collection=connection.db(dbName).collection('savepaper');
  
    collection.find({privacysetting:req.body.privacysetting}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            collection.find({privacysetting:req.body.privacysetting}).forEach(function(doc){
                if(doc.schedule=="schedule"){
                    var schedule =require('node-schedule');
                     var startfrom=doc.fromdate;
                     var endto=doc.todate;
                     var j=schedule.scheduleJob(startfrom,function(){
                        b.push(doc);            
                     let uniqId={};
                  b=(b.filter(obj=>!uniqId[obj._id] && (uniqId[obj._id]=true)));
                  userinfo();
                     
                 })
                 var k=schedule.scheduleJob(endto,function(){
                     let uniqId={};
                     b=(b.filter(obj=>!uniqId[obj._id] && (uniqId[obj._id]=true)));
                     b=b.filter(obj=>obj._id!=doc._id);
                     userinfo();      
                  
                })
                }
                else if(doc.schedule=="live now"){
                   
                b.push(doc);
                
                let uniqId={};
                  b=(b.filter(obj=>!uniqId[obj._id] && (uniqId[obj._id]=true)));
                  userinfo();
                  
                }
                   function userinfo(){
                    io.sockets.emit('new data',b);
                   
                }
            
            })

            
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
    collection.find({'_id':ObjectId(req.body.paperid)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //res.send({status:"ok",data:docs[0]._id});
            collection.remove({_id:ObjectId(docs[0]._id)},(err,result)=>{
                if(!err){
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
    console.log(req.body.paperid);
    var collection=connection.db(dbName).collection('savequestion');
    collection.find({'_id':ObjectId(req.body.paperid)}).toArray((err,docs)=>{
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
    console.log("438"+" "+req.body.examinerid)
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

app.post('/check-join-paper', bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('saveanswer');
    collection.find({'paperid':req.body.paperid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/open-join-answer',bodyParser.json(),(req,res)=>{
  //  console.log("496"+" "+req.body.userid);
    var collection=connection.db(dbName).collection('saveanswer');
   
    collection.find({userid:req.body.userid}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/open-student-qbank',bodyParser.json(),(req,res)=>{
    var collection=connection.db(dbName).collection('savequestion');
   
    collection.find().toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})


app.post('/show-qbank-detail',bodyParser.json(),(req,res)=>{
    console.log("679");
    console.log(req.body.id);
    var collection=connection.db(dbName).collection('savequestion');
   
    collection.find({_id:ObjectId(req.body.id)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("685");
            res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/show-all-result', bodyParser.json(),(req,res)=>{
    //console.log(req.body.userid);
    var collection=connection.db(dbName).collection('saveanswer');
    collection.aggregate([{"$match":{examinerid:req.body.userid}},{"$group":{_id:{examsubject:"$examsubject",examiner:"$examiner"},count:{$sum:1}}}]).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("542"+" "+JSON.stringify(docs));
            res.send({status:"ok",data:docs});

        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/view-all-result',bodyParser.json(),(req,res)=>{
    var collection=connection.db(dbName).collection('saveanswer');
   
    collection.find({examinerid:req.body.examinerid,examsubject:req.body.examsubject,examiner:req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            //console.log("559"+" "+JSON.stringify(docs));
            res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/update-privacy-setting', bodyParser.json(),(req,res)=>{
    console.log(req.body.paperid);
    var collection=connection.db(dbName).collection('savepaper');
   // console.log(req.body.subname);
            collection.update({_id:ObjectId(req.body.paperid)},{
                "$set":{privacysetting:req.body.privacy}}
            ,(err,docs)=>{
                    if(!err && docs.length>0){
                        res.send({status:"failed",data:JSON.stringify(err)});
                    }else{
                       s
                        res.send({status:"ok",data:"updated"});
                    }
            })
   
})

app.post('/save-question-manually', bodyParser.json(),(req,res)=>{
    console.log(req.body.paper[0]);
    console.log(req.body.subname);
    console.log(req.body.paper[0].subname);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
            collection.update({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                "$push":{paper:{"$each":[req.body.paper[0]]}}}
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

app.post('/save-question-last-manually', bodyParser.json(),(req,res)=>{
    console.log(req.body.paper[0]);
    console.log(req.body.subname);
    console.log(req.body.paper[0].subname);
    var collection=connection.db(dbName).collection('savepaper');
    var collection2=connection.db(dbName).collection('subjectinfo');
    collection.find({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("769");
            collection.update({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                "$push":{paper:{"$each":[req.body.paper[0]]}},"$set":{privacysetting:req.body.privacysetting,privacy2setting:req.body.privacy2setting}}
            ,(err,document)=>{
                    if(!err){
                        console.log("774");
                        console.log(docs[0]._id)
                        collection2.update({'subname':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                            "$set":{paperid:[docs[0]._id]}} ,(err,result)=>{
                                if(!err){
                                    res.send({status:"ok",data:docs});
                                }else{
                                    res.send({status:"ok",data:JSON.stringify(err)});
                                }
                        
                            })
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
           // res.send({status:"ok",data:"data stored in same table"});
        }else{
            console.log("791");
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
app.post('/savequestion-last-manually', bodyParser.json(),(req,res)=>{
    console.log(req.body.paper[0]);
    console.log(req.body.subname);
    console.log(req.body.paper[0].subname);
    var collection=connection.db(dbName).collection('savepaper');
    var collection2=connection.db(dbName).collection('subject');
    collection.find({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("updated");
            collection.update({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                "$push":{paper:{"$each":[req.body.paper[0]]}}}
            ,(err,document)=>{
                    if(!err){
                        console.log(docs[0]._id)
                        collection2.update({'subname':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                            "$set":{paperid:docs[0]._id}} ,(err,result)=>{
                                if(!err){
                                    res.send({status:"ok",data:docs});
                                }else{
                                    res.send({status:"ok",data:JSON.stringify(err)});
                                }
                        
                            })
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
           // res.send({status:"ok",data:"data stored in same table"});
        }else{
            collection.insert(req.body,(err,result)=>{
                if(!err){
                    collection.find({'examsubject':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner}).toArray((err,docs)=>{
                        if(!err && docs.length>0){
                            collection2.update({'subname':req.body.examsubject,'userid':req.body.userid,'examiner':req.body.examiner},{
                                "$set":{paperid:docs[0]._id}} ,(err,result)=>{
                                    if(!err){
                                        res.send({status:"ok",data:docs});
                                    }else{
                                        res.send({status:"ok",data:JSON.stringify(err)});
                                    }
                            
                                })
                        }
                        })
                       // res.send({status:"ok",data:"data successfully inserted"});
                }else{
                        res.send({status:"failed",data:"error occured"});
                }
            })
            // res.send({status:"ok",data:"data stored "});
        }
    })
   
})

app.post('/save-paper-lastone', bodyParser.json(),(req,res)=>{
   // console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    console.log(req.body.id);
    console.log(req.body.pass);
    console.log(req.body.privacy2setting);
            collection.update({examsubject:req.body.subname,examiner:req.body.examiner,userid:req.body.userid},{
                "$set":{timer:req.body.timer,privacysetting:req.body.privacysetting,timersetting:req.body.timersetting,privacy2setting:req.body.privacy2setting,id:req.body.id,pass:req.body.pass}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
   
})

app.post('/open-join-paper-idpass',bodyParser.json(),(req,res)=>{
    console.log("383  a  "+b.length);
    //Date String Start
    var date1=new Date()
    //var datestring=+date1.getFullYear()+"-"+("0"+(date1.getMonth()+1)).slice(-2)+"-"+("0"+date1.getDate()).slice(-2)+"T"+("0"+date1.getHours()).slice(-2)+":"+("0"+date1.getMinutes()).slice(-2);
    var datestring=date1.toISOString();
	datestring=datestring.slice(0,-8);
    //Date String Stop

    //Data Var
    var barray;
    //Data Var Created

    var collection=connection.db(dbName).collection('savepaper');
    var collection2=connection.db(dbName).collection('saveanswer');
   
    collection.find({privacysetting:"private",privacy2setting:req.body.privacy2setting,id:parseInt(req.body.id),pass:req.body.pass}).toArray((err,document)=>{
        if(!err && document.length>0){
            console.log(document[0]._id);
                   collection2.find({paperid:document[0]._id.toString(),userid:req.body.userid}).toArray((err,docs)=>{
                        if(!err && docs.length>0){
                            
                            res.send({status:"failed",data:"You already gave this test"});
                        }else{
                                 if(document[0].schedule=="schedule"){
                                      var startfrom=document[0].fromdate;
                                   
                                      var endto=document[0].todate;
                               if(datestring<startfrom){
                                console.log("977");
                                startfrom=startfrom.replace("T"," ");
                                 res.send({status:"failed",data:"Your Exam Is Scheduled On  "+startfrom});
                                  }
                                else if(datestring>=startfrom && datestring<=endto){
                                    console.log("981");
                                    res.send({status:"ok",data:document[0]._id});
                                 }
                               else if(endto>startfrom && datestring>endto){
                                console.log("985");
                                endto=endto.replace("T"," ");
                                 res.send({status:"failed",data:"Your Exam is Over "+endto});
                              
                                }
                                 }
                                 else if(document[0].schedule=="live now"){
                                    res.send({status:"ok",data:document[0]._id});
                                 }
                                   
                                   
                        }
                    })


        }else{
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})

app.post('/update-privacy2-setting', bodyParser.json(),(req,res)=>{
    console.log(req.body.paperid);
    var collection=connection.db(dbName).collection('savepaper');
   // console.log(req.body.subname);
            collection.update({_id:ObjectId(req.body.paperid)},{
                "$set":{privacy2setting:req.body.privacy2}}
            ,(err,docs)=>{
                    if(!err && docs.length>0){
                        res.send({status:"failed",data:JSON.stringify(err)});
                    }else{
                       
                        res.send({status:"ok",data:"updated"});
                    }
            })
   
})

app.post('/updateandsave-paper-last',bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    // collection.find({_id:ObjectId(req.body.paperid}).toArray((err,docs)=>{
    //     if(!err && docs.length>0){
    //         console.log("updated");
            collection.update({_id:ObjectId(req.body.paperid)},{
                "$set":{'privacysetting':req.body.privacysetting,'privacy2setting':req.body.privacy2setting,'timer':req.body.timer,'timersetting':req.body.timersetting,'schedule':req.body.schedule,'perquestion':req.body.perquestion,'passCritertia':req.body.passCriteria,'fromdate':req.body.fromdate,'todate':req.body.todate,'studentSetting':req.body.studentSetting}}
            ,(err,result)=>{
                    if(!err){
                        res.send({status:"ok",data:"data stored in same table"});
                    }else{
                        res.send({status:"ok",data:JSON.stringify(err)});
                    }
            })
         
    //     }else{
    //         collection.insert(req.body,(err,result)=>{
    //             if(!err){
    //                     res.send({status:"ok",data:"data successfully inserted"});
    //             }else{
    //                     res.send({status:"failed",data:"error occured"});
    //             }
    //         })
    //         // res.send({status:"ok",data:"data stored "});
    //     }
    // })

})


app.post('/check-schedule',bodyParser.json(),(req,res)=>{

    console.log(req.body._id);
    var collection=connection.db(dbName).collection('savepaper');
   
    collection.find({_id:ObjectId(req.body._id)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:"data stored "});
        }else{
            res.send({status:"failed",data:"data stored "});
        }
    })
})

app.post('/check-student-detail',bodyParser.json(),(req,res)=>{
    console.log(req.body);
    var collection=connection.db(dbName).collection('savepaper');
    collection.find({_id:ObjectId(req.body.paperid)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            res.send({status:"ok",data:docs});
        }else{
            res.send({status:"failed",data:"invalid"});
        }

    })

})
app.post('/add-questioninbank',bodyParser.json(),(req,res)=>{
    console.log(req.body.paper[0]);
    console.log(req.body.objid);
    var collection=connection.db(dbName).collection('savequestion');
collection.find({'_id':ObjectId(req.body.objid)}).toArray((err,docs)=>{
    if(!err && docs.length>0){
        collection.update({'_id':ObjectId(req.body.objid)},{
            "$push":{questionid:{"$each":[req.body.paper[0]]}}}
        ,(err,result)=>{
                if(!err){
                    res.send({status:"ok",data:"data stored in same table"});
                }else{
                    res.send({status:"ok",data:JSON.stringify(err)});
                }
        })
       // res.send({status:"ok",data:"data stored in same table"});
    }else{
        // collection.insert(req.body,(err,result)=>{
        //     if(!err){
        //             res.send({status:"ok",data:"data successfully inserted"});
        //     }else{
        //             res.send({status:"failed",data:"error occured"});
        //     }
        // })
        res.send({status:"failed",data:"Question Bank Not Created"});
    }
})

})
app.post('/add-questioninbank-last',bodyParser.json(),(req,res)=>{
    console.log(req.body.paper[0]);
    console.log(req.body.objid);
    var collection=connection.db(dbName).collection('savequestion');
collection.find({'_id':ObjectId(req.body.objid)}).toArray((err,docs)=>{
    if(!err && docs.length>0){
        collection.update({'_id':ObjectId(req.body.objid)},{
            "$push":{questionid:{"$each":[req.body.paper[0]]}}}
        ,(err,result)=>{
                if(!err){
                    console.log("897"+docs);
                    res.send({status:"ok",data:docs});
                }else{
                    res.send({status:"ok",data:JSON.stringify(err)});
                }
        })
       // res.send({status:"ok",data:"data stored in same table"});
    }else{
        // collection.insert(req.body,(err,result)=>{
        //     if(!err){
        //             res.send({status:"ok",data:"data successfully inserted"});
        //     }else{
        //             res.send({status:"failed",data:"error occured"});
        //     }
        // })
        res.send({status:"failed",data:"Question Bank Not Created"});
    }
})

})


app.post('/show-result-check',bodyParser.json(),(req,res)=>{
    console.log("1081  "+req.body.id);
    var collection=connection.db(dbName).collection('saveanswer');
   
    collection.find({_id:ObjectId(req.body.id)}).toArray((err,docs)=>{
        if(!err && docs.length>0){
            console.log("1086");
            res.send({status:"ok",data:docs});
        }else{
            console.log("1089");
            res.send({status:"failed",data:"error occured"});
        }
    })
   
})