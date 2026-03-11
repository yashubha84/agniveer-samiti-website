# Database Visual Structure

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    અખિલ ગુજરાત અગ્નિવીર સમિતિ              │
│                    MongoDB Database: samiti_db               │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   State Admin    │  ← Full system access
│   (admins)       │
└────────┬─────────┘
         │ manages
         ↓
┌──────────────────────────────────────────────────────────────┐
│                    33 Gujarat Districts                       │
│                    (districts collection)                     │
│                                                               │
│  01-Ahmedabad    02-Amreli      03-Anand     04-Aravalli    │
│  05-Banaskantha  06-Bharuch     07-Bhavnagar 08-Botad       │
│  09-Chhota Udaipur 10-Dahod     11-Dang      12-Devbhoomi   │
│  13-Gandhinagar  14-Gir Somnath 15-Jamnagar  16-Junagadh    │
│  17-Kheda        18-Kutch       19-Mahisagar 20-Mehsana     │
│  21-Morbi        22-Narmada     23-Navsari   24-Panchmahal  │
│  25-Patan        26-Porbandar   27-Rajkot    28-Sabarkantha │
│  29-Surat        30-Surendranagar 31-Tapi    32-Vadodara    │
│  33-Valsad                                                   │
└───┬──────────────────────────────────────────────────────────┘
    │
    ├─────────────────────────────────────────────────────────┐
    │                                                          │
    ↓                                                          ↓
