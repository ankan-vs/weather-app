export const asyncHandler = (handlerFunction) => (...args) =>
    Promise
        // Invoke handlerFunction with the passed arguments and wrap the result in a Promise
        .resolve(handlerFunction(...args))
        // On successful execution of handlerFunction, return an array where the first element is null indicating no error and the second element is the result of the handlerFunction
        .then(result => [null, result])
        // If an error occurs during the execution of handlerFunction return an array where the first element is the error and the second element is null
        .catch(error => [error, null]);