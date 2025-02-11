import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://kxxapucmizjwjcutxiav.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGFwdWNtaXpqd2pjdXR4aWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDEyMDQsImV4cCI6MjA1MzMxNzIwNH0.Y-QLqVk4EQb87T6bl7EMwMjQlqb6lBUsu13UzmjLw0g';
const supabase = createClient(supabaseUrl, supabaseKey);

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  houseType: yup.string().required('House type is required'),
  bedrooms: yup
    .number()
    .typeError('Number of bedrooms must be a number')
    .positive('Number of bedrooms must be positive')
    .integer('Number of bedrooms must be an integer')
    .required('Number of bedrooms is required'),
  amenities: yup.array().min(1, 'Select at least one amenity'),
  budget: yup
    .number()
    .typeError('Budget must be a number')
    .positive('Budget must be positive')
    .required('Budget is required'),
  paymentPreference: yup.string().required('Payment preference is required'),
  possessionTimeline: yup.string().required('Possession timeline is required'),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Insert data into Supabase
      const { error } = await supabase.from('hashu-data').insert([
        {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          houseType: data.houseType,
          bedrooms: data.bedrooms,
          amenities: data.amenities,
          budget: data.budget,
          paymentPreference: data.paymentPreference,
          possessionTimeline: data.possessionTimeline,
        },
      ]);

      if (error) throw error;

      alert('Form submitted successfully!');
      reset(); // Reset the form after submission
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('Failed to submit form.');
    }
  };

  return (
    <div style={styles.container}>
    {/* Header with Logo and Title */}
    <header style={{textAlign: 'center'}}>
      <img
        src="BBinsightslogo.png" // Path to your logo in the public folder
        alt="Logo"
        style={styles.logo}
      />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <img
          src="hashoo.png" // Path to your logo in the public folder
          alt="Logo"
          style={styles.logo}
        />
        <img
          src="PCvilla.png" // Path to your logo in the public folder
          alt="Logo"
          style={styles.logo}
        />
        <img
          src="PVC.png" // Path to your logo in the public folder
          alt="Logo"
          style={styles.logo}
        />
      </div>
      <h1 style={styles.heading}>Hashoo Properties Limited</h1>
      <h3 style={styles.heading}>Investor/Buyer Query Form</h3>
    </header>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input {...register('name')} style={styles.input} />
          {errors.name && <p style={styles.error}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input {...register('email')} style={styles.input} />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input {...register('phoneNumber')} style={styles.input} />
          {errors.phoneNumber && (
            <p style={styles.error}>{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Type of House */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Type of House</label>
          <select {...register('houseType')} style={styles.input}>
            <option value="">Select</option>
            <option value="villa-with-basement">Villa (with basement)</option>
            <option value="villa-without-basement">Villa (without basement)</option>
          </select>
          {errors.houseType && (
            <p style={styles.error}>{errors.houseType.message}</p>
          )}
        </div>

        {/* Number of Bedrooms */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Number of Bedrooms</label>
          <input type="number" {...register('bedrooms')} style={styles.input} />
          {errors.bedrooms && (
            <p style={styles.error}>{errors.bedrooms.message}</p>
          )}
        </div>

        {/* Amenities */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Amenities (check all that apply)</label>
          <div style={styles.checkboxGroup}>
            {[
              'Solar System',
              'Kitchen Accessories',
              'Security System',
              'Park',
              'Water Filtration System',
              'Other',
            ].map((amenity) => (
              <div key={amenity} style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  value={amenity}
                  {...register('amenities')}
                />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
          {errors.amenities && (
            <p style={styles.error}>{errors.amenities.message}</p>
          )}
        </div>

        {/* Budget */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Budget</label>
          <input type="number" {...register('budget')} style={styles.input} />
          {errors.budget && (
            <p style={styles.error}>{errors.budget.message}</p>
          )}
        </div>

        {/* Payment Preference */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Preference</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioItem}>
              <input
                type="radio"
                value="lump-sum"
                {...register('paymentPreference')}
              />
              <span>Lump Sum</span>
            </div>
            <div style={styles.radioItem}>
              <input
                type="radio"
                value="installments"
                {...register('paymentPreference')}
              />
              <span>Installments</span>
            </div>
          </div>
          {errors.paymentPreference && (
            <p style={styles.error}>{errors.paymentPreference.message}</p>
          )}
        </div>

        {/* Preferred Possession Timeline */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Preferred Possession Timeline</label>
          <select {...register('possessionTimeline')} style={styles.input}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                {year} year{year > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          {errors.possessionTimeline && (
            <p style={styles.error}>{errors.possessionTimeline.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

          <p style={{textAlign: 'center'}}>Thank you for your interest in Hashoo Properties (PVT )Limited!</p>
      {/* Footer */}
      <footer style={styles.footer}>
        <h3 style={styles.footerHeading}>FOR BOOKING & INFORMATION</h3>
        <p style={styles.footerText}>UAN: +92 304 111 22 91</p>
        <p style={styles.footerText}>INFO@HASHOOPROPERTIES.COM</p>
        <p style={styles.footerText}>
          OFFICE: NESPAK HOUSE, ATATURK AVENUE, G-5/2, ISLAMABAD
        </p>
        <p style={styles.footerText}>WWW.HASHOOPROPERTIES.COM</p>
      </footer>
    </div>
  );
}

// Minimalist styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#ff4d4f',
    fontSize: '0.9rem',
    marginTop: '5px',
  },
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    borderRadius: '0 0 8px 8px',
  },
  footerHeading: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#555',
    margin: '5px 0',
  }, 
  logo: {
    width: '250px', // Adjust the size of the logo
    height: 'auto',
  },
};

export default App;