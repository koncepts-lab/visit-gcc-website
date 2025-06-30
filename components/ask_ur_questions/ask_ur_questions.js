import React, { useState } from 'react';
import style from './style.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Ask_ur_questions() {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!formData.question.trim()) tempErrors.question = 'Question cannot be empty.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!validate()) {
      enqueueSnackbar('Please correct the errors in the form.', { variant: 'warning' });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        question: formData.question,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}questions`,
        payload
      );


      enqueueSnackbar('Question submitted successfully!', { variant: 'success' });

      setFormData({ name: '', email: '', question: '' });
      setErrors({});

    } catch (error) {
      console.error('API submission error:', error.response || error);

      enqueueSnackbar('Failed to submit question. Please try again.', { variant: 'error' });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={`container-fluid ${style['ask-your-questions']}`}>
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8'>
                <h3 className='text-black fw-semibold'>Ask Your Questions</h3>
                <p>
                  If your question has not been answered, you can submit your own by using the form below. Alternatively, feel free to{' '}
                  <Link href='#0'>
                    <b>
                      <u>Contact Us</u>
                    </b>
                  </Link>{' '}
                  and one of our staff will be happy to assist you.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className='row'>
                <div className='col-md-6'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.name}</p>}
                </div>

                <div className='col-md-6'>
                  <input
                    type='email' 
                    name='email'
                    placeholder='Your Email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.email}</p>}
                </div>

                <div className='col-md-12'>
                  <textarea
                    name='question'
                    placeholder='Question'
                    value={formData.question}
                    onChange={handleChange}
                  />
                  {errors.question && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.question}</p>}
                </div>
                
                <div className='col-md-12'>
                  <button type='submit' disabled={isLoading}>
                    {isLoading ? 'SUBMITTING...' : 'ASK QUESTION'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ask_ur_questions;