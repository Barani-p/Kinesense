import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    therapistCode: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userTypeOptions = [
    { value: 'patient', label: 'Patient', description: 'Rehabilitation and recovery focused' },
    { value: 'athlete', label: 'Athlete', description: 'Performance optimization' },
    { value: 'fitness', label: 'Fitness Enthusiast', description: 'General fitness and form improvement' },
    { value: 'elderly', label: 'Elderly', description: 'Movement guidance and safety' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, userType: value }));
    if (errors.userType) {
      setErrors(prev => ({ ...prev, userType: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.userType) {
      newErrors.userType = 'Please select your user type';
    }
    
    if (formData.therapistCode && formData.therapistCode.length < 6) {
      newErrors.therapistCode = 'Therapist code must be at least 6 characters';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if email already exists (mock check)
      const existingEmails = ['existing@example.com', 'taken@kinesense.com'];
      
      if (existingEmails.includes(formData.email)) {
        setErrors({ email: 'This email is already registered. Please use a different email.' });
        setIsLoading(false);
        return;
      }
      
      // Successful registration
      localStorage.setItem('userRole', formData.userType);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      
      if (formData.therapistCode) {
        localStorage.setItem('therapistCode', formData.therapistCode);
      }
      
      navigate('/exercise-dashboard');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        required
      />
      
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a strong password"
        description="Must contain uppercase, lowercase, and number"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        required
      />
      
      <Select
        label="User Type"
        placeholder="Select your user type"
        options={userTypeOptions}
        value={formData.userType}
        onChange={handleSelectChange}
        error={errors.userType}
        required
      />
      
      {(formData.userType === 'patient' || formData.userType === 'elderly') && (
        <Input
          label="Therapist Code (Optional)"
          type="text"
          name="therapistCode"
          placeholder="Enter therapist referral code"
          description="Connect with your healthcare provider"
          value={formData.therapistCode}
          onChange={handleInputChange}
          error={errors.therapistCode}
        />
      )}
      
      <div className="space-y-3 pt-2">
        <Checkbox
          label="I agree to the Terms of Service"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          error={errors.agreeToTerms}
          required
        />
        
        <Checkbox
          label="I agree to the Privacy Policy and HIPAA compliance"
          name="agreeToPrivacy"
          checked={formData.agreeToPrivacy}
          onChange={handleInputChange}
          error={errors.agreeToPrivacy}
          required
        />
      </div>
      
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;