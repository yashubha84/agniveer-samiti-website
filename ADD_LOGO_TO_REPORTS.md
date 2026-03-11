# How to Add Logo to PDF Reports

## Current Status
- ✅ Reports generate correct number of pages (not fixed 5 pages)
- ✅ Proper pagination based on data
- ✅ Clean letterhead design
- ⏳ Logo placeholder (circle with "[LOGO]" text)

## How to Add Your Actual Logo

### Step 1: Save Logo Image
Save your logo image file in the project:
```
project-root/
  └── assets/
      └── logo.png  (or logo.jpg)
```

### Step 2: Update routes/reports.js

Find this line in the `addLetterhead` function (around line 12):
```javascript
// Logo space (left side) - placeholder for actual logo image
// You can add: doc.image('path/to/logo.png', 50, 30, { width: 80 });
doc.circle(90, 70, 40).lineWidth(3).strokeColor('#C53030').stroke();
doc.fontSize(8).fillColor('#C53030').text('[LOGO]', 70, 65, { width: 40, align: 'center' });
```

Replace with:
```javascript
// Logo image
const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 50, 30, { width: 80, height: 80 });
} else {
  // Fallback to placeholder
  doc.circle(90, 70, 40).lineWidth(3).strokeColor('#C53030').stroke();
  doc.fontSize(8).fillColor('#C53030').text('[LOGO]', 70, 65, { width: 40, align: 'center' });
}
```

### Step 3: Test the Report
1. Generate a test report
2. Check if logo appears correctly
3. Adjust width/height if needed

## Logo Specifications

### Recommended:
- **Format:** PNG (with transparent background) or JPG
- **Size:** 200x200 pixels minimum
- **Aspect Ratio:** 1:1 (square)
- **File Size:** Under 500 KB

### Your Logo Details:
- Circular design
- Red background (#C53030)
- Soldier silhouette in center
- Gujarati text around border
- Yellow/gold accents

## Alternative: Base64 Embedded Logo

If you want to embed the logo directly in code:

1. Convert logo to base64:
```bash
# On Windows
certutil -encode logo.png logo.txt
# Then copy the base64 string
```

2. Add to routes/reports.js:
```javascript
const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANS...'; // Your base64 string
doc.image(logoBase64, 50, 30, { width: 80, height: 80 });
```

## Current Report Format

### Header Layout:
```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]        AKHIL GUJARAT AGNIVEER SANGATHAN         │
│  (circle)              Official Letterhead              │
│                                                          │
│  District: Name (Code) | Email: xxx | Phone: xxx        │
│──────────────────────────────────────────────────────────│
```

### With Actual Logo:
```
┌─────────────────────────────────────────────────────────┐
│  [ACTUAL       AKHIL GUJARAT AGNIVEER SANGATHAN         │
│   LOGO         Official Letterhead                      │
│   IMAGE]                                                │
│  District: Name (Code) | Email: xxx | Phone: xxx        │
│──────────────────────────────────────────────────────────│
```

## Pagination Fixed ✅

### Before:
- Always 5 pages regardless of data
- Wrong page numbers

### After:
- **10 members** = 1 page
- **30 members** = 2 pages (without details) or 2 pages (with details)
- **50 members** = 2 pages (without details) or 4 pages (with details)
- **100 members** = 4 pages (without details) or 7 pages (with details)
- Accurate page numbers (e.g., "Page 2 of 4")

## Items Per Page

### Members Report:
- **Without details:** 28 members per page
- **With details:** 16 members per page

### Volunteers Report:
- **22 volunteers per page**

## Testing

### Test Different Scenarios:
1. Generate report with 5 members → Should be 1 page
2. Generate report with 30 members → Should be 2 pages
3. Generate report with 100 members → Should be 4 pages
4. Generate report with details → Should use more pages
5. Check page numbers are correct

### Verify:
- ✅ Correct number of pages
- ✅ No blank pages
- ✅ Accurate page numbers in footer
- ✅ Letterhead on every page
- ✅ Footer on every page
- ⏳ Logo (once you add the image file)

## Quick Fix Summary

### What Was Fixed:
1. ✅ Pagination - now generates exact pages needed
2. ✅ Page calculation - accurate based on data
3. ✅ Row height - optimized for space
4. ✅ Items per page - calculated properly
5. ✅ Page numbers - accurate (e.g., "Page 2 of 5")
6. ✅ Clean letterhead design
7. ✅ No Gujarati text issues
8. ⏳ Logo placeholder (ready for your image)

### What You Need to Do:
1. Save your logo image as `assets/logo.png`
2. Uncomment the logo code in routes/reports.js
3. Test the reports
4. Adjust logo size if needed

## File Structure

```
project-root/
├── assets/
│   └── logo.png          ← Add your logo here
├── routes/
│   └── reports.js        ← Logo code is here
├── models/
├── client/
└── server.js
```

## Support

If you need help adding the logo:
1. Save the logo image file
2. Tell me the file name and location
3. I'll update the code to use it

The reports are now working correctly with proper pagination. Just add your logo image and you're done!
