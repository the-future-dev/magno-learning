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
       - settings.jsx
       - orders.jsx
       - ...

     - courses
       - index.jsx
       - create.jsx
       - [courseId].jsx
       - [courseId]/overview.jsx
       - [courseId]/curriculum.jsx
       - [courseId]/reviews.jsx
       - [courseId]/enroll.jsx
       - ...

     - authentication
       - login.jsx
       - signup.jsx
       - forgotPassword.jsx
       - resetPassword.jsx
       - ...

     - dashboard
       - index.jsx
       - analytics.jsx
       - earnings.jsx
       - ...

     - ...

   - styles
     - global.css
     - variables.css
     - ...

   - utils
     - formatDate.js
     - calculateDiscount.js
     - ...

   - public
     - images
     - fonts
     - ...