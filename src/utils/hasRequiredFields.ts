export default function hasRequiredFields(
  obj: Record<string, any>,
  requiredFields: string[]
): boolean {
  return requiredFields.every((field) => {
    // checking if every field in obj has required fields
    return Object.hasOwn(obj, field); // function that checks if 1arg - obj 2arg - field is present in object you put as 1arg
  });
}
