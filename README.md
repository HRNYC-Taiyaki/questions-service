# Atelier Microservice Project

## RESTful API For 'Questions and Answers' On E-Commerce Site

<div style="text-align: center">
<img src="./readmeFiles/techStack.png" alt="Tech Stack: Node.js, Express, MongoDB, Docker, NGINX" height="75">
</div>

For this project I was given a set of CSV files containing millions of records for the 'Questions and Answers' section of an e-commerce website.  The goal was to produce a scalable API that had to serve pre-existing legacy front end code with 8 different endpoints. The minimum requirements where to serve 200 clients per second with <50ms average response times, though after initial deployment and load testing I was able to achieve 850 clients per second by horizontally scaling my service. This was all deployed using only AWS EC2 t2.micros.

The data I was provided with were three CSV files, each containing millions of records, for the questions, answers and answer photos. Because of how the data is nested I decided that using mongoDB with it's flexible document structure would allow me to best optimize for user queries. I implemented the server using node.js and express and used Docker for easy deployment. Lastly when it came to scaling horizontally I implemented a load balancer using NGINX

## Table of Contents

[Requirements](#requirements)

[Technologies Used](#technologies-used)

[Installation](#installation)

[ETL Process](#etl-process)

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
- Mongoose ODM
- mongoDB
- Docker
- NGINX

### Testing

- Jest
- Loader.io

## Installation

### Running Locally
1. Start an instance of mongoDB
   - If you have mongoDB installed locally you shouldn't need to do anything. If you get a connection error make sure mongo is running.
   - Using Docker
     ```
     docker run -d -p 27017:27017 mongo
     ```
     > This creates an instance of mongoDB running on localhost:27017
2. From the `server/` directory start the server by running:

   ```
   npm start
   ```

3. The api will now be accessible on http://localhost:3000

### Using Docker
  1. From the `server/` directory run:
      ```
      docker build -t qna_api .
      ```
  2. After the image is built use the command:
      ```
      docker run -d -p 3000:3000 -e "CONNECTIONSTRING=mongodb://localhost:27017/atelier" qna_api
      ```
  3. This will build a container that will run the server on port 3000.
      > If mongo is not running at `localhost:27017` then change the value of the "CONNECTIONSTRING" environment variable to connect to the appropriate location

  4. The api will now be accessible on http://localhost:3000

## ETL Process
The first step of the project was to design a schema and pick a database based on the data we received in CSV format. For the Questions and Answers section I was given three CSV files:
```
questions.csv
├── id 
├── product_id
├── body
├── date_written
├── asker_name
├── asker_email
├── reported
└── helpful

answers.csv
├── id 
├── question_id 
├── body
├── date_written
├── answerer_name
├── answerer_email
├── reported
└── helpful

answers_photos.csv
├── id 
├── answer_id
└── url
```

I decided to use mongoDB because I felt the data lent itself to being embedded and mongo's flexible nature would allow me to structure data to optimize for user queries. In the end I settled on on a schema with two collections, one for the answers and one for the questions.  I would embed the answer photos in to the documents in the answers collection.

![Schema Diagram](/readmeFiles/schema-diagram.png)

To perform the required data transformations I leveraged mongoDB's powerful aggregation pipelines.
- Example of transformation for questions data [HERE](https://mongoplayground.net/p/QXdxFylWC_u)
- Example of transformation for answers data [HERE](https://mongoplayground.net/p/maffdpCUQAB)

### Key Decisions in ETL
- Keeping the answers data as a separate collection and adding the product_id foreign key to the answers.
  - In discussions with product stake-holders they specified that each question could potentially have thousands of answers. Combined with the requirement of making the answer text searchable I decided that it was best to keep the answers collection separate from the questions. I also added the related product id to each answer so that I could create an index and easily search the text of all the products answers.
- Converting from auto-incremented numeric ids to mongo's UUID
  - During development it became clear that trying to use numeric incrementing id numbers with mongo would force me to create my own numbering system that would impact query performance. Using mongo's build in UUID system meant that I wouldn't have to worry about generating unique ids.
- Embedding photos in to their corresponding photos
  - Because each answer has a maximum of 5 photos attached it was a perfect contender for embedding. Being able to embed the photos made returning answer data simpler and more importantly for the user faster.

## System Architecture
### Initial System Architecture  
![Initial System Architecture](/readmeFiles/initial-architecture.png)
> My initial deployment used two AWS EC2 t2.micros one for the Node server and one for the MongoDB database. This configuration was able to consistently respond to 330 clients per second with 100% throughput and average response times below 35ms

### Final System Architecture
To improve performance I decided to scale the service horizontally. I did this by adding 2 more instances of the Node server and adding NGINX for load balancing.  

![Final System Architecture](/readmeFiles/final-architecture.png)
> This arrangement was able to handle 850 clients per second with 100% throughput keeping average response times below 30ms. 

## Load Testing
_A more detailed journal of load testing can be found here: [Load Testing Q&A API](https://www.notion.so/Stress-Testing-Q-A-API-e73c17ac285d40279c54c19c628d2e8d)_
### Load Test - One API Instance
Using a single instance of the API server I managed to sometimes get 100% throughput on 10,000 clients over 30 seconds keeping the average and max response times in an acceptable range.

![Load Test 1 API 10,000 clients over 30 seconds](/readmeFiles/load-test-01.png)

Once the test was ramped up to 10,000 clients over 20 seconds the single server was unable to keep up and throughput fell dramatically. 

![Load Test 1 API 10,000 clients over 20 seconds](/readmeFiles/load-test-02.png)

### Load Test - Three API Instances With Round Robin Load Balancing
The first configuration of NGINX I used managed to consistently get 100% throughput up to around 650 clients per second. 

![Load Test 3 API Round Robin 10,000 clients over 20 seconds](/readmeFiles/load-test-03.png)
### Load Test - Three API Instances With Least Connections Load Balancing
I realized with only 3 instances I would likely be able to get some more performance out of the system if the load balancing method was changed to least connections.  With this configuration the service managed consistent 100% throughput at 850 clients per second.

![Load Test 3 API Least Connections 850 Clients per Second](/readmeFiles/load-test-04.png)


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

| Parameters  | Type    | In    | Description |
| ----------- | ------- | ----- | ----------- |
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

`POST /qa/questions` Adds a question for the given product

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| body | string | body | Text of question being asked |
| name | string | body | Username for question asker |
| email | string | body | Email address for question asker |
| product _id | integer | body | Required ID of the product for which the question is posted |

Response

`Status: 201 Created`

### Add An Answer

`POST /qa/questions/:question_id/answers` Adds an answer for the given question

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| question_id | string | path | Required UUID of the question to post the answer for |
| body | string | body | Test of question being asked |
| name | string | body | Username for question asker |
| email | string | body | Email address for question asker |
| photos | [string] | body | An array of urls corresponding to images to display | 

Response

`Status: 201 CREATED`

### Mark Question As Helpful

`PUT /qa/questions/:question_id/helpful` Updates a question to show it was found helpful.

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| question_id | string | path | Required UUID of the question to update |

Response

`Status: 204 NO CONTENT`

### Report Question

`PUT /qa/questions/:question_id/report` Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| question_id | string | path | Required UUID of the question to update |

Response

`Status: 204 NO CONTENT`

### Mark Answer As Helpful

`PUT /qa/answers/:answer_id/helpful` Updates an answer to show it was found helpful.

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| answer_id | string | path | Required UUID of teh answer to update |

Response

`Status: 204 NO CONTENT`

### Report Answer

`PUT /qa/answers/:answer_id/report` Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

Parameters

| Parameters | Type | In  | Description |
| ---------- | ---- | --- | ----------- |
| answer_id | string | path | Required UUID of teh answer to update |

Response

`Status: 204 NO CONTENT`
