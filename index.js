const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const jsonPath = path.resolve('./file/tasks.json');

app.use(express.json());
app.get('/tasks', async(req, res)=>{
    const jsonFile = await fs.readFile(jsonPath, 'utf8');
res.send(jsonFile);

});

app.post('/tasks', async(req, res)=>{
    const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    const ToDo = req.body;
    
    const index = taskArray.length - 1;
    const id = taskArray[index].id + 1;
    taskArray.push({...ToDo, id:id});
    await fs.writeFile(jsonPath, JSON.stringify(taskArray));
console.log(taskArray);
res.end();
});

app.put('/tasks', async(req, res) => {
    const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    const{id, status} = req.body;
    const taskIndex = taskArray.findIndex(task => task.id === id);
      if(taskIndex >= 0){
        taskArray[taskIndex].status = status;
      }
      await fs.writeFile(jsonPath, JSON.stringify(taskArray));
      
      res.end()
})

app.delete('/tasks', async(req, res) => {
    const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    const {id} = req.body;
    const taskIndex = taskArray.findIndex(task => task.id === id);
    taskArray.splice(taskIndex, 1);
    await fs.writeFile(jsonPath, JSON.stringify(taskArray));
      
      res.end()
})


const PORT = 8000;
app.listen(PORT, () =>{

    console.log(`El servidor esta escuchando en el purto ${PORT}`);
})