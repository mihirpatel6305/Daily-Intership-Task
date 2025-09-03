// Validation constants
export const VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 100,
  },
  body: {
    minLength: 10,
    maxLength: 1000,
  },
};

// Error messages
export const ERROR_MESSAGES = {
  title: {
    required: "Title is required",
    minLength: `Title must be at least ${VALIDATION_RULES.title.minLength} characters`,
    maxLength: `Title must not exceed ${VALIDATION_RULES.title.maxLength} characters`,
  },
  body: {
    required: "Body is required", 
    minLength: `Body must be at least ${VALIDATION_RULES.body.minLength} characters`,
    maxLength: `Body must not exceed ${VALIDATION_RULES.body.maxLength} characters`,
  },
  submit: {
    addFailed: "Failed to add post. Please try again.",
    updateFailed: "Failed to update post. Please try again.",
    deleteFailed: "Failed to delete post. Please try again.",
  },
};

// API simulation constants
export const API_CONFIG = {
  failureRate: 0.1, // 10% chance to fail
  minDelay: 1000, // 1 second
  maxDelay: 2000, // 2 seconds
};
