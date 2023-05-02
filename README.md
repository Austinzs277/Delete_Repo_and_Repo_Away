# this is building startup system milestone 3

# Local run instruction
1. how to run the backend
npm install
npm run dev / npm start

2. how to run frontend 
npm install 
npm start

### Data Model

- user
    - foodlist
        - foodId
            - name
            - number
            - cal
    - totalCal

Example:
{
    user_id1: {
        food: {
            23423409: {
                name: sweet apple
                number: 5,
                cal: 100
            },
            34524290: {
                name: pear
                number: 4,
                cal: 80
            }
        }, 
        total: 820
    }
}

### API
1. GET api/test: test whether we can get information from frontend

2. POST api/searchFood: call the third party api to get cal for food
    input: req.foodName
    output: res.foodName, res.calories, res.url

3. POST api/createFood: create or add food
    input: req.foodId
    output: 201/400

4. GET api/selectAllFood: get all food for the user
    output: res.all

5. PUT api/deleteFood: 
    input: req.foodId
    output: 201/400

6. PUT api/updateFood:
    input: req.newNumber
    output: req.number, req.cal, req.totalCal

7. login/logout: firebase auth

### Third Party API
https://trackapi.nutritionix.com/v2/search/instant?query={{food name}}


