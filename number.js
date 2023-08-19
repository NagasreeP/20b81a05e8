const express=require("express");
const axios=require("axios");
const app=express();
app.use(express.json());
app.listen(3000,"127.0.0.1",()=>{
    console.log("server is listening at port 3000");
});
app.get('/n',async(req,res)=>{
    const inputurl=req.query.url;
    const final=Array.isArray(inputurl)?inputurl:[inputurl];
    try{
        const arr=[];
        const values=inputurl.map(url=>axios.get(url));
        const res=await Promise.allSettled(values);
        res.forEach(n=>{
            if(n.status==="done" && n.value.data.arr){
                arr.push(...res.value.data.n);
            }
        });
        const uniq=[...new Set(n)];
        const sort=uniq.sort((i1,i2)=>i1-i2);
        res.jason({arr:sort});
    }
    catch(error){
        console.log(error);
    }
});