# ShapeTracer

 ShapeTracer (*name ideas that do not include cliche words like 'fit', 'body', 'strong' etc. are welcomed*) is a web application for monitoring subjective training intensity, training load, and psychological well-being. It is built using Node.js and MongoDB, and uses various NPM packages for functionality. My main goal was to create an API so I could experiment with different front-end frameworks in the future.

## Features

* **sRPE (session rating of perceived exertion):** Method used to assess an individual's subjective rating of the intensity of physical activity or exercise. It is commonly used in sports science and exercise physiology research to help monitor and prescribe training loads. sRPE is used to help users monitor their training intensity and make adjustments as needed.

* **POMS (Profile of Mood States):**  The POMS questionnaire is commonly used in research studies and clinical settings to measure changes in mood over time, assess the effectiveness of interventions, and help diagnose mood disorders such as depression or anxiety. Because of the psycho-physiological aspects of stress, it is often used to indirectly monitor physiological responses and adaptations over time and help avoid maladaptations or overtraining in athletes.

*  **Body measurements:** Body measurements are a simple and cost-effective method of tracking changes in body voluminosity over time, especially if the goal is gaining weight/muscle or body fat reduction. Users can input girth data of specific body regions.

## Requirements

* Node.js version 16.0.0 or later
* MongoDB version 4.0.0 or later

## Installation

1. Clone the repository to your local machine:
```bash
git clone <repository URL>
```
2. Navigate to the project directory:
```bash
cd shapetracer
```
3. Install the required dependencies:
```bash
npm install
```
4. Set up your environment variables:
```bash
PORT=<port number>
MONGODB_URL=<MongoDB connection string>
JWT_SECRET=<secret key for JSON Web Token>
SENDGRID_API_KEY=<SendGrid API key>
```
5. Start the application:
```bash
npm start
```
## Usage

Once the application is running, you can access it by navigating to http://localhost: <*port-number*> in your web browser. 

# Testing

To run tests, set the MONGODB_URL environment variable directly:
```bash
export MONGODB_URL=<MongoDB connection string>
```
Then run the test command:
```bash
npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)