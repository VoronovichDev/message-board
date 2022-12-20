# Mini-twitter. Like a twitter, but you can edit your posts
This is a CRUD web-app created via Next.js and firebase

## Live demo
https://message-board-x54j.vercel.app/

## Features
- React
- Next.js
- TypeScript
- Firebase (hooks, auth, firestore)
- Tailwind
- React-toastify
- Responsive design

## Application functionality
- Log(in/out)
- Add post
- Edit post
- Delete post
- Comment post
- See all post (main page)

### More about the application
- In case of an attempt to enter any page of an unauthorized user, he is redirected to the login page
- Checks lenght of post and notify user (via react-toastify) while message is empty or too long
- Notifies the user, after he submitted the post
