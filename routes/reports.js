const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Member = require('../models/Member');
const Volunteer = require('../models/Volunteer');
const District = require('../models/District');
const { auth } = require('../middleware/auth');

// Letterhead - No logo, no Gujarati, district details in table
const addLetterhead = (doc, districtInfo) => {
  // Organization Name (centered)
  doc.fillColor('#000000');
  doc.fontSize(20).font('Helvetica-Bold').text('AKHIL GUJARAT AGNIVEER SANGATHAN', 50, 40, { 
    width: doc.page.width - 100, 
    align: 'center' 
  });
  doc.fontSize(10).font('Helvetica').fillColor('#666666').text('Official Letterhead', 50, 68, { 
    width: doc.page.width - 100, 
    align: 'center' 
  });
  
  // District details in table format
  if (districtInfo) {
    const tableY = 95;
    doc.fontSize(9).fillColor('#000000').font('Helvetica');
    
    // Table border
    doc.rect(50, tableY, doc.page.width - 100, 60).stroke('#C53030');
    
    // Vertical divider
    doc.moveTo(150, tableY).lineTo(150, tableY + 60).stroke('#C53030');
    
    // Horizontal dividers
    doc.moveTo(50, tableY + 20).lineTo(doc.page.width - 50, tableY + 20).stroke('#C53030');
    doc.moveTo(50, tableY + 40).lineTo(doc.page.width - 50, tableY + 40).stroke('#C53030');
    
    // Labels (left column)
    doc.font('Helvetica-Bold').text('District:', 55, tableY + 6);
    doc.text('Email:', 55, tableY + 26);
    doc.text('Phone:', 55, tableY + 46);
    
    // Values (right column)
    doc.font('Helvetica');
    doc.text(`${districtInfo.name} (Code: ${districtInfo.districtCode})`, 155, tableY + 6, { width: doc.page.width - 210 });
    doc.text(districtInfo.email || 'N/A', 155, tableY + 26, { width: doc.page.width - 210 });
    doc.text(districtInfo.phone || 'N/A', 155, tableY + 46, { width: doc.page.width - 210 });
  }
  
  // Separator line
  doc.moveTo(50, 165).lineTo(doc.page.width - 50, 165).lineWidth(2).strokeColor('#C53030').stroke();
  doc.fillColor('#000000').strokeColor('#000000').lineWidth(1);
  doc.y = 180;
};

// Footer - Signature on right, page number on left
const addFooter = (doc, generatedBy, designation, pageNumber, totalPages) => {
  const bottomY = doc.page.height - 90;
  
  // Page number (left side)
  doc.fontSize(8).fillColor('#000000').font('Helvetica');
  doc.text(`Page ${pageNumber} of ${totalPages}`, 50, bottomY + 61);
  
  // Authorized Signature (right side)
  doc.fontSize(9).fillColor('#000000').font('Helvetica');
  doc.text('Authorized Signature:', doc.page.width - 200, bottomY, { width: 150, align: 'right' });
  doc.moveTo(doc.page.width - 200, bottomY + 30).lineTo(doc.page.width - 50, bottomY + 30).stroke('#000000');
  doc.fontSize(8).text(generatedBy, doc.page.width - 200, bottomY + 35, { width: 150, align: 'right' });
  doc.text(designation, doc.page.width - 200, bottomY + 48, { width: 150, align: 'right' });
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, doc.page.width - 200, bottomY + 61, { width: 150, align: 'right' });
  
  // Footer line
  doc.moveTo(50, doc.page.height - 20).lineTo(doc.page.width - 50, doc.page.height - 20).stroke('#C53030');
};

