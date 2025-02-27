
import streamlit as st
import pandas as pd
from PIL import Image
import sqlite3
import os
from pathlib import Path

# Set page configuration
st.set_page_config(
    page_title="Sea Me - Beach Finder",
    page_icon="🌊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Create database connection and setup
def setup_database():
    # Create data directory if it doesn't exist
    Path("data").mkdir(exist_ok=True)
    
    conn = sqlite3.connect('data/beaches.db')
    cursor = conn.cursor()
    
    # Create tables if they don't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS beaches (
        id INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT,
        description TEXT,
        image_url TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS facilities (
        id INTEGER PRIMARY KEY,
        beach_id INTEGER,
        facility_name TEXT,
        facility_icon TEXT,
        FOREIGN KEY (beach_id) REFERENCES beaches (id)
    )
    ''')
    
    # Add sample data if database is empty
    cursor.execute("SELECT COUNT(*) FROM beaches")
    if cursor.fetchone()[0] == 0:
        beaches = [
            (1, 'חוף בוגרשוב', 'תל אביב - יפו', 'חוף בוגרשוב הוא אחד החופים הפופולריים ביותר בתל אביב. הוא ממוקם במרכז העיר, ליד מלונות ומסעדות רבות. החוף נקי, ישנם שירותי הצלה, מקלחות, ושירותים ציבוריים. בסמוך לחוף יש טיילת פופולרית וגם אזורים מוצלים לפיקניק.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000'),
            (2, 'חוף גורדון', 'תל אביב - יפו', 'חוף גורדון נמצא בקרבת מלון שרתון ומציע מגוון שירותים כמו מסעדות, ספורט ימי ומצילים. החוף פופולרי בקרב צעירים ותיירים בזכות האווירה התוססת והנוף היפה. ישנם מתקני כושר, מקלחות ושירותים נקיים.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000'),
            (3, 'חוף הכרמל', 'חיפה', 'חוף הכרמל בחיפה מציע אווירה רגועה יותר מחופי תל אביב, עם נוף מרהיב להר הכרמל. החוף נקי ומסודר, עם שירותי הצלה בעונת הרחצה. יש כאן מסעדות דגים מצוינות וטיילת נעימה להליכה. המקום מתאים למשפחות ולמי שמחפש שקט יחסי.', 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&q=80&w=1000'),
            (4, 'חוף אכזיב', 'נהריה', 'חוף אכזיב הוא פנינה טבעית בצפון ישראל. החוף מציע מפרצים קטנים עם מים צלולים, ריפי סלעים וצמחייה ים תיכונית. זהו מקום מצוין לשנרקול ולצפייה בדגים. בסמוך נמצא גן לאומי אכזיב עם שרידים ארכיאולוגיים. החוף מתאים למשפחות ולאוהבי טבע.', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1000'),
            (5, 'חוף פלמחים', 'רחובות', 'חוף פלמחים הוא חוף טבעי יחסית, מרוחק מהמולת העיר. החוף מוקף במצוקים ובצמחייה, ומציע פינות מבודדות ושקטות. זהו מקום מצוין לצפייה בשקיעה ולפיקניקים. בעונת הרחצה יש שירותי הצלה, אך החוף פחות מפותח מבחינת תשתיות.', 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80&w=1000')
        ]
        cursor.executemany("INSERT INTO beaches VALUES (?,?,?,?,?)", beaches)
        
        facilities = [
            (1, 1, 'הצלה', '🛟'),
            (2, 1, 'מקלחות', '🚿'),
            (3, 1, 'כסאות נוח', '🪑'),
            (4, 1, 'מזנון', '🍽️'),
            (5, 2, 'הצלה', '🛟'),
            (6, 2, 'ספורט ימי', '🏄‍♂️'),
            (7, 2, 'מסעדות', '🍽️'),
            (8, 2, 'מתקני כושר', '💪'),
            (9, 3, 'הצלה', '🛟'),
            (10, 3, 'טיילת', '🚶'),
            (11, 3, 'מסעדות דגים', '🐟'),
            (12, 3, 'חניה חינם', '🅿️'),
            (13, 4, 'שנרקול', '🤿'),
            (14, 4, 'פיקניק', '🧺'),
            (15, 4, 'גן לאומי סמוך', '🏞️'),
            (16, 4, 'חניה', '🅿️'),
            (17, 5, 'הצלה בעונה', '🛟'),
            (18, 5, 'פיקניק', '🧺'),
            (19, 5, 'נוף מרהיב', '🌅'),
            (20, 5, 'ללא מסחר', '🚫')
        ]
        cursor.executemany("INSERT INTO facilities VALUES (?,?,?,?)", facilities)
    
    conn.commit()
    conn.close()

# Setup database on app start
setup_database()

# Load data from database
@st.cache_data
def load_beaches():
    conn = sqlite3.connect('data/beaches.db')
    beaches = pd.read_sql_query("SELECT * FROM beaches", conn)
    conn.close()
    return beaches

@st.cache_data
def load_facilities(beach_id=None):
    conn = sqlite3.connect('data/beaches.db')
    if beach_id:
        facilities = pd.read_sql_query(
            "SELECT * FROM facilities WHERE beach_id = ?", 
            conn, 
            params=(beach_id,)
        )
    else:
        facilities = pd.read_sql_query("SELECT * FROM facilities", conn)
    conn.close()
    return facilities

@st.cache_data
def get_beach_by_id(beach_id):
    conn = sqlite3.connect('data/beaches.db')
    beach = pd.read_sql_query(
        "SELECT * FROM beaches WHERE id = ?", 
        conn, 
        params=(beach_id,)
    ).iloc[0]
    conn.close()
    return beach

@st.cache_data
def search_beaches(query):
    conn = sqlite3.connect('data/beaches.db')
    beaches = pd.read_sql_query(
        "SELECT * FROM beaches WHERE name LIKE ? OR location LIKE ?", 
        conn, 
        params=(f'%{query}%', f'%{query}%')
    )
    conn.close()
    return beaches

# Custom CSS for RTL support and styling
def custom_css():
    st.markdown("""
    <style>
    [data-testid="stSidebar"] {
        direction: rtl;
    }
    .rtl {
        direction: rtl;
        text-align: right;
    }
    .card {
        border-radius: 15px;
        padding: 1.5rem;
        background-color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 1rem;
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    .beach-header {
        background-color: #3C88E8;
        color: white;
        padding: 1rem;
        border-radius: 10px 10px 0 0;
        margin-bottom: 0;
    }
    .beach-content {
        padding: 1.5rem;
        background-color: white;
        border-radius: 0 0 10px 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .sea-blue {
        color: #3C88E8;
    }
    .facility-badge {
        display: inline-flex;
        align-items: center;
        background-color: #EFF6FF;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .search-container {
        background-color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 1.5rem;
    }
    </style>
    """, unsafe_allow_html=True)

# Apply custom CSS
custom_css()

# Application navigation
def main():
    # Initialize session state variables if they don't exist
    if 'page' not in st.session_state:
        st.session_state.page = 'home'
    if 'selected_beach' not in st.session_state:
        st.session_state.selected_beach = None
    if 'logged_in' not in st.session_state:
        st.session_state.logged_in = False
    if 'filters' not in st.session_state:
        st.session_state.filters = {}

    # Header
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("""
        <div style="display: flex; align-items: center; justify-content: center;">
            <div style="width: 40px; height: 40px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                <div style="width: 30px; height: 30px; background-color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #3C88E8; font-weight: bold;">🌊</span>
                </div>
            </div>
            <h1 style="margin: 0; color: #3C88E8; font-size: 2rem; font-weight: bold;">sea me</h1>
        </div>
        """, unsafe_allow_html=True)

    # Navigation
    if st.session_state.page == 'home':
        show_home_page()
    elif st.session_state.page == 'detail':
        show_beach_detail()
    elif st.session_state.page == 'profile':
        show_profile_page()
    elif st.session_state.page == 'login':
        show_login_page()

# Home page with beach listings
def show_home_page():
    # Search bar
    st.markdown('<div class="search-container rtl">', unsafe_allow_html=True)
    col1, col2 = st.columns([4, 1])
    with col1:
        search_query = st.text_input("חפש חוף...", key="search")
    with col2:
        if st.button("סנן 🔍"):
            show_filter_modal()
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Display beaches
    beaches = load_beaches()
    
    # Apply search filter if query exists
    if search_query:
        beaches = search_beaches(search_query)
    
    # Display results
    if len(beaches) == 0:
        st.info("לא נמצאו חופים התואמים את החיפוש שלך")
    else:
        for _, beach in beaches.iterrows():
            col1, col2 = st.columns([1, 3])
            
            with col1:
                st.image(beach['image_url'], use_column_width=True)
            
            with col2:
                st.markdown(f"""
                <div class="rtl card" onclick="window.location.href='#{beach['id']}'">
                    <h3>{beach['name']}</h3>
                    <p>{beach['location']}</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Handle click to view beach details
                if st.button(f"פרטים נוספים", key=f"view_{beach['id']}"):
                    st.session_state.selected_beach = beach['id']
                    st.session_state.page = 'detail'
                    st.rerun()
    
    # Profile button
    col1, col2, col3 = st.columns([1, 1, 1])
    with col3:
        if st.button("הפרופיל שלי 👤"):
            if st.session_state.logged_in:
                st.session_state.page = 'profile'
            else:
                st.session_state.page = 'login'
            st.rerun()

# Beach detail page
def show_beach_detail():
    # Back button
    if st.button("← חזרה"):
        st.session_state.page = 'home'
        st.rerun()
    
    # Load beach data
    beach_id = st.session_state.selected_beach
    try:
        beach = get_beach_by_id(beach_id)
        facilities = load_facilities(beach_id)
    except:
        st.error("החוף לא נמצא")
        st.session_state.page = 'home'
        st.rerun()
    
    # Display beach details
    st.image(beach['image_url'], use_column_width=True)
    
    st.markdown(f"""
    <div class="rtl">
        <h1>{beach['name']}</h1>
        <p>📍 {beach['location']}</p>
        <p>{beach['description']}</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Facilities
    st.markdown('<div class="rtl"><h2>מתקנים בחוף</h2></div>', unsafe_allow_html=True)
    
    # Display facilities in a grid
    cols = st.columns(2)
    for i, (_, facility) in enumerate(facilities.iterrows()):
        with cols[i % 2]:
            st.markdown(f"""
            <div class="facility-badge">
                <span style="margin-left: 8px;">{facility['facility_icon']}</span>
                <span>{facility['facility_name']}</span>
            </div>
            """, unsafe_allow_html=True)
    
    # Map placeholder
    st.markdown('<div class="rtl"><h2>מפת התמצאות</h2></div>', unsafe_allow_html=True)
    st.markdown("""
    <div style="background-color: #EFF6FF; height: 200px; border-radius: 10px; display: flex; justify-content: center; align-items: center;">
        <p>מפה תוצג כאן</p>
    </div>
    """, unsafe_allow_html=True)

# Filter modal
def show_filter_modal():
    with st.expander("סינון לפי קטגוריות", expanded=True):
        st.markdown('<div class="rtl">', unsafe_allow_html=True)
        
        # Create tabs for filter categories
        tab1, tab2, tab3 = st.tabs(["מתקנים", "שירותים", "פעילויות"])
        
        with tab1:
            st.checkbox("נגישות לנכים", key="filter_accessibility")
            st.checkbox("הצלה", key="filter_lifeguard")
            st.checkbox("צל", key="filter_shade")
            st.checkbox("חניון", key="filter_parking")
        
        with tab2:
            st.checkbox("תאי הלבשה", key="filter_changing_rooms")
            st.checkbox("מזון", key="filter_food")
            st.checkbox("ניקיון", key="filter_cleanliness")
            st.checkbox("שירותים", key="filter_restrooms")
        
        with tab3:
            st.checkbox("גלישה", key="filter_surfing")
            st.checkbox("שחייה", key="filter_swimming")
            st.checkbox("כדורעף", key="filter_volleyball")
            st.checkbox("חיות מחמד", key="filter_pets")
        
        if st.button("החל סינון"):
            # In a real app, we would collect all the filter values and apply them
            st.success("הסינון הוחל בהצלחה!")
        
        st.markdown('</div>', unsafe_allow_html=True)

# Profile page
def show_profile_page():
    # Back button
    if st.button("← חזרה"):
        st.session_state.page = 'home'
        st.rerun()
    
    # Display user profile
    st.markdown("""
    <div class="rtl" style="text-align: center; padding: 20px;">
        <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin: 0 auto; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h2 style="margin-top: 15px;">דניאל כהן</h2>
        <div style="display: flex; justify-content: center; gap: 40px; margin: 15px 0;">
            <div>
                <p style="color: #6B7280; margin: 0;">חופים מועדפים</p>
                <p style="font-weight: bold; font-size: 1.2rem; margin: 0;">12</p>
            </div>
            <div>
                <p style="color: #6B7280; margin: 0;">ביקורות</p>
                <p style="font-weight: bold; font-size: 1.2rem; margin: 0;">8</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # About section
    st.markdown("""
    <div class="rtl card">
        <h3>אודות</h3>
        <p>אוהב חופים, שחייה וגלישה. מבלה את רוב הזמן הפנוי שלי בחוף, תמיד מחפש את החוף המושלם לגלישה או סתם לרביצה בשמש.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Favorite beaches
    st.markdown('<div class="rtl"><h3>החופים המועדפים עליי</h3></div>', unsafe_allow_html=True)
    
    # Display favorite beaches in a horizontal scroll
    cols = st.columns(3)
    beaches = load_beaches().head(3)  # Just use first 3 beaches as example
    
    for i, (_, beach) in enumerate(beaches.iterrows()):
        with cols[i]:
            st.image(beach['image_url'], use_column_width=True)
            st.markdown(f"""
            <div class="rtl">
                <p style="font-weight: bold; margin-bottom: 0;">{beach['name']}</p>
                <p style="color: #6B7280; font-size: 0.8rem;">{beach['location']}</p>
            </div>
            """, unsafe_allow_html=True)
    
    # Reviews
    st.markdown('<div class="rtl"><h3>הביקורות שלי</h3></div>', unsafe_allow_html=True)
    
    st.markdown("""
    <div class="rtl card">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="font-weight: bold; margin: 0;">חוף הכרמל</p>
            <div>⭐⭐⭐⭐⭐</div>
        </div>
        <p style="color: #6B7280; margin: 0;">חוף נקי ונעים, מומלץ מאוד למשפחות!</p>
    </div>
    
    <div class="rtl card">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="font-weight: bold; margin: 0;">חוף בוגרשוב</p>
            <div>⭐⭐⭐⭐</div>
        </div>
        <p style="color: #6B7280; margin: 0;">מיקום מעולה, קרוב למסעדות ובתי קפה. לפעמים קצת צפוף.</p>
    </div>
    """, unsafe_allow_html=True)

# Login page
def show_login_page():
    st.markdown("""
    <div style="text-align: center; max-width: 400px; margin: 0 auto; padding-top: 40px;">
        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; background-color: #3C88E8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <div style="width: 40px; height: 40px; background-color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #3C88E8; font-size: 0.9rem; font-weight: bold;">🌊</span>
                </div>
            </div>
        </div>
        <h1 style="font-size: 1.8rem; margin-bottom: 5px;">sea me</h1>
        <p style="color: #6B7280; margin-bottom: 30px;">התחבר כדי לגשת לכל התכונות</p>
    </div>
    """, unsafe_allow_html=True)
    
    email = st.text_input("Email or phone number")
    password = st.text_input("Password", type="password")
    
    if st.button("Log In", type="primary"):
        # Simulate login process
        if email and password:
            st.session_state.logged_in = True
            st.success("התחברת בהצלחה!")
            st.session_state.page = 'profile'
            st.rerun()
        else:
            st.error("אנא הזן את כל פרטי ההתחברות")
    
    st.markdown("""
    <div style="text-align: center; margin-top: 20px;">
        <p style="color: #6B7280;">
            אין לך חשבון? <a href="#" style="color: #3C88E8; font-weight: 500; text-decoration: none;">הירשם עכשיו</a>
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Back button
    if st.button("חזור לדף הבית"):
        st.session_state.page = 'home'
        st.rerun()

# Run the app
if __name__ == "__main__":
    main()
