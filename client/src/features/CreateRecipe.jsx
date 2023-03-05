import React from 'react';
import { useState, useEffect } from 'react';

import BackendService from '../services/BackendService';

import FormInput from '../form/FormInput';
import IngredientsFormList from '../form/IngredientsFormList';
import InstructionsFormList from '../form/InstructionsFormList';
import Success from '../utils/Success';

function recipeHasChanged (currRecipe) {
  return JSON.stringify(originalRecipe) !== JSON.stringify(currRecipe);
}

const formFields = {
  title: {
    id: 'title',
    placeholder: 'e.g. Spaghetti Bolognese',
  },
  description: {
    id: 'description',
  },
  prepTime: {
    id: 'prepTime',
    label: 'Preparation time',
    placeholder: 'e.g. 20 mins',
    customClass: ' w-6/12',
  },
  cookTime: {
    id: 'cookTime',
    label: 'Cook time',
    customClass: ' w-6/12',
  },
  totalTime: {
    id: 'totalTime',
    label: 'Total time',
    customClass: ' w-6/12',
  },
  servings: {
    id: 'servings',
    placeholder: 'e.g. 4',
    customClass: ' w-6/12',
  },
  ingredients: {
    id: 'ingredients',
    placeholder: 'Add ingredient',
  },
  instructions: {
    id: 'instructions',
  },
};

const inputControl = {
  title: '',
  description: '',
  prepTime: '',
  cookTime: '',
  totalTime: '',
  servings: '',
  ingredients: [],
  instructions: [],
};

let originalRecipe = null;

function CreateRecipe ({ fetchedRecipe, textContent }) {
  const [inputs, setInputs] = useState(inputControl);

  useEffect(() => {
    if (fetchedRecipe) {
      originalRecipe = fetchedRecipe;
      setInputs(fetchedRecipe);
    }
  }, [fetchedRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = { ...inputs };

    if (recipeHasChanged(newRecipe)) {
      delete newRecipe.id; // remove current id so that it is assigned a new id
      newRecipe.original = false;

      BackendService.addRecipe(newRecipe).then((response) => {
        // Error handling-------
        console.log(response);
      });
    }

    // add success message
  };

  return (
    <div className="CreateRecipe">
      <section className="section">
        <div className="container mx-auto">
          <div className="flex flex-col flex-wrap content-center text-center">
            {fetchedRecipe && (
              <Success
                className="mb-8"
                text="Recipe imported successfully!"
              />
            )}

            <div className="prose lg:prose-xl w-full">
              <h1>Create Recipe</h1>
              {textContent && <p>{textContent}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="flex justify-center"></div>
          <div className="CreateRecipe">
            <form
              className="_form _form--create-recipe"
              onSubmit={handleSubmit}
            >
              <div className="_form__inner form-control w-full">
                <FormInput
                  field={formFields.title}
                  value={inputs.title}
                  setInputs={setInputs}
                />
                <FormInput
                  field={formFields.description}
                  value={inputs.description}
                  setInputs={setInputs}
                />
                <FormInput
                  field={formFields.prepTime}
                  value={inputs.prepTime}
                  setInputs={setInputs}
                />
                <FormInput
                  field={formFields.cookTime}
                  value={inputs.cookTime}
                  setInputs={setInputs}
                />
                <FormInput
                  field={formFields.totalTime}
                  value={inputs.totalTime}
                  setInputs={setInputs}
                />
                <FormInput
                  field={formFields.servings}
                  value={inputs.servings}
                  setInputs={setInputs}
                />

                <IngredientsFormList
                  field={formFields.ingredients}
                  list={inputs.ingredients}
                  setInputs={setInputs}
                />

                <InstructionsFormList
                  field={formFields.instructions}
                  list={inputs.instructions}
                  setInputs={setInputs}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-wide mt-6"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateRecipe;