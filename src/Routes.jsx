import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import ExerciseDashboard from "pages/exercise-dashboard";
import LiveExerciseSession from "pages/live-exercise-session";
import TherapistDashboardPatientManagement from "pages/therapist-dashboard-patient-management";
import ProgressAnalyticsReports from "pages/progress-analytics-reports";
import UserProfileSettings from "pages/user-profile-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ExerciseDashboard />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/exercise-dashboard" element={<ExerciseDashboard />} />
        <Route path="/live-exercise-session" element={<LiveExerciseSession />} />
        <Route path="/therapist-dashboard-patient-management" element={<TherapistDashboardPatientManagement />} />
        <Route path="/progress-analytics-reports" element={<ProgressAnalyticsReports />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;