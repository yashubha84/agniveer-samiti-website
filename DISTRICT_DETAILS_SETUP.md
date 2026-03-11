# District Details Setup Guide

## Overview
This guide explains how to add President, Vice President, and contact details for all 33 Gujarat districts. These details will appear on the official letterhead in PDF reports.

## New Letterhead Design ✅

The PDF report header now matches your official letterhead:

```
┌─────────────────────────────────────────────────────────────┐
│  [RED LOGO]     AKHIL GUJARAT AGNIVEER SANGATHAN            │
│   અખિલ ગુજરાત                                              │
│   અગ્નિવીર સમિતિ        Official Letterhead                │
│                                                              │
│  District: Ahmedabad (Code: 01) | Email: xxx | Phone: xxx   │
│──────────────────────────────────────────────────────────────│
```

## Database Schema Updates

### District Model - New Fields Added:

```javascript
{
  // Existing fields
  name: String,
  districtCode: String,
  username: String,
  password: String,
  
  // NEW CONTACT FIELDS
  email: String,              // District contact email
  phone: String,              // District contact phone
  address: String,            // District office address
  website: String,            // District website (optional)
  
  // Leadership details
  president: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  vicePresident: {
    name: String,
    phone: String,
    email: String,
    photo: String
  }
}
```

## How to Update District Details

### Method 1: Using the Update Script (Recommended)

I've created a script with placeholder data for all 33 districts. You need to:

1. **Edit the script with real data:**
   ```bash
   # Open the file
   code scripts/updateDistrictDetails.js
   ```

2. **Replace placeholder data with real information:**
   ```javascript
   {
     districtCode: '01',
     name: 'Ahmedabad',
     email: 'ahmedabad@agniveersangathan.org',  // REPLACE THIS
     phone: '079-XXXXXXXX',                      // REPLACE THIS
     address: 'Ahmedabad District Office, Gujarat', // REPLACE THIS
     president: {
       name: 'President Name',                   // REPLACE THIS
       phone: '98XXXXXXXX',                      // REPLACE THIS
       email: 'president.ahmedabad@agniveersangathan.org' // REPLACE THIS
     },
     vicePresident: {
       name: 'Vice President Name',              // REPLACE THIS
       phone: '98XXXXXXXX',                      // REPLACE THIS
       email: 'vp.ahmedabad@agniveersangathan.org' // REPLACE THIS
     }
   }
   ```

3. **Run the script:**
   ```bash
   node scripts/updateDistrictDetails.js
   ```

4. **Verify the output:**
   ```
   Connected to MongoDB
   ✓ Updated Ahmedabad district
   ✓ Updated Amreli district
   ✓ Updated Anand district
   ...
   ✅ All districts updated successfully!
   ```

### Method 2: Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `samiti_db` → `districts` collection
4. Find a district (e.g., Ahmedabad)
5. Click "Edit Document"
6. Add/update fields:
   ```json
   {
     "email": "ahmedabad@agniveersangathan.org",
     "phone": "079-12345678",
     "address": "123 Main Street, Ahmedabad",
     "president": {
       "name": "John Doe",
       "phone": "9876543210",
       "email": "john@example.com"
     },
     "vicePresident": {
       "name": "Jane Smith",
       "phone": "9876543211",
       "email": "jane@example.com"
     }
   }
   ```
7. Click "Update"

### Method 3: Using Admin Dashboard (Future Enhancement)

We can add a form in the Admin Dashboard to update these details through the UI.

## Email Template for All Districts

I've created placeholder emails following this pattern:

### District Contact Emails:
```
ahmedabad@agniveersangathan.org
amreli@agniveersangathan.org
anand@agniveersangathan.org
... (all 33 districts)
```

### President Emails:
```
president.ahmedabad@agniveersangathan.org
president.amreli@agniveersangathan.org
president.anand@agniveersangathan.org
... (all 33 districts)
```

### Vice President Emails:
```
vp.ahmedabad@agniveersangathan.org
vp.amreli@agniveersangathan.org
vp.anand@agniveersangathan.org
... (all 33 districts)
```

## Complete District List with Codes

