import { useState } from 'react';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle input blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          error = 'Recipe title is required';
        } else if (value.trim().length < 3) {
          error = 'Title must be at least 3 characters long';
        }
        break;

      case 'ingredients':
        if (!value.trim()) {
          error = 'Ingredients are required';
        } else {
          const ingredientList = value.split('\n').filter(item => item.trim());
          if (ingredientList.length < 2) {
            error = 'Please add at least 2 ingredients (one per line)';
          }
        }
        break;

      case 'steps':
        if (!value.trim()) {
          error = 'Preparation steps are required';
        } else if (value.trim().length < 10) {
          error = 'Please provide more detailed preparation steps';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
      isValid = false;
    }

    // Validate ingredients
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
      isValid = false;
    } else {
      const ingredientList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
        isValid = false;
      }
    }

    // Validate steps
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
      isValid = false;
    } else if (formData.steps.trim().length < 10) {
      newErrors.steps = 'Please provide more detailed preparation steps';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      title: true,
      ingredients: true,
      steps: true
    });

    // Validate form
    if (validateForm()) {
      // Process the form data
      const ingredientList = formData.ingredients
        .split('\n')
        .filter(item => item.trim())
        .map(item => item.trim());

      const recipeData = {
        title: formData.title.trim(),
        ingredients: ingredientList,
        steps: formData.steps.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('Recipe submitted:', recipeData);
      
      // Show success message
      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          ingredients: '',
          steps: ''
        });
        setErrors({});
        setTouched({});
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Share Your Recipe
          </h1>
          <p className="text-gray-600">
            Add your delicious recipe to share with the community
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-semibold">
                Recipe submitted successfully! 🎉
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-6 md:p-8"
        >
          {/* Recipe Title */}
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block text-gray-700 font-semibold mb-2"
            >
              Recipe Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., Grandma's Chocolate Chip Cookies"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                touched.title && errors.title
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {touched.title && errors.title && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label 
              htmlFor="ingredients" 
              className="block text-gray-700 font-semibold mb-2"
            >
              Ingredients
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Enter each ingredient on a new line (minimum 2 ingredients)
            </p>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="6"
              placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;1/2 cup butter, softened&#10;2 large eggs&#10;1 tsp vanilla extract"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                touched.ingredients && errors.ingredients
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {touched.ingredients && errors.ingredients && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.ingredients}
              </p>
            )}
          </div>

          {/* Preparation Steps */}
          <div className="mb-6">
            <label 
              htmlFor="steps" 
              className="block text-gray-700 font-semibold mb-2"
            >
              Preparation Steps
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Describe the cooking process step by step
            </p>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="8"
              placeholder="1. Preheat oven to 350°F (175°C)&#10;2. In a large bowl, cream together butter and sugar&#10;3. Beat in eggs one at a time, then stir in vanilla&#10;4. Combine flour and baking soda, gradually blend into mixture&#10;5. Drop rounded tablespoons onto ungreased cookie sheets&#10;6. Bake for 10-12 minutes until golden brown"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                touched.steps && errors.steps
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {touched.steps && errors.steps && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.steps}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Recipe
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ title: '', ingredients: '', steps: '' });
                setErrors({});
                setTouched({});
              }}
              className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Clear Form
            </button>
          </div>

          {/* Required Fields Notice */}
          <p className="mt-6 text-sm text-gray-500 text-center">
            <span className="text-red-500">*</span> Required fields
          </p>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips for a Great Recipe
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use clear, descriptive titles that include the dish name</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>List ingredients with specific measurements</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Number your steps and keep instructions clear and concise</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include cooking times and temperatures where relevant</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;