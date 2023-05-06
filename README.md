# this is building startup system milestone 3

# Local run instruction
1. how to run the backend

npm install

npm run dev / npm start

2. how to run frontend 

npm install 

npm start

### Data Model

table 1:
- users
    - user
        - foodIntake
            - {food}
                - calorieData
                - foodName
                - servingSize
                - totalCalories

table 2:

- reviews
    - reivew

### API

1. login/logout: firebase auth

2. POST api/searchFood: call the third party api to get cal for food
    - input: req.body.foodName
    - output: a json object: {name, image, imageType, calories}

3. POST api/selectAllFood: get all food for the user
    - input: req.body.username
    - output: allFood(json)

4. POST api/addFood: Add food **(only 1, can't take other number)**
    - input: req.body.username (username), req.body.foodName, req.body.calories, req.body.number
    - output: 200/error

5. POST api/deleteFood: delete food fron firestore
    - input: req.body.username, req.body.foodName
    - output: 200/400

5. PUT api/updateFood: update the number of the food, **only add 1**
    - input: req.body.username, req.body.foodName
    - output: 201/400

6. GET api/reviews

7. POST api/reviews 


### Third Party API
https://trackapi.nutritionix.com/v2/search/instant?query={{food name}}