┌──────────────┐                                    ┌──────────────┐
│   Members    │                                    │  Volunteers  │
│  (members)   │                                    │ (volunteers) │
│              │                                    │              │
│ ID Format:   │                                    │ ID Format:   │
│ 24{code}{#}  │                                    │ 24{code}V{#} │
│              │                                    │              │
│ Example:     │                                    │ Example:     │
│ 2401000001   │                                    │ 2401V0001    │
│ ↑  ↑  ↑      │                                    │ ↑  ↑ ↑ ↑     │
│ │  │  └─ #   │                                    │ │  │ │ └─ #  │
│ │  └─ Dist   │                                    │ │  │ └─ Vol  │
│ └─ State     │                                    │ │  └─ Dist   │
│              │                                    │ └─ State     │
└──────────────┘                                    └──────────────┘
    │                                                      │
    │                                                      │
    └──────────────────┬───────────────────────────────────┘
                       │
                       ↓
              ┌──────────────┐
              │    Events    │
              │   (events)   │
              │              │
              │ • District   │
              │ • State      │
              └──────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    Additional Collections                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐        ┌─────────────────┐            │
│  │  Notifications  │        │    Feedback     │            │
│  │ (notifications) │        │   (feedback)    │            │
│  │                 │        │                 │            │
│  │ • State-wide    │        │ • User ratings  │            │
│  │ • District      │        │ • Comments      │            │
│  │ • Event alerts  │        │ • Responses     │            │
│  └─────────────────┘        └─────────────────┘            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### User Registration Flow
```
Public User
    │
    ├─→ Member Registration
    │       │
    │       ↓
    │   [Pending Status]
    │       │
    │       ↓
    │   District Admin Reviews
    │       │
    │       ├─→ Approve → [Member ID Generated: 24{code}{num}]
    │       └─→ Reject  → [Status: Rejected]
    │
    └─→ Volunteer Registration
            │
            ↓
        [Volunteer ID Generated: 24{code}V{num}]
```

### Authentication Flow
```
Login Request
    │
    ├─→ State Admin Login
    │       │
    │       ↓
    │   [Full Access to All Districts]
    │
    └─→ District Admin Login
            │
            ↓
        [Check Approval Status]
            │
            ├─→ Approved → [Access to Own District Only]
            └─→ Not Approved → [Login Denied]
```

### Event Creation Flow
```
District Admin
    │
    ↓
Create Event
    │
    ├─→ District Event
    │       │
    │       ↓
    │   Visible to District Members
    │
    └─→ State Event (State Admin Only)
            │
            ↓
        Visible to All Districts
```

---

## ID Generation System

### Member ID Structure
```
┌──────┬──────────┬────────────────┐
│  24  │    01    │     00001      │
└──────┴──────────┴────────────────┘
   │        │            │
   │        │            └─ Member Number (5 digits)
   │        └─ District Code (2 digits)
   └─ Gujarat State Code

Examples:
• 2401000001 - First member of Ahmedabad (01)
• 2427000001 - First member of Rajkot (27)
• 2429000001 - First member of Surat (29)
```

### Volunteer ID Structure
```
┌──────┬──────────┬───┬──────────┐
│  24  │    01    │ V │   0001   │
└──────┴──────────┴───┴──────────┘
   │        │       │       │
   │        │       │       └─ Volunteer Number (4 digits)
   │        │       └─ Volunteer Identifier
   │        └─ District Code (2 digits)
   └─ Gujarat State Code

Examples:
• 2401V0001 - First volunteer of Ahmedabad
• 2427V0001 - First volunteer of Rajkot
• 2429V0001 - First volunteer of Surat
```

---

## Access Control Matrix

```
┌─────────────────┬──────────────┬──────────────┬──────────────┐
│    Feature      │ State Admin  │District Admin│ Public User  │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ View All        │      ✓       │      ✗       │      ✗       │
│ Districts       │              │              │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Approve         │      ✓       │      ✗       │      ✗       │
│ Districts       │              │              │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Assign          │      ✓       │      ✗       │      ✗       │
│ Leadership      │              │              │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ View Own        │      ✓       │      ✓       │      ✗       │
│ District Data   │              │              │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Approve         │      ✓       │      ✓       │      ✗       │
│ Members         │              │  (Own only)  │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Create Events   │      ✓       │      ✓       │      ✗       │
│                 │              │  (Own only)  │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ View Feedback   │      ✓       │      ✓       │      ✗       │
│                 │    (All)     │  (Own only)  │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Register as     │      ✗       │      ✗       │      ✓       │
│ Member          │              │              │              │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Submit          │      ✗       │      ✗       │      ✓       │
│ Feedback        │              │              │              │
└─────────────────┴──────────────┴──────────────┴──────────────┘
```

---

## Collection Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      Relationships                           │
└─────────────────────────────────────────────────────────────┘

admins (1) ──────manages──────→ districts (many)

districts (1) ────has──────→ members (many)
              ────has──────→ volunteers (many)
              ────creates──→ events (many)
              ────creates──→ notifications (many)
              ────receives─→ feedback (many)

events (many) ────has──────→ volunteers (many)

members (many) ───belongs to──→ districts (1)
volunteers (many) ─belongs to──→ districts (1)
```

---

## Storage Estimates

```
┌──────────────────┬────────────┬──────────────┬──────────────┐
│   Collection     │  Documents │  Avg Size    │  Total Size  │
├──────────────────┼────────────┼──────────────┼──────────────┤
│ admins           │     10     │    1 KB      │    10 KB     │
│ districts        │     33     │    1.5 KB    │    50 KB     │
│ members          │  10,000    │    1 KB      │    10 MB     │
│ volunteers       │   5,000    │    1 KB      │     5 MB     │
│ events           │     500    │    1 KB      │   500 KB     │
│ notifications    │   1,000    │    0.5 KB    │   500 KB     │
│ feedback         │   2,000    │    1 KB      │     2 MB     │
├──────────────────┼────────────┼──────────────┼──────────────┤
│ TOTAL            │  18,543    │              │   ~18 MB     │
└──────────────────┴────────────┴──────────────┴──────────────┘

✓ Well within MongoDB Atlas Free Tier (512 MB)
```

---

## Backup Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Backup Schedule                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MongoDB Atlas (Automatic):                                 │
│  ├─ Continuous backups                                      │
│  ├─ Point-in-time recovery                                  │
│  └─ Automated snapshots every 24 hours                      │
│                                                              │
│  Local MongoDB (Manual):                                    │
│  ├─ Daily: mongodump --db samiti_db                        │
│  ├─ Weekly: Full backup to external storage                │
│  └─ Monthly: Archive old backups                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```
