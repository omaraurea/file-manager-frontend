# File Manager Frontend - React Application

This project contains the frontend for the **File Manager** application, built with **React**. The frontend communicates with the backend services (Spring Boot API) via an API Gateway and interacts with AWS S3 to upload and manage files.

## Prerequisites

Before starting, ensure you have the following tools installed:

1. **Node.js**: Installed globally. You will also need `npm` (comes with Node.js) to manage dependencies.
    - [Node.js Installation Guide](https://nodejs.org/)
    - Verify the installation by running:
      ```bash
      node -v
      npm -v
      ```

2. **AWS CLI**: Installed and configured with the correct credentials for deployment to an S3 bucket.
    ```bash
    aws configure
    ```

3. **S3 Bucket**: The bucket that will host the React app. Ensure the bucket is configured to serve a static website (more details below).

## Project Setup

### 1. Clone the Repository

Clone the repository containing the React frontend

```bash
cd file-manager-frontend

2. Install Dependencies
Install all necessary dependencies using npm:

npm install

This will install all the required packages listed in package.json.

3. Configure the API Gateway URL
In the project, update the calls to API in the file File-Upload.js using the correct api gateway

example :"https://your-api-gateway-url.amazonaws.com/dev/files"

4. Run the Application Locally
You can run the application locally in development mode to ensure everything works as expected before deploying.

npm start

This will start the development server, and you can view the app in your browser at http://localhost:3000.

5. Build the Application for Production
Once you are ready to deploy the application, build the project for production:

npm run build


This will create an optimized version of the app in the build folder, ready for deployment to S3.

Deploying the Application to S3
Once the app is built, you can deploy it to an S3 bucket to serve as a static website.

1. Create an S3 Bucket (if not already created)
If you haven’t created an S3 bucket yet, create one using the AWS CLI or the AWS Management Console. Make sure to enable static website hosting.

aws s3 mb s3://your-bucket-name --region your-region

2. Configure the S3 Bucket for Static Website Hosting
Make sure the S3 bucket is configured to host a static website:

Go to the Properties tab of your S3 bucket in the AWS Management Console.
Enable Static website hosting.
Set the index document to index.html and the error document to index.html (to handle React Router navigation).
3. Deploy to S3
Once the bucket is configured, you can upload the contents of the build folder to the S3 bucket.

aws s3 sync build/ s3://your-bucket-name --acl public-read


Make sure all files are publicly readable. The --acl public-read flag ensures that all files are set to be publicly accessible.

4. Access Your Application
Once the files are uploaded, you can access your application via the S3 bucket's static website URL. You can find this URL in the Static Website Hosting section under the Properties tab of your S3 bucket.

The URL will look like this:

http://your-bucket-name.s3-website-your-region.amazonaws.com


Troubleshooting
CORS Issues: If you encounter issues with Cross-Origin Resource Sharing (CORS) when making API calls from the React app to the backend, ensure that the API Gateway has CORS enabled for your API routes.

Missing Permissions: If your React app is not loading after deployment, check the S3 bucket permissions and make sure the files are publicly readable.

Routing Issues: If you're using React Router and encounter navigation issues after deployment, ensure that your S3 bucket's error document is set to index.html to handle client-side routing.




