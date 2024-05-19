<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> Minedev, a VS Code extension, revolutionizes programming by providing example code blocks instead of directly providing code solutions.
>
> Minedev has the ability to have full context of the whole folder structure of a specific project.
>
> Minedev has a chat feature that allows developers to chat and talk with an AI trained model.
>
> This approach prevents developers from copying and pasting code without understanding the deep details of what they are implementing.

### User Stories
- As a developer using Minedev, I want to have a conversation with the AI about how to implement a specific feature, so I can get guidance and explore different approaches without directly copying code.
- As a developer using Minedev, I want to use the AI pair programmer feature that allows me to select the voice of by best friend and speak with him/her, helping me clear my thoughts and take decisions.
- As a company admin using Minedev, I want to control the level of detail and specific functionalities suggested by the AI in responses to developer queries, so I can ensure the information aligns with our company coding standards and security best practices.

<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Minedev is built using the following technologies:

- This project uses the [Django](https://www.djangoproject.com/) Web Framework hosted on a dedicated EC2 instance.
- For persistent storage (database), the app uses PostgreSQL hosted on AWS RDS service.
- VS Code exension was built using React JS library.
- [Llama3](https://llama.meta.com/llama3/) Large Language Model hosted on a dedicated AWS EC2 instance with GPU support. LLM was served using [Ollama](https://ollama.com/).
- [Eleven Labs](https://elevenlabs.io/) was used for voice cloning and text-to-speech synthesis.

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed Minedev using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/LsuOx5Wnh5YTGSEtrgvz4l/Purrfect-Pals?type=design&node-id=257%3A79&mode=design&t=adzbABt5hbb91ucZ-1)


### Mockups
| Home screen  |
| ---| 
| ![Landing](./readme/demo/Mockup-1.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

![AISpeech](./readme/demo/MinedevDatabaseSchema.png)

<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>

### Screens (Web/VS Code Extension)
 Home Page screen  
![Landing](./readme/demo/HomeScreenDemo.png) 

|Chatbot screen |  AI Speech screen |
| ---| ---|
| ![Chatbot](./readme/demo/ChatDemo.png) | ![AISpeech](./readme/demo/SpeechAIDemo.png) |

<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

- Leveraging advanced prompt engineering methods, this project optimizes the interaction with NLP models. By carefully
crafting tailored input prompts, we influence the model's behavior, enabling precise and efficient language comprehension and generation for diverse applications and user preferences.

- **Workspace Title generation according to workspace files and directories:** "HERE IS MY WORKSPACE TREE PLEASE GENERATE A SUITABLE TITLE FOR MY PROJECT. YOU ARE STRICTLY PROMPTED TO JUST GIVE AN ANSWER WITH THE TITLE ONLY, NO INTRODUCTIONS NOTHING ELSE IS ALLOWED. JUST RETURN PROJECT TITLE, DO NOT USE SAME TITLE AS THE MAIN FOLDER, YOUR ANSWER SHOULD CONTAIN ONLY ENGLISH CHARACTERS NO QUOTES OR OTHER SYMBOLS, YOU ARE ALLOWED TO ADD SPACES BETWEEN WORDS. IMPORTANT NOTE: TITLE SHOULD BE STRICTLY NO LONGER THAN 3 WORDS: {workspaceTree}"

- **AI Pair Programmer speech generation:** "RULES:YOU ARE AN AI PAIR PROGRAMMER. YOU GIVE SUGGESTIONS AND HELP ME THINK IN AN INNOVATIVE WAY TO COMPLETE MY PROGRAMMING PROJECT. I WANT YOU TO RESPOND AS IF YOU ARE SPEAKING IN A FRIENDLY WAY BE CONCISE AND HELPFUL. STICK WITH TWO SENTENCES AS A MAXIMUM RESPONSE. THE FOLLOWING IS ME SPEAKING TO YOU. RESPOND ACCORDING TO THE RULES: {speech_text}"

- **Chatbot Response generation:** "RULES: YOU ARE AN AI PAIR PROGRAMMER THAT ASSISTS THE DEVELOPER BY STRUCTURING IDEAS AND GIVING THEM CONCISE ANSWERS WITHOUT UNNEEDED INTRODUCTIONS. YOU ARE GOING TO BE GIVEN HIERARCHY OF THE USER'S WORKSPACE, YOU ARE GOING TO ANALYZE IT THOROUGHLY. IN SOME OF YOUR RESPONSES YOU MIGHT HAVE TO TELL THE USER TO NAVIGATE TO A SPECIFIC FILE ACCORDING TO THE HIERARCHY, SO THAT YOU WILL HAVE TO RESPOND USING STRICTLY THE FOLLOWING FORMAT HTML TAG `<a href="FILE PATH HERE">FILE NAME HERE</a>`. NOTE: THE FILE PATH SHOULD ONLY BE RELATED TO THE HIERARCHY AND NOTHING ELSE. YOU ARE NOT ALLOWED TO GIVE THE USER COMPLETE CODE, INSTEAD ASSIST THE USER BY GIVING PROCEDURES OR STEPS SO THAT THE DEVELOPER WOULD DEPEND ON HIS/HER SKILLS TO WRITE THEIR OWN CODE. ABIDE BY THE RULES. HERE IS THE CHAT HISTORY BETWEEN YOU AND THE USER: {chat_context}. RESPOND ACCORDING TO THE RULES. HERE IS THE USER'S REQUEST: {message}"

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- Leveraging AWS's deployment capabilities, this project facilitates the seamless integration and deployment of NLP models. With a focus on scalability, reliability, and performance, we empower AI applications fueled by these models to deliver robust and efficient solutions across a broad spectrum of use cases.

- Launched EC2 instance for Django as the backend (connected to the internet).

- Launched RDS service to host PostgreSQL and connected it to the backend.

- Launched EC2 service 8vCPU with GPU to run the Llama3 LLM.

- Hosted React app [www.mine-dev.com](https://www.mine-dev.com) using Amplify AWS service.

- Connections: RDS --> Backend Server  <-- LLM Server


<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project leverages a comprehensive unit testing strategy to verify the functionality and reliability of individual code modules.
Evaluating these units in isolation allows for early detection and correction of potential issues, fostering a robust software foundation.

- `python manage.py test`
    ```sh
    Found 5 test(s).
    Creating test database for alias 'default'...
    System check identified no issues (0 silenced).
    .....
    ----------------------------------------------------------------------
    Ran 5 tests in 4.719s

    OK
    Destroying test database for alias 'default'...
    ```
<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Minedev locally, follow these steps:

### Prerequisites

- You should setup AWS services.
- Clone repo on the backend server with sufficient resources.
- Open `WebApp/django-backend/` directory. Activate venv, install dependencies.
- Create `.env` file and mimic `.env.example` file and fill required fields.
- Run python server.

### Installation

1. Clone the github
   [repo](https://github.com/YoussofH/Minedev.git).
2. Open `WebApp/react-frontend/` directory in VS Code:
    
    - Install NPM packages and Run React app.
        ```sh
        npm install
        npm start
        ```
4. Open `Extension/minedev/` directory in another VS Code window (required):
        
    - Install NPM packages and Run React app.
        ```sh
        cd web
        npm install
        npm start
        ```
    - Press <kbd>F5</kbd> to build the extension. Then wait till the new VS Code (Extension Host) window opens.
    - Press <kbd>CTRL/CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> then select `Minedev: React View`. This will open the extension on the right side.

Now, you should be able to run Minedev VS Code Extension locally and explore its features.


# Video Demo

![MinedevDemo](./readme/demo/MinedevDemo.mp4)
