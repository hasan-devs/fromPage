import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
          phone_number: data.phoneNumber,
          house_type: data.houseType,
          bedrooms: data.bedrooms,
          amenities: data.amenities,
          budget: data.budget,
          payment_preference: data.paymentPreference,
          possession_timeline: data.possessionTimeline,
        },
      ]).select();

      if (error) throw error;

      alert('Form submitted successfully!');
      reset(); // Reset the form after submission
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('Failed to submit form.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>House Inquiry Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label>Name</label>
          <input {...register('name')} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input {...register('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label>Phone Number</label>
          <input {...register('phoneNumber')} />
          {errors.phoneNumber && (
            <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Type of House */}
        <div>
          <label>Type of House</label>
          <select {...register('houseType')}>
            <option value="">Select</option>
            <option value="villa-with-basement">Villa (with basement)</option>
            <option value="villa-without-basement">Villa (without basement)</option>
          </select>
          {errors.houseType && (
            <p style={{ color: 'red' }}>{errors.houseType.message}</p>
          )}
        </div>

        {/* Number of Bedrooms */}
        <div>
          <label>Number of Bedrooms</label>
          <input type="number" {...register('bedrooms')} />
          {errors.bedrooms && (
            <p style={{ color: 'red' }}>{errors.bedrooms.message}</p>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label>Amenities (check all that apply)</label>
          {[
            'Solar System',
            'Kitchen Accessories',
            'Security System',
            'Swimming Pool',
            'Gym',
            'Park',
            'Water Filtration System',
            'Other',
          ].map((amenity) => (
            <div key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                {...register('amenities')}
              />
              {amenity}
            </div>
          ))}
          {errors.amenities && (
            <p style={{ color: 'red' }}>{errors.amenities.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label>Budget</label>
          <input type="number" {...register('budget')} />
          {errors.budget && (
            <p style={{ color: 'red' }}>{errors.budget.message}</p>
          )}
        </div>

        {/* Payment Preference */}
        <div>
          <label>Payment Preference</label>
          <div>
            <input
              type="radio"
              value="lump-sum"
              {...register('paymentPreference')}
            />
            Lump Sum
          </div>
          <div>
            <input
              type="radio"
              value="installments"
              {...register('paymentPreference')}
            />
            Installments
          </div>
          {errors.paymentPreference && (
            <p style={{ color: 'red' }}>{errors.paymentPreference.message}</p>
          )}
        </div>

        {/* Preferred Possession Timeline */}
        <div>
          <label>Preferred Possession Timeline</label>
          <select {...register('possessionTimeline')}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                {year} year{year > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          {errors.possessionTimeline && (
            <p style={{ color: 'red' }}>{errors.possessionTimeline.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;