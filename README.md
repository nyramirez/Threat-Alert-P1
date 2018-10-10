Threat Alert

Overview
This app is intended to assess employees during their daily work experience.
We have two interfaces:

I.Employee Interface

1.The app allows the employee to clocks-in entering an Employee ID and it takes a picture using tracking.js tracking system.
2.The pictures’ images are converted to a URL and used to obtain emotional attributes using Face++ API.
3.The employee will be required to take a questionnaire assessment (sent via email) if the values of some of the emotional scores are too low.
4.The employee can access the questionnaire only once and is required to enter Employee ID. J Query blockin library was used for this feature.
5.The assessments’ results are sent back to the manager who can see them in an authorized access database.

II.Manager Interface

To login into manager system make sure:
1.Only manager is loging in,
2.Correct emailID and Password is used for login
3.After,manager is logged in he can check all the employees under him who has got some emotion issue.
4.Manager has to click on the row to get the survey link in his mail.
5.Manager will get a mail sent message on the screen.
6.Manager can either forward the link to employee or can bring employee to his system to fill the questionnaire.

For our manager system,make sure you are using ,
email:agaur05@gmail.com
password: abc123
for loging in.

Technologies Used:
1.JQuery 
2.BlockUI Plugin
3.Tracking.js
4.Materialize CSS
5.Bootstrap

API used:
1.Face PLUS PLUS
To get emotion attributes

2.EMAIL JS 
To send automatic emails

Development Team
NAARS
(Nestor,Akanksha,Aime,Roger)
