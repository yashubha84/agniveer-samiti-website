import React from 'react';

const Contact = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Contact Us</h1>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Reach out to us for any queries or support.</p>
          
          <div style={{ marginTop: '30px' }}>
            <h3>State Office</h3>
            <p>📍 Address: [State Office Address]</p>
            <p>📞 Phone: [Phone Number]</p>
            <p>✉️ Email: info@samiti.org</p>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h3>Send us a Message</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" required></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
