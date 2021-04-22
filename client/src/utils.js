// export const API_URL = `http://localhost:${process.env.PORT || 5000}`;

// export const API_URL = process.env.REACT_APP_API_URL;

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://scene-store-app.herokuapp.com"
    : "http://localhost:5000";
