# E-Commerce Platform

Welcome to the **E-Commerce Platform** project! This comprehensive online store is built using the MERN stack and integrates several advanced technologies to deliver a robust and user-friendly shopping experience.

## Live Demo

Explore the live demo of the project [here](#).

## Features

| **Feature**            | **Description**                                             |
|------------------------|-------------------------------------------------------------|
| **User Authentication**| Secure login and registration using JWT.                   |
| **Product Management** | Browse, search, and view product details.                  |
| **Shopping Cart**      | Add products to the cart, update quantities, and checkout. |
| **Payment Integration**| Seamless checkout with a payment gateway.                  |
| **Image Uploads**      | Efficient image management with Cloudinary.                |
| **Responsive Design**  | Optimized for various devices and screen sizes.            |
| **State Management**   | Manage global state with Redux Toolkit.                     |
| **API Integration**    | Efficient data fetching with Axios.                         |
| **Styling**            | Modern UI with Tailwind CSS and custom styling with Sass.  |

## Technologies Used

### Frontend

- **React.js**: For building the user interface.
- **Redux Toolkit**: For streamlined state management.
- **Axios**: For making HTTP requests and handling API interactions.
- **Tailwind CSS**: For modern and responsive design.
- **Sass**: For advanced and modular CSS styling.

### Backend

- **Node.js**: For server-side JavaScript execution.
- **Express.js**: For building RESTful API endpoints.
- **MongoDB**: For database management.
- **JWT**: For authentication and authorization.
- **Cloudinary**: For image uploads.
- **Payment Gateway**: Integration with services like Stripe or PayPal.

## Getting Started

To set up the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
```

### 2. Navigate to Project Directory

```bash
cd ecommerce-platform
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Set Up Environment Variables

- Create a `.env` file in the `backend` directory.
- Add the following environment variables:

  | **Variable**         | **Description**                              |
  |----------------------|----------------------------------------------|
  | `CLOUDINARY_URL`     | Cloudinary URL for image uploads.            |
  | `JWT_SECRET`         | Secret key for JWT authentication.           |
  | `PAYMENT_GATEWAY_KEY`| API key for the payment gateway.             |

### 5. Start the Backend Server

```bash
npm start
```

### 6. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 7. Configure Sass

- Make sure Sass is set up in your build process. If using Create React App, it should be pre-configured.

### 8. Start the Frontend Development Server

```bash
npm start
```

### 9. Open Your Browser

- Visit `http://localhost:3000` to see the application in action.


Feel free to open issues for bugs or feature requests.

## License

This project is licensed under the [MIT License](LICENSE).

