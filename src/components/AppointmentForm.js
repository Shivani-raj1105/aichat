import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format, addDays, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

const steps = ['Personal Information', 'Doctor Selection', 'Appointment Time'];

const DOCTORS = {
  'Dr. Sharma': { specialty: 'Cardiology', availableDays: ['Monday', 'Wednesday', 'Friday'] },
  'Dr. Patel': { specialty: 'Neurology', availableDays: ['Tuesday', 'Thursday', 'Saturday'] },
  'Dr. Gupta': { specialty: 'Orthopedics', availableDays: ['Monday', 'Tuesday', 'Friday'] },
  'Dr. Singh': { specialty: 'Pediatrics', availableDays: ['Wednesday', 'Thursday', 'Saturday'] },
  'Dr. Verma': { specialty: 'Dermatology', availableDays: ['Monday', 'Wednesday', 'Saturday'] },
  'Dr. Kumar': { specialty: 'General Medicine', availableDays: ['Tuesday', 'Thursday', 'Friday'] },
};

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const AppointmentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    doctor: '',
    phone: '',
    date: null,
    time: null,
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.age) newErrors.age = 'Age is required';
        else if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
          newErrors.age = 'Please enter a valid age';
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 1:
        if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
        break;
      case 2:
        if (!formData.date) newErrors.date = 'Please select a date';
        if (!formData.time) newErrors.time = 'Please select a time';
        break;
      case 3:
        if (!formData.phone) newErrors.phone = 'Please enter your phone number';
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Here you would typically send the data to your backend
      console.log('Appointment Data:', formData);
      setShowSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          age: '',
          gender: '',
          doctor: '',
          date: null,
          time: null,
        });
        setActiveStep(0);
      }, 2000);
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date,
      time: null, // Reset time when date changes
    });
    if (errors.date) {
      setErrors({
        ...errors,
        date: '',
      });
    }
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      time,
    });
    if (errors.time) {
      setErrors({
        ...errors,
        time: '',
      });
    }
  };

  const isDateAvailable = (date) => {
    if (!formData.doctor) return true;
    const dayName = format(date, 'EEEE');
    return DOCTORS[formData.doctor].availableDays.includes(dayName);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleInputChange('age')}
                error={!!errors.age}
                helperText={errors.age}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.gender} required>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  value={formData.gender}
                  onChange={handleInputChange('gender')}
                  row
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.doctor} required>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  value={formData.doctor}
                  onChange={handleInputChange('doctor')}
                  label="Select Doctor"
                >
                  {Object.entries(DOCTORS).map(([name, info]) => (
                    <MenuItem key={name} value={name}>
                      {name} - {info.specialty}
                    </MenuItem>
                  ))}
                </Select>
                {errors.doctor && <FormHelperText>{errors.doctor}</FormHelperText>}
              </FormControl>
            </Grid>
            {formData.doctor && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Available Days: {DOCTORS[formData.doctor].availableDays.join(', ')}
                </Typography>
              </Grid>
            )}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Appointment Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  shouldDisableDate={(date) => {
                    const today = startOfDay(new Date());
                    const maxDate = addDays(today, 30);
                    return isBefore(date, today) || isAfter(date, maxDate) || !isDateAvailable(date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.date}
                      helperText={errors.date || 'Select a date within next 30 days'}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Appointment Time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.time}
                      helperText={errors.time || 'Select a time slot'}
                      required
                    />
                  )}
                  minTime={new Date(0, 0, 0, 9, 0)}
                  maxTime={new Date(0, 0, 0, 16, 30)}
                  minutesStep={30}
                />
              </LocalizationProvider>
            </Grid>
            {formData.date && formData.time && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Selected Appointment: {format(formData.date, 'PPP')} at {format(formData.time, 'p')}
                </Typography>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Book an Appointment
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            color="primary"
          >
            {activeStep === steps.length - 1 ? 'Book Appointment' : 'Next'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Appointment booked successfully! We'll send you a confirmation shortly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppointmentForm; 