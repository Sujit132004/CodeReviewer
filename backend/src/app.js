const express=require('express');
//server ek naya instance create hoga

const cors=require('cors');

const aiRoutes=require('./routes/ai.routes');

const app = express();

app.use(cors())

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World!');
})
app.use('/ai',aiRoutes);


module.exports=app;
