/*
 * Validates a form using a yup schema
 *
 * @param (Yup Schema) schema - The yup validation schema object
 * @param (object) validationErrors - An object where the validation errors are stored
 * @param (object) dataStore - The object storing the payload to be submitted
 * 
 * @returns (object) - an object whose Object.keys value can be 0 or more
**/

export default async function formValidator(schema, validationErrors, dataStore){
    const form_keys = Object.keys(dataStore);
    
    try {
        await schema.validate(dataStore, { abortEarly: false });
        return validationErrors;
      } catch (err) {
        validationErrors = err.inner.reduce((errors, error) => {
          let error_message = error.message;
    
          form_keys.forEach((item) => {
            error_message = error_message.replace(item + " ", "");
          })
          return { ...errors, [error.path]: error_message }
        }, {})
        return validationErrors;
      }
}