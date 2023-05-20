Folder structure:

src
   - components
     - CourseCard.jsx
     - CourseList.jsx
     - Header.jsx
     - Layout.jsx
     - Sidebar.jsx
     - SearchBar.jsx
     - Pagination.jsx
     - ...
     - (Other course-related components)

   - lib
     - supabase.js

   - pages
     - account
       - index.jsx
<!--        - settings.jsx > -->
<!--        - orders.jsx -->
       - ...

     - courses
       - index.jsx
<!--        - create.jsx -->
       - [courseId].jsx
       - [courseId]/overview.jsx
       - [courseId]/curriculum.jsx
       - [courseId]/reviews.jsx
       - ...

     - authentication
       - login.jsx > embedded
       - signup.jsx > embedded
       - forgotPassword.jsx
       - resetPassword.jsx
       - ...
