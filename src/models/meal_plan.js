'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MealPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Each meal plan belongs to a single user
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  MealPlan.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Use a JSON field to store the generated meal plan details
    mealData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // Foreign key to associate the meal plan with a user
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the table name for your User model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'MealPlan',
  });

  return MealPlan;
};
