const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require("cors");

const app = express();
const PORT = process.env.SERVER_PORT;
const NEO4J_HOST = process.env.DB_HOST;
let driver;

try {
  
  driver = neo4j.driver(
    `bolt://${NEO4J_HOST}:7687`, 
    neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD))

  const serverInfo = driver.getServerInfo()
  console.log('Connection established')
  console.log("serverInfo:\n", serverInfo)
} catch(err) {
  console.log(`Connection error\n${err}\nCause: ${err.cause}`)
}                  
                            
const session = driver.session();

app.use(cors()); // app.use(cors({ origin: 'http://localhost'}));
app.use(express.json());

let tasks = [];

// Получение списка задач
app.get('/tasks', async (req, res) => {
    const result = await session.run('MATCH (t:Task) RETURN t');
    const tasks = result.records.map(record => record.get('t').properties);
    res.json(tasks);
  });
  

// Добавление новой задачи
app.post('/task', async (req, res) => {
    const newTask = req.body;
    try {
      const result = await session.run('CREATE (t:Task {id: $id, title: $title, completed: $completed}) RETURN t', newTask);
      const task = result.records[0].get('t').properties;
      res.status(201).json(task);
    } catch (error){
      res.status(500).json(error);
    }
  });
  
  
// Изменение статуса задачи
app.put('/task/:id', async (req, res) => {

    const taskId = req.params.id;
    if (!taskId) res.status(400).json("Отстутсвует id задачи"); 
    const completed = req.body.completed;
    const result = await session.run('MATCH (t:Task) WHERE t.id = $id SET t.completed = $completed RETURN t', { id: parseInt(taskId), completed: completed });
    if (!result?.records.length) {
      res.status(500).json(error);
    } else {
      const task = result.records[0].get('t').properties;
      res.json(task);
    }
  });
  
  
// Удаление задачи
app.delete('/task/:id', async (req, res) => {
    const taskId = req.params.id;
    await session.run('MATCH (t:Task) WHERE t.id = $id DETACH DELETE t', { id: parseInt(taskId) });
    res.sendStatus(204);
  })
  
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  