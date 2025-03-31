const express = require('express');
const { UserController } = require('../../controllers');
const { MealPlanController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');
const router = express.Router();
router.post('/signup', UserController.signup);
router.post('/signin',UserController.signin);
router.post('/role',AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser);
// Create a new meal plan
router.post('/mealPlan', MealPlanController.createMealPlan);

// Get a meal plan by id
router.get('/mealPlan/:id', MealPlanController.getMealPlan);

// Get all meal plans
router.get('/mealPlan', MealPlanController.getAllMealPlans);

// Update a meal plan by id
router.put('/mealPlan/:id', MealPlanController.updateMealPlan);

// Delete a meal plan by id
router.delete('/mealPlan/:id',  MealPlanController.deleteMealPlan);

// Get meal plans by user id
router.get('/mealPlan/:userId', MealPlanController.getMealPlansByUser);
module.exports = router;    