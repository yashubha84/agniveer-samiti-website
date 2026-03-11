const mongoose = require('mongoose');
const District = require('../models/District');
require('dotenv').config();

// District-wise President, Vice President, and Contact Details
const districtDetails = [
  {
    districtCode: '01',
    name: 'Ahmedabad',
    email: 'ahmedabad@agniveersangathan.org',
    phone: '079-XXXXXXXX',
    address: 'Ahmedabad District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.ahmedabad@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.ahmedabad@agniveersangathan.org'
    }
  },
  {
    districtCode: '02',
    name: 'Amreli',
    email: 'amreli@agniveersangathan.org',
    phone: '02792-XXXXXX',
    address: 'Amreli District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.amreli@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.amreli@agniveersangathan.org'
    }
  },
  {
    districtCode: '03',
    name: 'Anand',
    email: 'anand@agniveersangathan.org',
    phone: '02692-XXXXXX',
    address: 'Anand District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.anand@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.anand@agniveersangathan.org'
    }
  },
  {
    districtCode: '04',
    name: 'Aravalli',
    email: 'aravalli@agniveersangathan.org',
    phone: '02774-XXXXXX',
    address: 'Aravalli District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.aravalli@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.aravalli@agniveersangathan.org'
    }
  },
  {
    districtCode: '05',
    name: 'Banaskantha',
    email: 'banaskantha@agniveersangathan.org',
    phone: '02742-XXXXXX',
    address: 'Banaskantha District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.banaskantha@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.banaskantha@agniveersangathan.org'
    }
  },
  {
    districtCode: '06',
    name: 'Bharuch',
    email: 'bharuch@agniveersangathan.org',
    phone: '02642-XXXXXX',
    address: 'Bharuch District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.bharuch@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.bharuch@agniveersangathan.org'
    }
  },
  {
    districtCode: '07',
    name: 'Bhavnagar',
    email: 'bhavnagar@agniveersangathan.org',
    phone: '0278-XXXXXXX',
    address: 'Bhavnagar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.bhavnagar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.bhavnagar@agniveersangathan.org'
    }
  },
  {
    districtCode: '08',
    name: 'Botad',
    email: 'botad@agniveersangathan.org',
    phone: '02849-XXXXXX',
    address: 'Botad District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.botad@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.botad@agniveersangathan.org'
    }
  },
  {
    districtCode: '09',
    name: 'Chhota Udaipur',
    email: 'chhotaudaipur@agniveersangathan.org',
    phone: '02669-XXXXXX',
    address: 'Chhota Udaipur District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.chhotaudaipur@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.chhotaudaipur@agniveersangathan.org'
    }
  },
  {
    districtCode: '10',
    name: 'Dahod',
    email: 'dahod@agniveersangathan.org',
    phone: '02673-XXXXXX',
    address: 'Dahod District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.dahod@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.dahod@agniveersangathan.org'
    }
  },
  {
    districtCode: '11',
    name: 'Dang',
    email: 'dang@agniveersangathan.org',
    phone: '02631-XXXXXX',
    address: 'Dang District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.dang@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.dang@agniveersangathan.org'
    }
  },
  {
    districtCode: '12',
    name: 'Devbhoomi Dwarka',
    email: 'devbhoomidwarka@agniveersangathan.org',
    phone: '02833-XXXXXX',
    address: 'Devbhoomi Dwarka District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.devbhoomidwarka@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.devbhoomidwarka@agniveersangathan.org'
    }
  },
  {
    districtCode: '13',
    name: 'Gandhinagar',
    email: 'gandhinagar@agniveersangathan.org',
    phone: '079-XXXXXXXX',
    address: 'Gandhinagar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.gandhinagar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.gandhinagar@agniveersangathan.org'
    }
  },
  {
    districtCode: '14',
    name: 'Gir Somnath',
    email: 'girsomnath@agniveersangathan.org',
    phone: '02877-XXXXXX',
    address: 'Gir Somnath District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.girsomnath@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.girsomnath@agniveersangathan.org'
    }
  },
  {
    districtCode: '15',
    name: 'Jamnagar',
    email: 'jamnagar@agniveersangathan.org',
    phone: '0288-XXXXXXX',
    address: 'Jamnagar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.jamnagar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.jamnagar@agniveersangathan.org'
    }
  },
  {
    districtCode: '16',
    name: 'Junagadh',
    email: 'junagadh@agniveersangathan.org',
    phone: '0285-XXXXXXX',
    address: 'Junagadh District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.junagadh@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.junagadh@agniveersangathan.org'
    }
  },
  {
    districtCode: '17',
    name: 'Kheda',
    email: 'kheda@agniveersangathan.org',
    phone: '02692-XXXXXX',
    address: 'Kheda District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.kheda@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.kheda@agniveersangathan.org'
    }
  },
  {
    districtCode: '18',
    name: 'Kutch',
    email: 'kutch@agniveersangathan.org',
    phone: '02832-XXXXXX',
    address: 'Kutch District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.kutch@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.kutch@agniveersangathan.org'
    }
  },
  {
    districtCode: '19',
    name: 'Mahisagar',
    email: 'mahisagar@agniveersangathan.org',
    phone: '02678-XXXXXX',
    address: 'Mahisagar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.mahisagar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.mahisagar@agniveersangathan.org'
    }
  },
  {
    districtCode: '20',
    name: 'Mehsana',
    email: 'mehsana@agniveersangathan.org',
    phone: '02762-XXXXXX',
    address: 'Mehsana District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.mehsana@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.mehsana@agniveersangathan.org'
    }
  },
  {
    districtCode: '21',
    name: 'Morbi',
    email: 'morbi@agniveersangathan.org',
    phone: '02822-XXXXXX',
    address: 'Morbi District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.morbi@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.morbi@agniveersangathan.org'
    }
  },
  {
    districtCode: '22',
    name: 'Narmada',
    email: 'narmada@agniveersangathan.org',
    phone: '02640-XXXXXX',
    address: 'Narmada District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.narmada@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.narmada@agniveersangathan.org'
    }
  },
  {
    districtCode: '23',
    name: 'Navsari',
    email: 'navsari@agniveersangathan.org',
    phone: '02637-XXXXXX',
    address: 'Navsari District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.navsari@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.navsari@agniveersangathan.org'
    }
  },
  {
    districtCode: '24',
    name: 'Panchmahal',
    email: 'panchmahal@agniveersangathan.org',
    phone: '02674-XXXXXX',
    address: 'Panchmahal District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.panchmahal@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.panchmahal@agniveersangathan.org'
    }
  },
  {
    districtCode: '25',
    name: 'Patan',
    email: 'patan@agniveersangathan.org',
    phone: '02766-XXXXXX',
    address: 'Patan District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.patan@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.patan@agniveersangathan.org'
    }
  },
  {
    districtCode: '26',
    name: 'Porbandar',
    email: 'porbandar@agniveersangathan.org',
    phone: '0286-XXXXXXX',
    address: 'Porbandar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.porbandar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.porbandar@agniveersangathan.org'
    }
  },
  {
    districtCode: '27',
    name: 'Rajkot',
    email: 'rajkot@agniveersangathan.org',
    phone: '0281-XXXXXXX',
    address: 'Rajkot District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.rajkot@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.rajkot@agniveersangathan.org'
    }
  },
  {
    districtCode: '28',
    name: 'Sabarkantha',
    email: 'sabarkantha@agniveersangathan.org',
    phone: '02772-XXXXXX',
    address: 'Sabarkantha District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.sabarkantha@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.sabarkantha@agniveersangathan.org'
    }
  },
  {
    districtCode: '29',
    name: 'Surat',
    email: 'surat@agniveersangathan.org',
    phone: '0261-XXXXXXX',
    address: 'Surat District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.surat@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.surat@agniveersangathan.org'
    }
  },
  {
    districtCode: '30',
    name: 'Surendranagar',
    email: 'surendranagar@agniveersangathan.org',
    phone: '02752-XXXXXX',
    address: 'Surendranagar District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.surendranagar@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.surendranagar@agniveersangathan.org'
    }
  },
  {
    districtCode: '31',
    name: 'Tapi',
    email: 'tapi@agniveersangathan.org',
    phone: '02623-XXXXXX',
    address: 'Tapi District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.tapi@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.tapi@agniveersangathan.org'
    }
  },
  {
    districtCode: '32',
    name: 'Vadodara',
    email: 'vadodara@agniveersangathan.org',
    phone: '0265-XXXXXXX',
    address: 'Vadodara District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.vadodara@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.vadodara@agniveersangathan.org'
    }
  },
  {
    districtCode: '33',
    name: 'Valsad',
    email: 'valsad@agniveersangathan.org',
    phone: '02632-XXXXXX',
    address: 'Valsad District Office, Gujarat',
    president: {
      name: 'President Name',
      phone: '98XXXXXXXX',
      email: 'president.valsad@agniveersangathan.org'
    },
    vicePresident: {
      name: 'Vice President Name',
      phone: '98XXXXXXXX',
      email: 'vp.valsad@agniveersangathan.org'
    }
  }
];

async function updateDistrictDetails() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const details of districtDetails) {
      const result = await District.findOneAndUpdate(
        { districtCode: details.districtCode },
        {
          $set: {
            email: details.email,
            phone: details.phone,
            address: details.address,
            president: details.president,
            vicePresident: details.vicePresident
          }
        },
        { new: true }
      );

      if (result) {
        console.log(`✓ Updated ${details.name} district`);
      } else {
        console.log(`✗ District ${details.name} not found`);
      }
    }

    console.log('\n✅ All districts updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateDistrictDetails();
