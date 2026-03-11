import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendNotifications = ({ user }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [status, setStatus] = useState('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (user.role === 'state_admin') {
      fetchDistricts();
    }
    fetchMemberCount();
  }, [user.role, selectedDistrict, status]);

  const fetchDistricts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/districts', {
        headers: { 'x-auth-token': token }
      });
      setDistricts(res.data);
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  };

  const fetchMemberCount = async () => {
    const token = localStorage.getItem('token');
    try {
      let query = {};
      if (selectedDistrict !== 'all') {
        query.district = selectedDistrict;
      }
      if (status !== 'all') {
        query.status = status;
      }

      const res = await axios.get('/api/members', {
        headers: { 'x-auth-token': token }
      });

      let filteredMembers = res.data;
      if (selectedDistrict !== 'all') {
        filteredMembers = filteredMembers.filter(m => m.district?._id === selectedDistrict);
      }
      if (status !== 'all') {
        filteredMembers = filteredMembers.filter(m => m.status === status);
      }

      setMemberCount(filteredMembers.length);
    } catch (err) {
      console.error('Error fetching member count:', err);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert('Please fill in subject and message');
    }}}