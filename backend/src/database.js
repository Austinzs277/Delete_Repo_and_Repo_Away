import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  getFirestore,
  getDocs,
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

export const addFoodIntake = async (
  userId,
  foodName,
  servingSize,
  calorieData
) => {
  const foodIntakeRef = collection(db, 'users', userId, foodName);
  const newFoodIntake = {
    foodName: foodName,
    servingSize: servingSize,
    calorieData: calorieData,
    totalCalories: servingSize * calorieData, // calculate total calories
  };
  const docRef = doc(db, `users/${userId}/foodIntake/${foodName}`);
  try {
    //const docRef = await addDoc(foodIntakeRef, newFoodIntake);
    // const docRef = await addDoc(
    //   doc(db, 'users', userId, 'foodName', foodName),
    //   newFoodIntake
    // );

    // const docRef = await addDoc(
    //   collection(db, `users/${userId}/foodIntake`),
    //   newFoodIntake,
    //   foodName
    // );
    await setDoc(docRef, newFoodIntake);
    //console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// READ - Get all food intake documents for a user from Firestore
export const getAllFoodIntake = async (userId) => {
  const foodIntakeRef = collection(db, 'users', userId, 'foodIntake');
  try {
    const querySnapshot = await getDocs(foodIntakeRef);
    const foodIntakeList = [];
    querySnapshot.forEach((doc) => {
      foodIntakeList.push({ id: doc.id, ...doc.data() });
    });
    return foodIntakeList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// UPDATE - Update a food intake document in Firestore
export const updateFoodIntake = async (userId, foodIntakeId, updates) => {
  const foodIntakeRef = doc(db, 'users', userId, 'foodIntake', foodIntakeId);
  const updatedFoodIntake = {
    ...updates,
    updatedAt: serverTimestamp(), // update timestamp
  };
  try {
    await updateDoc(foodIntakeRef, updatedFoodIntake);
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// DELETE - Delete a food intake document from Firestore
export const deleteFoodIntake = async (userId, foodName) => {
  const foodIntakeRef = doc(db, 'users', userId, 'foodIntake', foodName);
  try {
    await deleteDoc(foodIntakeRef);
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

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


