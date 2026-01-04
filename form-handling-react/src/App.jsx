import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="App">
      {/* Form Switcher */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setActiveForm('controlled')}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
              activeForm === 'controlled'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Controlled Components
          </button>
          <button
            onClick={() => setActiveForm('formik')}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
              activeForm === 'formik'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Formik
          </button>
        </div>
      </div>

      {/* Render Active Form */}
      {activeForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}

export default App;