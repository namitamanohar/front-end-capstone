# DigiPlan

DigiPlan is a React web app with full CRUD functionality that allows   


 <img src="./public/ParentDashboardFeedFido.PNG" height="450px" width="250px">     <img src="./public/ChildDashboardFeedFido.PNG" height="450" width="250">      <img src="./public/ChoreGraphFeedFido.PNG" height="450" width="250">

## Installation

Install react packages:

```bash
npx create-react-app 
npm i --save react-router-dom
npm install --save bootstrap
npm install --save reactstrap react react-dom
npm instal moment --save

npm start from the root directory to run application
```

## Database sample
Create a json file named database.json with the provided sample data and run a json server watching database.json on port 8088

```JSON
{
  "users": [],
  "userTypes": [
    {
      "id": 1,
      "name": "Student"
    },
    {
      "id": 2,
      "name": "Teacher"
    }
  ],
  "prefixes": [
    {
      "id": 1,
      "name": "Ms"
    },
    {
      "id": 2,
      "name": "Mrs"
    },
    {
      "id": 3,
      "name": "Mr"
    },
    {
      "id": 4,
      "name": ""
    }
  ],
  "subjects": [
    {
      "id": 1,
      "name": "Math"
    },
    {
      "id": 2,
      "name": "Science"
    },
    {
      "id": 3,
      "name": "History"
    },
    {
      "id": 4,
      "name": "English"
    },
    {
      "id": 5,
      "name": "Computer Science"
    },
    {
      "id": 6,
      "name": "Music"
    },
    {
      "id": 7,
      "name": "Physical Education"
    },
    {
      "id": 8,
      "name": ""
    }
  ],
  "events": [],
  "eventTypes": [
    {
      "id": 1,
      "name": "Game"
    },
    {
      "id": 2,
      "name": "HW"
    },
    {
      "id": 3,
      "name": "Tests"
    },
    {
      "id": 4,
      "name": "Projects"
    },
    {
      "id": 5,
      "name": "Work Shift"
    },
    {
      "id": 6,
      "name": "Other"
    }
  ],
  "tutoringRequests": [
  ],
  "absentRequests": [
   
  ],
  "messages": [
    
  ],
  "messageTypes": [
    {
      "id": 1,
      "name": "Summer Opportunity"
    },
    {
      "id": 2,
      "name": "Study Tip"
    },
    {
      "id": 3,
      "name": "Class Announcement"
    },
    {
      "id": 4,
      "name": "Extra Credit"
    }
  ]
}

```

## Cloudinary

1. Go to cloudinary.com and create an account 
2. Create a new folder called TeacherUploads
3. On the dasboard, click more under account details, click on the down arrow next to the API Base URL and copy the image upload link
3. Change line 30 and 33 to match with your cloudinary account 
4. Follow the directions on https://www.youtube.com/watch?v=hlYczGvLlDY&t=483s if more assistance is need

## Usage

1. Click on the Register Student Button