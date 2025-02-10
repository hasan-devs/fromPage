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
  message: yup.string().required('message is required'),
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
      const { error } = await supabase
        .from('form-submissions')
        .insert([{ name: data.name, email: data.email, message: data.message }]).select();

      if (error) throw error;

      alert('Data saved successfully!');
      reset(); // Reset the form after submission
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('Failed to save data.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Form with Supabase</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input {...register('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Message</label>
          <input {...register('message')} />
          {errors.message && <p style={{ color: 'red' }}>{errors.age.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;