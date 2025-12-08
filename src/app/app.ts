Project: MyAuthApp
A secure front-end Angular app that integrates with your custom authentication API.

---

### Frontend Features & Flow:

#### 1. User Registration
- Form with `name`, `email`, `password`, `confirm password`, and profile picture upload (based on the api interface)
- Form validation with Reactive Forms (learn how to use it with validators and form validity)
- Image preview before upload (find a proper simple design )
- Sends a POST request to `/api/v1/auth/register` (based on the correspondent route in the api)

#### 2. User Login
- Login form with email/password
- JWT token stored securely (e.g., in `localStorage`) 
- Sends a POST request to `/api/v1/auth/login`

#### 3. Authenticated Routes
- User Dashboard with profile info (GET `/api/v1/users/me`) (design the page however you like with minimal design)
- Users List (GET `/api/v1/users`) — visible only for admin or authenticated users (same here for the design)
(add a sidebar containing 2 items, one for the profile and one for the users list)
- Route guards to protect authenticated pages (important)

#### 4. JWT Interceptor
- Automatically adds JWT token to HTTP headers using `HttpInterceptor` (important)

#### 5. Reusable UI Components
- sidebar with login/logout state
- Toasts for feedback (success/error) (use sweetalert in an alert service you create)
- Loading indicators on requests (make simple)

#### 6. Angular Material (optional)
- Use Angular Material for form inputs, buttons, and cards (you can use template designs not from angular material also)
- Material theme toggle (dark/light) (important to learn but leave for last)

#### 7. File Upload (Multer Integration)
- Use Angular’s file input with preview and upload to API (make sure you send the correct image data to the api)

#### 8. Error Handling
- Global error handler service to display backend error messages 

#### 9. Swagger Viewer (add page endpoint for it)
- Display Swagger docs inside an iframe `/api-docs` or open in a new tab (thats done in the api, just add an item in the sidebar that has the docs endpoint)

#### 10. Charts dashboard
- add an item in the sidebar(dashboard), that navigates to a page on which you use display grid to display 4 kinds of charts, getting the data from the api for them

so now we are in step 1 the register based on the requirments did we finished this step 


