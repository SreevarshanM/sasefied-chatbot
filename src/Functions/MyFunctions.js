
 export const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for validating 10-digit phone numbers
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
};
export const validateEmail = (email) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};