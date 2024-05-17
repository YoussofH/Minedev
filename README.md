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


> We designed Coffee Express using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/LsuOx5Wnh5YTGSEtrgvz4l/Purrfect-Pals?type=design&node-id=257%3A79&mode=design&t=adzbABt5hbb91ucZ-1)


### Mockups
| Home screen  | Menu Screen | Order Screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

- Insert ER Diagram here


<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>

### Admin Screens (Web)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

- This project uses advanced prompt engineering techniques to optimize the interaction with natural language processing models. By skillfully crafting input instructions, we tailor the behavior of the models to achieve precise and efficient language understanding and generation for various tasks and preferences.

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [example](https://example.com)
2. Clone the repo
   git clone [github](https://github.com/your_username_/Project-Name.git)
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Coffee Express locally and explore its features.
