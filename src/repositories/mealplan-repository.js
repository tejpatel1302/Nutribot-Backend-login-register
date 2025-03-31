const { MealPlan } = require('../models'); // adjust the path as necessary
const CrudRepository = require('./crud-repository');

class MealPlanRepository extends CrudRepository {
  constructor() {
    super(MealPlan);
  }

  // You can add any meal plan specific methods here.
  // For example, to get all meal plans for a particular user:
  async getByUserId(userId) {
    const response = await MealPlan.findAll({
      where: { userId },
      include: [{ model: this.models.User, as: 'user' }] // optional: include associated user data
    });
    console.log(response,'responseuser')
    if (!response || response.length === 0) {
      throw new AppError('No meal plans found for this user', StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = MealPlanRepository;
