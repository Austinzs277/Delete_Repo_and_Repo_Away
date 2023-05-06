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

    input: req.foodName

    output: res.foodName, res.calories, res.url

2. POST api/addFood: Add food

    input: req.foodId

    output: 201/400

3. GET api/selectAllFood: get all food for the user

    output: res.all

4. PUT api/deleteFood

    input: req.foodId

    output: 201/400

5. PUT api/updateFood

    input: req.newNumber

    output: req.number, req.cal, req.totalCal

6. GET api/reviews

7. POST api/reviews 


### Third Party API
https://trackapi.nutritionix.com/v2/search/instant?query={{food name}}