// Generate Member Report
router.post('/members/custom', auth, async (req, res) => {
  try {
    let { districtId, limit, status, includeDetails } = req.body;
    const user = req.user;
    
    limit = parseInt(limit) || 100;
    
    let query = {};
    if (user.role === 'district_admin') {
      query.district = user.districtId;
    } else if (districtId && districtId !== 'all') {
      query.district = districtId;
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const members = await Member.find(query)
      .populate('district', 'name districtCode president vicePresident email phone')
      .limit(limit)
      .sort({ createdAt: -1 });
    
    if (members.length === 0) {
      return res.status(404).json({ error: 'No members found' });
    }
    
    let districtInfo = null;
    if (user.role === 'district_admin') {
      districtInfo = await District.findById(user.districtId);
    } else if (districtId && districtId !== 'all') {
      districtInfo = await District.findById(districtId);
    }
    
    let generatedBy = 'State Administrator';
    let designation = 'State Admin';
    if (user.role === 'district_admin' && districtInfo) {
      generatedBy = districtInfo.president?.name || districtInfo.name + ' Admin';
      designation = 'District President';
    }
    
    const rowHeight = includeDetails ? 40 : 22;
    const rowsPerPage = includeDetails ? 16 : 28;
    const totalPages = Math.ceil(members.length / rowsPerPage);
    
    const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=members-report-${Date.now()}.pdf`);
    doc.pipe(res);
    
    let currentPage = 1;
    let itemsOnPage = 0;
    
    addLetterhead(doc, districtInfo);
    
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#C53030').text('Member List Report', { align: 'center' });
    doc.moveDown(0.3);
    
    doc.fontSize(9).font('Helvetica').fillColor('#000000');
    if (districtInfo) {
      doc.text(`District: ${districtInfo.name} (Code: ${districtInfo.districtCode})`);
    } else {
      doc.text('District: All Districts');
    }
    doc.text(`Status: ${status === 'all' ? 'All' : status || 'All'} | Total Members: ${members.length} | Generated: ${new Date().toLocaleString('en-IN')}`);
    doc.moveDown(0.5);
    
    const drawTableHeader = () => {
      const headerY = doc.y;
      doc.rect(50, headerY, doc.page.width - 100, 18).fill('#C53030');
      doc.fontSize(8).font('Helvetica-Bold').fillColor('#ffffff');
      doc.text('Sr', 55, headerY + 5, { width: 20 });
      doc.text('Member ID', 80, headerY + 5, { width: 70 });
      doc.text('Name', 155, headerY + 5, { width: 100 });
      doc.text('Army No', 260, headerY + 5, { width: 65 });
      doc.text('Phone', 330, headerY + 5, { width: 70 });
      doc.text('Status', 405, headerY + 5, { width: 50 });
      doc.y = headerY + 20;
      doc.fillColor('#000000');
    };
    
    drawTableHeader();
    
    members.forEach((member, index) => {
      if (doc.y > doc.page.height - 130 || itemsOnPage >= rowsPerPage) {
        addFooter(doc, generatedBy, designation, currentPage, totalPages);
        doc.addPage();
        currentPage++;
        itemsOnPage = 0;
        addLetterhead(doc, districtInfo);
        doc.moveDown(0.5);
        drawTableHeader();
      }
      
      const rowY = doc.y;
      
      if (index % 2 === 0) {
        doc.rect(50, rowY, doc.page.width - 100, rowHeight).fill('#f5f5f5');
      }
      
      doc.fontSize(8).font('Helvetica').fillColor('#000000');
      doc.text(`${index + 1}`, 55, rowY + 4, { width: 20 });
      doc.text(member.memberId || 'N/A', 80, rowY + 4, { width: 70 });
      doc.text(member.fullName, 155, rowY + 4, { width: 100 });
      doc.text(member.armyNumber, 260, rowY + 4, { width: 65 });
      doc.text(member.phone, 330, rowY + 4, { width: 70 });
      
      const statusColor = member.status === 'approved' ? '#10b981' : member.status === 'pending' ? '#f59e0b' : '#ef4444';
      doc.fillColor(statusColor).text(member.status.toUpperCase(), 405, rowY + 4, { width: 50 });
      doc.fillColor('#000000');
      
      if (includeDetails) {
        doc.fontSize(7).fillColor('#666666');
        doc.text(`Email: ${member.email}`, 80, rowY + 16, { width: 375 });
        doc.text(`Address: ${member.address}`, 80, rowY + 26, { width: 375 });
        if (member.occupation) {
          doc.text(`Occupation: ${member.occupation}`, 80, rowY + 36, { width: 375 });
        }
        doc.fillColor('#000000');
      }
      
      doc.y = rowY + rowHeight;
      itemsOnPage++;
    });
    
    addFooter(doc, generatedBy, designation, currentPage, totalPages);
    doc.end();
    
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get district statistics
router.get('/statistics/districts', auth, async (req, res) => {
  try {
    if (req.user.role !== 'state_admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const districts = await District.find({ isActive: true }).select('name districtCode');
    const statistics = [];
    
    for (const district of districts) {
      const totalMembers = await Member.countDocuments({ district: district._id });
      const approvedMembers = await Member.countDocuments({ district: district._id, status: 'approved' });
      const pendingMembers = await Member.countDocuments({ district: district._id, status: 'pending' });
      const totalVolunteers = await Volunteer.countDocuments({ district: district._id });
      
      statistics.push({
        districtId: district._id,
        districtName: district.name,
        districtCode: district.districtCode,
        totalMembers,
        approvedMembers,
        pendingMembers,
        totalVolunteers
      });
    }
    
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate Volunteer Report
router.post('/volunteers/custom', auth, async (req, res) => {
  try {
    let { districtId, limit } = req.body;
    const user = req.user;
    
    limit = parseInt(limit) || 100;
    
    let query = {};
    if (user.role === 'district_admin') {
      query.district = user.districtId;
    } else if (districtId && districtId !== 'all') {
      query.district = districtId;
    }
    
    const volunteers = await Volunteer.find(query)
      .populate('district', 'name districtCode president vicePresident email phone')
      .limit(limit)
      .sort({ createdAt: -1 });
    
    if (volunteers.length === 0) {
      return res.status(404).json({ error: 'No volunteers found' });
    }
    
    let districtInfo = null;
    if (user.role === 'district_admin') {
      districtInfo = await District.findById(user.districtId);
    } else if (districtId && districtId !== 'all') {
      districtInfo = await District.findById(districtId);
    }
    
    let generatedBy = 'State Administrator';
    let designation = 'State Admin';
    if (user.role === 'district_admin' && districtInfo) {
      generatedBy = districtInfo.president?.name || districtInfo.name + ' Admin';
      designation = 'District President';
    }
    
    const rowHeight = 30;
    const rowsPerPage = 22;
    const totalPages = Math.ceil(volunteers.length / rowsPerPage);
    
    const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=volunteers-report-${Date.now()}.pdf`);
    doc.pipe(res);
    
    let currentPage = 1;
    let itemsOnPage = 0;
    
    addLetterhead(doc, districtInfo);
    
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#C53030').text('Volunteer List Report', { align: 'center' });
    doc.moveDown(0.3);
    
    doc.fontSize(9).font('Helvetica').fillColor('#000000');
    if (districtInfo) {
      doc.text(`District: ${districtInfo.name} (Code: ${districtInfo.districtCode})`);
    } else {
      doc.text('District: All Districts');
    }
    doc.text(`Total Volunteers: ${volunteers.length} | Generated: ${new Date().toLocaleString('en-IN')}`);
    doc.moveDown(0.5);
    
    volunteers.forEach((volunteer, index) => {
      if (doc.y > doc.page.height - 130 || itemsOnPage >= rowsPerPage) {
        addFooter(doc, generatedBy, designation, currentPage, totalPages);
        doc.addPage();
        currentPage++;
        itemsOnPage = 0;
        addLetterhead(doc, districtInfo);
        doc.moveDown(0.5);
      }
      
      const rowY = doc.y;
      
      if (index % 2 === 0) {
        doc.rect(50, rowY, doc.page.width - 100, rowHeight).fill('#f5f5f5');
      }
      
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000');
      doc.text(`${index + 1}. ${volunteer.name}`, 55, rowY + 4, { width: 250 });
      doc.fontSize(7).font('Helvetica');
      doc.text(`ID: ${volunteer.volunteerId}`, 310, rowY + 4, { width: 150 });
      doc.text(`Phone: ${volunteer.phone}`, 55, rowY + 16, { width: 180 });
      doc.text(`Skills: ${volunteer.skills.join(', ')}`, 240, rowY + 16, { width: 220 });
      
      doc.y = rowY + rowHeight;
      itemsOnPage++;
    });
    
    addFooter(doc, generatedBy, designation, currentPage, totalPages);
    doc.end();
    
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