| Code | District Name      | Placeholder Email                    |
|------|--------------------|--------------------------------------|
| 01   | Ahmedabad          | ahmedabad@agniveersangathan.org      |
| 02   | Amreli             | amreli@agniveersangathan.org         |
| 03   | Anand              | anand@agniveersangathan.org          |
| 04   | Aravalli           | aravalli@agniveersangathan.org       |
| 05   | Banaskantha        | banaskantha@agniveersangathan.org    |
| 06   | Bharuch            | bharuch@agniveersangathan.org        |
| 07   | Bhavnagar          | bhavnagar@agniveersangathan.org      |
| 08   | Botad              | botad@agniveersangathan.org          |
| 09   | Chhota Udaipur     | chhotaudaipur@agniveersangathan.org  |
| 10   | Dahod              | dahod@agniveersangathan.org          |
| 11   | Dang               | dang@agniveersangathan.org           |
| 12   | Devbhoomi Dwarka   | devbhoomidwarka@agniveersangathan.org|
| 13   | Gandhinagar        | gandhinagar@agniveersangathan.org    |
| 14   | Gir Somnath        | girsomnath@agniveersangathan.org     |
| 15   | Jamnagar           | jamnagar@agniveersangathan.org       |
| 16   | Junagadh           | junagadh@agniveersangathan.org       |
| 17   | Kheda              | kheda@agniveersangathan.org          |
| 18   | Kutch              | kutch@agniveersangathan.org          |
| 19   | Mahisagar          | mahisagar@agniveersangathan.org      |
| 20   | Mehsana            | mehsana@agniveersangathan.org        |
| 21   | Morbi              | morbi@agniveersangathan.org          |
| 22   | Narmada            | narmada@agniveersangathan.org        |
| 23   | Navsari            | navsari@agniveersangathan.org        |
| 24   | Panchmahal         | panchmahal@agniveersangathan.org     |
| 25   | Patan              | patan@agniveersangathan.org          |
| 26   | Porbandar          | porbandar@agniveersangathan.org      |
| 27   | Rajkot             | rajkot@agniveersangathan.org         |
| 28   | Sabarkantha        | sabarkantha@agniveersangathan.org    |
| 29   | Surat              | surat@agniveersangathan.org          |
| 30   | Surendranagar      | surendranagar@agniveersangathan.org  |
| 31   | Tapi               | tapi@agniveersangathan.org           |
| 32   | Vadodara           | vadodara@agniveersangathan.org       |
| 33   | Valsad             | valsad@agniveersangathan.org         |

## Data Collection Template

Use this template to collect information from each district:

### District: _______________

**Contact Information:**
- District Email: _______________________
- District Phone: _______________________
- District Address: _____________________
- Website (optional): ___________________

**President Details:**
- Full Name: ___________________________
- Mobile Number: _______________________
- Email Address: _______________________

**Vice President Details:**
- Full Name: ___________________________
- Mobile Number: _______________________
- Email Address: _______________________

## How Data Appears in Reports

### In PDF Header:
```
AKHIL GUJARAT AGNIVEER SANGATHAN
Official Letterhead
District: Ahmedabad (Code: 01) | Email: ahmedabad@agniveersangathan.org | Phone: 079-12345678
```

### In Report Body:
The president and vice president names will appear in the district information section and signature area.

## Testing the Updates

### After updating district details:

1. **Login as State Admin:**
   ```
   Username: admin
   Password: admin123
   ```

2. **Go to Reports page**

3. **Generate a test report:**
   - Select a district you updated
   - Choose "Members Report"
   - Click "Generate PDF Report"

4. **Verify the PDF header shows:**
   - ✅ Official letterhead design
   - ✅ District name and code
   - ✅ District email
   - ✅ District phone
   - ✅ President name (if added)
   - ✅ Vice President name (if added)

## Quick Update Commands

### Update Single District:
```javascript
// In MongoDB shell or Compass
db.districts.updateOne(
  { districtCode: "01" },
  {
    $set: {
      email: "ahmedabad@agniveersangathan.org",
      phone: "079-12345678",
      address: "123 Main St, Ahmedabad",
      president: {
        name: "John Doe",
        phone: "9876543210",
        email: "john@example.com"
      },
      vicePresident: {
        name: "Jane Smith",
        phone: "9876543211",
        email: "jane@example.com"
      }
    }
  }
)
```

### Update Multiple Districts:
Use the provided script `scripts/updateDistrictDetails.js` after editing with real data.

## Important Notes

1. **Email Format:** Use professional email addresses
2. **Phone Format:** Include STD code for landlines (e.g., 079-12345678)
3. **Mobile Format:** 10-digit mobile numbers (e.g., 9876543210)
4. **Names:** Use full official names for president and vice president
5. **Address:** Include complete office address

## Next Steps

1. ✅ Collect real data from all 33 districts
2. ✅ Update the script with real information
3. ✅ Run the update script
4. ✅ Test PDF generation
5. ✅ Verify letterhead appears correctly
6. ✅ Share sample PDFs with stakeholders

## Support

If you need help:
1. Check MongoDB connection: `node test-connection.js`
2. Verify district exists: Check in MongoDB Compass
3. Test with one district first before bulk update
4. Generate test report to verify changes

## Files Modified

- ✅ `models/District.js` - Added email, phone, address, website fields
- ✅ `routes/reports.js` - Updated letterhead design
- ✅ `scripts/updateDistrictDetails.js` - Bulk update script
- ✅ `DISTRICT_DETAILS_SETUP.md` - This guide

## Status: READY FOR DATA ENTRY ✅

The system is ready. You just need to provide the real data for all 33 districts!
