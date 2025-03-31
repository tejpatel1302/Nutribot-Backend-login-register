const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { MealPlanRepository } = require('../repositories');

const mealPlanRepo = new MealPlanRepository();

async function createMealPlan(data) {
    console.log(data,'fromservicew')
  try {
    const mealPlan = await mealPlanRepo.create(data);
    console.log(mealPlan,'fromservice')
    return mealPlan;
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create new meal plan', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getMealPlan(id) {
  try {
    const mealPlan = await mealPlanRepo.get(id);
    return mealPlan;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot fetch meal plan', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllMealPlans() {
  try {
    const mealPlans = await mealPlanRepo.getAll();
    return mealPlans;
  } catch (error) {
    throw new AppError('Cannot fetch meal plans', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateMealPlan(id, data) {
  try {
    const response = await mealPlanRepo.update(id, data);
    return response;
  } catch (error) {
    throw new AppError('Cannot update meal plan', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteMealPlan(id) {
  try {
    const response = await mealPlanRepo.destroy(id);
    return response;
  } catch (error) {
    throw new AppError('Cannot delete meal plan', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Optional: A custom service method to get meal plans by user id
async function getMealPlansByUserId(userId) {
    console.log(userId,'lolo')
  try {
    const mealPlans = await mealPlanRepo.getByUserId(userId);
    return mealPlans;
  } catch (error) {
    throw new AppError('Cannot fetch meal plans for the user', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createMealPlan,
  getMealPlan,
  getAllMealPlans,
  updateMealPlan,
  deleteMealPlan,
  getMealPlansByUserId
};
