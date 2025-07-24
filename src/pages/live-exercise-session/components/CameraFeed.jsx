import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import PoseDetector from '../../../utils/poseDetection';

const CameraFeed = ({
  isActive,
  onPoseDetected,
  showSkeleton,
  showGoldenStandard,
  exclusionZones = [],
  onExclusionViolation, navigate
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const poseDetectorRef = useRef(null);

  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPose, setCurrentPose] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isMediaPipeLoading, setIsMediaPipeLoading] = useState(false);
  const [supportedConstraints, setSupportedConstraints] = useState(null);

  // Check browser compatibility and supported constraints
  useEffect(() => {
    checkBrowserSupport();
  }, []);

  const checkBrowserSupport = () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported in this browser');
      }

      const supported = navigator.mediaDevices.getSupportedConstraints();
      setSupportedConstraints(supported);

      // Check if required features are supported
      if (!supported.width || !supported.height || !supported.facingMode) {
        console.warn('Some camera constraints may not be supported');
      }
    } catch (error) {
      setCameraError(`Browser compatibility issue: ${error.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      cleanup();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);
      setIsMediaPipeLoading(true);

      // Get user media with fallback constraints
      const constraints = getOptimalConstraints();
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        videoRef.current.onloadedmetadata = async () => {
          try {
            // Initialize MediaPipe pose detection
            await initializePoseDetection();
            setIsLoading(false);
            setIsMediaPipeLoading(false);
            setRetryCount(0);
          } catch (error) {
            console.error('MediaPipe initialization failed:', error);
            setCameraError(`Pose detection failed to initialize: ${error.message}`);
            setIsLoading(false);
            setIsMediaPipeLoading(false);

            // Fallback to basic camera without pose detection
            startBasicCamera();
          }
        };

        videoRef.current.onerror = (error) => {
          console.error('Video element error:', error);
          setCameraError('Video playback failed');
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      handleCameraError(error);
    }
  };

  const getOptimalConstraints = () => {
    const baseConstraints = {
      audio: false,
      video: true
    };

    if (!supportedConstraints) {
      return baseConstraints;
    }

    // Progressive fallback for video constraints
    const videoConstraints = {};

    if (supportedConstraints.width && supportedConstraints.height) {
      videoConstraints.width = { ideal: 1280, min: 640 };
      videoConstraints.height = { ideal: 720, min: 480 };
    }

    if (supportedConstraints.facingMode) {
      videoConstraints.facingMode = 'user';
    }

    if (supportedConstraints.frameRate) {
      videoConstraints.frameRate = { ideal: 30, min: 15 };
    }

    return {
      ...baseConstraints,
      video: Object.keys(videoConstraints).length > 0 ? videoConstraints : true
    };
  };

  const initializePoseDetection = async () => {
    if (!videoRef.current || !canvasRef.current) {
      throw new Error('Video or canvas element not available');
    }

    try {
      poseDetectorRef.current = new PoseDetector();

      await poseDetectorRef.current.initialize(
        videoRef.current,
        canvasRef.current,
        handlePoseResults
      );

      await poseDetectorRef.current.startDetection();
    } catch (error) {
      console.error('Pose detection initialization error:', error);
      throw error;
    }
  };

  const handlePoseResults = (poseData) => {
    setCurrentPose(poseData);
    onPoseDetected?.(poseData);

    // Check exclusion zones
    if (exclusionZones.length > 0 && poseData?.landmarks) {
      const violations = poseDetectorRef.current?.checkExclusionZones(
        poseData.landmarks,
        exclusionZones
      );

      if (violations && violations.length > 0) {
        violations.forEach((violation) => {
          onExclusionViolation?.(violation);
        });
      }
    }
  };

  const startBasicCamera = () => {
    // Fallback mode without pose detection
    console.log('Running in basic camera mode without pose detection');
    setIsLoading(false);
    setIsMediaPipeLoading(false);

    // Start mock pose data for demonstration
    const interval = setInterval(() => {
      if (!isActive) {
        clearInterval(interval);
        return;
      }

      const mockPoseData = generateMockPoseData();
      setCurrentPose(mockPoseData);
      onPoseDetected?.(mockPoseData);
    }, 100);
  };

  const generateMockPoseData = () => {
    return {
      landmarks: [
      { x: 0.5, y: 0.3, z: 0, visibility: 0.9 },
      { x: 0.48, y: 0.35, z: 0, visibility: 0.8 },
      { x: 0.52, y: 0.35, z: 0, visibility: 0.8 },
      { x: 0.45, y: 0.4, z: 0, visibility: 0.7 },
      { x: 0.55, y: 0.4, z: 0, visibility: 0.7 },
      { x: 0.4, y: 0.5, z: 0, visibility: 0.9 },
      { x: 0.6, y: 0.5, z: 0, visibility: 0.9 },
      { x: 0.35, y: 0.65, z: 0, visibility: 0.8 },
      { x: 0.65, y: 0.65, z: 0, visibility: 0.8 },
      { x: 0.3, y: 0.8, z: 0, visibility: 0.7 },
      { x: 0.7, y: 0.8, z: 0, visibility: 0.7 },
      { x: 0.45, y: 0.7, z: 0, visibility: 0.9 },
      { x: 0.55, y: 0.7, z: 0, visibility: 0.9 },
      { x: 0.43, y: 0.85, z: 0, visibility: 0.8 },
      { x: 0.57, y: 0.85, z: 0, visibility: 0.8 },
      { x: 0.41, y: 1.0, z: 0, visibility: 0.7 },
      { x: 0.59, y: 1.0, z: 0, visibility: 0.7 }],

      angles: {
        leftElbow: Math.floor(Math.random() * 50) + 120,
        rightElbow: Math.floor(Math.random() * 50) + 120,
        leftKnee: Math.floor(Math.random() * 30) + 150,
        rightKnee: Math.floor(Math.random() * 30) + 150,
        leftShoulder: Math.floor(Math.random() * 20) + 75,
        rightShoulder: Math.floor(Math.random() * 20) + 75
      },
      formScore: Math.floor(Math.random() * 30) + 70,
      isValidPose: Math.random() > 0.2,
      timestamp: Date.now()
    };
  };

  const handleCameraError = (error) => {
    let errorMessage = 'Unable to access camera.';

    if (error.name === 'NotAllowedError') {
      errorMessage = 'Camera permission denied. Please allow camera access.';
    } else if (error.name === 'NotFoundError') {
      errorMessage = 'No camera found. Please connect a camera.';
    } else if (error.name === 'NotReadableError') {
      errorMessage = 'Camera is being used by another application.';
    } else if (error.name === 'OverconstrainedError') {
      errorMessage = 'Camera constraints not supported. Trying with basic settings...';

      // Retry with basic constraints
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          retryWithBasicConstraints();
        }, 1000);
        return;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    setCameraError(errorMessage);
    setIsLoading(false);
    setIsMediaPipeLoading(false);
  };

  const retryWithBasicConstraints = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);

      const basicConstraints = {
        audio: false,
        video: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(basicConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        videoRef.current.onloadedmetadata = () => {
          startBasicCamera();
        };
      }
    } catch (error) {
      handleCameraError(error);
    }
  };

  const stopCamera = () => {
    try {
      if (poseDetectorRef.current) {
        poseDetectorRef.current.destroy();
        poseDetectorRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  };

  const cleanup = () => {
    stopCamera();
    setCurrentPose(null);
    setCameraError(null);
    setIsLoading(true);
    setRetryCount(0);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setCameraError(null);
    startCamera();
  };

  const handlePermissionRequest = async () => {
    try {
      // Try to request permissions explicitly
      await navigator.mediaDevices.getUserMedia({ video: true });
      handleRetry();
    } catch (error) {
      handleCameraError(error);
    }
  };

  if (cameraError) {
    return (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white p-6 max-w-md">
          <Icon name="CameraOff" size={48} className="mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-semibold mb-2">Camera Error</h3>
          <p className="text-sm opacity-80 mb-4">{cameraError}</p>
          
          <div className="flex flex-col gap-2">
            {cameraError.includes('permission') ?
            <button
              onClick={handlePermissionRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

                Grant Camera Permission
              </button> :

            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">

                Retry Camera Access
              </button>
            }
            
            <button
              onClick={() => navigate('/exercise-dashboard')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">

              Back to Dashboard
            </button>
          </div>
          
          <p className="text-xs opacity-60 mt-4">
            Retry count: {retryCount}/3
          </p>
        </div>
      </div>);

  }

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {isLoading &&
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="text-center text-white">
            <Icon
            name={isMediaPipeLoading ? "Brain" : "Camera"}
            size={48}
            className="mx-auto mb-4 animate-pulse" />

            <p className="text-sm">
              {isMediaPipeLoading ?
            'Loading pose detection...' : 'Initializing camera...'}
            </p>
            <div className="mt-2 text-xs opacity-60">
              This may take a few seconds
            </div>
          </div>
        </div>
      }

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transform scale-x-[-1]"
        style={{ filter: 'brightness(1.1) contrast(1.05)' }} />


      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transform scale-x-[-1] pointer-events-none ${
        showSkeleton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`
        } />


      {/* Form Score Overlay */}
      {currentPose &&
      <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl font-bold">{currentPose.formScore}</div>
            <div className="text-xs opacity-80">Form Score</div>
          </div>
        </div>
      }

      {/* Pose Status Indicator */}
      {currentPose &&
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
      currentPose.isValidPose ?
      'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`
      }>
          {currentPose.isValidPose ? 'Good Form' : 'Adjust Posture'}
        </div>
      }

      {/* Detection Status */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm text-xs">
        <div className={`w-2 h-2 rounded-full ${
        poseDetectorRef.current ? 'bg-green-500' : 'bg-yellow-500'}`
        }></div>
        <span>
          {poseDetectorRef.current ? 'AI Detection' : 'Basic Mode'}
        </span>
      </div>

      {/* Joint Angle Display */}
      {currentPose && showSkeleton &&
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm">
          <div className="text-xs font-medium mb-2">Joint Angles</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>L Elbow: {currentPose.angles.leftElbow}°</div>
            <div>R Elbow: {currentPose.angles.rightElbow}°</div>
            <div>L Knee: {currentPose.angles.leftKnee}°</div>
            <div>R Knee: {currentPose.angles.rightKnee}°</div>
          </div>
        </div>
      }
    </div>);

};

export default CameraFeed;