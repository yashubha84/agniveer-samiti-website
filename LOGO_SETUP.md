# Logo Setup Instructions

## Adding the Logo Image

To add the અખિલ ગુજરાત અગ્નિવીર સમિતિ logo to the website:

1. Save your logo image as `logo.png`
2. Place it in the `client/public/` directory
3. The logo should be a square image (recommended: 200x200px or 500x500px)
4. Supported formats: PNG (with transparent background recommended), JPG, or SVG

## Current Logo Path
The navbar is configured to look for the logo at: `client/public/logo.png`

## Alternative: Using the Logo from URL
If you want to use the logo from a URL instead of a local file, update the Navbar.js file:

```javascript
// In client/src/components/Navbar.js
// Replace this line:
<img src="/logo.png" alt="Logo" className="logo-img" />

// With:
<img src="https://your-image-url.com/logo.png" alt="Logo" className="logo-img" />
```

## Logo Specifications
- The logo will display at 50px height on desktop
- On mobile devices, it scales down to 35-40px
- The logo maintains its aspect ratio
- A circular logo works best with the current design

## Testing
After adding the logo:
1. Restart the React development server if it's running
2. Refresh your browser
3. The logo should appear on the left side of the navbar next to "અખિલ ગુજરાત અગ્નિવીર સમિતિ"
