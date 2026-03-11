# How to Add Photos to Your Website

## What I Did:
1. ✅ Updated Home page to show President and Vice President photos in the red circles
2. ✅ Added CSS styles for the photo circles
3. ✅ Made it responsive for mobile devices

## How to Add Photos:

### Step 1: Add Photo Files
Put your photo files in the `client/public/` folder:
```
client/public/
├── president.jpg        ← Add President photo here
├── vice-president.jpg   ← Add Vice President photo here
└── events/
    ├── event1.jpg      ← Add event photos here
    ├── event2.jpg
    └── event3.jpg
```

### Step 2: Photo Requirements
- **Format:** JPG or PNG
- **Size:** 500x500 pixels (square)
- **File Size:** Under 1MB each
- **Names:** 
  - `president.jpg` (for President)
  - `vice-president.jpg` (for Vice President)

### Step 3: View Changes
1. Add the photo files to `client/public/`
2. Go to http://localhost:3000
3. You'll see the photos in the circles on home page

## What You'll See:

### Before (Red Circles):
```
○ [Empty Circle]     TITLE     [Empty Circle] ○
```

### After (With Photos):
```
👤 [President Photo]  TITLE  [VP Photo] 👤
   President Name            VP Name
```

## For Event Photos:

### Add Event Photos:
1. Create folder: `client/public/events/`
2. Add event photos: `event1.jpg`, `event2.jpg`, etc.
3. Photos will show in the event carousel

## If Photos Don't Show:
- Check file names are correct
- Check files are in `client/public/` folder
- Refresh browser (Ctrl+F5)

## File Structure:
```
client/
├── public/
│   ├── president.jpg          ← President photo
│   ├── vice-president.jpg     ← VP photo
│   └── events/
│       ├── event1.jpg         ← Event photos
│       └── event2.jpg
├── src/
│   ├── pages/
│   │   └── Home.js           ← Updated with photo code
│   └── App.css               ← Updated with photo styles
```

## Changes Made:

### 1. Home.js - Added Photo Circles:
```javascript
{/* President Photo - Left Circle */}
<div className="leader-photo left">
  <img src="/president.jpg" alt="President" />
  <p className="leader-name">President Name</p>
</div>

{/* Vice President Photo - Right Circle */}
<div className="leader-photo right">
  <img src="/vice-president.jpg" alt="Vice President" />
  <p className="leader-name">Vice President Name</p>
</div>
```

### 2. App.css - Added Photo Styles:
```css
.leader-photo {
  width: 180px;
  height: 180px;
  position: relative;
}

.leader-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
```

## Next Steps:
1. Add your photo files to `client/public/`
2. Refresh the website
3. You'll see photos instead of red circles!

The code is ready - just add your photo files!