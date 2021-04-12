# Atelier Microservice Project

## RESTful API For 'Questions and Answers' On E-Commerce Site

<div style="text-align: center">
<img src="./readmeFiles/techStack.png" alt="Tech Stack: Node.js, Express, MongoDB, Docker, NGINX" height="75">
</div>
<!-- !["Tech Stack: Node.js, Express, MongoDB, Docker, NGINX"](./readmeFiles/techStack.png) -->
For this project I was given a set of CSV files containing millions of records for the 'Questions and Answers' section of an e-commerce website.  The goal was to produce a scalable API that had to serve pre-existing legacy front end code with 8 different endpoints. The minimum requirements where to serve 200 clients per second with <50ms average response times, though after initial deployment and load testing I was able to achieve 850 clients per second by horizontally scaling my service. This was all deployed using only AWS EC2 t2.micros.

The data I was provided with were three CSV files, each containing millions of records, for the questions, answers and answer photos. Because of how the data is nested I decided that using mongoDB with it's flexible document structure would allow me to best optimize for user queries. I implemented the server using node.js and express and used Docker for easy deployment. Lastly when it came to scaling horizontally I implemented a load balancer using NGINX

## Table of Contents

[Requirements](#requirements)

[Technologies Used](#technologies-used)

[Installation](#installation)

[System Architecture](#system-architecture)

[Load Testing](#load-testing)

[API Routes](#api-routes)

## Requirements

Ensure the following modules are installed before running `npm install`

- Node v14.15.0 or higher
- mongoDB v4.4.1 or higher
  > Alternatively project can be run using Docker

## Technologies Used

### Backend

- Node.js
- Express
- mongoDB
- Docker
- NGINX

### Testing

- Jest
- Loader.io

## Installation

1. Start an instance of mongoDB
   - If you have mongoDB installed locally you shouldn't need to do anything. If you get a connection error make sure mongo is running.
   - USING DOCKER
     ```
     docker run -d -p 27017:27017 mongo
     ```
     > This creates an instance of mongoDB running on localhost:27017
2. From the `server/` directory start the server by running:

   ```
   npm start
   ```

   - USING DOCKER
     - From the `server/` directory run:
       ```
       docker build -t qna_api .
       ```
     - After the image is built use the command:
       ```
       docker run -d -p 3000:3000 -e "CONNECTIONSTRING=mongodb://localhost:27017/atelier" qna_api
       ```
     - This will build a container that will run the server on port 3000.
       > If mongo is not running at `localhost:27017` then change the value of the "CONNECTIONSTRING" environment variable to connect to the appropriate location

3. The api will now be accessible on http://localhost:3000

## System Architecture

## Load Testing

## API Routes

- [List Questions](#list-questions)

- [List Answers](#list-answers)

- [Add A Question](#add-a-question)

- [Add An Answer](#add-an-answer)

- [Mark Question As Helpful](#mark-question-as-helpful)

- [Report Question](#report-question)

- [Mark Answer As Helpful](#mark-answer-as-helpful)

- [Report Answer](#report-answer)

### List Questions

`GET /qa/questions` Retrieves a list of questions for a particular product. This list _does not_ include any reported questions.

Parameters

| Parameters | Type    | In    | Description                                               |
| ---------- | ------- | ----- | --------------------------------------------------------- |
| product_id | integer | query | Specifies the product for which to retrieve questions     |
| page       | integer | query | Selects the page of results to return. Default 1.         |
| count      | integer | query | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK`

```JSON
{
  "product_id": 5,
  "results": [
    {
      "question_id": "601949a78f1fa4f66235be14",
      "question_body": "Why is this product cheaper here than other sites?",
      "question_date": "2018-10-18T00:00:00.000Z",
      "asker_name": "willsmith",
      "question_helpfulness": 4,
      "reported": 0,
      "answers": {
        "6018d01d601f020262e8180b": {
          "body": "We are selling it here without any markup from the middleman!",
          "photos": [
            {
              "_id": "60108729ffefc9bae1075657",
              "url": "https://image-url-placeholder"
            },
            {
              "_id": "60108729ffefc9bae107565d",
              "url": "https://image-url-placeholder"
            },
            //...
          ],
          "id": "6018d01d601f020262e8180b",
          "date": "2018-08-18T00:00:00.000Z",
          "answerer_name": "Seller",
          "helpfulness": 4
        },
        "606f16025f4933c8a5fe204e": {
          "body": ";lkjasd;lfjkasdf",
          "photos": [],
          "id": "606f16025f4933c8a5fe204e",
          "date": "2021-04-08T14:41:06.467Z",
          "answerer_name": "asdfasdf",
          "helpfulness": 0
        },
    //...
      },
    },
    //...
    
  ]
}
```

### List Answers

`GET /qa/questions/:question_id/answers` Returns answers for a given question. This list does not include any reported answers.

Parameters

| Parameters  | Type    | In    | Description                                                |
| ----------- | ------- | ----- | ---------------------------------------------------------- |
| question_id | string  | path  | Required UUID of the question for which answers are needed |
| page        | integer | query | Selects the page of results to return. Default 1.          |
| count       | integer | query | Specifies how many results per page to return. Default 5.  |

Response
`Status: 200 OK`

```JSON
{
  "question":"601949a78f1fa4f66235be11",
  "page":0,
  "count":5,
  "results":[
    {
      "answer_id":"6018d01d601f020262e817d6",
      "answerer_name":"sillyguy",
      "date":"2018-01-17T00:00:00.000Z",
      "helpfulness":6,
      "body":"Its the best! Seriously magic fabric",
      "photos":[
        
      ]
    },
    {
      "answer_id":"6018d01d601f020262e817d4",
      "answerer_name":"sillyguy",
      "date":"2018-01-17T00:00:00.000Z",
      "helpfulness":4,
      "body":"Something pretty soft but I can't be sure",
      "photos":[
        {
          "_id":"60108729ffefc9bae1075650",
          "url":"https://image-url-placeholder"
        },
        {
          "_id":"60108729ffefc9bae107565d",
          "url":"https://image-url-placeholder"
        },
        //...
      ]
    },
    //...
  ]
}
```

### Add A Question

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```

### Add An Answer

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```

### Mark Question As Helpful

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```

### Report Question

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```

### Mark Answer As Helpful

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```

### Report Answer

`GET /endpoint` Description

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
|            |      |     |             |

Response
`Status: `

```JSON

```
