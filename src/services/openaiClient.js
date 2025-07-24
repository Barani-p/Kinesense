import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI} Configured OpenAI client instance.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Generates AI-powered exercise feedback based on pose analysis.
 * @param {Object} poseData - Current pose detection data
 * @param {string} exerciseName - Name of current exercise
 * @returns {Promise<Object>} Structured feedback response
 */
export async function generateExerciseFeedback(poseData, exerciseName) {
  try {
    const prompt = `
    You are an expert physical therapist providing real-time feedback during a ${exerciseName} exercise session.
    
    Current pose analysis:
    - Form score: ${poseData?.formScore || 0}/100
    - Joint angles: ${JSON.stringify(poseData?.angles || {})}
    - Is valid pose: ${poseData?.isValidPose || false}
    - Confidence: ${poseData?.confidence || 0}
    
    Provide concise, actionable feedback focusing on form correction, encouragement, or safety alerts.
    Keep responses under 15 words for real-time delivery.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a supportive physical therapist providing real-time exercise feedback. Be encouraging but precise with corrections.' 
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'exercise_feedback',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              type: { 
                type: 'string',
                enum: ['success', 'correction', 'warning', 'motivational']
              },
              priority: {
                type: 'string', 
                enum: ['low', 'medium', 'high', 'urgent']
              },
              confidence: { type: 'number' }
            },
            required: ['message', 'type', 'priority', 'confidence'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.7,
      max_tokens: 100,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    
    // Fallback feedback based on pose data
    return generateFallbackFeedback(poseData);
  }
}

/**
 * Generates safety feedback for exclusion zone violations.
 * @param {Object} violation - Exclusion zone violation data
 * @returns {Promise<Object>} Safety feedback response
 */
export async function generateSafetyFeedback(violation) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a safety-focused physical therapist. Provide urgent but calm safety instructions.' 
        },
        { 
          role: 'user', 
          content: `User has moved into an unsafe exercise area. Provide immediate safety guidance in under 10 words.` 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'safety_feedback',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              type: { type: 'string', enum: ['warning'] },
              priority: { type: 'string', enum: ['urgent'] }
            },
            required: ['message', 'type', 'priority'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
      max_tokens: 50,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating safety feedback:', error);
    
    // Fallback safety message
    return {
      message: "Move back to the safe exercise zone",
      type: 'warning',
      priority: 'urgent'
    };
  }
}

/**
 * Fallback feedback generator when AI is unavailable.
 * @param {Object} poseData - Current pose data
 * @returns {Object} Basic feedback response
 */
function generateFallbackFeedback(poseData) {
  const fallbackMessages = {
    goodForm: ["Excellent form! Keep it up!", "Perfect posture! You're doing great!"],
    corrections: ["Keep your back straight", "Engage your core muscles", "Align your shoulders"],
    motivational: ["You're doing amazing!", "Keep pushing forward!", "Great effort!"]
  };

  if (poseData?.formScore >= 85) {
    return {
      message: fallbackMessages.goodForm[Math.floor(Math.random() * fallbackMessages.goodForm.length)],
      type: 'success',
      priority: 'low',
      confidence: 0.8
    };
  } else if (poseData?.formScore < 70) {
    return {
      message: fallbackMessages.corrections[Math.floor(Math.random() * fallbackMessages.corrections.length)],
      type: 'correction',
      priority: 'high',
      confidence: 0.7
    };
  } else {
    return {
      message: fallbackMessages.motivational[Math.floor(Math.random() * fallbackMessages.motivational.length)],
      type: 'motivational',
      priority: 'medium',
      confidence: 0.6
    };
  }
}

export default openai;