const { StatusCodes } = require('http-status-codes');
const { MealPlanService } = require('../services'); // Ensure you export MealPlanService from your services
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /mealplans
 * req-body { title: 'Plan Title', description: 'Description', mealData: {...}, userId: 1 }
 */
async function createMealPlan(req, res) {
    console.log('func called', req)
  try {
    const mealPlan = await MealPlanService.createMealPlan({
      title: req.body.title,
      description: req.body.description,
      mealData: req.body.mealData,
      userId: req.body.userId
    });
    SuccessResponse.data = mealPlan;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 * GET : /mealplans/:id
 */
async function getMealPlan(req, res) {
  try {
    const mealPlan = await MealPlanService.getMealPlan(req.params.id);
    SuccessResponse.data = mealPlan;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 * GET : /mealplans
 */
async function getAllMealPlans(req, res) {
  try {
    const mealPlans = await MealPlanService.getAllMealPlans();
    SuccessResponse.data = mealPlans;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 * PUT : /mealplans/:id
 * req-body { title: 'Updated Title', description: 'Updated Description', mealData: {...} }
 */
async function updateMealPlan(req, res) {
  try {
    const updated = await MealPlanService.updateMealPlan(req.params.id, req.body);
    SuccessResponse.data = updated;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 * DELETE : /mealplans/:id
 */
async function deleteMealPlan(req, res) {
    console.log(req.params.id,'id check')
  try {
    const deleted = await MealPlanService.deleteMealPlan(req.params.id);
    SuccessResponse.data = deleted;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 * GET : /mealplans/user/:userId
 * Retrieve all meal plans for a specific user
 */
async function getMealPlansByUser(req, res) {
  try {
    const mealPlans = await MealPlanService.getMealPlansByUserId(req.params.userId);
    SuccessResponse.data = mealPlans;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createMealPlan,
  getMealPlan,
  getAllMealPlans,
  updateMealPlan,
  deleteMealPlan,
  getMealPlansByUser
};
