const express = require('express');
const fs = require('fs');

// Data
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();

// express.json() => retorna um middleware - é uma função que permite que possamos modificar os dados vindos de uma request. (middle: esta entre a request e response)
app.use(express.json());

// função -> router handle; tours: resources
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // JSend format
    status: 'sucess',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
});

// Acessando os dados de um unico Tour; quando definios o endpoint com :nome, estamos falando que ele é um parametro. Para definirmos parametros da url que são opções utiliza-se /:y?
app.get('/api/v1/tours/:id', (req, res) => {
  // Acessando os parametros da URL
  // console.log(req.params); // retorna um objeto contendo todos os parametros da url: {id: numParametro}

  const id = Number(req.params.id);
  const tour = toursData.find((tour) => tour.id === id);

  if (tour) {
    const currentTour = toursData[id];
    res.status(200).json({
      status: 'sucess',
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Page not Found',
    });
  }
});

// Adding new tour
app.post(`/api/v1/tours/`, (req, res) => {
  // Por padrão os dados enviados estarão no body da request, porém, usando o express estes só estam disponiveis através dos middlewares
  // console.log(req.body);

  // Como estamos usando um JSON como um DB ficticio, precisamos definir um id
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  // Adicionando novo tour ao "DB" -> Como newTour é um OBJ, devemos converte-lo antes de adicionar ao arquivo json.
  toursData.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      // 201 === Created
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );

  // Obs: Mesmo quando estamos enviando um dado do client, é necessário enviar uma response do server
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started to listen requests on port ${port}`);
});
