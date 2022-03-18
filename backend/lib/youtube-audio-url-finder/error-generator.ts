export default class ErrorGenerator {
  /**
   * Generates an error object with given name
   *
   * @param name - The name to generate the error with

   * @returns The generated error
   */
  createNamedError(name: string): Error {
    const error: Error = new Error();
    error.name = name;
    return error;
  }

  /**
   * Generates an error object with given name and message
   *
   * @param name - The name to generate the error with
   * @param message - The message to generate the error with

   * @returns The generated error
   */
  createNamedErrorWithMessage(name: string, message: string): Error {
    const error: Error = new Error();
    error.name = name;
    error.message = message;
    return error;
  }
}
