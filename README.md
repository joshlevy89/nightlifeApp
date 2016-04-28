This app allows users to plan their evening by seeing what bars people are going to
and selecting bars they'd like to attend. 
This project is hosted on heroku at: https://my-nightlife-coordinator.herokuapp.com/.  
Only guaranteed to work in chrome. 

To run locally,   
npm install nightlifeApp
cd nightlifeApp
npm run dev...to run in development mode     
npm run prod-test...to run in production mode  

Note that if you run in production mode, you will need to delete the bundle folder in the public folder to make changes. Otherwise, the old bundle will be served from that folder. 

This project fulfills the following user stories:  
-User Story: As an unauthenticated user, I can view all bars in my area.  
-User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.  
-User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.  
-User Story: As an unauthenticated user, when I login I should not have to search again.

Built using the react-hot-boilerplate by Dan Abramov: https://github.com/gaearon/react-hot-boilerplate