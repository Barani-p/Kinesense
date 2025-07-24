import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

class PoseDetector {
  constructor() {
    this.pose = null;
    this.camera = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.onResults = null;
    this.isInitialized = false;
    this.lastPoseData = null;
    this.consecutiveValidFrames = 0;
    this.repCountThreshold = 10;
  }

  async initialize(videoElement, canvasElement, onResults) {
    try {
      this.videoElement = videoElement;
      this.canvasElement = canvasElement;
      this.canvasCtx = canvasElement.getContext('2d');
      this.onResults = onResults;

      // Initialize MediaPipe Pose
      this.pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });

      this.pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.pose.onResults(this.handleResults.bind(this));

      // Initialize camera
      this.camera = new Camera(videoElement, {
        onFrame: async () => {
          if (this.pose && this.isInitialized) {
            await this.pose.send({ image: videoElement });
          }
        },
        width: 1280,
        height: 720
      });

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize pose detection:', error);
      throw new Error(`Pose detection initialization failed: ${error.message}`);
    }
  }

  async startDetection() {
    try {
      if (!this.isInitialized) {
        throw new Error('Pose detector not initialized');
      }
      await this.camera.start();
      return true;
    } catch (error) {
      console.error('Failed to start pose detection:', error);
      throw new Error(`Failed to start camera: ${error.message}`);
    }
  }

  stopDetection() {
    try {
      if (this.camera) {
        this.camera.stop();
      }
    } catch (error) {
      console.error('Error stopping pose detection:', error);
    }
  }

  handleResults(results) {
    if (!this.canvasCtx || !this.canvasElement) return;

    // Clear canvas
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // Process pose data
    const poseData = this.processPoseData(results);
    
    // Draw pose landmarks and connections
    if (results.poseLandmarks) {
      this.drawPose(results.poseLandmarks);
    }

    this.canvasCtx.restore();

    // Send processed data to callback
    if (this.onResults && poseData) {
      this.onResults(poseData);
    }
  }

  processPoseData(results) {
    if (!results.poseLandmarks) {
      return null;
    }

    const landmarks = results.poseLandmarks;
    
    // Calculate joint angles
    const angles = this.calculateJointAngles(landmarks);
    
    // Calculate form score based on pose quality
    const formScore = this.calculateFormScore(landmarks, angles);
    
    // Determine if pose is valid
    const isValidPose = this.validatePose(landmarks, angles, formScore);
    
    // Store last pose data for comparison
    this.lastPoseData = {
      landmarks: landmarks.map(landmark => ({
        x: landmark.x,
        y: landmark.y,
        z: landmark.z,
        visibility: landmark.visibility
      })),
      angles,
      formScore,
      isValidPose,
      timestamp: Date.now()
    };

    return this.lastPoseData;
  }

  calculateJointAngles(landmarks) {
    const angles = {};
    
    try {
      // Left elbow angle
      angles.leftElbow = this.calculateAngle(
        landmarks[13], // left shoulder
        landmarks[15], // left elbow
        landmarks[17]  // left wrist
      );

      // Right elbow angle
      angles.rightElbow = this.calculateAngle(
        landmarks[14], // right shoulder
        landmarks[16], // right elbow
        landmarks[18]  // right wrist
      );

      // Left knee angle
      angles.leftKnee = this.calculateAngle(
        landmarks[23], // left hip
        landmarks[25], // left knee
        landmarks[27]  // left ankle
      );

      // Right knee angle
      angles.rightKnee = this.calculateAngle(
        landmarks[24], // right hip
        landmarks[26], // right knee
        landmarks[28]  // right ankle
      );

      // Left shoulder angle
      angles.leftShoulder = this.calculateAngle(
        landmarks[15], // left elbow
        landmarks[13], // left shoulder
        landmarks[23]  // left hip
      );

      // Right shoulder angle
      angles.rightShoulder = this.calculateAngle(
        landmarks[16], // right elbow
        landmarks[14], // right shoulder
        landmarks[24]  // right hip
      );
    } catch (error) {
      console.warn('Error calculating joint angles:', error);
      return {
        leftElbow: 0,
        rightElbow: 0,
        leftKnee: 0,
        rightKnee: 0,
        leftShoulder: 0,
        rightShoulder: 0
      };
    }

    return angles;
  }

  calculateAngle(a, b, c) {
    if (!a || !b || !c) return 0;
    
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    
    return Math.round(angle);
  }

  calculateFormScore(landmarks, angles) {
    let score = 100;
    
    // Check landmark visibility
    const visibilityThreshold = 0.5;
    const keyLandmarks = [13, 14, 15, 16, 23, 24, 25, 26]; // shoulders, elbows, hips, knees
    
    for (const index of keyLandmarks) {
      if (landmarks[index]?.visibility < visibilityThreshold) {
        score -= 10;
      }
    }

    // Check angle symmetry for bilateral exercises
    const angleDifference = Math.abs(angles.leftElbow - angles.rightElbow);
    if (angleDifference > 30) {
      score -= 15;
    }

    // Check pose stability
    if (this.lastPoseData) {
      const positionChange = this.calculatePositionChange(landmarks, this.lastPoseData.landmarks);
      if (positionChange > 0.1) {
        score -= 10;
      }
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  calculatePositionChange(currentLandmarks, previousLandmarks) {
    if (!previousLandmarks || previousLandmarks.length !== currentLandmarks.length) {
      return 0;
    }

    let totalChange = 0;
    const keyPoints = [11, 12, 13, 14]; // Torso landmarks

    for (const index of keyPoints) {
      const current = currentLandmarks[index];
      const previous = previousLandmarks[index];
      
      if (current && previous) {
        const change = Math.sqrt(
          Math.pow(current.x - previous.x, 2) + 
          Math.pow(current.y - previous.y, 2)
        );
        totalChange += change;
      }
    }

    return totalChange / keyPoints.length;
  }

  validatePose(landmarks, angles, formScore) {
    // Check minimum visibility requirements
    const requiredLandmarks = [11, 12, 13, 14, 15, 16]; // Shoulders and elbows
    const visibilityThreshold = 0.6;
    
    for (const index of requiredLandmarks) {
      if (!landmarks[index] || landmarks[index].visibility < visibilityThreshold) {
        return false;
      }
    }

    // Check form score threshold
    if (formScore < 60) {
      return false;
    }

    // Check reasonable angle ranges
    const angleChecks = [
      angles.leftElbow > 30 && angles.leftElbow < 180,
      angles.rightElbow > 30 && angles.rightElbow < 180,
      angles.leftShoulder > 30 && angles.leftShoulder < 150,
      angles.rightShoulder > 30 && angles.rightShoulder < 150
    ];

    return angleChecks.every(check => check);
  }

  drawPose(landmarks) {
    // Draw pose connections
    drawConnectors(this.canvasCtx, landmarks, Pose.POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4
    });

    // Draw pose landmarks
    drawLandmarks(this.canvasCtx, landmarks, {
      color: '#FF0000',
      lineWidth: 2,
      radius: 6
    });
  }

  checkExclusionZones(landmarks, exclusionZones) {
    const violations = [];
    
    if (!landmarks || !exclusionZones || exclusionZones.length === 0) {
      return violations;
    }

    // Check key body parts against exclusion zones
    const keyPoints = [
      { name: 'Left Hand', landmark: landmarks[17] },
      { name: 'Right Hand', landmark: landmarks[18] },
      { name: 'Left Foot', landmark: landmarks[27] },
      { name: 'Right Foot', landmark: landmarks[28] }
    ];

    for (const point of keyPoints) {
      if (!point.landmark || point.landmark.visibility < 0.5) continue;

      for (let i = 0; i < exclusionZones.length; i++) {
        const zone = exclusionZones[i];
        
        if (this.isPointInZone(point.landmark, zone)) {
          violations.push(`${point.name} is in exclusion zone ${i + 1}`);
        }
      }
    }

    return violations;
  }

  isPointInZone(landmark, zone) {
    return (
      landmark.x >= zone.x &&
      landmark.x <= zone.x + zone.width &&
      landmark.y >= zone.y &&
      landmark.y <= zone.y + zone.height
    );
  }

  destroy() {
    try {
      this.stopDetection();
      if (this.pose) {
        this.pose.close();
        this.pose = null;
      }
      this.camera = null;
      this.videoElement = null;
      this.canvasElement = null;
      this.canvasCtx = null;
      this.isInitialized = false;
    } catch (error) {
      console.error('Error destroying pose detector:', error);
    }
  }
}

export default PoseDetector;