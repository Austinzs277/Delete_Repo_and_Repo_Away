import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import fetch from "node-fetch";
import { initializeApp } from 'firebase/app';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  getFirestore,
  getDocs,
  getDoc
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAkcjeYtzVvvI2JUIjhrJ51Cs27P6-2qNQ',
  authDomain: 'milestone3-c374d.firebaseapp.com',
  projectId: 'milestone3-c374d',
  storageBucket: 'milestone3-c374d.appspot.com',
  messagingSenderId: '759498114377',
  appId: '1:759498114377:web:504ddd4d38864125ef0698',
  measurementId: 'G-S21F5C6KKD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// THIRD-PARTY APU -> search food from api 
export const searchFood = async (foodName) => {
  try {
    const apiKey = '8a3db390b40b467e88258d6974076992';
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&apiKey=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    // console.log('database.js -> food search data: ', searchData.results[0]);
    if (searchData.results[0]) {
      const foodId = searchData.results[0].id;
      const nutritionUrl = `https://api.spoonacular.com/recipes/${foodId}/nutritionWidget.json?apiKey=${apiKey}`;
      const nutritionResponse = await fetch(nutritionUrl);
      const nutritionData = await nutritionResponse.json();
      // console.log('database.js -> calories data', nutritionData.calories);
      console.log('database.js -> successfully retrive food from thirdpart API');
      return {
        name: searchData.results[0].title,
        image: searchData.results[0].image,
        imageType: searchData.results[0].imageType,
        calories: nutritionData.calories
      }
    }
  } catch (error) {
    console.error('Cannot get food from third-party-API', error);
    throw error;
  }
}

// SELECT/READ -> get all food intake documents for a user from Firestore
export const getAllFoodIntake = async (userId) => {
  const foodIntakeRef = collection(db, 'users', userId, 'foodIntake');
  try {
    const querySnapshot = await getDocs(foodIntakeRef);
    const foodIntakeList = []
    querySnapshot.forEach((doc) => {
      foodIntakeList.push({ id: doc.id, ...doc.data() });
    });
    if (foodIntakeList == null){
      return []
    } else {
      console.log('database.js -> successfully get all the food for the user')
      return foodIntakeList;
    }
  } catch (error) {
    console.error('database.js -> cannot select/read: ', error);
    throw error;
  }
};

// CREATE/ADD -> create a food and add to firestore
export const addFoodIntake = async (userId, foodName, calories) => {
  const foodIntakeRef = collection(db, 'users', userId, foodName);
  const newFood = {
    foodName: foodName,
    servingSize: 1,
    calorieData: calories,
    totalCalories: calories, // calculate total calories
  };
  // console.log("database.js -> new food: ", newFood)
  const docRef = doc(db, `users/${userId}/foodIntake/${foodName}`);
  try {
    await setDoc(docRef, newFood); 
    console.log("database.js -> successfully add food")
    return "success"
  } catch (error) {
    console.error('database.js -> cannot create food', error);
    throw error;
  }
};

// DELETE - delete a food from firestore
export const deleteFood = async (userId, foodName) => {
  const foodRef = doc(db, 'users', userId, 'foodIntake', foodName);
  try {
    await deleteDoc(foodRef);
    console.log('atabase.js -> food delete successfully');
    const allFood = await getAllFoodIntake(userId);
    if (allFood == null){
      return []
    }
    return allFood
  } catch (error) {
    console.error('database.js -> cannot delete from firestore: ', error);
    throw error;
  }
};

// UPDATE - update a food intake document in Firestore
export const updateFood = async (userId, foodName, updates) => {
  const foodRef = doc(db, 'users', userId, 'foodIntake', foodName);
  const apiKey = '8a3db390b40b467e88258d6974076992';
  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&apiKey=${apiKey}`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();
  const foodId = searchData.results[0].id;
  const nutritionUrl = `https://api.spoonacular.com/recipes/${foodId}/nutritionWidget.json?apiKey=${apiKey}`;
  const nutritionResponse = await fetch(nutritionUrl);
  const nutrition = await nutritionResponse.json();
  const coloaris = nutrition.calories

  const updatedFood = {
    foodName: foodName,
    calorieData: coloaris,
    servingSize: updates,
    totalCalories: coloaris * updates
  };
  try {
    await setDoc(foodRef, updatedFood);
    const allFood = await getAllFoodIntake(userId);
    console.log('database.js -> food update successfully');
    return allFood;
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// CREATE user 
export const checkUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("database.js -> user exist")
    } else {
      await setDoc(doc(db, "users", userId), {});
      console.log("database.js -> successfully create user" )
    }
    return "success"
  } catch (error) {
    console.error('Error chekcing users: ', error);
    throw error;
  }
};

// CREATE reivews
export const addReview = async (reviews) => {
  try {
    await addDoc(collection(db, 'reviews'), {
      content: reviews,
    });
    console.log('Review added successfully');
  } catch (error) {
    console.error('Error adding review: ', error);
    throw error;
  }
};

// SELECT/READ reviews
export const getReview = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const res = querySnapshot.docs.map((doc) => doc.data());

    console.log('Review get successfully', res);
    return res;
  } catch (error) {
    console.error('Error getting review: ', error);
    throw error;
  }
};


