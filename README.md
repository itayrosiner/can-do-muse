
# Sea Me - Beach Finder Streamlit App

A Streamlit application for finding and exploring beaches with their facilities and features.

## Features

- Browse and search for beaches
- View detailed information about each beach
- Filter beaches by various criteria
- User profiles with favorite beaches and reviews
- Responsive design for mobile and desktop
- RTL support for Hebrew language

## Setup Instructions

1. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

2. Run the Streamlit app:
   ```
   streamlit run app.py
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:8501)

## Database

The application uses SQLite for data storage. The database is automatically created and populated with sample data on first run.

## Deployment

To deploy this Streamlit app:

1. Push your code to GitHub
2. Connect your GitHub repository to [Streamlit Community Cloud](https://streamlit.io/cloud)
3. Deploy your app with a few clicks

## Customization

- Add your own beach data by modifying the `setup_database()` function
- Customize the styling by editing the CSS in the `custom_css()` function
- Add more features like user registration, comments, ratings, etc.
